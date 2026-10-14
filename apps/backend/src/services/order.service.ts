import { Order } from  "../models/orders.js" 
import { Products } from "../models/products.js";
import type { Types } from "mongoose";
import { isObjectIdOrHexString } from "mongoose";
interface PopulatedOrderProduct {
    _id: Types.ObjectId;
    name: string;
    images: string[];
    brand: string;
}

interface PopulatedOrderItem {
    product: PopulatedOrderProduct| null;
    quantity: number;
    price: number;
}

interface PopulatedOrderUser {
    _id: Types.ObjectId;
    name: string;
    email: string;
}

export const getAllOrders = async () => {
    const orders = await Order.find({}).populate<{
        user: PopulatedOrderUser;
    }>({
        path: 'user',
        select: 'name email'
    }).populate<{
        products: PopulatedOrderItem[];
    }>({
        path: 'products.product',
        select: 'name images brand'
    }).sort({ createdAt: -1 });

    return orders.map(order => ({
        id: order._id,
        user: order.user.name || 'Unknown User',
        status: order.status,
        totalItems: order.products.reduce((total, item) => total + item.quantity, 0),
        totalAmount: order.products.reduce((total, item) => total + (item.price * item.quantity), 0),
        createdAt: order.createdAt,
    }))
};

export const getSpecificOrder = async (orderId: string) => {
    if(!isObjectIdOrHexString(orderId)){
        throw new Error('Invalid order ID');
    }

    const order = await Order.findById(orderId).populate<{
        user: PopulatedOrderUser;
    }>({
        path: 'user',
        select: 'name email'
    }).populate<{
        products: PopulatedOrderItem[];
    }>({
        path: 'products.product',
        select: 'name images brand'
    }).sort({ createdAt: -1 });
   
    return {
        id: order?._id,
        status: order?.status,
        user: order?.user?.name || 'Unknown User',
        email: order?.user?.email || 'Unknown Email',
        products: order?.products.map((item) => ({
            productId: item.product?._id,
            name: item.product?.name || 'Unknown Product',
            images: item.product?.images || [],
            brand: item.product?.brand || 'Unknown Brand',
            quantity: item.quantity,
        })),
        totalAmount: order?.products.reduce((total, item) => total + (item.price * item.quantity), 0) || 0,
        createdAt: order?.createdAt,
    }
    
};

export const createOrder = async (userId: string, products: { productId: string; quantity: number, } []) => {
    
    const orderItems = [];

    for(const item of products) {
        const product = await Products.findById(item.productId);

        if(!product){
            throw new Error('Product not found');
        }

        if(!product.isActive){
            throw new Error('Product is not active');
        }

        if(item.quantity > product.stock){
            throw new Error(`Not enough stock for product ${product.name}`);
        }

        orderItems.push({
            product: product._id,
            quantity: item.quantity,
            price: product.price
        });
    }

    const newOrder = new Order({
        user: userId,
        products: orderItems

       
    })
     await newOrder.save();

     return {
        id: newOrder._id,
        user: newOrder.user,
        products: newOrder.products,
        status: newOrder.status,
        createdAt: newOrder.createdAt
     }
} 