import { Hono } from "hono";
import { listUsers, getUser, createUser, updateUser, deleteUser } from "./users.controller"
import { zValidator } from "@hono/zod-validator";
import { userSchema } from "../validators";
import { adminRoleAuth, userRoleAuth } from "../middleware/bearAuth";

export const userRouter = new Hono();

//get all users      api/users
userRouter.get("/users", userRoleAuth, listUsers);
//get a single user    api/users/1
userRouter.get("/users/:id",adminRoleAuth, getUser)
// create a user 
userRouter.post("/users",adminRoleAuth, zValidator('json', userSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createUser)
//update a user
userRouter.put("/users/:id", updateUser)

userRouter.delete("/users/:id", deleteUser)

