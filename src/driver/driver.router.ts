import { Hono } from "hono";
import { listDrivers, getDriver, createDriver, updateDriver, deleteDriver } from "./driver.controller"
import { zValidator } from "@hono/zod-validator";
import { driverSchema } from "../validators";
export const driverRouter = new Hono();

//get all Drivers      api/Drivers
driverRouter.get("/driver", listDrivers);
//get a single Driver    api/Drivers/1
driverRouter.get("/driver/:id", getDriver)
// create a Driver 
driverRouter.post("/driver", zValidator('json', driverSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createDriver)
//update a Driver
driverRouter.put("/driver/:id", updateDriver)

driverRouter.delete("/driver/:id", deleteDriver)

//https:domai.com/api/Drivers?limit=10