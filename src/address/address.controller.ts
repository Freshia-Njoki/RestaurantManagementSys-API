import { Context } from "hono";
import { addressService, getAddressService, createAddressService, updateAddressService, deleteAddressService, getAddressInfoService } from "./address.service";

export const listAddresss = async (c: Context) => {
    try {
        //limit the number of Addresss to be returned

        const limit = Number(c.req.query('limit'))

        const data = await addressService(limit);
        if (data == null || data.length == 0) {
            return c.text("Address not found", 404)
        }
        return c.json(data, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const getAddress = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const address = await getAddressService(id);
    if (address == undefined) {
        return c.text("Address not found", 404);
    }
    return c.json(address, 200);
}
export const createAddress = async (c: Context) => {
    try {
        const address = await c.req.json();
        const createdAddress = await createAddressService(address);


        if (!createdAddress) return c.text("Address not created", 404);
        return c.json({ msg: createdAddress }, 201);

    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const updateAddress = async (c: Context) => {
    const id = parseInt(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    const Address = await c.req.json();
    try {
        // search for the Address
        const searchedAddress = await getAddressService(id);
        if (searchedAddress == undefined) return c.text("Address not found", 404);
        // get the data and update it
        const res = await updateAddressService(id, Address);
        // return a success message
        if (!res) return c.text("Address not updated", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const deleteAddress = async (c: Context) => {
    const id = Number(c.req.param("id"));
    if (isNaN(id)) return c.text("Invalid ID", 400);

    try {
        //search for the Address
        const Address = await getAddressService(id);
        if (Address == undefined) return c.text("Address not found", 404);
        //deleting the Address
        const res = await deleteAddressService(id);
        if (!res) return c.text("Address not deleted", 404);

        return c.json({ msg: res }, 201);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
}

export const addressInfo = async (c: Context) => {
    try {
        const address = await getAddressInfoService();
        if (address == undefined) {
            return c.text("address info not found", 404);
        }
        return c.json(address, 200);
    } catch (error: any) {
        return c.json({ error: error?.message }, 400)
    }
};