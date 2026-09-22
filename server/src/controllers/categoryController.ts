import { Request, Response, NextFunction } from 'express';

export const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ data: [], message: 'Categories retrieved successfully' });
  } catch (error) {
    next(error);
  }
};

export const createCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(201).json({ data: null, message: 'Category created successfully' });
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ data: null, message: 'Category retrieved successfully' });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ data: null, message: 'Category updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ data: null, message: 'Category deleted successfully' });
  } catch (error) {
    next(error);
  }
};
