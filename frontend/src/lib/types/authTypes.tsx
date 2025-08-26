export interface RegisterType {
  name: string;
  email: string;
  password: string;
}

export interface LoginType {
  email: string;
  password: string;
}
export type resetPasswordType = {
  email: string;
  otp: string;
  password: string;
};

export interface AuthReturnType {
  success: boolean;
  message: string;
  user?: {
    _id: string;
    name: string;
    email: string;
    avatar?: string;
    role: string;
    isOAuthUser: boolean;
    oauthProvider?: string | null;
  };
}
