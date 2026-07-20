import { Category } from '../models/category.js';

export const createCategory = async (name: string) => {
    
    const existingCategory = await Category.findOne({name});
    if(existingCategory){
        throw new Error('Category already exists');
    }

    const newCategory = new Category({
        name
    });

    await newCategory.save();

    return {
        id: newCategory._id,
        name: newCategory.name
    };
};

export const editCategory = async (id: string, name: string) => {
    
    const categoryToEdit = await Category.findById(id);
    if(!categoryToEdit){
        throw new Error('Category not found');
    }

    categoryToEdit.name = name;
    await categoryToEdit.save();

    return {
        id: categoryToEdit._id,
        name: categoryToEdit.name
    };
};

export const deleteCategory = async (id: string) => {

    const categoryToDelete = await Category.findById(id);
    if(!categoryToDelete){
        throw new Error('Category not found');
    }

    await categoryToDelete.deleteOne();

    return {
        message: 'Category deleted successfully'
    };
};

export const fetchCategories = async () => {
    const categories = await Category.find({});

    return categories.map(category => ({
        id: category._id,
        name: category.name,
        createdAt: category.createdAt,
        updatedAt: category.updatedAt
    }));
}
