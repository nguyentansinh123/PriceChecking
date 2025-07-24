import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Name is required'],
        minlength: [2, 'Name must be at least 2 characters long'],
        maxlength: [50, 'Name cannot exceed 50 characters'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        minlength: [5, 'Email must be at least 5 characters long'],
        maxlength: [100, 'Email cannot exceed 100 characters'],
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minlength: [6, 'Password must be at least 6 characters long'],
        maxlength: [128, 'Password cannot exceed 128 characters']
    },
    verifyOTP: {
        type: String,
        default: '',
        maxlength: [10, 'OTP cannot exceed 10 characters']
    },
    verifyOTPExpiredAt: {
        type: Number,
        default: 0,
        min: [0, 'Expiry time cannot be negative']
    },
    isAccountVerified: {
        type: Boolean,
        default: false
    },
    resetOTP: {
        type: String,
        default: "",
        maxlength: [10, 'Reset OTP cannot exceed 10 characters']
    },
    resetOTPExpireAt: {
        type: Number,
        default: 0,
        min: [0, 'Reset OTP expiry time cannot be negative']
    }
}, {
    timestamps: true 
});

export const UserModel= mongoose.models.user || mongoose.model('User',userSchema)