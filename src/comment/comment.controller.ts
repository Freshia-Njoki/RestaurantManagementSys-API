import { Context } from "hono";
import { CommentsService, getCommentService, createCommentService, updateCommentService, deleteCommentService } from "./comment.service";

export const listComment = async (c: Context) => {
    try {
        //limit the number of Comments to be returned

        const limit = Number(c.req.query('limit'))

        const data = await CommentsService(limit);
        if (data == null || data.length == 0) {
            return c.text("Comment not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getComment = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Comment = await getCommentService(id);
    if (Comment == undefined) {
        return c.text("Comment not found", 404);
    }
    return c.json(Comment, 200);
}
export const createComment = async (c: Context) => {
    try {
        const Comment = await c.req.json();
        const createdComment = await createCommentService(Comment);


        if (!createdComment) return c.text("Comment not created", 404);
        return c.json({ msg: createdComment }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateComment = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Comment = await c.req.json();
    try {
        // search for the Comment
        const searchedComment = await getCommentService(id);
        if (searchedComment == undefined) return c.text("Comment not found", 404);
        // get the data and update it
        const res = await updateCommentService(id, Comment);
        // return a success message
        if (!res) return c.text("Comment not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteComment = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the Comment
        const Comment = await getCommentService(id);
        if (Comment == undefined) return c.text("Comment not found", 404);
        //deleting the Comment
        const res = await deleteCommentService(id);
        if (!res) return c.text("Comment not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}