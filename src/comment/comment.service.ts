import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIComment, TSComment, CommentsTable } from "../drizzle/schema";

export const CommentsService = async (limit?: number): Promise<TSComment[] | null> => {
    if (limit) {
        return await db.query.CommentsTable.findMany({
            limit: limit
        });
    }
    return await db.query.CommentsTable.findMany();
}

export const getCommentService = async (id: number): Promise<TIComment | undefined> => {
    return await db.query.CommentsTable.findFirst({
        where: eq(CommentsTable.id, id)
    })
}

export const createCommentService = async (Comment: TIComment) => {
    await db.insert(CommentsTable).values(Comment)
    return "Comment created successfully";
}

export const updateCommentService = async (id: number, Comment: TIComment) => {
    await db.update(CommentsTable).set(Comment).where(eq(CommentsTable.id, id))
    return "Comment updated successfully";
}

export const deleteCommentService = async (id: number) => {
    await db.delete(CommentsTable).where(eq(CommentsTable.id, id))
    return "Comment deleted successfully";
}
