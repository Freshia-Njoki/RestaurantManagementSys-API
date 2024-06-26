import { eq } from "drizzle-orm";
import db from "../drizzle/db";
import { TIAddress, TSAddress, AddressesTable } from "../drizzle/schema";

export const addressService = async (limit?: number): Promise<TSAddress[] | null> => {
    if (limit) {
        return await db.query.AddressesTable.findMany({
            limit: limit
        });
    }
    return await db.query.AddressesTable.findMany();
}

export const getAddressService = async (id: number): Promise<TSAddress | undefined> => {
    console.log(AddressesTable.id);
    return await db.query.AddressesTable.findFirst({
        where: eq(AddressesTable.id, id)
    })
}

export const createAddressService = async (Address: TIAddress) => {
    await db.insert(AddressesTable).values(Address)
    return "Address created successfully";
}

export const updateAddressService = async (id: number, Address: TIAddress) => {
    await db.update(AddressesTable).set(Address).where(eq(AddressesTable.id, id))
    return "Address updated successfully";
}

export const deleteAddressService = async (id: number) => {
    await db.delete(AddressesTable).where(eq(AddressesTable.id, id))
    return "Address deleted successfully";
}


export const getAddressInfoService = async () => {
    return await db.query.AddressesTable.findMany({
        columns: {
            street_address_1: true,
            delivery_instructions: true
        },
        with: {
            users: {
                columns: {
                    name: true
                }
            },
            city: {
                columns: {
                    state: true
                }
            },
            orders: {
                columns: {
                    price: true
                }
            }
        },
        
});

};
