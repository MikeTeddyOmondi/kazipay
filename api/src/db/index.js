import { config } from "dotenv";
import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

config()

const { LIBSQL_URI, DATABASE_AUTH_TOKEN } = process.env;

const libsqlClient = createClient({
  url: LIBSQL_URI,
  authToken: DATABASE_AUTH_TOKEN,
});

export const db = drizzle(libsqlClient);
