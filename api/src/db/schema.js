import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").notNull().primaryKey().unique(),
  public_id: text("public_id").notNull(),
  name: text("name").notNull(),
  phone_number: text("phone_number").notNull(),
  image_url: text("image_url").notNull(),
  verified: integer("completed", { mode: "boolean" }).notNull().default(false),
});