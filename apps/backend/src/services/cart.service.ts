import { Cart } from "../models/cart.js";
import { Products } from "../models/products.js";
import mongoose from "mongoose";

const populateCartProducts = {
    path: 'products.product',
    select: 'name price images stock isActive brand tags',

};

export const getCartByUserId = async (userId: string) => {
    
    const cart = await Cart.findOne({ user: userId}).populate(populateCartProducts);

    if(!cart) {
        return {
            user: userId,
            products: []
        };
    }

    return cart;
};

export const addProductToCart = async (userId: string, productId: string, quantity: number) => {

     if(!mongoose.Types.ObjectId.isValid(productId)){
        throw new Error('Invalid product ID');
    }

    if(!Number.isInteger(quantity) || quantity < 1) {
        throw new Error('Quantity must be at least 1');
    }

    const product = await Products.findById(productId);
    if(!product) {
        throw new Error('Product not found');
    }

    if(!product.isActive) {
        throw new Error('Product is not active');
    }


    let cart = await Cart.findOne({ user: userId });

    if(!cart) {
        cart = new Cart({
            user: userId,
            products: []
        });
    }

    const existingProductItem = cart.products.find(item => item.product.toString() === productId);

    const nextQuantity = existingProductItem ? existingProductItem.quantity + quantity : quantity;

    if(nextQuantity > product.stock) {
        throw new Error('Not enough stock available');
    }

    if(existingProductItem) {
        existingProductItem.quantity = nextQuantity;
    } else {
        cart.products.push({
            product: product._id,
            quantity
        });
    }

    await cart.save();

    return Cart.findById(cart._id).populate(populateCartProducts);
};

export const removeProductFromCart = async (userId: string, productId: string) => {

    if(!mongoose.Types.ObjectId.isValid(productId)){
        throw new Error('Invalid product ID');
    }

    const updatedCart = await Cart.findOneAndUpdate(
        {
            user: userId,
            'products.product': productId
        },

        {
            $pull: {
                products: { product: productId }
            }
        },

        {
            new: true
        }
    ).populate(populateCartProducts);

    if(!updatedCart) {
        throw new Error('Cart not found or product not in cart');
    }

    return updatedCart;

};

export const updateProductQuantityInCart = async (userId: string, productId: string, actions: 'increment' | 'decrement') => {

    if(!mongoose.Types.ObjectId.isValid(productId)){
        throw new Error('Invalid product ID');
    }

    const cart = await Cart.findOne({user: userId, 'products.product': productId});
    if(!cart) {
        throw new Error('Cart not found or product not in cart');
    }

    const productItem = cart.products.find(item => item.product.toString() === productId);
    if(!productItem) {
        throw new Error('Product not found in cart');
    }

    const currentQuantity = productItem.quantity ? productItem.quantity : 0;

    const newQuantity = actions === 'increment' ? currentQuantity + 1 : currentQuantity - 1;

    if(newQuantity < 1) {
        throw new Error('Quantity must be at least 1');
    }

    const product = await Products.findById(productId);
    if(!product) {
        throw new Error('Product not found');
    }

    if(!product.isActive) {
        throw new Error('Product is not active');
    }

    if(newQuantity > product.stock) {
        throw new Error(`Only ${product.stock} items available in stock`);
    }

    const updatedCart = await Cart.findOneAndUpdate(
        {
            user: userId,
            'products.product': productId
        },

        {
            $set: {

                'products.$.quantity': newQuantity
            
            }
        },

        {
            new: true,
            runValidators: true
        }
    ).populate(populateCartProducts);

    if(!updatedCart) {
        throw new Error('Failed to update cart');
    }

    return updatedCart;



}