import { Hono } from "hono";
import { listComment, getComment, createComment, updateComment, deleteComment } from "./comment.controller"
import { zValidator } from "@hono/zod-validator";
import { commentSchema } from "../validators";
import { adminRoleAuth, userRoleAuth } from "../middleware/bearAuth";
export const commentRouter = new Hono();

//get all comment      api/comment
commentRouter.get("/comment", adminRoleAuth,listComment);
//get a single Comment    api/comment/1
commentRouter.get("/comment/:id",adminRoleAuth, getComment)
// create a Comment 
commentRouter.post("/comment",userRoleAuth, zValidator('json', commentSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createComment)
//update a Comment
commentRouter.put("/comment/:id",userRoleAuth, updateComment)

commentRouter.delete("/comment/:id",adminRoleAuth, deleteComment)

//https:domai.com/api/comment?limit=10