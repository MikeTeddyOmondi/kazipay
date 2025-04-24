import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";

export const users = sqliteTable("users", {
  id: integer("id").notNull().primaryKey().unique(),
  public_id: text("public_id").notNull(),
  name: text("name"),
  phone_number: text("phone_number").notNull(),
  image_url: text("image_url"),
  verified: integer("verified", { mode: "boolean" }).notNull().default(false),
});

export const roles = sqliteTable("roles", {
  id: integer("id").notNull().primaryKey().unique(),
  public_id: text("public_id").notNull(),
  role: text("role").notNull(),
});

export const timeins = sqliteTable("timeins", {
  id: integer("id").notNull().primaryKey().unique(),
  public_id: text("public_id").notNull(),
  datetime: text("datetime").notNull(),
});

export const timeouts = sqliteTable("timeouts", {
  id: integer("id").notNull().primaryKey().unique(),
  public_id: text("public_id").notNull(),
  datetime: text("datetime").notNull(),
});
