const {
  getFilePath,
  send,
  redirectTo,
  parse,
  createInstanceOf,
  isValidUser,
  setCookie
} = require("./util");

const { todoListsHtml } = require("./todoUtil");
const { User } = require("./user");

let CURRENTUSER;

const setCurrentUser = function(users, req) {
  let { email } = parse(req.headers.cookie);
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
  console.log("Cookie:", req.headers.cookie);
  console.log("CURRENT USER:", CURRENTUSER);
  console.log("-------------------------------------------------------------");
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
  setCookie(res, email);
  redirectTo(res, "/todo.html");
};

const renderHome = function(FILES_CACHE, users, req, res, next) {
  setCurrentUser(users, req);
  let fileContent = FILES_CACHE["./public/todo.html"];
  if (!CURRENTUSER) {
    redirectTo(res, "/login.html");
  }
  let todoList = todoListsHtml(CURRENTUSER);
  let home = fileContent.replace("<!--REPLACE-->", todoList);
  send(res, home);
};

module.exports = {
  serveFile,
  logger,
  readBody,
  signUp,
  login,
  renderHome,
  setCurrentUser
};
