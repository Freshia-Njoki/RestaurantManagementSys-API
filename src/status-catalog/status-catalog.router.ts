import { Hono } from "hono";
import { listStatusCatalogs, getStatusCatalog, createStatusCatalog, updateStatusCatalog, deleteStatusCatalog } from "./status-catalog.controller"
import { zValidator } from "@hono/zod-validator";
import { statusCatalogSchema } from "../validators";
import { adminRoleAuth } from "../middleware/bearAuth";
export const statusCatalogRouter = new Hono();

//get all StatusCatalog     api/StatusCatalog
statusCatalogRouter.get("/statusCatalog", adminRoleAuth, listStatusCatalogs);
//get a single StatusCatalog    api/StatusCatalog/1
statusCatalogRouter.get("/statusCatalog/:id", getStatusCatalog)
// create a StatusCatalog 
statusCatalogRouter.post("/statusCatalog",adminRoleAuth, zValidator('json', statusCatalogSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createStatusCatalog)
//update a StatusCatalog
statusCatalogRouter.put("/statusCatalog/:id", adminRoleAuth, updateStatusCatalog)

statusCatalogRouter.delete("/statusCatalog/:id",adminRoleAuth, deleteStatusCatalog)

//https:domai.com/api/StatusCatalog?limit=10