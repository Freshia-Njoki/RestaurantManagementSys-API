import { Hono } from "hono";
import { listDrivers, getDriver, createDriver, updateDriver, deleteDriver } from "./driver.controller"
import { zValidator } from "@hono/zod-validator";
import { driverSchema } from "../validators";
import { adminRoleAuth } from "../middleware/bearAuth";
export const driverRouter = new Hono();

//get all Drivers      api/Drivers
driverRouter.get("/driver",adminRoleAuth, listDrivers);
//get a single Driver    api/Drivers/1
driverRouter.get("/driver/:id",adminRoleAuth, getDriver)
// create a Driver 
driverRouter.post("/driver", adminRoleAuth,zValidator('json', driverSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createDriver)
//update a Driver
driverRouter.put("/driver/:id",adminRoleAuth, updateDriver)

driverRouter.delete("/driver/:id",adminRoleAuth, deleteDriver)

//https:domai.com/api/Drivers?limit=10