import { Hono } from "hono";
import { listAddresss, getAddress, createAddress, updateAddress, deleteAddress } from "./address.controller"
import { zValidator } from "@hono/zod-validator";
import { addressSchema } from "../validators";
export const addressRouter = new Hono();

//get all addresss      api/addresss
addressRouter.get("/address", listAddresss);
//get a single address    api/addresss/1
addressRouter.get("/address/:id", getAddress)
// create a address 
addressRouter.post("/address", zValidator('json', addressSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createAddress)
//update a address
addressRouter.put("/address/:id", updateAddress)

addressRouter.delete("/address/:id", deleteAddress)

//https:domai.com/api/addresss?limit=10