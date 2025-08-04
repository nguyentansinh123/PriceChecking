import { axiosInstance } from "./axios";
import type { AuthReturnType, LoginType, RegisterType, resetPasswordType } from "./types/authTypes";

export const normalsignup = async (signupData: RegisterType): Promise<AuthReturnType> =>{
    const response = await axiosInstance.post("/auth/register", signupData)
    return response.data
}

export const normalLogin = async (loginData: LoginType): Promise<AuthReturnType> =>{
    const response = await axiosInstance.post("/auth/login", loginData)
    return response.data
}

export const logout = async (): Promise<AuthReturnType> =>{
    const response = await axiosInstance.post("/auth/logout")
    return response.data
}

export const sendverifyOtp = async (): Promise<AuthReturnType>=>{
    const response = await axiosInstance.post("/auth/send-verify-otp")
    return response.data
}

export const verifyEmail = async (otp: number): Promise<AuthReturnType> =>{
    const response = await axiosInstance.post("/auth/verify-account", otp)
    return response.data
}

export const getAuthUser = async (): Promise<AuthReturnType> =>{
    const response = await axiosInstance.get("/auth/is-auth")
    return response.data
}

export const sendResetOtp = async (email: string): Promise<AuthReturnType> =>{
    const response = await axiosInstance.post("/auth/is-auth", email)
    return response.data
}

export const resetPassword = async (resetPasswordData: resetPasswordType): Promise<AuthReturnType> =>{
    const response = await axiosInstance.post("/auth/reset-password", resetPasswordData)
    return response.data
}

