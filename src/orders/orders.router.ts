import { Hono } from "hono";
import { listOrders, getOrder, createOrder, updateOrder, deleteOrder, filterOrderInfo } from "./orders.controller"
import { zValidator } from "@hono/zod-validator";
import { orderSchema } from "../validators";
import { adminRoleAuth,userRoleAuth } from "../middleware/bearAuth";
export const ordersRouter = new Hono();

//get all Orders     api/Orders
ordersRouter.get("/orders",adminRoleAuth, listOrders);
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

ordersRouter.delete("/orders/:id",userRoleAuth, deleteOrder)
ordersRouter.get("/filterOrderInfo/:id",filterOrderInfo)

