import { createClient } from "@libsql/client";
import { drizzle } from "drizzle-orm/libsql";

// Libsql config
const { LIBSQL_URI, DATABASE_AUTH_TOKEN } = process.env;

const libsqlClient = createClient({
  url: LIBSQL_URI,
  authToken: DATABASE_AUTH_TOKEN,
});

const db = drizzle(libsqlClient);
