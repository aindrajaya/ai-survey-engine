import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

const connectionString = process.env.DATABASE_URL || "postgres://localhost:5432/drizzle";

console.log("What is this?", schema)

const client = postgres(connectionString);
export const db = drizzle(client, { schema });
