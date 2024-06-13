import { Hono } from "hono";
import { listOrderMenuItems, getOrderMenuItem, createOrderMenuItem, updateOrderMenuItem, deleteOrderMenuItem, getMenuOrdersInfo } from "./order_menu_item.controller"
import { zValidator } from "@hono/zod-validator";
import { orderMenuItemSchema } from "../validators";
import { adminRoleAuth,userRoleAuth, userOrAdminRoleAuth } from "../middleware/bearAuth";
export const orderMenuItemRouter = new Hono();

//get all OrderMenuItems      api/OrderMenuItems
orderMenuItemRouter.get("/orderMenuItems",userOrAdminRoleAuth, listOrderMenuItems);
//get a single OrderMenuItem    api/OrderMenuItems/1
orderMenuItemRouter.get("/orderMenuItems/:id",adminRoleAuth, getOrderMenuItem)
// create a OrderMenuItem 
orderMenuItemRouter.post("/orderMenuItems",userRoleAuth, zValidator('json', orderMenuItemSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createOrderMenuItem)
//update a OrderMenuItem
orderMenuItemRouter.put("/orderMenuItems/:id",userRoleAuth, updateOrderMenuItem)

orderMenuItemRouter.delete("/orderMenuItems/:id",userOrAdminRoleAuth, deleteOrderMenuItem)
orderMenuItemRouter.get("/menuOrdersInfo",getMenuOrdersInfo)

//https:domai.com/api/OrderMenuItems?limit=10