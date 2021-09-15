const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
//Import routes
const authRoute = require("./routes/auth");

dotenv.config();

//DB connect
mongoose.connect(process.env.DB_CONNECT, () => console.log("connected to db!"));
mongoose.connection.on("error", (error) =>
  console.log(`Error connect to db: ${error}`)
);

app.use(express.json());
//Router middlewares
app.use("/api/user", authRoute);

const PORT = process.env.PORT || 1094;

app.listen(PORT, () => console.log(`server start on ${PORT}`));
