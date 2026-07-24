import type { Request, Response } from 'express';
import * as productService from '../services/product.service.js';

export const getAllProducts = async (req: Request, res: Response) => {
    try {
         const getProducts = await productService.getAllProducts();
         res.status(200).json({
            success: true,
            data: getProducts
         });
    }catch(error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : 'Failed to fetch products'
        });
    }
};

export const getProductById = async (req: Request, res: Response) => {
    try {
        const {id} = req.params as {id: string};
        if(!id) {
            return res.status(400).json({
                message: 'Product ID is required'
            });
        }
        const uniqueProduct = await productService.getProductById(id);
        res.status(200).json({
            success: true,
            data: uniqueProduct
        });
    }catch(error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : 'Failed to fetch product'
        });
    }
};

export const createProduct = async (req: Request, res: Response) => {
    try {
        const newProduct = await productService.createProduct(
            req.body.name,
            req.body.description,
            req.body.price,
            req.body.category,
            req.body.stock,
            req.body.images,
            req.body.isActive
        );

        res.status(201).json({
            success: true,
            data: newProduct
        });
    }catch(error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : 'Failed to create product'
        });
    }
};

export const editProduct = async (req: Request, res: Response) => {
    try {
        const {id} = req.params as {id: string};
        if(!id) {
            return res.status(400).json({
                message: 'Product ID is required'
            });
        }
        const updatedProduct = await productService.editProduct(
            id,
            req.body.name,
            req.body.description,
            req.body.price,
            req.body.stock,
            req.body.images,
            req.body.isActive
        );

        res.status(200).json({
            success: true,
            data: updatedProduct
        });
    }catch(error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : 'Failed to update product'
        });
    }
};

export const deleteProduct = async (req: Request, res: Response) => {
    try {
        const {id} = req.params as {id: string};
        if(!id) {
            return res.status(400).json({
                message: 'Product ID is required'
            });
        }
        const result = await productService.deleteProduct(id);

        res.status(200).json({
            success: true,
            data: result
        });
    }catch(error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : 'Failed to delete product'
        });
    }
};