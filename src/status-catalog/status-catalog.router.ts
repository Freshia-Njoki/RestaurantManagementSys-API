import { Hono } from "hono";
import { listStatusCatalogs, getStatusCatalog, createStatusCatalog, updateStatusCatalog, deleteStatusCatalog, getMoreStatusCatalogInfo} from "./status-catalog.controller"
import { zValidator } from "@hono/zod-validator";
import { statusCatalogSchema } from "../validators";
import { adminRoleAuth,userOrAdminRoleAuth, userRoleAuth } from "../middleware/bearAuth";
export const statusCatalogRouter = new Hono();

//get all StatusCatalog     api/StatusCatalog
statusCatalogRouter.get("/statusCatalog", userOrAdminRoleAuth, listStatusCatalogs);
//get a single StatusCatalog    api/StatusCatalog/1
statusCatalogRouter.get("/statusCatalog/:id",userRoleAuth, getStatusCatalog)
// create a StatusCatalog 
statusCatalogRouter.post("/statusCatalog",adminRoleAuth, zValidator('json', statusCatalogSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createStatusCatalog)
//update a StatusCatalog
statusCatalogRouter.put("/statusCatalog/:id", adminRoleAuth, updateStatusCatalog)

statusCatalogRouter.delete("/statusCatalog/:id",adminRoleAuth, deleteStatusCatalog)
statusCatalogRouter.get("/statusCatalog",userOrAdminRoleAuth, getMoreStatusCatalogInfo)

//https:domai.com/api/StatusCatalog?limit=10