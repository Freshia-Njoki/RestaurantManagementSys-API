import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIOrderStatus, TSOrderStatus, OrderStatusTable } from "../drizzle/schema";

export const orderStatusService = async (limit?: number): Promise<TSOrderStatus[] | null> => {
    if (limit) {
        return await db.query.OrderStatusTable.findMany({
            limit: limit
        });
    }
    return await db.query.OrderStatusTable.findMany();
}

export const getOrderStatusService = async (id: number): Promise<TIOrderStatus | undefined> => {
    return await db.query.OrderStatusTable.findFirst({
        where: eq(OrderStatusTable.id, id)
    })
}

export const createOrderStatusService = async (OrderStatus: TIOrderStatus) => {
    await db.insert(OrderStatusTable).values(OrderStatus)
    return "OrderStatus created successfully";
}

export const updateOrderStatusService = async (id: number, OrderStatus: TIOrderStatus) => {
    await db.update(OrderStatusTable).set(OrderStatus).where(eq(OrderStatusTable.id, id))
    return "OrderStatus updated successfully";
}

export const deleteOrderStatusService = async (id: number) => {
    await db.delete(OrderStatusTable).where(eq(OrderStatusTable.id, id))
    return "OrderStatus deleted successfully";
}

export const getMoreOrderStatusInfoService = async () => {
    return await db.query.OrderStatusTable.findMany({
        columns: {
            orders: true,
            status_catalog: true
        },
        with: {
            orders: {
                columns: {
                    price: true,
                    order_menu_item: true
                }
            }
        },
    });


}
