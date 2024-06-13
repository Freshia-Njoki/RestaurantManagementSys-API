
import { Context } from "hono";
import { restuarantOwnersService, getRestuarantOwnerService, createRestuarantOwnerService, updateRestuarantOwnerService, deleteRestuarantOwnerService, getMoreRestaurantOwnerInfoService } from "./restaurant_owner.services";

export const listRestaurantOwners = async (c: Context) => {
    try {
        //limit the number of RestuarantOwners to be returned

        const limit = Number(c.req.query('limit'))

        const data = await restuarantOwnersService(limit);
        if (data == null || data.length == 0) {
            return c.text("RestuarantOwner not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getRestuarantOwner = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const RestuarantOwner = await getRestuarantOwnerService(id);
    if (RestuarantOwner == undefined) {
        return c.text("RestuarantOwner not found", 404);
    }
    return c.json(RestuarantOwner, 200);
}
export const createRestuarantOwner = async (c: Context) => {
    try {
        const RestuarantOwner = await c.req.json();
        const createdRestuarantOwner = await createRestuarantOwnerService(RestuarantOwner);


        if (!createdRestuarantOwner) return c.text("RestuarantOwner not created", 404);
        return c.json({ msg: createdRestuarantOwner }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateRestuarantOwner = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const RestuarantOwner = await c.req.json();
    try {
        // search for the RestuarantOwner
        const searchedRestuarantOwner = await getRestuarantOwnerService(id);
        if (searchedRestuarantOwner == undefined) return c.text("RestuarantOwner not found", 404);
        // get the data and update it
        const res = await updateRestuarantOwnerService(id, RestuarantOwner);
        // return a success message
        if (!res) return c.text("RestuarantOwner not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteRestuarantOwner = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the RestuarantOwner
        const RestuarantOwner = await getRestuarantOwnerService(id);
        if (RestuarantOwner == undefined) return c.text("RestuarantOwner not found", 404);
        //deleting the RestuarantOwner
        const res = await deleteRestuarantOwnerService(id);
        if (!res) return c.text("RestuarantOwner not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getMoreRestaurantOwnerInfo = async(c:Context) => {

    const restaurantOwnerInfo = await getMoreRestaurantOwnerInfoService();
    if (restaurantOwnerInfo == undefined) {
        return c.text("restaurantOwnerInfo not found", 404);
    }
    return c.json(restaurantOwnerInfo, 200);
}