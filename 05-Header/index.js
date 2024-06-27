const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");
const app = express();
const PORT = 8000;

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

app.get("/users", (req, res) => {
  const html = `<ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}</ul>`;
  return res.send(html);
});

app.get("/api/users", (req, res) => {
  return res.json(users);
});

app.get("/api/users/html", (req, res) => {
  res.redirect("/api/users/1");
});
app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    const index = users.indexOf(user);
    Object.assign(user, req.body);
    users[index] = user;
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      return res.status(200).json({ status: "success", id: id });
    });
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    const index = users.indexOf(user);
    delete users[index];
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err) => {
      return res.status(200).json({ status: "success", id: id });
    });
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.json({ status: "success", id: users.length });
  });
  return res.json({ status: "Pending" });
});

app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));
