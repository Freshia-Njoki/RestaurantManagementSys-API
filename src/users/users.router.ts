import { Hono } from "hono";
import { listUsers, getUser, createUser, updateUser, deleteUser, getMoreUsersInfo } from "./users.controller"
import { zValidator } from "@hono/zod-validator";
import { userSchema } from "../validators";
import { adminRoleAuth, userRoleAuth,userOrAdminRoleAuth } from "../middleware/bearAuth";

export const userRouter = new Hono();

//get all users      api/users
userRouter.get("/users",adminRoleAuth, listUsers);
//get a single user    api/users/1
userRouter.get("/users/:id",userOrAdminRoleAuth, getUser)
// create a user 
userRouter.post("/users",userRoleAuth, zValidator('json', userSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createUser)
//update a user
userRouter.put("/users/:id", userRoleAuth, updateUser)

userRouter.delete("/users/:id", userRoleAuth,  deleteUser)
userRouter.get("/usersInfo",adminRoleAuth, getMoreUsersInfo)

