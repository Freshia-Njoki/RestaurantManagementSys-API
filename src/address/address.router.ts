import { Hono } from "hono";
import { listAddresss, getAddress, createAddress, updateAddress, deleteAddress, addressInfo } from "./address.controller"
import { zValidator } from "@hono/zod-validator";
import { addressSchema } from "../validators";
import { adminRoleAuth, userRoleAuth,userOrAdminRoleAuth } from "../middleware/bearAuth";
export const addressRouter = new Hono();

//get all addresss      api/addresss
addressRouter.get("/address",adminRoleAuth,  listAddresss);
//get a single address    api/addresss/1
addressRouter.get("/address/:id",userRoleAuth, getAddress)
// create a address 
addressRouter.post("/address", adminRoleAuth, zValidator('json', addressSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createAddress)
//update a address
addressRouter.put("/address/:id",adminRoleAuth, updateAddress)

addressRouter.delete("/address/:id", adminRoleAuth,deleteAddress)
addressRouter.get("/addressinfo", userOrAdminRoleAuth, addressInfo)

//https:domai.com/api/addresss?limit=10