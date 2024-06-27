const express = require("express");
const fs = require("fs");
const mongoose = require("mongoose");
const app = express();
const PORT = 8000;

// making schema first
const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    jobTitle: { type: String },
    gender: { type: String },
  },
  { timestamps: true }
);

// connection mongodb in url person is the data base must be given
mongoose
  .connect("mongodb://127.0.0.1:27017/person")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("Mongo Error", err));
// making model
const User = mongoose.model("user", userSchema);
// Middleware -plugin
app.use((req, res, next) => {
  req.myUserName = "bhavesh balendra";
  console.log("hello");
  next();
});

app.use((req, res, next) => {
  console.log(req.myUserName);
  next();
});

app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n${Date.now()} : ${req.method}: ${req.path} Path : ${req.baseUrl}`,
    (error) => next()
  );
});
app.use(express.urlencoded({ extended: false }));

app.get("/users", async (req, res) => {
  const allDbUsers = await User.find({});
  const html = `<ul>
    ${allDbUsers
      .map((user) => `<li>${user.firstName} - ${user.email}</li>`)
      .join("")}</ul>`;
  return res.send(html);
});

app.get("/api/users", async (req, res) => {
  const allDbUsers = await User.find({});
  res.setHeader("X-MyName", "Bhavesh Balendra");
  return res.json(allDbUsers);
});

app.get("/api/users/html", (req, res) => {
  res.redirect("/api/users/1");
});
app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "user not found" });
    return res.json(user);
  })
  .patch(async (req, res) => {
    await User.findByIdAndUpdate(req.params.id, {
      lastName: req.body.last_name,
    });
    return res.json({ status: "success" });
  })
  .delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ status: "Success" });
  });

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are req..." });
  }
  // model instance of mongoose
  const result = await User.create({
    firstName: body.first_name,
    lastName: body.last_name,
    email: body.email,
    gender: body.gender,
    jobTitle: body.job_title,
  });
  return res.status(201).json({ msg: "success" });
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
