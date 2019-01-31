const {
  getFilePath,
  send,
  redirectTo,
  parse,
  createInstanceOf,
  isInvalidPassWord,
  setCookie,
  parseCookies,
  getCurrentTodo
} = require("./util");

const { todoListsHtml, createItemsView } = require("./todoUtil");
const { User } = require("./user");
const { Todo } = require("./todo");
const { Item } = require("./item");

const LOGIN_PAGE = "./public/login.html";
const SIGNUP_PAGE = "./public/signup.html";
const ACCOUNT_NOT_FOUND = "Account not found. Sign up.";
const ACCOUNT_ALREADY_EXISTS = "Account already exist. Log in.";
const INVALID_PASSWORD = "Password is incorrect.";
const USER_INFO = "./src/userInfo.json";
const TODO_HOME = "./public/todo.html";
const EDIT_TODO = "./public/editTodo.html";

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
  console.log("CURRENT USER:", CURRENTUSER.getEmail());
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

const signUp = function(FILES_CACHE, fs, users, req, res) {
  const { name, email, password } = parse(req.body);
  const user = new User(name, email, password);
  const signupHtml = FILES_CACHE[SIGNUP_PAGE];

  if (users[email]) {
    send(res, signupHtml.replace("<!--ERROR-->", ACCOUNT_ALREADY_EXISTS));
    return;
  }

  users[email] = user;
  fs.writeFile(USER_INFO, JSON.stringify(users), "utf8", err => {});
  redirectTo(res, "/login.html");
};

const login = function(FILES_CACHE, users, req, res) {
  let loginHtml = FILES_CACHE[LOGIN_PAGE];
  const { email, password } = parse(req.body);

  if (!users[email]) {
    send(res, loginHtml.replace("<!--ERROR-->", ACCOUNT_NOT_FOUND));
    return;
  }

  if (isInvalidPassWord(User, users[email], password)) {
    send(res, loginHtml.replace("<!--ERROR-->", INVALID_PASSWORD));
    return;
  }

  setCookie(res, "email", email);
  redirectTo(res, "/");
};

const renderHome = function(FILES_CACHE, req, res) {
  if (!CURRENTUSER.getEmail()) {
    redirectTo(res, "/login.html");
    return;
  }

  const fileContent = FILES_CACHE[TODO_HOME];
  const todoList = todoListsHtml(CURRENTUSER);
  const homepage = fileContent
    .replace("<!--TODOLIST-->", todoList)
    .replace("<!--USER-->", CURRENTUSER.getName());
  send(res, homepage);
};

const addTodo = function(users, req, res) {
  const { title, description } = parse(req.body);
  CURRENTUSER.addTodo(new Todo(title, description));
  users[CURRENTUSER.getEmail()] = CURRENTUSER;
  setCookie(res, "currentTodo", title);
  redirectTo(res, "/editTodo.html");
};

const editTodo = function(FILES_CACHE, req, res) {
  const editTodoHtmlTemplate = FILES_CACHE[EDIT_TODO];
  const currentTodo = CURRENTUSER.todoList[req.cookies["currentTodo"]];
  const itemsView = createItemsView(currentTodo.items);
  const todoHTML = editTodoHtmlTemplate
    .replace("<!--USER-->", CURRENTUSER.getName())
    .replace("<!--TITLE-->", currentTodo.title)
    .replace("<!--DESCRIPTION-->", currentTodo.description)
    .replace("<!--ITEMS-->", itemsView);
  send(res, todoHTML);
};

const addItem = function(req, res) {
  const selectedTodo = CURRENTUSER.todoList[req.cookies["currentTodo"]];
  const currentTodo = createInstanceOf(Todo, selectedTodo);
  const newItem = new Item(req.body);
  currentTodo.addItem(newItem);
  const content = createItemsView(currentTodo.items);
  send(res, content);
};

const changeItemState = function(req, res) {
  const currentTodo = getCurrentTodo(CURRENTUSER, req);
  const currentItem = createInstanceOf(Item, currentTodo.items[req.body]);
  currentItem.toggleStatus();
};

const deleteItem = function(req, res) {
  const currentTodo = createInstanceOf(Todo, getCurrentTodo(CURRENTUSER, req));
  currentTodo.deleteItem(req.body);
  const content = createItemsView(currentTodo.items);
  send(res, content);
};

const deleteTodo = function(req, res) {
  delete CURRENTUSER.todoList[req.body];
  const todoListHtml = todoListsHtml(CURRENTUSER);
  send(res, todoListHtml);
};

const changeItem = function(req, res) {
  const { oldItem, newItem } = parse(req.body);
  const currentTodo = createInstanceOf(Todo, getCurrentTodo(CURRENTUSER, req));
  currentTodo.deleteItem(oldItem);
  currentTodo.addItem(new Item(newItem));
  const content = createItemsView(currentTodo.items);
  send(res, content);
};

const saveUser = function(users, fs, req, res) {
  users[CURRENTUSER.getEmail()] = CURRENTUSER;
  fs.writeFile(USER_INFO, JSON.stringify(users), "utf8", err => {});
  res.end();
};

const logout = function(req, res) {
  res.setHeader("Set-Cookie", [
    "email=;expires=Thu, 01 Jan 1970 00:00:00 UTC",
    "currentTodo=;expires=Thu, 01 Jan 1970 00:00:00 UTC"
  ]);
  redirectTo(res, "/");
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
  changeItemState,
  deleteItem,
  deleteTodo,
  changeItem,
  saveUser,
  logout
};
