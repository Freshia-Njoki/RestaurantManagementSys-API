import { Hono } from "hono";
import { listOrders, getOrder, createOrder, updateOrder, deleteOrder } from "./orders.controller"
import { zValidator } from "@hono/zod-validator";
import { orderSchema } from "../validators";
export const ordersRouter = new Hono();

//get all Orders     api/Orders
ordersRouter.get("/orders", listOrders);
//get a single Orders    api/Orders/1
ordersRouter.get("/orders/:id", getOrder)
// create a Orders 
ordersRouter.post("/orders", zValidator('json', orderSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createOrder)
//update a Orders
ordersRouter.put("/orders/:id", updateOrder)

ordersRouter.delete("/orders/:id", deleteOrder)

