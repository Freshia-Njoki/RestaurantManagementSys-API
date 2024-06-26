import { Hono } from "hono";
import { listRestaurants, getRestaurant, createRestaurant, updateRestaurant, deleteRestaurant, RestaurantsInfo, getMoreRestaurantsInfo } from "./restaurant.controller"
import { zValidator } from "@hono/zod-validator";
import { restaurantSchema } from "../validators";
import { adminRoleAuth,userOrAdminRoleAuth } from "../middleware/bearAuth";
export const restaurantRouter = new Hono();

//get all Restaurants      api/Restaurants
restaurantRouter.get("/restaurants",userOrAdminRoleAuth,  listRestaurants);
//get a single Restaurant    api/Restaurants/1
restaurantRouter.get("/restaurants/:id",userOrAdminRoleAuth, getRestaurant)
// create a Restaurant 
restaurantRouter.post("/restaurants",adminRoleAuth, zValidator('json', restaurantSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createRestaurant)
//update a Restaurant
restaurantRouter.put("/restaurants/:id",adminRoleAuth, updateRestaurant)

restaurantRouter.delete("/restaurants/:id",adminRoleAuth, deleteRestaurant)
restaurantRouter.get("/getRestaurantsInfo/:id",userOrAdminRoleAuth, RestaurantsInfo)
restaurantRouter.get("/moreRestaurantsInfo",userOrAdminRoleAuth,  getMoreRestaurantsInfo)

