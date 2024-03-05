import { relations } from "drizzle-orm";
import {
  serial,
  text,
  timestamp,
  integer,
  pgTable,
  boolean,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  isAdmin: boolean("is_admin").notNull().default(false),
  createdAt: timestamp("create_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

//   types/categories of products
export const type = pgTable("types", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// shopping cart
export const cart = pgTable("shopping_carts", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id")
    .notNull()
    .references(() => customers.id),
  orderItemsId: integer("order_item_id")
    .notNull()
    .references(() => product.id),
  quantity: text("quantity").notNull(),
  totalPrice: text("total_price").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}) as ReturnType<typeof pgTable>;

//   products available for sale
export const product = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: text("price").notNull(),
  typeId: integer("type_id")
    .notNull()
    .references(() => type.id),
  imageId: integer("image_id")
    .notNull()
    .references(() => images.id),
  reviewsId: integer("reviews")
    .notNull()
    .references(() => reviews.id),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
}) as ReturnType<typeof pgTable>;

//   customers who make purchases
export const customers = pgTable("customers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  address: text("address").notNull(),
  cartId: integer("cart_id")
    .notNull()
    .references(() => cart.id),
  phoneNumber: text("phone_number").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

//   individual items in each cart
export const orderItems = pgTable("order_items", {
  id: serial("id").primaryKey(),
  cartId: integer("cart_id")
    .notNull()
    .references(() => cart.id),
  productId: integer("product_id")
    .notNull()
    .references(() => product.id),
  customerId: integer("customer_id")
    .notNull()
    .references(() => customers.id),
  quantity: text("quantity").notNull(),
  price: text("price").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

//   payments made for orders
export const payment = pgTable("payments", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id")
    .notNull()
    .references(() => customers.id),
  cartId: integer("cart_id")
    .notNull()
    .references(() => cart.id),
  amount: text("amount").notNull(),
  paymentMethod: text("payment_method").notNull(),
  status: text("status").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

//   shipping details for orders
export const shipping = pgTable("shipping", {
  id: serial("id").primaryKey(),
  customerId: integer("customer_id")
    .notNull()
    .references(() => customers.id),
  address: text("address").notNull(),
  city: text("city").notNull(),
  state: text("state").notNull(),
  postalCode: text("postal_code").notNull(),
  country: text("country").notNull(),
  trackingNumber: text("tracking_number").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

//   product reviews
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => product.id),
  customerId: integer("customer_id")
    .notNull()
    .references(() => customers.id),
  rating: text("rating").notNull(),
  comment: text("comment").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

//   images associated with products
export const images = pgTable("images", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => product.id),
  url: text("url").notNull(),
  altText: text("alt_text").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// relations

export const productRelations = relations(images, ({ one, many }) => ({
  images: many(images),

  reviews: many(reviews),

  type: one(type, { fields: [product.typeId], references: [type.id] }),
}));

export const cartRelations = relations(cart, ({ one, many }) => ({
  customer: one(customers, {
    fields: [cart.customerId],
    references: [customers.id],
  }),

  orderItems: many(orderItems),
}));

export const customerRelations = relations(customers, ({ one, many }) => ({
  carts: many(cart),
}));

export const reviewsRelations = relations(reviews, ({ one, many }) => ({
  products: one(product, {
    fields: [reviews.productId],
    references: [product.id],
  }),

  customers: one(customers, {
    fields: [reviews.customerId],
    references: [customers.id],
  }),
}));

export const imagesRelations = relations(images, ({ one, many }) => ({
  product: one(product, {
    fields: [images.productId],
    references: [product.id],
  }),
}));

export const shippingRelations = relations(shipping, ({ one, many }) => ({
  customer: one(customers, {
    fields: [shipping.customerId],
    references: [customers.id],
  }),
}));

export const paymentRelations = relations(payment, ({ one }) => ({
  cart: one(cart, {
    fields: [payment.cartId],
    references: [cart.id],
  }),

  customer: one(customers, {
    fields: [payment.customerId],
    references: [customers.id],
  }),
}));

export const orderItemsRelations = relations(orderItems, ({ one, many }) => ({
  cart: one(cart, {
    fields: [orderItems.cartId],
    references: [cart.id],
  }),

  product: one(product, {
    fields: [orderItems.productId],
    references: [product.id],
  }),

  customer: one(customers, {
    fields: [orderItems.customerId],
    references: [customers.id],
  }),
}));
