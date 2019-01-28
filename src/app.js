const fs = require("fs");
const { App } = require("./express");
const users = require("./userInfo.json");

const { createCache } = require("./cache");
const {
  readBody,
  logger,
  loadCookies,
  signUp,
  login,
  serveFile,
  addTodo,
  renderHome,
  editTodo,
  addItem
} = require("./requestsHandlers");

const FILES_CACHE = createCache(fs);
const app = new App();

app.use(readBody);
app.use(loadCookies);
app.use(logger);
app.get("/todo.html", renderHome.bind(null, FILES_CACHE, users));
app.post("/signup", signUp.bind(null, fs, users));
app.post("/login", login.bind(null, users));
app.post("/createTodo", addTodo.bind(null, fs, users));
app.get("/editTodo.html", editTodo.bind(null, FILES_CACHE, fs));
app.post("/addItem", addItem);
app.use(serveFile.bind(null, FILES_CACHE));

module.exports = app.handleRequests.bind(app);
