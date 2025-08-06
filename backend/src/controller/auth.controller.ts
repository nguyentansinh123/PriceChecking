import { Request, Response } from 'express';
import { UserModel } from '../models/user.model';
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { transporter } from '../lib/nodemailer';
import { welcomeEmailTemplate } from '../template/Welcome';
import mjml2html from "mjml";
import '../globalType'
import { SendingOtp } from '../template/SendingOtp';
import { ResetOtp } from '../template/ResetOtp';


export const register = async (req: Request, res: Response) => {

    const {name, email, password} = req.body

    if(!name || !email || !password){
        return res.json({success: false, message: "Missing Details"})
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10)
        const existingUser = await UserModel.findOne({email})

        if(existingUser) {
            return res.json({success: false, message:"Email already exists"})
        }
        
        const idx = Math.floor(Math.random() * 100) + 1;
        const avatarLink = `https://avatar.iran.liara.run/public/${idx}`
        const user = new UserModel({name, email, password: hashedPassword, avatar:avatarLink }) 

        await user.save()

        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET as string, {expiresIn: '7d'})

        res.cookie('priceCompareToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV=== 'production' ? 'none' : 'strict',
            maxAge: 7* 24 * 60 * 60 *1000
        })

        const { html } = mjml2html(welcomeEmailTemplate(name));
        const mailOptions = {
            from : process.env.SENDER_EMAIL,
            to: email,
            subject: "Welcome to Price Compare",
            html: html,
        }

        await transporter.sendMail(mailOptions)

        return res.json({success: true, message: "Account register successfully"})
    } catch (error) {
        res.json({success: false, message: (error as Error).message})
    }
}

export const login = async (req: Request, res: Response) => {
    const {email, password} = req.body
    if(!email ||!password){
        return res.json({success: false, message:"Missing details"})
    }

    try {

        const user = await UserModel.findOne({email})
        
        if(!user){
            return res.json({success: false, message:"User not found"})
        }

        const isMatch = await bcrypt.compare(password, user.password)
        
        if(!isMatch){
            return res.json({success: false, message:"Invalid password"})
        }
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET as string, {expiresIn: '7d'})

        res.cookie('priceCompareToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV=== 'production' ? 'none' : 'strict',
            maxAge: 7* 24 * 60 * 60 *1000
        })
        return res.json({success: true, message: "Login successfully"})
        
    } catch (error) {
        res.json({success: false, message: (error as Error).message})
    }
}

export const logout = async (req: Request, res: Response) => {

    try {
        res.clearCookie('priceCompareToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV=== 'production' ? 'none' : 'strict',
            maxAge: 7* 24 * 60 * 60 *1000
        })
        return res.json({success: true, message:"log out"})
        
    } catch (error) {
        res.json({success: false, message: (error as Error).message})
    }
}

export const sendVerifyOtp = async (req: Request, res: Response) => {
    try {
        const userId = req.currentUserId
        console.log(userId);
        const user = await UserModel.findById(userId)
        console.log(user);
        

        if(user.isAccountVerified){
            return res.json({success: false, message:"Account already verified"})
        }

        const otp = String(Math.floor(100000+ Math.random() * 900000))
        user.verifyOTP = otp
        user.verifyOTPExpiredAt = Date.now() + 24 * 60 * 60 * 1000

        await user.save()

        const { html } = mjml2html(SendingOtp(otp));

        const mailOptions = {
            from : process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Verify Your Account ",
            html: html,
        }
        await transporter.sendMail(mailOptions)

        res.json({success: true, message:"Verified OTP send on Email"})

    } catch (error) {
        res.json({success: false, message: (error as Error).message})
    }
}

export const verifiedEmail = async (req: Request, res: Response) => {
    const {otp} = req.body
    const userId = req.currentUserId
    if(!userId || !otp){
        return res.json({success: false, message: "Need Otp To Verify Account"})
    }

        try {
        const user = await UserModel.findById(userId)

        if(!user){
            return res.json({success: false, message: "User not found"})
        }

        if(user.verifyOTP === "" || user.verifyOTP !== otp){
            return res.json({success: false, message: "Invalid OTP"})
        }

        if(user.verifyOTPExpiredAt < Date.now()){
            return res.json({success: false, message: "OTP expired"})
        }

        user.isAccountVerified = true
        user.verifyOTP = ''
        user.verifyOTPExpiredAt = 0

        await user.save()
        return res.json({success: true, message: "Email Verified Successfully"})

    } catch (error) {
        res.json({success: false, message: (error as Error).message})
    }
}

export const isAuthenticated = async (req: Request, res: Response) => {
  try {
    const user = await UserModel
      .findById(req.currentUserId)
      .select('-password')
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' })
    }
    return res.json({ success: true, message: 'User is authenticated', user })
  } catch (error) {
    return res.json({ success: false, message: (error as Error).message })
  }
}

export const sendResetOtp = async (req: Request, res: Response) => {
    const {email} = req.body

    if(!email) {
        return res.json({success: false, message: "Email is required"})

    }

    try {
        const user = await UserModel.findOne({email})
        if(!user){
            return res.json({success: false, message: "User not found"})
        }
        const otp = String(Math.floor(100000+ Math.random() * 900000))
        user.resetOTP = otp
        user.resetOTPExpireAt = Date.now() + 15 * 60 * 1000

        await user.save()

        const { html } = mjml2html(ResetOtp(otp));

        const mailOptions = {
            from : process.env.SENDER_EMAIL,
            to: user.email,
            subject: "Password reset OTP",
            html: html
        }
        await transporter.sendMail(mailOptions)

        res.json({success: true, message:"OTP send on Email"})
        
    } catch (error) {
        return res.json({success: false, message: (error as Error).message})
        
    }
}

export const resetPassword = async (req: Request, res: Response) => {
    const {email, otp, newPassword} = req.body

    if(!email ||!otp ||!newPassword){
        return res.json({success: false, message:"Missing details"})
    }

    try {
        
        const user = await UserModel.findOne({email})
        if (!user){
            return res.json({success: false, message: "User not found"})
        }
        if(user.resetOTP == "" || user.resetOTP !== otp){
            return res.json({success: false, message: "Invalid OTP"})
        }

        if(user.resetOTPExpireAt < Date.now()){
            return res.json({success: false, message: "OTP expired"})
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10)
        user.password = hashedPassword
        user.resetOTP = ''
        user.resetOTPExpireAt = 0
        await user.save()
        return res.json({success: true, message: "Password reset successfully"})

    } catch (error) {
        return res.json({success: false, message: (error as Error).message})
    }
}
