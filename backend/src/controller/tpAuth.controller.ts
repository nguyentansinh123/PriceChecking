import passport from 'passport';
import { Strategy as GoogleStrategy, Profile, VerifyCallback } from 'passport-google-oauth20';
import { UserModel } from '../models/user.model';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import '../globalType';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { Strategy as GitHubStrategy } from 'passport-github2';

// http://localhost:5000/api/v1/auth/github

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: "/api/v1/auth/google/callback"
}, async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
    try {
        let user = await UserModel.findOne({ email: profile.emails?.[0]?.value });

        if (user) {
            if (!user.isOAuthUser && user.password) {
                return done(new Error('Account already exists with email and password. Please login with your credentials.'), false);
            }
            
            if (user.isOAuthUser) {
                return done(null, user);
            }
            
            user.isOAuthUser = true;
            user.oauthProvider = 'google';
            user.oauthId = profile.id;
            user.avatar = profile.photos?.[0]?.value;
            user.isAccountVerified = true; 
            await user.save();
            return done(null, user);
        } else {
            user = new UserModel({
                name: profile.displayName,
                email: profile.emails?.[0]?.value,
                isOAuthUser: true,
                oauthProvider: 'google',
                oauthId: profile.id,
                avatar: profile.photos?.[0]?.value,
                isAccountVerified: true, 
                password: undefined 
            });
            await user.save();
            return done(null, user);
        }
    } catch (error) {
        return done(error as Error, false);
    }
}));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID as string,
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    callbackURL: "/api/v1/auth/github/callback"
}, async (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
    try {
        let email = profile.emails?.[0]?.value;
        
        if (!email) {
            try {
                const response = await fetch('https://api.github.com/user/emails', {
                    headers: {
                        'Authorization': `token ${accessToken}`,
                        'User-Agent': 'PriceCompare-App'
                    }
                });
                
                if (response.ok) {
                    const emails = await response.json();
                    const primaryEmail = emails.find((e: any) => e.primary && e.verified);
                    email = primaryEmail?.email;
                }
            } catch (apiError) {
                console.error('Failed to fetch email from GitHub API:', apiError);
            }
        }
        
        if (!email) {
            return done(new Error('Email not provided by GitHub. Please make your email public in your GitHub settings or grant email permission.'), false);
        }

        let user = await UserModel.findOne({ email: email });

        if (user) {
            if (!user.isOAuthUser && user.password) {
                return done(new Error('Account already exists with email and password. Please login with your credentials.'), false);
            }
            
            if (user.isOAuthUser) {
                return done(null, user);
            }
            
            user.isOAuthUser = true;
            user.oauthProvider = 'github';
            user.oauthId = profile.id;
            user.avatar = profile.photos?.[0]?.value || profile._json?.avatar_url;
            user.isAccountVerified = true;
            await user.save();
            return done(null, user);
        } else {
            user = new UserModel({
                name: profile.displayName || profile.username,
                email: email,
                isOAuthUser: true,
                oauthProvider: 'github',
                oauthId: profile.id,
                avatar: profile.photos?.[0]?.value || profile._json?.avatar_url,
                isAccountVerified: true,
                password: undefined
            });
            await user.save();
            return done(null, user);
        }
    } catch (error) {
        return done(error as Error, false);
    }
}));


passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_APP_ID as string,
    clientSecret: process.env.FACEBOOK_APP_SECRET as string,
    callbackURL: "/api/v1/auth/facebook/callback",
    profileFields: ['id', 'displayName', 'emails', 'photos']
}, async (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
    try {
        let user = await UserModel.findOne({ email: profile.emails?.[0]?.value });

        if (user) {
            if (!user.isOAuthUser && user.password) {
                return done(new Error('Account already exists with email and password. Please login with your credentials.'), false);
            }
            
            if (user.isOAuthUser) {
                return done(null, user);
            }
            
            user.isOAuthUser = true;
            user.oauthProvider = 'facebook';
            user.oauthId = profile.id;
            user.avatar = profile.photos?.[0]?.value;
            user.isAccountVerified = true;
            await user.save();
            return done(null, user);
        } else {
            user = new UserModel({
                name: profile.displayName,
                email: profile.emails?.[0]?.value,
                isOAuthUser: true,
                oauthProvider: 'facebook',
                oauthId: profile.id,
                avatar: profile.photos?.[0]?.value,
                isAccountVerified: true,
                password: undefined
            });
            await user.save();
            return done(null, user);
        }
    } catch (error) {
        return done(error as Error, false);
    }
}));

passport.serializeUser((user: any, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
    try {
        const user = await UserModel.findById(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

export const googleAuth = passport.authenticate('google', { 
    scope: ['profile', 'email'] 
});

export const facebookAuth = passport.authenticate('facebook', { 
    scope: ['email'] 
});

export const githubAuth = passport.authenticate('github', { 
    scope: ['user:email', 'read:user'] 
});

export const googleCallback = (req: Request, res: Response) => {
    try {
        const user = req.user as any;
        
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET as string, {expiresIn: '7d'});

        res.cookie('priceCompareToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({
            success: true,
            message: "Google OAuth authentication successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                isOAuthUser: user.isOAuthUser,
                oauthProvider: user.oauthProvider
            }
        });
    } catch (error) {
        res.json({
            success: false,
            message: "Google OAuth authentication failed",
            error: (error as Error).message
        });
    }
};

export const facebookCallback = (req: Request, res: Response) => {
    try {
        const user = req.user as any;
        
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET as string, {expiresIn: '7d'});

        res.cookie('priceCompareToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({
            success: true,
            message: "Facebook OAuth authentication successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                isOAuthUser: user.isOAuthUser,
                oauthProvider: user.oauthProvider
            }
        });
    } catch (error) {
        res.json({
            success: false,
            message: "Facebook OAuth authentication failed",
            error: (error as Error).message
        });
    }
};

export const githubCallback = (req: Request, res: Response) => {
    try {
        const user = req.user as any;
        
        const token = jwt.sign({id: user._id}, process.env.JWT_SECRET as string, {expiresIn: '7d'});

        res.cookie('priceCompareToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict',
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.json({
            success: true,
            message: "GitHub OAuth authentication successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                avatar: user.avatar,
                isOAuthUser: user.isOAuthUser,
                oauthProvider: user.oauthProvider
            }
        });
    } catch (error) {
        res.json({
            success: false,
            message: "GitHub OAuth authentication failed",
            error: (error as Error).message
        });
    }
};