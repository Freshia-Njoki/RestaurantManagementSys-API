import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {TSRestaurantOwner,TIRestaurantOwner, RestaurantOwnerTable } from "../drizzle/schema";

export const restuarantOwnersService = async (limit?: number): Promise<TSRestaurantOwner[] | null> => {
    if (limit) {
        return await db.query.RestaurantOwnerTable.findMany({
            limit: limit
        });
    }
    return await db.query.RestaurantOwnerTable.findMany();
}

export const getRestuarantOwnerService = async (id: number): Promise<TIRestaurantOwner | undefined> => {
    return await db.query.RestaurantOwnerTable.findFirst({
        where: eq(RestaurantOwnerTable.id, id)
    })
}

export const createRestuarantOwnerService = async (RestuarantOwner: TIRestaurantOwner) => {
    await db.insert(RestaurantOwnerTable).values(RestuarantOwner)
    return "RestuarantOwner created successfully";
}

export const updateRestuarantOwnerService = async (id: number, RestuarantOwner: TIRestaurantOwner) => {
    await db.update(RestaurantOwnerTable).set(RestuarantOwner).where(eq(RestaurantOwnerTable.id, id))
    return "RestuarantOwner updated successfully";
}

export const deleteRestuarantOwnerService = async (id: number) => {
    await db.delete(RestaurantOwnerTable).where(eq(RestaurantOwnerTable.id, id))
    return "RestuarantOwner deleted successfully";
}
