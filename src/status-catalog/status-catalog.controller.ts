
import { Context } from "hono";
import { StatusCatalogsService, getStatusCatalogService, createStatusCatalogService, updateStatusCatalogService, deleteStatusCatalogService, getMoreStatusCatalogInfoService } from "./status-catalog.service";

export const listStatusCatalogs = async (c: Context) => {
    try {
        //limit the number of StatusCatalogs to be returned

        const limit = Number(c.req.query('limit'))

        const data = await StatusCatalogsService(limit);
        if (data == null || data.length == 0) {
            return c.text("StatusCatalog not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getStatusCatalog = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const StatusCatalog = await getStatusCatalogService(id);
    if (StatusCatalog == undefined) {
        return c.text("StatusCatalog not found", 404);
    }
    return c.json(StatusCatalog, 200);
}
export const createStatusCatalog = async (c: Context) => {
    try {
        const StatusCatalog = await c.req.json();
        const createdStatusCatalog = await createStatusCatalogService(StatusCatalog);


        if (!createdStatusCatalog) return c.text("StatusCatalog not created", 404);
        return c.json({ msg: createdStatusCatalog }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateStatusCatalog = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const StatusCatalog = await c.req.json();
    try {
        // search for the StatusCatalog
        const searchedStatusCatalog = await getStatusCatalogService(id);
        if (searchedStatusCatalog == undefined) return c.text("StatusCatalog not found", 404);
        // get the data and update it
        const res = await updateStatusCatalogService(id, StatusCatalog);
        // return a success message
        if (!res) return c.text("StatusCatalog not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteStatusCatalog = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the StatusCatalog
        const StatusCatalog = await getStatusCatalogService(id);
        if (StatusCatalog == undefined) return c.text("StatusCatalog not found", 404);
        //deleting the StatusCatalog
        const res = await deleteStatusCatalogService(id);
        if (!res) return c.text("StatusCatalog not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getMoreStatusCatalogInfo = async(c:Context) => {

    const statusCatalogInfo = await getMoreStatusCatalogInfoService();
    if (statusCatalogInfo == undefined) {
        return c.text("statusCatalogInfo not found", 404);
    }
    return c.json(statusCatalogInfo, 200);
}