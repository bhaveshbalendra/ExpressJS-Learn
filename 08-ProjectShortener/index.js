const express = require("express");
const app = express();
const PORT = 8001;
const urlRouter = require("./routes/url");
const { connectToMongoDb } = require("./connect.js");

connectToMongoDb(
  "mongodb+srv://balendrabhavesh:User%40@meantforlearn.drlojsk.mongodb.net/08-project-shortener?retryWrites=true&w=majority&appName=MeantForLearn"
).then(() => console.log("MongoDB connected"));
app.use(express.json());
app.use("/api/url", urlRouter);
app.listen(PORT, () => console.log(`Server Started at: ${PORT}`));
