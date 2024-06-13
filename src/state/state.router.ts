import { Hono } from "hono";
import { listStates, getState, createState, updateState, deleteState, getMoreStateInfo } from "./state.controller"
import { zValidator } from "@hono/zod-validator";
import { stateSchema } from "../validators";
import { adminRoleAuth } from "../middleware/bearAuth";
export const stateRouter = new Hono();

//get all States      api/States
stateRouter.get("/states", listStates);
//get a single State    api/States/1
stateRouter.get("/states/:id", getState)
// create a State 
stateRouter.post("/states",adminRoleAuth, zValidator('json', stateSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createState)
//update a State
stateRouter.put("/states/:id",adminRoleAuth, updateState)

stateRouter.delete("/states/:id",adminRoleAuth, deleteState)
stateRouter.get("/statesInfo", getMoreStateInfo)

