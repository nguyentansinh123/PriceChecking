import { create } from 'zustand'

type AuthState = {
    email: string;
    otp: string;
    setEmail: (email: string) => void;
    setOtp: (otp: string) => void
}

export const useAuthStore = create<AuthState>((set) => ({
    email: '',
    otp: '',
    setEmail: (email) => set({ email }),
    setOtp: (otp) => set({ otp })
})) 
