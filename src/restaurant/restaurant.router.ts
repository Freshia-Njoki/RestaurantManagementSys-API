import { Hono } from "hono";
import { listRestaurants, getRestaurant, createRestaurant, updateRestaurant, deleteRestaurant } from "./restaurant.controller"
import { zValidator } from "@hono/zod-validator";
import { restaurantSchema } from "../validators";
export const restaurantRouter = new Hono();

//get all Restaurants      api/Restaurants
restaurantRouter.get("/restaurants", listRestaurants);
//get a single Restaurant    api/Restaurants/1
restaurantRouter.get("/restaurants/:id", getRestaurant)
// create a Restaurant 
restaurantRouter.post("/restaurants", zValidator('json', restaurantSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createRestaurant)
//update a Restaurant
restaurantRouter.put("/restaurants/:id", updateRestaurant)

restaurantRouter.delete("/restaurants/:id", deleteRestaurant)

