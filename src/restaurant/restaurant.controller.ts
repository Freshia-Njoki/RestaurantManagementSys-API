import { Context } from "hono";
import {
  restaurantService,
  getRestaurantService,
  getRestaurantsInfo,
  createRestaurantService,
  updateRestaurantService,
  deleteRestaurantService,
} from "./restaurant.services";

export const listRestaurants = async (c: Context) => {
  try {
    //limit the number of Restaurants to be returned

    const limit = Number(c.req.query("limit"));

    const data = await restaurantService(limit);
    if (data == null || data.length == 0) {
      return c.text("Restaurant not found", 404);
    }
    return c.json(data, 200);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

export const getRestaurant = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) return c.text("Invalid ID", 400);

  const Restaurant = await getRestaurantService(id);
  if (Restaurant == undefined) {
    return c.text("Restaurant not found", 404);
  }
  return c.json(Restaurant, 200);
};
export const createRestaurant = async (c: Context) => {
  try {
    const Restaurant = await c.req.json();
    const createdRestaurant = await createRestaurantService(Restaurant);

    if (!createdRestaurant) return c.text("Restaurant not created", 404);
    return c.json({ msg: createdRestaurant }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

export const updateRestaurant = async (c: Context) => {
  const id = parseInt(c.req.param("id"));
  if (isNaN(id)) return c.text("Invalid ID", 400);

  const Restaurant = await c.req.json();
  try {
    // search for the Restaurant
    const searchedRestaurant = await getRestaurantService(id);
    if (searchedRestaurant == undefined)
      return c.text("Restaurant not found", 404);
    // get the data and update it
    const res = await updateRestaurantService(id, Restaurant);
    // return a success message
    if (!res) return c.text("Restaurant not updated", 404);

    return c.json({ msg: res }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

export const deleteRestaurant = async (c: Context) => {
  const id = Number(c.req.param("id"));
  if (isNaN(id)) return c.text("Invalid ID", 400);

  try {
    //search for the Restaurant
    const Restaurant = await getRestaurantService(id);
    if (Restaurant == undefined) return c.text("Restaurant not found", 404);
    //deleting the Restaurant
    const res = await deleteRestaurantService(id);
    if (!res) return c.text("Restaurant not deleted", 404);

    return c.json({ msg: res }, 201);
  } catch (error: any) {
    return c.json({ error: error?.message }, 400);
  }
};

export const listRestaurantsInCity = async (c: Context) => {
  try {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Menu = await getRestaurantsInfo(id);
    if (Menu == undefined) {
        return c.text("Menu not found", 404);
    }
    return c.json(Menu, 200);
  } catch (error:any) {
    return c.json({error:error ?.message},400)
  }
};
