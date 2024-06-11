import { Hono } from "hono";
import { listComment, getComment, createComment, updateComment, deleteComment } from "./comment.controller"
import { zValidator } from "@hono/zod-validator";
import { commentSchema } from "../validators";
export const commentRouter = new Hono();

//get all comment      api/comment
commentRouter.get("/comment", listComment);
//get a single Comment    api/comment/1
commentRouter.get("/comment/:id", getComment)
// create a Comment 
commentRouter.post("/comment", zValidator('json', commentSchema, (result, c) => {
    if (!result.success) {
        return c.json(result.error, 400)
    }
}), createComment)
//update a Comment
commentRouter.put("/comment/:id", updateComment)

commentRouter.delete("/comment/:id", deleteComment)

//https:domai.com/api/comment?limit=10