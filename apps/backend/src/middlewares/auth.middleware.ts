import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

export interface AuthenticatedRequest extends Request {
    user : {
        id: string;
        role: string;
    }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;

        const bearerToken = authHeader?.startsWith('Bearer') ? authHeader.split(' ')[1] : undefined;

        if(!authHeader || !authHeader.startsWith('Bearer')){
            return res.status(401).json({
                message: 'No Header or Invalid Authorization header provided'
            });
        };

        //as admin is using header and cookie supports web-users
        const token = bearerToken || req.cookies.accessToken;

        if(!token) {
            return res.status(401).json({
                message: 'No token. Authentication required'
            });
        }

        // ensure secret is available
        const secret = process.env.JWT_ACCESS_KEY;
        if (!secret) {
            return res.status(500).json({ message: 'Server configuration error' });
        }

        // decode access token using access token secret key
        const decoded = jwt.verify(token, secret) as unknown as { id: string; role: string };

        //attach user info to request object
        (req as AuthenticatedRequest).user = {
            id: decoded.id,
            role: decoded.role
        };
        
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
}

export const authorizeAdmin = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const user = ( req as AuthenticatedRequest).user;

    if(user.role !== 'admin'){
        return res.status(403).json({
            message: 'Forbidden: Admins only'
        });
    }
    next();
};