import { Context } from "hono";
import { driversService, getDriverService, createDriverService, updateDriverService, deleteDriverService, getMoreDriverInfoService } from "./driver.service";

export const listDrivers = async (c: Context) => {
    try {
        //limit the number of Drivers to be returned

        const limit = Number(c.req.query('limit'))

        const data = await driversService(limit);
        if (data == null || data.length == 0) {
            return c.text("Driver not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getDriver = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Driver = await getDriverService(id);
    if (Driver == undefined) {
        return c.text("Driver not found", 404);
    }
    return c.json(Driver, 200);
}
export const createDriver = async (c: Context) => {
    try {
        const Driver = await c.req.json();
        const createdDriver = await createDriverService(Driver);


        if (!createdDriver) return c.text("Driver not created", 404);
        return c.json({ msg: createdDriver }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateDriver = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Driver = await c.req.json();
    try {
        // search for the Driver
        const searchedDriver = await getDriverService(id);
        if (searchedDriver == undefined) return c.text("Driver not found", 404);
        // get the data and update it
        const res = await updateDriverService(id, Driver);
        // return a success message
        if (!res) return c.text("Driver not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteDriver = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the Driver
        const Driver = await getDriverService(id);
        if (Driver == undefined) return c.text("Driver not found", 404);
        //deleting the Driver
        const res = await deleteDriverService(id);
        if (!res) return c.text("Driver not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getMoreDriverInfo = async(c:Context) => {

    const driversInfo = await getMoreDriverInfoService();
    if (driversInfo == undefined) {
        return c.text("driversInfo not found", 404);
    }
    return c.json(driversInfo, 200);
}