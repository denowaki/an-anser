export class OrderService {
  async getAllOrders() {
    return [];
  }

  async getOrderById(id: string) {
    return null;
  }

  async createOrder(data: unknown) {
    return null;
  }

  async updateOrder(id: string, data: unknown) {
    return null;
  }

  async deleteOrder(id: string) {
    return true;
  }
}

export const orderService = new OrderService();
