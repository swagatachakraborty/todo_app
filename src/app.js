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
  addItem,
  setCurrentUser,
  changeItemState
} = require("./requestsHandlers");

const FILES_CACHE = createCache(fs);
const app = new App();

app.use(readBody);
app.use(loadCookies);
app.use(setCurrentUser.bind(null, users));
app.use(logger);
app.get("/", renderHome.bind(null, FILES_CACHE, users));
app.post("/signup", signUp.bind(null, fs, users));
app.post("/login", login.bind(null, users));
app.post("/createTodo", addTodo.bind(null, users));
app.get("/editTodo.html", editTodo.bind(null, FILES_CACHE));
app.post("/addItem", addItem);
app.post("/changeItemState", changeItemState);
app.use(serveFile.bind(null, FILES_CACHE));

module.exports = app.handleRequests.bind(app);
