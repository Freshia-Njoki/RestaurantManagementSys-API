import { Hono } from "hono";
import { listCities, getCity, createCity, updateCity, deleteCity } from "./city.controller"
import { zValidator } from "@hono/zod-validator";
import { citySchema } from "../validators";
export const cityRouter = new Hono();

//get all city      api/city
cityRouter.get("/city", listCities);
//get a single City    api/city/1
cityRouter.get("/city/:id", getCity)
// create a City 
cityRouter.post("/city", zValidator('json', citySchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createCity)
//update a City
cityRouter.put("/city/:id", updateCity)

cityRouter.delete("/city/:id", deleteCity)

//https:domain.com/api/city?limit=10