import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"
import { config } from "../config";
import { User } from "../modules/auth/user.model";

interface AuthRequest extends Request {
    user?: any
}

export const auth = async(req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if(!token) {
            res.status(401).json({message: "Authentication token is required"});
            return;
        }

        const decoded = jwt.verify(token as string, config.jwt_secret as string) as {userId: string; role: string};
        const user = await User.findById(decoded.userId);
        if(!user) {
            res.status(401).json({message: "Invalid autheticate token"});
            return;
        }
        req.user = {
            _id: user._id,
            role: user.role
        }

        next()
        
    } catch (error) {
        res.status(401).json({message: 'Authentication failed!'})
    }
}


export const adminOnly = (req: AuthRequest, res: Response, next: NextFunction) => {
    if(req.user?.role !== 'admin') {
        res.status(403).json({message: "Access denied. Admin privileges required."})
    }

    next()
}