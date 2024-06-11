import { Hono } from "hono";
import { listmenuItem, getMenu, createMenu, updateMenu, deleteMenu } from "./menu_item.controller"
import { zValidator } from "@hono/zod-validator";
import { menuItemSchema } from "../validators";
export const menuRouter = new Hono();

//get all menuItem      api/menuItem
menuRouter.get("/menuItem", listmenuItem);
//get a single Menu    api/menuItem/1
menuRouter.get("/menuItem/:id", getMenu)
// create a Menu 
menuRouter.post("/menuItem", zValidator('json', menuItemSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createMenu)
//update a Menu
menuRouter.put("/menuItem/:id", updateMenu)

menuRouter.delete("/menuItem/:id", deleteMenu)

//https:domai.com/api/menuItem?limit=10