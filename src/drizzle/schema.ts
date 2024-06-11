import {pgTable,pgEnum, serial, text, varchar, integer, timestamp, boolean, decimal } from "drizzle-orm/pg-core";
import { relations } from 'drizzle-orm'
//City table
export const CitiesTable = pgTable("city", {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    state_id: integer("state_id").notNull().references(() => StatesTable.id, { onDelete: "cascade" }),
    address: text('address').notNull(),
    state: varchar('state').notNull(),
    restaurant: varchar('restaurant', {length: 255})
})

// state table
export const StatesTable = pgTable("state", {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    code: varchar('code', { length: 255 }).notNull(),
    city: varchar('city', { length: 255 }).notNull()
});

//address table
export const AddressesTable = pgTable("address", {
    id: serial('id').primaryKey(),
    street_address_1: varchar('street_address_1').notNull(),
    street_address_2: varchar('street_address_2'),
    zip_code: varchar('zip_code', { length: 20 }),
    delivery_instructions: text('delivery_instructions'),
    user_id: integer('user_id').notNull().references(() => UsersTable.id, { onDelete: "cascade" }),
    city_id: integer('city_id').notNull().references(() => CitiesTable.id, { onDelete: "cascade" }),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
    city: varchar('city', { length: 255 }),
    users: varchar('users', { length: 255 }),
    orders: varchar('orders', { length: 255 })
});

//restaurant table
export const RestaurantsTable = pgTable("restaurant", {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    street_address: varchar('street_address').notNull(),
    zip_code: varchar('zip_code', { length: 20 }).notNull(),
    city_id: integer('city_id').notNull().references(() => CitiesTable.id, { onDelete: "cascade" }),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
    menu_item: varchar('menu_item', { length: 255 }).notNull(),
    orders: varchar('orders', { length: 255 }).notNull(),
    city: varchar('city', { length: 255 }).notNull(),
    restaurant_owner: varchar('restaurant_owner', { length: 255 }).notNull()
});
//users table
export const UsersTable = pgTable("users", {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    contact_phone: varchar('contact_phone', { length: 20 }).notNull(),
    phone_verified: boolean('phone_verified').notNull(),
    email: varchar('email').notNull(),
    email_verified: boolean('email_verified').notNull(),
    confirmation_code: varchar('confirmation_code', { length: 100 }).notNull(),
    password: varchar('password'),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
    address: varchar('city', { length: 255 }),
    comment: text('users'),
    drivers: varchar('drivers', { length: 255 }),
    orders: varchar('orders', { length: 255 }),
    restaurant_owner: varchar('restaurant_owner', { length: 255 }),
});
//driver table
export const DriversTable = pgTable("driver", {
    id: serial('id').primaryKey(),
    car_make: varchar('car_make').notNull(),
    car_model: varchar('car_model').notNull(),
    car_year: integer('car_year').notNull(),
    user_id: integer('user_id').notNull().references(() => UsersTable.id, { onDelete: "cascade" }),
    online: boolean('online').notNull(),
    delivering: boolean('delivering'),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
    users: varchar('users', { length: 255 }),
    orders: varchar('orders', { length: 255 }).notNull()
});   

// orders table
export const OrdersTable = pgTable("orders", {
    id: serial('id').primaryKey(),
    restaurant_id: integer('restaurant_id').notNull().references(() => RestaurantsTable.id, { onDelete: "cascade" }),
    estimated_delivery_time: timestamp('estimated_delivery_time'),
    actual_delivery_time: timestamp('actual_delivery_time'),
    delivery_address_id: integer('delivery_address_id').notNull().references(() => AddressesTable.id, { onDelete: "cascade" }),
    user_id: integer('user_id').notNull().references(() => UsersTable.id, { onDelete: "cascade" }),
    driver_id: integer('driver_id').notNull().references(() => DriversTable.id, { onDelete: "cascade" }),
    price: decimal('price', { precision: 10, scale: 2 }),
    discount: decimal('discount', { precision: 10, scale: 2 }),
    final_price: decimal('final_price', { precision: 10, scale: 2 }),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
    comments: text('comments'),
    order_menu_item: varchar('order_menu_item', { length: 255 }),
    order_status: varchar('order_status', { length: 255 }),
    address: varchar('address', { length: 255 }),
    driver: varchar('driver', { length: 255 }),
    restaurant: varchar('restaurant', { length: 255 }),
    users: varchar('users', { length: 255 })
});


