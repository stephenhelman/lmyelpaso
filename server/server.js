import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app = express();
import path from "path";

import { logger } from "./middleware/logger.js";
import { errorHandler } from "./middleware/errorHandler.js";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import { connectDB } from "./config/dbConn.js";
const PORT = process.env.PORT || 3500;
import { router as authRouter } from "./routes/api/authRoutes.js";
import { router as productRouter } from "./routes/api/productsRoutes.js";
import { router as usersRouter } from "./routes/api/usersRoutes.js";
import { router as updatesRouter } from "./routes/api/updatesRoutes.js";

//Connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

//built in middleware to handle urlencoded data form data
app.use(express.urlencoded({ extended: false }));

//built in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//routes
app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/users", usersRouter);
app.use("/api/updates", updatesRouter);

const __dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));
  app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

/* fetch('http://localhost:3500') */
