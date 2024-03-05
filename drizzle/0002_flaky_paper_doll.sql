DROP TABLE "orders";--> statement-breakpoint
ALTER TABLE "shipping" RENAME COLUMN "order_id" TO "customer_id";--> statement-breakpoint
ALTER TABLE "shopping_carts" RENAME COLUMN "user_id" TO "customer_id";--> statement-breakpoint
ALTER TABLE "shopping_carts" RENAME COLUMN "product_id" TO "order_item_id";--> statement-breakpoint
ALTER TABLE "order_items" RENAME COLUMN "order_id" TO "cart_id";--> statement-breakpoint
ALTER TABLE "payments" RENAME COLUMN "order_id" TO "customer_id";--> statement-breakpoint
ALTER TABLE "shipping" DROP CONSTRAINT "shipping_order_id_customers_id_fk";
--> statement-breakpoint
ALTER TABLE "shopping_carts" DROP CONSTRAINT "shopping_carts_user_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "shopping_carts" DROP CONSTRAINT "shopping_carts_product_id_products_id_fk";
--> statement-breakpoint
ALTER TABLE "order_items" DROP CONSTRAINT "order_items_order_id_orders_id_fk";
--> statement-breakpoint
ALTER TABLE "payments" DROP CONSTRAINT "payments_order_id_orders_id_fk";
--> statement-breakpoint
ALTER TABLE "customers" ADD COLUMN "cart_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "order_items" ADD COLUMN "customer_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "payments" ADD COLUMN "cart_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "image_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "products" ADD COLUMN "reviews" integer NOT NULL;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shipping" ADD CONSTRAINT "shipping_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shopping_carts" ADD CONSTRAINT "shopping_carts_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "shopping_carts" ADD CONSTRAINT "shopping_carts_order_item_id_products_id_fk" FOREIGN KEY ("order_item_id") REFERENCES "products"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "customers" ADD CONSTRAINT "customers_cart_id_shopping_carts_id_fk" FOREIGN KEY ("cart_id") REFERENCES "shopping_carts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_items" ADD CONSTRAINT "order_items_cart_id_shopping_carts_id_fk" FOREIGN KEY ("cart_id") REFERENCES "shopping_carts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "order_items" ADD CONSTRAINT "order_items_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payments" ADD CONSTRAINT "payments_customer_id_customers_id_fk" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payments" ADD CONSTRAINT "payments_cart_id_shopping_carts_id_fk" FOREIGN KEY ("cart_id") REFERENCES "shopping_carts"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_image_id_images_id_fk" FOREIGN KEY ("image_id") REFERENCES "images"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "products" ADD CONSTRAINT "products_reviews_reviews_id_fk" FOREIGN KEY ("reviews") REFERENCES "reviews"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
