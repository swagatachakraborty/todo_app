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
  addTodo
} = require("./requestsHandlers");

const FILES_CACHE = createCache(fs);
const app = new App();

app.use(readBody);
app.use(logger);
app.post("/signup", signUp.bind(null, fs, users));
app.post("/login", login.bind(null, users));
app.post("/createTodo", addTodo);
app.use(serveFile.bind(null, FILES_CACHE));

module.exports = app.handleRequests.bind(app);
