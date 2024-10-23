import { serial, pgTable, bigint, timestamp, text, varchar, pgEnum } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

export const visibility = pgEnum("Visibility", ["PUBLIC", "PRIVATE", "DELETED"]);

export const instagramFeed = pgTable("InstagramFeed", {
  // You can use { mode: "bigint" } if numbers are exceeding js number limitations
  //   id: serial({ mode: "number" }).primaryKey().generatedByDefaultAsIdentity({
  //     name: "_InstagramFeed_id",
  //     startWith: 1,
  //     increment: 1,
  //     minValue: 1,
  //     maxValue: 9223372036854775807,
  //   }),
  id: serial("id").primaryKey(),
  createdAt: timestamp("created_at", { withTimezone: true, mode: "string" }).defaultNow().notNull(),
  posts: text().array().notNull(),
  page: varchar().notNull(),
});
