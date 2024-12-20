import { IOrder } from "@/shared/interfaces/interfaces";
import { request } from "@/utils/api/request";
import { handlePromiseError } from "@/utils/functions/handlePromiseError";
import { OrderData } from "../Checkout";

interface CheckoutResponse {
  orderCreated: IOrder;
}
export class CheckoutService {
  static async createOrder(order: OrderData): Promise<CheckoutResponse> {
    try {
      const res = await request.post("order/createOrder", order);
      return res.data as CheckoutResponse;
    } catch (error) {
      return Promise.reject(handlePromiseError(error));
    }
  }
}
