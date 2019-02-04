const fs = require("fs");
const users = require("./src/userInfo.json");

const express = require("express");

const app = express();
const port = 8080;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const { createCache } = require("./src/cache");
const {
  readBody,
  logger,
  loadCookies,
  createCheckSession,
  signUp,
  login,
  addTodo,
  renderHome,
  editTodo,
  addItem,
  setCurrentUser,
  setCurrentTodo,
  changeItemState,
  deleteItem,
  deleteTodo,
  changeItem,
  saveUser,
  logout
} = require("./src/requestsHandlers");

const FILES_CACHE = createCache(fs);
const urls = [
  "/",
  "/login.html",
  "/signup.html",
  "/style.css",
  "/favicon.ico",
  "/login",
  "/signup",
  "/todo.jpg"
];

app.use(loadCookies);
app.use(readBody);
app.use(logger);
app.use(createCheckSession(urls));
app.use(setCurrentUser.bind(null, users));
app.get("/", renderHome.bind(null, FILES_CACHE));
app.post("/signup", signUp.bind(null, FILES_CACHE, fs, users));
app.post("/login", login.bind(null, FILES_CACHE, users));
app.post("/createTodo", addTodo.bind(null, users));
app.get("/editTodo.html", editTodo.bind(null, FILES_CACHE));
app.post("/setCurrentTodo", setCurrentTodo);
app.post("/addItem", addItem);
app.post("/changeItemState", changeItemState);
app.post("/deleteItem", deleteItem);
app.post("/deleteTodo", deleteTodo);
app.post("/changeItem", changeItem);
app.post("/logout", logout);
app.get("/saveUser", saveUser.bind(null, users, fs));

app.use(express.static("public/javascripts"));
app.use(express.static("public/images"));
app.use(express.static("public/styleSheets"));
app.use(express.static("public/htmls"));
