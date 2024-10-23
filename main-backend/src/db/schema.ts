import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const InstagramFeed = pgTable("InstagramFeed", {
  id: serial("id").primaryKey(),
  posts: text("posts").array(),
  page: varchar("page", { length: 255 }),
  created_at: timestamp("created_at").defaultNow(),
});

export type InsertUser = typeof InstagramFeed.$inferInsert;
export type SelectUser = typeof InstagramFeed.$inferSelect;
