import { request } from "../../../../utils/api/request";

export class CheckoutService {
  static async createOrder(order: any): Promise<any> {
    try {
      const res = await request.post("order/createOrder", order);
      return res;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
