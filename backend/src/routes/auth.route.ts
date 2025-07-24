import express, { Request, Response } from 'express';
import { isAuthenticated, login, logout, register,
     resetPassword, sendResetOtp, sendVerifyOtp, verifiedEmail } from '../controller/auth.controller';
import { userAuth } from '../middleware/userAuth';
import { googleAuth, googleCallback } from '../controller/tpAuth.controller';
import passport from 'passport';
export const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/logout', logout)
router.post('/send-verify-otp', userAuth,sendVerifyOtp )
router.post('/verify-account',userAuth,verifiedEmail )
router.get('/is-auth',userAuth,isAuthenticated )
router.post('/send-reset-otp',userAuth,sendResetOtp )
router.post('/reset-password',userAuth,resetPassword )

router.get('/google', googleAuth)
router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }), 
    googleCallback
)