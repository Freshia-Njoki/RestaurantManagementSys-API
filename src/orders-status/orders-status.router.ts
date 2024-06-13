import { Hono } from "hono";
import { listOrderStatus, getOrderStatus, createOrderStatus, updateOrderStatus, deleteOrderStatus, getMoreOrderStatusInfo } from "./orders-status.controller"
import { zValidator } from "@hono/zod-validator";
import { orderStatusSchema } from "../validators";
import { adminRoleAuth,userRoleAuth, userOrAdminRoleAuth} from "../middleware/bearAuth";
export const orderStatusRouter = new Hono();

//get all OrderStatus     api/OrderStatus
orderStatusRouter.get("/orderStatus",adminRoleAuth, listOrderStatus);
//get a single OrderStatus    api/OrderStatus/1
orderStatusRouter.get("/orderStatus/:id",userOrAdminRoleAuth, getOrderStatus)
// create a OrderStatus 
orderStatusRouter.post("/orderStatus",adminRoleAuth, zValidator('json', orderStatusSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createOrderStatus)
//update a OrderStatus
orderStatusRouter.put("/orderStatus/:id",adminRoleAuth, updateOrderStatus)

orderStatusRouter.delete("/orderStatus/:id",adminRoleAuth, deleteOrderStatus)
orderStatusRouter.get("/orderStatusInfo",userOrAdminRoleAuth, getMoreOrderStatusInfo)

//https:domai.com/api/OrderStatus?limit=10