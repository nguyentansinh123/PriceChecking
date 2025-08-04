
export interface RegisterType {
    name: string
    email: string
    password: string
}

export interface LoginType {
    email: string
    password: string
}
export interface resetPasswordType{
    email: string
    otp: number
    newPassword: string
} 

export interface AuthReturnType {
  success: boolean
  message: string
}