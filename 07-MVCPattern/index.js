const express = require("express");

const { connectMongoDb } = require("./connection");
const userRouter = require("./routes/user");
const { logReqRes } = require("./middlewares");

const app = express();
const PORT = 8000;

// Connection
connectMongoDb("mongodb://127.0.0.1:27017/person")
  .then(() => console.log("Mongo DB connected"))
  .catch(() => console.log("There is some error not not connected"));

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

//Router
app.use("/api/users", userRouter);
app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
