import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {TIStatusCatalog,TSStatusCatalog, StatusCatalogTable } from "../drizzle/schema";

export const StatusCatalogsService = async (limit?: number): Promise<TSStatusCatalog[] | null> => {
    if (limit) {
        return await db.query.StatusCatalogTable.findMany({
            limit: limit
        });
    }
    return await db.query.StatusCatalogTable.findMany();
}

export const getStatusCatalogService = async (id: number): Promise<TIStatusCatalog | undefined> => {
    return await db.query.StatusCatalogTable.findFirst({
        where: eq(StatusCatalogTable.id, id)
    })
}

export const createStatusCatalogService = async (StatusCatalog: TIStatusCatalog) => {
    await db.insert(StatusCatalogTable).values(StatusCatalog)
    return "StatusCatalog created successfully";
}

export const updateStatusCatalogService = async (id: number, StatusCatalog: TIStatusCatalog) => {
    await db.update(StatusCatalogTable).set(StatusCatalog).where(eq(StatusCatalogTable.id, id))
    return "StatusCatalog updated successfully";
}

export const deleteStatusCatalogService = async (id: number) => {
    await db.delete(StatusCatalogTable).where(eq(StatusCatalogTable.id, id))
    return "StatusCatalog deleted successfully";
}


export const getMoreStatusCatalogInfoService = async () => {
    return await db.query.StatusCatalogTable.findMany({
      columns: {
        name: true,
        order_status:true
      }
    });
  
  
  }
  