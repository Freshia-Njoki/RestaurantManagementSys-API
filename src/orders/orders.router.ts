import { Hono } from "hono";
import { listOrders, getOrder, createOrder, updateOrder, deleteOrder, getMoreOrderInfo} from "./orders.controller"
import { zValidator } from "@hono/zod-validator";
import { orderSchema } from "../validators";
import { adminRoleAuth,userRoleAuth, userOrAdminRoleAuth } from "../middleware/bearAuth";
export const ordersRouter = new Hono();

//get all Orders     api/Orders
ordersRouter.get("/orders",userOrAdminRoleAuth, listOrders);
//get a single Orders    api/Orders/1
ordersRouter.get("/orders/:id",adminRoleAuth, getOrder)
// create a Orders 
ordersRouter.post("/orders",userRoleAuth, zValidator('json', orderSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createOrder)
//update  Orders
ordersRouter.put("/orders/:id",userRoleAuth, updateOrder)

ordersRouter.delete("/orders/:id",userOrAdminRoleAuth, deleteOrder)
// ordersRouter.get("/filterOrderInfo/:id",filterOrderInfo)
ordersRouter.get("/OrderInfo",getMoreOrderInfo)

