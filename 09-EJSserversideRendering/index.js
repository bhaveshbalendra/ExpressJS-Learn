const express = require("express");
const path = require("path");
const app = express();
const staticRoute = require("./routes/staticRouter.js");
const PORT = 8009;
const urlRouter = require("./routes/url");
const { connectToMongoDb } = require("./connect.js");

connectToMongoDb(
  "mongodb+srv://balendrabhavesh:User%4098@express.vttu0tz.mongodb.net/09-ejs?retryWrites=true&w=majority&appName=Express"
).then(() => console.log("MongoDB connected"));
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/", staticRoute);
app.use("/api/url", urlRouter);
app.listen(PORT, () => console.log(`Server Started at: ${PORT}`));
