import { Hono } from "hono";
import { listOrderMenuItems, getOrderMenuItem, createOrderMenuItem, updateOrderMenuItem, deleteOrderMenuItem } from "./order_menu_item.controller"
import { zValidator } from "@hono/zod-validator";
import { orderMenuItemSchema } from "../validators";
export const orderMenuItemRouter = new Hono();

//get all OrderMenuItems      api/OrderMenuItems
orderMenuItemRouter.get("/orderMenuItems", listOrderMenuItems);
//get a single OrderMenuItem    api/OrderMenuItems/1
orderMenuItemRouter.get("/orderMenuItems/:id", getOrderMenuItem)
// create a OrderMenuItem 
orderMenuItemRouter.post("/orderMenuItems", zValidator('json', orderMenuItemSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createOrderMenuItem)
//update a OrderMenuItem
orderMenuItemRouter.put("/orderMenuItems/:id", updateOrderMenuItem)

orderMenuItemRouter.delete("/orderMenuItems/:id", deleteOrderMenuItem)

//https:domai.com/api/OrderMenuItems?limit=10