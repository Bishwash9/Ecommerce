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
        console.log('Authenticating request...');
        const authHeader = req.headers.authorization;

        if(!authHeader || !authHeader.startsWith('Bearer')){
            return res.status(401).json({
                message: 'Unauthorized'
            });
        };

        const token = authHeader.split(' ')[1];
        if(!token) {
            return res.status(401).json({ message: 'Unauthorized' });
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