import type { Config } from "drizzle-kit";

export default {
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    host: "ep-empty-sound-a6a4jtqu.us-west-2.aws.neon.tech",
    user: "bbrewer063",
    password: "51luDHNKQvZU",
    database: "postgresdb",
  },
} satisfies Config;