// Comment Table
export const CommentsTable = pgTable("comment", {
    id: serial('id').primaryKey(),
    order_id: integer('order_id').notNull().references(() => OrdersTable.id, { onDelete: "cascade" }),
    user_id: integer('user_id').notNull().references(() => UsersTable.id, { onDelete: "cascade" }),
    comment_text: text('comment_text').notNull(),
    is_complaint: boolean('is_complaint').notNull(),
    is_praise: boolean('is_praise').notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
    orders: varchar('orders', { length: 255 }),
    users: varchar('users', { length: 255 })
});

// Category Table
export const CategoryTable = pgTable("category", {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    menu_item: varchar('menu_item').notNull()
});

// Menu Item Table
export const MenuItemsTable = pgTable("menu_item", {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    restaurant_id: integer('restaurant_id').notNull().references(() => RestaurantsTable.id, { onDelete: "cascade" }),
    category_id: integer('category_id').notNull().references(() => CategoryTable.id, { onDelete: "cascade" }),
    description: text('description').notNull(),
    ingredients: text('ingredients').notNull(),
    price: decimal('price', { precision: 10, scale: 2 }),
    active: boolean('active').notNull(),
    created_at: timestamp('created_at').defaultNow(),
    updated_at: timestamp('updated_at').defaultNow(),
    category: varchar('category', { length: 255 }),
    restaurant: varchar('restaurant', { length: 255 }),
    order_menu_item: varchar('order_menu_item', { length: 255 }),
    
});

// Order Menu Item Table
export const OrderMenuItemsTable = pgTable("order_menu_item", {
    id: serial('id').primaryKey(),
    order_id: integer('order_id').notNull().references(() => OrdersTable.id, { onDelete: "cascade" }),
    menu_item_id: integer('menu_item_id').notNull().references(() => MenuItemsTable.id, { onDelete: "cascade" }),
    quantity: integer('quantity').notNull(),
    item_price: decimal('item_price', { precision: 10, scale: 2 }).notNull(),
    price: decimal('price', { precision: 10, scale: 2 }).notNull(),
    comment: text('comment'),
    menu_item: varchar('menu_item', { length: 255 }).notNull(),
    orders: varchar('orders', { length: 255 }).notNull(),
});

// Order Status Table
export const OrderStatusTable = pgTable("order_status", {
    id: serial('id').primaryKey(),
    order_id: integer('order_id').notNull().references(() => OrdersTable.id, { onDelete: "cascade" }),
    status_catalog_id: integer('status_catalog_id').notNull(),
    created_at: timestamp('created_at').defaultNow(),
    orders: varchar('orders', { length: 255 }).notNull(),
    status_catalog: varchar('status_catalog', { length: 255 }).notNull()
});

// Status Catalog Table
export const StatusCatalogTable = pgTable("status_catalog", {
    id: serial('id').primaryKey(),
    name: varchar('name').notNull(),
    order_status: varchar('order_status', { length: 255}).notNull()
});

// Restaurant Owner Table
export const RestaurantOwnerTable = pgTable("restaurant_owner", {
    id: serial('id').primaryKey(),
    restaurant_id: integer('restaurant_id').notNull().references(() => RestaurantsTable.id, { onDelete: "cascade" }),
    owner_id: integer('owner_id').notNull().references(() => UsersTable.id, { onDelete: "cascade" }),
    users: varchar('users').notNull(),
    restaurant: varchar('restaurant').notNull()
});

