import { Hono } from "hono";
import { listCategories, getCategory, createCategory, updateCategory, deleteCategory, filterCategoryInfo } from "./category.controller"
import { zValidator } from "@hono/zod-validator";
import { categorySchema } from "../validators";
import { adminRoleAuth } from "../middleware/bearAuth";
export const categoryRouter = new Hono();

//get all categorys      api/categorys
categoryRouter.get("/category", listCategories);
//get a single category    api/categorys/1
categoryRouter.get("/category/:id", getCategory)
// create a category 
categoryRouter.post("/category",adminRoleAuth, zValidator('json', categorySchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createCategory)
//update a category
categoryRouter.put("/category/:id",adminRoleAuth, updateCategory)

categoryRouter.delete("/category/:id",adminRoleAuth, deleteCategory)
categoryRouter.get("/categoryInfo/:id", filterCategoryInfo)

//https:domai.com/api/categorys?limit=10