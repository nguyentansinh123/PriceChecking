import { Request, Response, NextFunction } from 'express';

interface UserRoleModel extends Request{
    user?: {
        role: string
    }
}

export const authorizeRoles= (...allowedRoles: string[])=>{
    return (req: UserRoleModel, res: Response, next: NextFunction): void =>{
        if (!req.user || !allowedRoles.includes(req.user.role)){
            res.status(403).json({ message: `Access denied, you are not ${allowedRoles}` });
            return;
        }
        next()
    }
}