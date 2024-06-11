import { AuthUsersTable, TIAuthOnUser, TSAuthOnUser } from "../drizzle/schema";
import db from "../drizzle/db";
import { sql } from "drizzle-orm";

export const createAuthUserService = async (user: TIAuthOnUser): Promise<string | null> => {
    await db.insert(AuthUsersTable).values(user)
    return "User created successfully";
}

export const userLoginService = async (user: TSAuthOnUser) => {
    const { username, password } = user;
    return await db.query.AuthUsersTable.findFirst({
        columns: {
            username: true,
            role: true,
            password: true
        }, where: sql` ${AuthUsersTable.username} = ${username}`,
        with: {
            user: {
                columns: {
                    name: true,
                    email: true,
                    address: true,
                    id: true
                }
            }
        }
    })
}