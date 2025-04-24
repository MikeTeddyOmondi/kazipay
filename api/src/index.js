import cors from "cors";
import express from "express";
import { config } from "dotenv";
import { eq } from "drizzle-orm";
import { v4 as uuid } from "uuid";

import { users } from "./db/schema.js";
import { createError, logger } from "./utils.js";
import routes from "./routes.js"

config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

app.use("/api/v1/", routes)

// Root route
app.get("/", (req, res, next) => {
  logger.info({ success: true, message: "Application works!" });
  res.json({ success: true, message: "Application works!" });
});

// 404 route
// TODO: remove `*` for Express version 5
app.get("*", (req, res, next) => {
  logger.error("Resource Not Found!");
  next(createError(500, `Resource Not Found!`));
});

// Error Middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";
  return res.status(errorStatus).json({
    success: false,
    data: {
      message: errorMessage,
    },
    stack: process.env.NODE_ENV === "production" ? {} : err.stack,
  });
});

const PORT = process.env.PORT || 3489;

app.listen(PORT, () => {
  logger.info(`Server listening for requests: http://localhost:${PORT}`);
});