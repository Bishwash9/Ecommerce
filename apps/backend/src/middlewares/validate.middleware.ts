import type { Request, Response, NextFunction } from 'express';
import type { ZodSchema } from 'zod';
import { ZodError } from 'zod';

export const validate = (schema: ZodSchema) => {

    return (
        req: Request,
        res: Response,
        next: NextFunction
    ) => {

        try {
            
            req.body = schema.parse(req.body);
            next();
        }catch(error){
            if(error instanceof ZodError) {
                return res.status(400).json({
                    success: false,
                    errors: error.issues,
                });
            }
        }
    };
};