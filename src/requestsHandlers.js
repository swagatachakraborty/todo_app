const {
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

const LOGIN_PAGE = "./public/htmls/login.html";
const SIGNUP_PAGE = "./public/htmls/signup.html";
const ACCOUNT_NOT_FOUND = "Account not found. Sign up.";
const ACCOUNT_ALREADY_EXISTS = "Account already exist. Log in.";
const INVALID_PASSWORD = "Password is incorrect.";
const USER_INFO = "./src/userInfo.json";
const TODO_HOME = "./public/htmls/todo.html";
const EDIT_TODO = "./public/htmls/editTodo.html";

let CURRENTUSER = new User();

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

const createCheckSession = function(urls) {
  return function(req, res, next) {
    if (urls.includes(req.url)) {
      next();
      return;
    }

    if (!req.cookies.email) {
      logout(req, res);
      return;
    }

    next();
  };
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

const signUp = function(FILES_CACHE, fs, users, req, res) {
  const { name, email, password } = parse(req.body);
  const user = new User(name, email, password);
  const signupHtml = FILES_CACHE[SIGNUP_PAGE];

  if (users[email]) {
    res.send(signupHtml.replace("<!--ERROR-->", ACCOUNT_ALREADY_EXISTS));
    return;
  }

  users[email] = user;
  fs.writeFile(USER_INFO, JSON.stringify(users), "utf8", err => {});
  res.redirect("/login.html");
};

const login = function(FILES_CACHE, users, req, res) {
  let loginHtml = FILES_CACHE[LOGIN_PAGE];
  const { email, password } = parse(req.body);

  if (!users[email]) {
    res.send(loginHtml.replace("<!--ERROR-->", ACCOUNT_NOT_FOUND));
    return;
  }

  if (isInvalidPassWord(User, users[email], password)) {
    res.send(loginHtml.replace("<!--ERROR-->", INVALID_PASSWORD));
    return;
  }

  setCookie(res, "email", email);
  res.redirect("/");
};

const renderHome = function(FILES_CACHE, req, res) {
  if (!CURRENTUSER.getEmail()) {
    res.redirect("/login.html");
    return;
  }

  const fileContent = FILES_CACHE[TODO_HOME];
  const todoList = todoListsHtml(CURRENTUSER);
  const homepage = fileContent
    .replace("<!--TODOLIST-->", todoList)
    .replace("<!--USER-->", CURRENTUSER.getName());
  res.send(homepage);
};

const addTodo = function(users, req, res) {
  const { title, description } = parse(req.body);
  CURRENTUSER.addTodo(new Todo(title, description));
  users[CURRENTUSER.getEmail()] = CURRENTUSER;
  setCookie(res, "currentTodo", title);
  res.redirect("/editTodo.html");
};

const editTodo = function(FILES_CACHE, req, res) {
  if (!req.cookies["currentTodo"]) {
    res.redirect("/");
    return;
  }

  const editTodoHtmlTemplate = FILES_CACHE[EDIT_TODO];
  const currentTodo = CURRENTUSER.todoList[req.cookies["currentTodo"]];
  const itemsView = createItemsView(currentTodo.items);

  const todoHTML = editTodoHtmlTemplate
    .replace("<!--USER-->", CURRENTUSER.getName())
    .replace("<!--TITLE-->", currentTodo.title)
    .replace("<!--DESCRIPTION-->", currentTodo.description)
    .replace("<!--ITEMS-->", itemsView);
  res.send(todoHTML);
};

const addItem = function(req, res) {
  const selectedTodo = CURRENTUSER.todoList[req.cookies["currentTodo"]];
  const currentTodo = createInstanceOf(Todo, selectedTodo);
  const newItem = new Item(req.body);
  currentTodo.addItem(newItem);
  const content = createItemsView(currentTodo.items);
  res.send(content);
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
  res.send(content);
};

const deleteTodo = function(req, res) {
  delete CURRENTUSER.todoList[req.body];
  const todoListHtml = todoListsHtml(CURRENTUSER);
  res.send(todoListHtml);
};

const changeItem = function(req, res) {
  const { oldItem, newItem } = parse(req.body);
  const currentTodo = createInstanceOf(Todo, getCurrentTodo(CURRENTUSER, req));
  currentTodo.deleteItem(oldItem);
  currentTodo.addItem(new Item(newItem));
  const content = createItemsView(currentTodo.items);
  res.send(content);
};

const saveUser = function(users, fs, req, res) {
  users[CURRENTUSER.getEmail()] = CURRENTUSER;
  fs.writeFile(USER_INFO, JSON.stringify(users), "utf8", err => {});
  res.end();
};

const logout = function(req, res) {
  // res.setHeader("Set-Cookie", [
  //   "email=;expires=Thu, 01 Jan 1970 00:00:00 UTC",
  //   "currentTodo=;expires=Thu, 01 Jan 1970 00:00:00 UTC"
  // ]);

  res.clearCookie("email");
  res.clearCookie("currentTodo");
  res.redirect("/");
};

const setCurrentTodo = function(req, res) {
  const { currentTodo } = parse(req.body);
  res.setHeader("Set-Cookie", `currentTodo=${currentTodo}`);
  res.redirect("/editTodo.html");
};

module.exports = {
  logger,
  loadCookies,
  createCheckSession,
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
  logout,
  setCurrentTodo
};
