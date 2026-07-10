import type { Request, Response } from 'express';
import * as categoryService from '../services/category.service.js';



export const createCategory = async (req: Request, res: Response) => {
    try {
        const category = await categoryService.createCategory(req.body.name);

        res.status(201).json({
            success: true,
            data: category
        });
    }catch(error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : 'Something went wrong'
        });
    }
};

export const editCategory = async (req: Request, res: Response) => {
    try {
        const {id} = req.params as {id: string};
        if(!id) {
            return res.status(400).json({
                message: 'Category ID is required'
            });
        }
        const category = await categoryService.editCategory(id, req.body.name);

        res.status(200).json({
            success: true,
            data: category
        });
    }catch(error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : 'Something went wrong'
        });
    }
};

export const deleteCategory = async (req: Request, res: Response) => {
    try {
        const {id} = req.params as {id: string};
        if(!id) {
            return res.status(400).json({
                message: 'Category ID is required'
            });
        }
        const result = await categoryService.deleteCategory(id);

        res.status(200).json({
            success: true,
            data: result
        });
    }catch(error) {
        res.status(400).json({
            message: error instanceof Error ? error.message : 'Something went wrong'
        });
    }
};