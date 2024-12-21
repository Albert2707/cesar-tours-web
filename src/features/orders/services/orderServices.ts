import { IOrder } from "@/shared/interfaces/interfaces";
import { request } from "@/utils/api/request";

interface OrdeResponse {
    order:IOrder
    hasNextPage:boolean
    totalPages:number
}
export class OrderServices {
    static async getOrders(filter:string, skip:number, limit:number,reservation_num:string): Promise<OrdeResponse> {
        try {
            const response = await request.get("order/getOrders",{params:{status:filter,skip,limit,reservation_num}});
            return response.data;
        } catch (error) {
            console.error("Error getting orders:", error);
            throw error;
        }
    }
}