const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");

const staticRoute = require("./routes/staticRouter.js");
const urlRouter = require("./routes/url");
const userRoute = require("./routes/user");
const {
  restrictToLoggedInUserOnly,
  checkAuth,
} = require("./middleware/auth.js");
const { connectToMongoDb } = require("./connect.js");

const PORT = 8011;
const app = express();

connectToMongoDb(
  "mongodb+srv://balendrabhavesh:User%4098@express.vttu0tz.mongodb.net/11-jwt-stateLess?retryWrites=true&w=majority&appName=Express"
).then(() => console.log("MongoDB connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use("/", checkAuth, staticRoute);
app.use("/user", userRoute);
app.use("/api/url", restrictToLoggedInUserOnly, urlRouter);
app.listen(PORT, () => console.log(`Server Started at: ${PORT}`));
