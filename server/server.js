require("dotenv").config();
const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const corsOptions = require("./config/corsOptions");
const { logger } = require("./middleware/logger");
const errorHandler = require("./middleware/errorHandler");
const cookieParser = require("cookie-parser");
const credentials = require("./middleware/credentials");
const mongoose = require("mongoose");
const connectDB = require("./config/dbConn");
const PORT = process.env.PORT || 3500;

//Connect to MongoDB
connectDB();

// custom middleware logger
app.use(logger);

// Handle options credentials check - before CORS!
// and fetch cookies credentials requirement
app.use(credentials);

// Cross Origin Resource Sharing
app.use(cors(corsOptions));

//built in middleware to handle urlencoded data form data
app.use(express.urlencoded({ extended: false }));

//built in middleware for json
app.use(express.json());

//middleware for cookies
app.use(cookieParser());

//serve static files
app.use("/", express.static(path.join(__dirname, "/public")));

//routes
app.use("/api", require("./routes/root"));
app.use("/api/auth", require("./routes/api/authRoutes"));
app.use("/api/products", require("./routes/api/productsRoutes"));
app.use("/api/users", require("./routes/api/usersRoutes"));
app.use("/api/updates", require("./routes/api/updatesRoutes"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/client/dist")));
  app.use("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "dist", "index.html"));
  });
}

app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});

app.use(errorHandler);

mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});

/* fetch('http://localhost:3500') */
