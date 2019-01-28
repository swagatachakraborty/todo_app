const {
  getFilePath,
  send,
  redirectTo,
  parse,
  createInstanceOf,
  isValidUser,
  setCookie
} = require("./util");

const { todoListsHtml, createItemsView } = require("./todoUtil");
const { User } = require("./user");
const { Todo } = require("./todo");

let CURRENTUSER = new User();

const setCurrentUser = function(users, req) {
  let email = req.cookies.email;
  CURRENTUSER = createInstanceOf(User, users[email]);
};

const readBody = function(req, res, next) {
  let content = "";
  req.on("data", data => (content += data));
  req.on("end", () => {
    req.body = content;
    next();
  });
};

const logger = function(req, res, next) {
  console.log("URL:", req.url);
  console.log("Method:", req.method);
  console.log("Body:", req.body);
  console.log("Cookie:", req.cookies);
  // console.log("CURRENT USER:", CURRENTUSER);
  console.log("-------------------------------------------------------------");
  next();
};

const loadCookies = function(req, res, next) {
  const cookie = req.headers["cookie"];
  const cookies = {};
  if (cookie) {
    cookie.split("; ").forEach(element => {
      const [name, value] = element.split("=");
      cookies[name] = value;
    });
  }
  req.cookies = cookies;
  next();
};

const serveFile = function(FILES_CACHE, req, res) {
  let url = getFilePath(req.url);
  if (FILES_CACHE[url]) {
    send(res, FILES_CACHE[url]);
    return;
  }
  send(res, "404 Not found", 404);
};

const signUp = function(fs, users, req, res) {
  let { name, email, password } = parse(req.body);
  let user = new User(name, email, password);
  users[email] = user;
  fs.writeFile("./src/userInfo.json", JSON.stringify(users), "utf8", err => {});
  redirectTo(res, "/login.html");
};

const login = function(users, req, res) {
  if (!isValidUser(User, users, req, res)) return;
  const { email } = parse(req.body);
  setCookie(res, "email", email);
  redirectTo(res, "/todo.html");
};

const renderHome = function(FILES_CACHE, users, req, res) {
  setCurrentUser(users, req);
  let fileContent = FILES_CACHE["./public/todo.html"];
  if (!CURRENTUSER) {
    redirectTo(res, "/login.html");
  }
  const todoList = todoListsHtml(CURRENTUSER);
  const home = fileContent.replace("<!--REPLACE-->", todoList);
  send(res, home);
};

const addTodo = function(fs, users, req, res) {
  const { title, description } = parse(req.body);
  CURRENTUSER.addTodo(new Todo(title, description));
  users[CURRENTUSER.email] = CURRENTUSER;
  setCookie(res, "currentTodo", title);
  // fs.writeFile("./src/userInfo.json", JSON.stringify(users), "utf8", err => {});
  redirectTo(res, "/editTodo.html");
};

const editTodo = function(FILES_CACHE, fs, req, res) {
  const editTodoHtmlTemplate = FILES_CACHE["./public/editTodo.html"];
  const currentTodo = CURRENTUSER.todoList[req.cookies["currentTodo"]];
  const itemsView = createItemsView(currentTodo.items);
  const todoHTML = editTodoHtmlTemplate
    .replace("<!--TITLE-->", currentTodo.title)
    .replace("<!--DESCRIPTION-->", currentTodo.description)
    .replace("<!--ITEMS-->", itemsView);
  send(res, todoHTML);
};

const addItem = function(req, res) {
  const currentTodo = CURRENTUSER.todoList[req.cookies["currentTodo"]];
  currentTodo.items.push(req.body);
  const content = createItemsView(currentTodo.items);
  send(res, content);
};

module.exports = {
  serveFile,
  logger,
  loadCookies,
  readBody,
  signUp,
  login,
  renderHome,
  setCurrentUser,
  addTodo,
  setCurrentUser,
  editTodo,
  addItem
};
