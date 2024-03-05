import { relations } from "drizzle-orm";
import {
  serial,
  text,
  timestamp,
  integer,
  pgTable,
  boolean,
} from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: serial("id"),
  name: text("name"),
  email: text("email"),
  password: text("password"),
  role: text("role").$type<"admin" | "customer">(),
  createdAt: timestamp("created_at"),
  updatedAt: timestamp("updated_at"),
});

// export const users = pgTable("users", {
//   id: serial("id").primaryKey(),
//   name: text("name").notNull(),
//   email: text("email").notNull(),
//   isAdmin: boolean("is_admin").notNull().default(false),
//   createdAt: timestamp("create_at").notNull().defaultNow(),
//   updatedAt: timestamp("updated_at").notNull().defaultNow(),
// });

// //   types/categories of products
// export const type = pgTable("types", {
//   id: serial("id").primaryKey(),
//   name: text("name").notNull(),
//   description: text("description").notNull(),
//   createdAt: timestamp("created_at").notNull().defaultNow(),
//   updatedAt: timestamp("updated_at").notNull().defaultNow(),
// });

// // shopping cart
// export const Cart = pgTable("shopping_carts", {
//   id: serial("id").primaryKey(),
//   userId: integer("user_id")
//     .notNull()
//     .references(() => Users.id),
//   productId: integer("product_id")
//     .notNull()
//     .references(() => Product.id),
//   quantity: text("quantity").notNull(),
//   totalPrice: text("total_price").notNull(),
//   createdAt: timestamp("created_at").notNull().defaultNow(),
//   updatedAt: timestamp("updated_at").notNull().defaultNow(),
// });

// //   products available for sale
// export const Product = pgTable("products", {
//   id: serial("id").primaryKey(),
//   name: text("name").notNull(),
//   description: text("description").notNull(),
//   price: text("price").notNull(),
//   typeId: integer("type_id")
//     .notNull()
//     .references(() => Type.id),
//   createdAt: timestamp("created_at").notNull().defaultNow(),
//   updatedAt: timestamp("updated_at").notNull().defaultNow(),
// });

// //   customers who make purchases
// export const Customers = pgTable("customers", {
//   id: serial("id").primaryKey(),
//   name: text("name").notNull(),
//   email: text("email").notNull(),
//   address: text("address").notNull(),
//   phoneNumber: text("phone_number").notNull(),
//   createdAt: timestamp("created_at").notNull().defaultNow(),
//   updatedAt: timestamp("updated_at").notNull().defaultNow(),
// });

// //   customer orders
// export const Orders = pgTable("orders", {
//   id: serial("id").primaryKey(),
//   customerId: integer("customer_id")
//     .notNull()
//     .references(() => Customers.id),
//   totalPrice: text("total_price").notNull(),
//   status: text("status").notNull(),
//   createdAt: timestamp("created_at").notNull().defaultNow(),
//   updatedAt: timestamp("updated_at").notNull().defaultNow(),
// });

// //   individual items in each order
// export const Order_Items = pgTable("order_items", {
//   id: serial("id").primaryKey(),
//   orderId: integer("order_id")
//     .notNull()
//     .references(() => Orders.id),
//   productId: integer("product_id")
//     .notNull()
//     .references(() => Product.id),
//   quantity: text("quantity").notNull(),
//   price: text("price").notNull(),
//   createdAt: timestamp("created_at").notNull().defaultNow(),
//   updatedAt: timestamp("updated_at").notNull().defaultNow(),
// });

// //   payments made for orders
// export const Payment = pgTable("payments", {
//   id: serial("id").primaryKey(),
//   orderId: integer("order_id")
//     .notNull()
//     .references(() => Orders.id),
//   amount: text("amount").notNull(),
//   paymentMethod: text("payment_method").notNull(),
//   status: text("status").notNull(),
//   createdAt: timestamp("created_at").notNull().defaultNow(),
//   updatedAt: timestamp("updated_at").notNull().defaultNow(),
// });

// customer ID
// //   shipping details for orders
// export const Shipping = pgTable("shipping", {
//   id: serial("id").primaryKey(),
//   orderId: integer("order_id")
//     .notNull()
//     .references(() => Orders.id),
//   address: text("address").notNull(),
//   city: text("city").notNull(),
//   state: text("state").notNull(),
//   postalCode: text("postal_code").notNull(),
//   country: text("country").notNull(),
//   trackingNumber: text("tracking_number").notNull(),
//   createdAt: timestamp("created_at").notNull().defaultNow(),
//   updatedAt: timestamp("updated_at").notNull().defaultNow(),
// });

// //   product reviews
// export const Reviews = pgTable("reviews", {
//   id: serial("id").primaryKey(),
//   productId: integer("product_id")
//     .notNull()
//     .references(() => Product.id),
//   customerId: integer("customer_id")
//     .notNull()
//     .references(() => Customers.id),
//   rating: text("rating").notNull(),
//   comment: text("comment").notNull(),
//   createdAt: timestamp("created_at").notNull().defaultNow(),
//   updatedAt: timestamp("updated_at").notNull().defaultNow(),
// });

// //   images associated with products
// export const Images = pgTable("images", {
//   id: serial("id").primaryKey(),
//   productId: integer("product_id")
//     .notNull()
//     .references(() => Product.id),
//   url: text("url").notNull(),
//   altText: text("alt_text").notNull(),
//   createdAt: timestamp("created_at").notNull().defaultNow(),
//   updatedAt: timestamp("updated_at").notNull().defaultNow(),
// });
