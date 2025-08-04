import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import { uploadToCloudinary } from "../lib/cloudinary";


export const getMyDetails = async (req: Request, res: Response)=>{
    const userId = req.currentUserId

    const currentUser = await UserModel.findOne({userId})
    
    if (!currentUser) {
        return res.status(404).json({ success: false, message: "User not found" });
    }

    return res.status(200).json({success: true, currentUser})
    
}

export const getAllUsersDetails = async (req: Request, res: Response)=>{
    try {
        const allUsers = await UserModel.find({});
        return res.status(200).json({ success: true, users: allUsers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const deleteUser = async (req: Request, res: Response)=>{
    try {
        const userId = req.currentUserId;
        const user = await UserModel.findByIdAndDelete(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        return res.status(200).json({ success: true, message: "User deleted successfully" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error" });
    }
}

export const editMyAvatar = async (req: Request, res: Response)=>{
    const userId = req.currentUserId;

    if (!req.file) {
        return res.status(400).json({ success: false, message: "No file uploaded." });
    }

    try {
        const user = await UserModel.findById(userId);

        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        if (user.isOAuthUser) {
            return res.status(403).json({ success: false, message: "Cannot change avatar for OAuth users." });
        }

        const fileName = `avatar-${userId}-${Date.now()}`;
        const avatarUrl = await uploadToCloudinary(req.file.buffer, fileName);

        user.avatar = avatarUrl;
        await user.save();

        return res.status(200).json({ 
            success: true, 
            message: "Avatar updated successfully.",
            avatar: avatarUrl 
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
}