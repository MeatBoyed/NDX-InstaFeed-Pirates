import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

// import { env } from "@/env.mjs"

// Disable prefetch as it is not supported for "Transaction" pool mode
// export const client = postgres(env.DATABASE_URL, { prepare: false })
// export const db = drizzle(client, { logger: true })
