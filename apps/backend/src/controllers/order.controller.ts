import type {Request, Response} from 'express';
import * as orderService from '../services/order.service.js';
import type { AuthenticatedRequest } from '../middlewares/auth.middleware.js';

export const getAllOrders = async (req: Request, res: Response) => {
    try {
        const orders = await orderService.getAllOrders();
        res.status(200).json({
            success: true,
            data: orders
        });
    } catch(error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : 'Failed to fetch orders'
        })
    }
};

export const getSpecificOrder = async (req: Request, res: Response) => {
    try {
        const { orderId } = req.params as { orderId: string };
        if(!orderId) {
            return res.status(400).json({
                message: 'Order ID is required'
            });
        }

        const order = await orderService.getSpecificOrder(orderId);
        res.status(200).json({
            success: true,
            data: order
        });
    } catch(error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : 'Failed to fetch order'
        })
    }
};

export const createOrder = async (req: Request, res: Response) => {
    try {
        const userId = (req as AuthenticatedRequest).user.id;
        const { products } = req.body as { products: { productId: string; quantity: number }[] };

        if(!products || !Array.isArray(products) || products.length === 0) {
            return res.status(400).json({
                message: 'Products are required'
            });
        }

        const newOrder = await orderService.createOrder(userId, products);
        res.status(201).json({
            success: true,
            data: newOrder
        });
    } catch(error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : 'Failed to create order'
        })
    }
}