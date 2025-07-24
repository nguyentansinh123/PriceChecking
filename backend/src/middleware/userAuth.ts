import { NextFunction, Request, Response } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'
import '../globalType'

interface DecodedToken extends JwtPayload {
    id: string;
}

export const userAuth = async (req: Request, res: Response, next: NextFunction)=>{
    const token = req.cookies.priceCompareToken

    if (!token) {
        return res.json({success: false, message: "Not Authorized Try to Login Again"})
    }
    try {
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;
        req.currentUserId = tokenDecode.id;
        next();
    } catch (error) {
        return res.json({success: false, message: "Token verification failed"})
    }
}