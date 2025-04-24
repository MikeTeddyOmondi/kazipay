import { config } from "dotenv";

config();

const { LIBSQL_URI, DATABASE_AUTH_TOKEN } = process.env;

export default {
  schema: "./src/db/schema.js",
  out: "./migrations",
  dialect: "turso",
  dbCredentials: {
    url: LIBSQL_URI,
    authToken: DATABASE_AUTH_TOKEN,
  }
};