import type { Request, Response } from 'express';
import * as userService from '../services/user.service.js';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware.js';

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
        const result = await userService.loginUser(req.body);


       //set the cookie inside secure http only cookie
       res.cookie('refreshToken', result.refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production', //encrypted only in production
            sameSite: 'lax', //prevents CSRF attacks
            maxAge: 7 * 24 * 60 * 60 * 1000 //7 days
       });

       //setting accesstoken cookie for my user side
       res.cookie('accessToken', result.accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 15 * 60 * 1000 //15 minutes
       })

       //return only the user details and short lived acces token
       res.status(200).json({
         success: true,
            data: {
                user: result.user,
                accessToken: result.accessToken
            }
       });

      
    } catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : 'Something went wrong'
        });
    }
};

export const refreshSession = async (req: Request, res: Response) => {
    try{

    
    //retreive cookie using parser
    const incomingRefreshToken = req.cookies.refreshToken;

    if(!incomingRefreshToken) {
        return res.status(401).json({ message: 'Refresh token not found' });
    }

    //call service function to refresh access token
    const {accessToken, refreshToken} = await userService.refreshAccessToken(incomingRefreshToken);

    //rortate the cookie with new refresh token
    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', //encrypted only in production
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 //7 days
    });
    

    //return new accessToken
    res.status(200).json({
        success: true,
        data: { accessToken }
    });

    }catch (error) {
        res.status(401).json({
            message: error instanceof Error ? error.message: 'Failed to refresh token'
        });
    }
};

export const logoutUser = async (req: Request, res: Response) => {
    const incomingRefreshToken = req.cookies.refreshToken;
    
    
    if(!incomingRefreshToken) {
        return res.status(401).json({ message: 'Refresh token not found' });
    }

    try {
        const { id } = (req as AuthenticatedRequest).user;   //get user id from request body
        await userService.logoutUser(incomingRefreshToken, id);

        //clear the cookie
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict'
        });

        res.status(200).json({
            success: true,
            message: 'Logged out successfully'
        });
    }catch(error){
        res.status(400).json({
            message: error instanceof Error ? error.message : 'Failed to logout'
        });
    }

   
}