//RELATIONSHIPS
//city and state relation
export const stateRelations = relations(StatesTable, ({ one }) => ({
    city: one(CitiesTable, {
        fields: [StatesTable.id],
        references: [CitiesTable.state_id],
      }),
    
}))
export const cityRelations = relations(CitiesTable, ({ many }) => ({
    state: many(StatesTable)
    
    
}))

//city and restaurant relation
export const cityRestaurantRelations = relations(CitiesTable, ({ one,many }) => ({
    restaurants: one(RestaurantsTable, {
        fields: [CitiesTable.id],
        references: [RestaurantsTable.city_id]
    }),
    address: one(AddressesTable, {
        fields: [CitiesTable.id],
        references: [AddressesTable.city_id]
    }),
    state: many(StatesTable)
    
}))

//restaurant and restaurant owner
export const restaurantRestaurantOwnerRelations = relations(RestaurantsTable, ({ one,many }) => ({
    restaurant_owner:one(RestaurantOwnerTable, {
        fields: [RestaurantsTable.id],
        references: [RestaurantOwnerTable.restaurant_id],
      }),
      orders:one (OrdersTable, {
        fields: [RestaurantsTable.id],
        references: [OrdersTable.restaurant_id]
      }),
      menu_item: one(MenuItemsTable, {
        fields:[RestaurantsTable.id],
        references:[MenuItemsTable.restaurant_id]
      }),
      city: many(CitiesTable)
    
}))
export const restaurantOwnerRestaurantRelations = relations(RestaurantOwnerTable, ({ many }) => ({
    restaurants: many(RestaurantsTable),
    users: many(UsersTable)
}))


//user and address, driver, comment relationship
export const userAddressRelations = relations(UsersTable, ({one}) => ({
    restaurantOwner: one(RestaurantOwnerTable, 
        {fields: [UsersTable.id],
        references : [RestaurantOwnerTable.owner_id]}
    ),
    address: one(AddressesTable, {
        fields: [UsersTable.id],
        references: [AddressesTable.user_id]
    }),
    driver: one(DriversTable, {
        fields:[UsersTable.id],
        references:[DriversTable.user_id]
    }),
    comment: one(CommentsTable, {
        fields:[UsersTable.id],
        references:[CommentsTable.user_id]
    }),
    order: one (OrdersTable, {
        fields:[UsersTable.id],
        references: [OrdersTable.user_id]
    })
}))

export const addressUserRelations = relations(AddressesTable, ({ many, one }) => ({
    users: many(UsersTable),
    city: many(CitiesTable),
    orders: one(OrdersTable, {
        fields: [AddressesTable.id],
        references: [OrdersTable.delivery_address_id]
    })
    
}))

//Drivers relations
export const drierUserRelations = relations(DriversTable, ({ many,one }) => ({
users: many(UsersTable),
order: one(OrdersTable,{
    fields: [DriversTable.id],
    references: [OrdersTable.driver_id]
})
}))

//comment relations
export const commentUserRelation = relations(CommentsTable, ({many}) => ({
user: many(UsersTable),
order: many(OrdersTable)
}))

//orders and comment,orderMenuItem Relations
export const OrdersCommentRelation = relations(OrdersTable, ({one, many}) => ({
    comment: one(CommentsTable, {
        fields: [OrdersTable.id],
        references: [CommentsTable.order_id]
    }),
    order_status: one(OrderStatusTable, {
        fields: [OrdersTable.id],
        references: [OrderStatusTable.order_id]
    }),
    order_menu_item: one(OrderMenuItemsTable, {
        fields: [OrdersTable.id],
        references: [OrderMenuItemsTable.order_id]
    }),
    restaurant: many(RestaurantsTable),
    users: many(UsersTable),
    driver: many(DriversTable),
    address: many(AddressesTable)
}))

//orderStatus and Order relations
export const orderStatusOrderRelation = relations(OrderStatusTable, ({many}) => ({
    orders: many(OrdersTable),
    status_catalog: many(StatusCatalogTable)
}))

