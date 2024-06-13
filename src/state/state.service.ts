import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import {TIState,TSState, StatesTable } from "../drizzle/schema";

export const statesService = async (limit?: number): Promise<TSState[] | null> => {
    if (limit) {
        return await db.query.StatesTable.findMany({
            limit: limit
        });
    }
    return await db.query.StatesTable.findMany();
}

export const getStateService = async (id: number): Promise<TIState | undefined> => {
    return await db.query.StatesTable.findFirst({
        where: eq(StatesTable.id, id)
    })
}

export const createStateService = async (State: TIState) => {
    await db.insert(StatesTable).values(State)
    return "State created successfully";
}

export const updateStateService = async (id: number, State: TIState) => {
    await db.update(StatesTable).set(State).where(eq(StatesTable.id, id))
    return "State updated successfully";
}

export const deleteStateService = async (id: number) => {
    await db.delete(StatesTable).where(eq(StatesTable.id, id))
    return "State deleted successfully";
}


export const getMoreStateInfoService = async () => {
    return await db.query.StatesTable.findMany({
      columns: {
        name: true
      },
      with: {
        city: {
          columns: {
            state: true,
            restaurant: true
          }
        }
      },
    });
  
  
  }
  