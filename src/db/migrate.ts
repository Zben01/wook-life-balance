import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { migrate } from "drizzle-orm/neon-http/migrator";

const sql = neon<boolean, boolean>(process.env.DATABASE_URL!);
const db = drizzle(sql);

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: "./drizzle",
    });
    console.log("Migration successful!");
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
  }
};