//orderMenuItem and order relations
export const orderMenuitemOrderRelation = relations(OrderMenuItemsTable, ({many}) => ({
    orders: many(OrdersTable),
    menu_item: many(MenuItemsTable)
}))

//menuItem relations
export const menuItemRelation = relations(MenuItemsTable, ({one, many}) => ({
    order_menu_item: one(OrderMenuItemsTable, {
        fields: [MenuItemsTable.id],
        references: [OrderMenuItemsTable.menu_item_id]
    }),
    restaurant: many(RestaurantsTable),
    category: many(CategoryTable)

}))
//categoryRelation
export const categoryRelation = relations(CategoryTable, ({one}) => ({
    menu_item: one(MenuItemsTable, {
        fields: [CategoryTable.id],
        references: [MenuItemsTable.category_id]
    })
}))

//status catalog relations
export const statusCatalogRelations = relations(StatusCatalogTable, ({ one }) => ({
    orders: one(OrderStatusTable, {
        fields: [StatusCatalogTable.id],
        references: [OrderStatusTable.status_catalog_id]
    })
    
}))

export const roleEnum = pgEnum("role", ["admin", "user"])

export const AuthUsersTable = pgTable("usersAuth", {
    id: serial("id").primaryKey(),
    userId: integer("user_id").notNull().references(() => UsersTable.id, { onDelete: "cascade" }),
    password: varchar("password", { length: 100 }),
    username: varchar("username", { length: 100 }),
    role: roleEnum("role").default("user")
})

export const AuthOnUsersRelations = relations(AuthUsersTable, ({ one }) => ({
    user: one(UsersTable, {
        fields: [AuthUsersTable.userId],
        references: [UsersTable.id]
    })
}));

// // City Table
export type TICity = typeof CitiesTable.$inferInsert;
export type TSCity = typeof CitiesTable.$inferSelect;

// // State Table
export type TIState = typeof StatesTable.$inferInsert;
export type TSState = typeof StatesTable.$inferSelect;

// Address Table
export type TIAddress = typeof AddressesTable.$inferInsert;
export type TSAddress = typeof AddressesTable.$inferSelect;

// Restaurant Table
export type TIRestaurant = typeof RestaurantsTable.$inferInsert;
export type TSRestaurant = typeof RestaurantsTable.$inferSelect;

// Restaurant Table
export type TIRestaurantOwner = typeof RestaurantOwnerTable.$inferInsert;
export type TSRestaurantOwner = typeof RestaurantOwnerTable.$inferSelect;

// Users Table
export type TIUser = typeof UsersTable.$inferInsert;
export type TSUser = typeof UsersTable.$inferSelect;

// Driver Table
export type TIDriver = typeof DriversTable.$inferInsert;
export type TSDriver = typeof DriversTable.$inferSelect;

// // Orders Table
export type TIOrder = typeof OrdersTable.$inferInsert;
export type TSOrder = typeof OrdersTable.$inferSelect;


export type TIComment = typeof CommentsTable.$inferInsert;
export type TSComment = typeof CommentsTable.$inferSelect;

export type TICategory = typeof CategoryTable.$inferInsert;
export type TSCategory = typeof CategoryTable.$inferSelect;

export type TIMenuItem = typeof MenuItemsTable.$inferInsert;
export type TSMenuItem = typeof MenuItemsTable.$inferSelect;

export type TIOrderMenuItem = typeof OrderMenuItemsTable.$inferInsert;
export type TSOrderMenuItem = typeof OrderMenuItemsTable.$inferSelect;

export type TIOrderStatus = typeof OrderStatusTable.$inferInsert;
export type TSOrderStatus = typeof OrderStatusTable.$inferSelect;

export type TIStatusCatalog = typeof StatusCatalogTable.$inferInsert;
export type TSStatusCatalog = typeof StatusCatalogTable.$inferSelect;


export type TIAuthOnUser = typeof AuthUsersTable.$inferInsert;
export type TSAuthOnUser = typeof AuthUsersTable.$inferSelect;