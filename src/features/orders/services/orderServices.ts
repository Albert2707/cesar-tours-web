import { request } from "../../../utils/api/request";

export class OrderServices {
    static async getOrders(filter:string, skip:number, limit:number): Promise<any> {
        try {
            const response = await request.get("order/getOrders",{params:{status:filter,skip,limit}});
            return response.data;
        } catch (error) {
            console.error("Error getting orders:", error);
            throw error;
        }
    }
}