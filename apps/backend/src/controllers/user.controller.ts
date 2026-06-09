import type { Request, Response } from 'express';
import * as userService from '../services/user.service.js';

export const registerUser = async (req: Request, res: Response) => {

    try {
        const user = await userService.registerUser(req.body);

        res.status(201).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : 'Something went wrong'
        });
    }
};

export const loginUser = async (req: Request, res: Response) => {

    try{
        const user = await userService.loginUser(req.body);

        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : 'Something went wrong'
        });
    }
};