export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
  category: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  currency?: string;
  images?: string[];
  category: string;
  stock?: number;
}

export interface UpdateProductInput {
  name?: string;
  description?: string;
  price?: number;
  currency?: string;
  images?: string[];
  category?: string;
  stock?: number;
}
