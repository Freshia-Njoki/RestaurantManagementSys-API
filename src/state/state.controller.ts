
import { Context } from "hono";
import { statesService, getStateService, createStateService, updateStateService, deleteStateService } from "./state.service";

export const listStates = async (c: Context) => {
    try {
        //limit the number of States to be returned

        const limit = Number(c.req.query('limit'))

        const data = await statesService(limit);
        if (data == null || data.length == 0) {
            return c.text("State not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getState = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const State = await getStateService(id);
    if (State == undefined) {
        return c.text("State not found", 404);
    }
    return c.json(State, 200);
}
export const createState = async (c: Context) => {
    try {
        const state = await c.req.json();
        const createdState = await createStateService(state);


        if (!createdState) return c.text("State not created", 404);
        return c.json({ msg: createdState }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateState = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const State = await c.req.json();
    try {
        // search for the State
        const searchedState = await getStateService(id);
        if (searchedState == undefined) return c.text("State not found", 404);
        // get the data and update it
        const res = await updateStateService(id, State);
        // return a success message
        if (!res) return c.text("State not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteState = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the State
        const state = await getStateService(id);
        if (state == undefined) return c.text("State not found", 404);
        //deleting the State
        const res = await deleteStateService(id);
        if (!res) return c.text("State not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}