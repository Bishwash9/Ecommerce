import type { Request, Response } from 'express';
import * as cartService from '../services/cart.service.js';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware.js';

export const getMyCart = async (req: Request, res: Response) => {

    try {
        const userId = (req as AuthenticatedRequest).user.id;

        const cart = await cartService.getCartByUserId(userId);

        res.status(200).json({
            success: true,
            data: cart
        });
    } catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : 'Failed to fetch cart'
        });
    }

};

export const addToCart = async (req: Request, res: Response) => {

    try {
        const userId = (req as AuthenticatedRequest).user.id;

        const { productId, quantity = 1 } = req.body;

        if(!productId) {
            return res.status(400).json({
                message: 'Product ID is required'
            });
        }

        const cart = await cartService.addProductToCart(userId, productId, quantity);

        res.status(200).json({
            success: true,
            data: cart
        });

        
    } catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : 'Failed to add product to cart'
        });
    }
};

export const removeFromCart  = async (req: Request, res: Response) => {

    try {
        const userId = (req as AuthenticatedRequest).user.id;

        const { productId } = req.params as { productId: string };

        const cart = await cartService.removeProductFromCart(userId, productId);

        res.status(200).json({
            success: true,
            data: cart
        });
    } catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : 'Failed to remove product from cart'
        });
    }
};

export const updateCartProductQuantity = async (req: Request, res: Response) => {

    try {
        const userId = (req as AuthenticatedRequest).user.id;

        const { productId } = req.params as { productId: string };
        const { action } = req.body as { action: 'increment' | 'decrement' };

        if(!productId) {
            return res.status(400).json({
                message: 'Product ID is required'
            });
        }

        if(!action || (action !== 'increment' && action !== 'decrement')) {
            return res.status(400).json({
                message: 'Action must be either "increment" or "decrement"'
            });
        }

        const cart = await cartService.updateProductQuantityInCart(userId, productId, action);

        res.status(200).json({
            success: true,
            data: cart
        });

    } catch (error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : 'Failed to update product quantity in cart'
        });
    }


};