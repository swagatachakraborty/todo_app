const getFilePath = function(url) {
  return "./public" + url;
};

const send = function(res, content, statusCode = 200) {
  res.statusCode = statusCode;
  res.write(content);
  res.end();
};

const redirectTo = function(res, location) {
  res.writeHead(302, {
    Location: location
  });
  res.end();
};

const decode = function(string = "") {
  string = string.replace(/\+/g, " ");
  return decodeURIComponent(string);
};

const parse = function(content = "") {
  let keyValPairs = content.split("&");
  let user = {};
  keyValPairs.forEach(element => {
    const [key, value] = element.split("=");
    user[key.trim()] = decode(value).trim();
  });
  return user;
};

const createInstanceOf = function(protoClass, object) {
  if (!object) return;
  object.__proto__ = protoClass.prototype;
  return object;
};

const setCookie = function(res, key, value) {
  res.setHeader("Set-Cookie", key + "=" + value);
};

const isInvalidPassWord = function(User, userObj, password) {
  let user = createInstanceOf(User, userObj);
  if (user.isValid(password)) return false;
  return true;
};

const parseCookies = function(cookie) {
  const cookies = {};
  if (cookie) {
    cookie.split("; ").forEach(element => {
      const [name, value] = element.split("=");
      cookies[name] = value;
    });
  }
  return cookies;
};

const getCurrentTodo = function(CURRENTUSER, req) {
  const currentTodo = req.cookies.currentTodo;
  return CURRENTUSER.todoList[currentTodo];
};

module.exports = {
  getFilePath,
  send,
  parse,
  redirectTo,
  createInstanceOf,
  setCookie,
  decode,
  parseCookies,
  getCurrentTodo,
  isInvalidPassWord
};
