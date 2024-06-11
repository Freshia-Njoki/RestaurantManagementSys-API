import { Hono } from "hono";
import { listStates, getState, createState, updateState, deleteState } from "./state.controller"
import { zValidator } from "@hono/zod-validator";
import { stateSchema } from "../validators";
export const stateRouter = new Hono();

//get all States      api/States
stateRouter.get("/states", listStates);
//get a single State    api/States/1
stateRouter.get("/states/:id", getState)
// create a State 
stateRouter.post("/states", zValidator('json', stateSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createState)
//update a State
stateRouter.put("/states/:id", updateState)

stateRouter.delete("/states/:id", deleteState)

