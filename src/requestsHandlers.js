const { getFilePath, send, redirectTo, parse } = require("./util");
const { User } = require("./user");

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
  redirectTo(res, "/");
};

const login = function(users, req, res) {
  let { email, password } = parse(req.body);
  users[email].__proto__ = User.prototype;
  if (users[email].isValid(password)) {
    redirectTo(res, "/todo.html");
  }
  redirectTo(res, "/");
};

module.exports = { serveFile, logger, readBody, signUp, login };
