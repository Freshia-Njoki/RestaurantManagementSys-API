import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {TIRestaurant,TSRestaurant, RestaurantsTable } from "../drizzle/schema";

export const restaurantService = async (limit?: number): Promise<TSRestaurant[] | null> => {
    if (limit) {
        return await db.query.RestaurantsTable.findMany({
            limit: limit
        });
    }
    return await db.query.RestaurantsTable.findMany();
}

export const getRestaurantService = async (id: number): Promise<TIRestaurant | undefined> => {
    return await db.query.RestaurantsTable.findFirst({
        where: eq(RestaurantsTable.id, id)
    })
}

export const createRestaurantService = async (Restaurant: TIRestaurant) => {
    await db.insert(RestaurantsTable).values(Restaurant)
    return "Restaurant created successfully";
}

export const updateRestaurantService = async (id: number, Restaurant: TIRestaurant) => {
    await db.update(RestaurantsTable).set(Restaurant).where(eq(RestaurantsTable.id, id))
    return "Restaurant updated successfully";
}

export const deleteRestaurantService = async (id: number) => {
    await db.delete(RestaurantsTable).where(eq(RestaurantsTable.id, id))
    return "Restaurant deleted successfully";
}


//extending functionality beyond CRUD operations 
// Fetch all restaurants in a specific city
export const getRestaurantsInCityService = async (cityId: number): Promise<TSRestaurant[] | null> => {
    return await db.query.RestaurantsTable.findMany({
        where: eq(RestaurantsTable.city_id, cityId)
    });
};
