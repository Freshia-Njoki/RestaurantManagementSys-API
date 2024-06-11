import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIDriver, TSDriver, DriversTable } from "../drizzle/schema";

export const driversService = async (limit?: number): Promise<TSDriver[] | null> => {
    if (limit) {
        return await db.query.DriversTable.findMany({
            limit: limit
        });
    }
    return await db.query.DriversTable.findMany();
}

export const getDriverService = async (id: number): Promise<TIDriver | undefined> => {
    return await db.query.DriversTable.findFirst({
        where: eq(DriversTable.id, id)
    })
}

export const createDriverService = async (Driver: TIDriver) => {
    await db.insert(DriversTable).values(Driver)
    return "Driver created successfully";
}

export const updateDriverService = async (id: number, Driver: TIDriver) => {
    await db.update(DriversTable).set(Driver).where(eq(DriversTable.id, id))
    return "Driver updated successfully";
}

export const deleteDriverService = async (id: number) => {
    await db.delete(DriversTable).where(eq(DriversTable.id, id))
    return "Driver deleted successfully";
}
