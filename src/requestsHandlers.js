const {
  getFilePath,
  send,
  redirectTo,
  parse,
  createInstanceOf,
  isValidUser,
  setCookie,
  parseCookies
} = require("./util");

const { todoListsHtml, createItemsView } = require("./todoUtil");
const { User } = require("./user");
const { Todo } = require("./todo");
const { Item } = require("./item");

let CURRENTUSER;

const readBody = function(req, res, next) {
  let content = "";
  req.on("data", data => (content += data));
  req.on("end", () => {
    req.body = content;
    next();
  });
};

const loadCookies = function(req, res, next) {
  const cookie = req.headers["cookie"];
  req.cookies = parseCookies(cookie);
  next();
};

const setCurrentUser = function(users, req, res, next) {
  const email = req.cookies.email;
  CURRENTUSER = createInstanceOf(User, users[email]) || new User();
  next();
};

const logger = function(req, res, next) {
  console.log("URL:", req.url);
  console.log("Method:", req.method);
  console.log("Body:", req.body);
  console.log("Cookie:", req.cookies);
  console.log("CURRENT USER:", CURRENTUSER.email);
  console.log("-------------------------------------------------------------");
  next();
};

const serveFile = function(FILES_CACHE, req, res) {
  const url = getFilePath(req.url);
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
  // setCurrentUser(users, email);
  redirectTo(res, "/");
};

const renderHome = function(FILES_CACHE, users, req, res) {
  if (!CURRENTUSER.email) {
    redirectTo(res, "/login.html");
    return;
  }
  const fileContent = FILES_CACHE["./public/todo.html"];
  const todoList = todoListsHtml(CURRENTUSER);
  const home = fileContent.replace("<!--TODOLIST-->", todoList);
  send(res, home);
};

const addTodo = function(users, req, res) {
  const { title, description } = parse(req.body);
  CURRENTUSER.addTodo(new Todo(title, description));
  users[CURRENTUSER.email] = CURRENTUSER;
  setCookie(res, "currentTodo", title);
  redirectTo(res, "/editTodo.html");
};

const editTodo = function(FILES_CACHE, req, res) {
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
  const newItem = new Item(req.body);
  currentTodo.items[req.body] = newItem;
  const content = createItemsView(currentTodo.items);
  send(res, content);
};

const getCurrentTodo = function(CURRENTUSER, req) {
  const currentTodo = req.cookies.currentTodo;
  return CURRENTUSER.todoList[currentTodo];
};

const changeItemState = function(req, res) {
  const currentTodo = getCurrentTodo(CURRENTUSER, req);
  const currentItem = createInstanceOf(Item, currentTodo.items[req.body]);
  currentItem.toggleStatus();
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
  editTodo,
  addItem,
  setCurrentUser,
  changeItemState
};
