import { Hono } from "hono";
import { listRestaurantOwners, getRestuarantOwner, createRestuarantOwner, updateRestuarantOwner, deleteRestuarantOwner } from "./restaurant_owner.controller"
import { zValidator } from "@hono/zod-validator";
import { restuarantOwnerSchema } from "../validators";
export const restuarantOwnerRouter = new Hono();

//get all RestuarantOwner     api/RestuarantOwner
restuarantOwnerRouter.get("/restuarantOwner", listRestaurantOwners);
//get a single RestuarantOwner    api/RestuarantOwner/1
restuarantOwnerRouter.get("/restuarantOwner/:id", getRestuarantOwner)
// create a RestuarantOwner 
restuarantOwnerRouter.post("/restuarantOwner", zValidator('json', restuarantOwnerSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createRestuarantOwner)
//update a RestuarantOwner
restuarantOwnerRouter.put("/restuarantOwner/:id", updateRestuarantOwner)

restuarantOwnerRouter.delete("/restuarantOwner/:id", deleteRestuarantOwner)

//https:domai.com/api/RestuarantOwner?limit=10