export class ProductService {
  async getAllProducts() {
    return [];
  }

  async getProductById(id: string) {
    return null;
  }

  async createProduct(data: unknown) {
    return null;
  }

  async updateProduct(id: string, data: unknown) {
    return null;
  }

  async deleteProduct(id: string) {
    return true;
  }
}

export const productService = new ProductService();
