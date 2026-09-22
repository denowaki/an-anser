import { Request, Response, NextFunction } from 'express';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ data: [], message: 'Products retrieved successfully' });
  } catch (error) {
    next(error);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(201).json({ data: null, message: 'Product created successfully' });
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ data: null, message: 'Product retrieved successfully' });
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ data: null, message: 'Product updated successfully' });
  } catch (error) {
    next(error);
  }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ data: null, message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};
