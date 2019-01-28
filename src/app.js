const fs = require("fs");
const { App } = require("./express");
const users = require("./userInfo.json");

const { createCache } = require("./cache");
const {
  readBody,
  logger,
  signUp,
  login,
  serveFile,
  addTodo,
  renderHome
} = require("./requestsHandlers");

const FILES_CACHE = createCache(fs);
const app = new App();

app.use(readBody);
app.use(logger);
app.get("/todo.html", renderHome.bind(null, FILES_CACHE));
app.post("/signup", signUp.bind(null, fs));
app.post("/login", login);
app.post("/createTodo", addTodo.bind(null, fs));
app.use(serveFile.bind(null, FILES_CACHE));

module.exports = app.handleRequests.bind(app);
