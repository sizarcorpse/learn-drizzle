import * as schema from "@/drizzle/schema";
import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const client = postgres(process.env.DATABASE_URL as string);

export const db = drizzle(client, {
  schema: schema,
  logger: true,
});
