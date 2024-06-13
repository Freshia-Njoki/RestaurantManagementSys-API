import { Hono } from "hono";
import { listRestaurantOwners, getRestuarantOwner, createRestuarantOwner, updateRestuarantOwner, deleteRestuarantOwner, getMoreRestaurantOwnerInfo } from "./restaurant_owner.controller"
import { zValidator } from "@hono/zod-validator";
import { restuarantOwnerSchema } from "../validators";
import { adminRoleAuth } from "../middleware/bearAuth";
export const restuarantOwnerRouter = new Hono();

//get all RestuarantOwner     api/RestuarantOwner
restuarantOwnerRouter.get("/restuarantOwner", adminRoleAuth,listRestaurantOwners);
//get a single RestuarantOwner    api/RestuarantOwner/1
restuarantOwnerRouter.get("/restuarantOwner/:id",adminRoleAuth, getRestuarantOwner)
// create a RestuarantOwner 
restuarantOwnerRouter.post("/restuarantOwner",adminRoleAuth, zValidator('json', restuarantOwnerSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createRestuarantOwner)
//update a RestuarantOwner
restuarantOwnerRouter.put("/restuarantOwner/:id",adminRoleAuth, updateRestuarantOwner)

restuarantOwnerRouter.delete("/restuarantOwner/:id",adminRoleAuth, deleteRestuarantOwner)
restuarantOwnerRouter.get("/restuarantOwnerInfo",getMoreRestaurantOwnerInfo)

//https:domai.com/api/RestuarantOwner?limit=10