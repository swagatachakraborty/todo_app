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
  createInstanceOf,
  setCookie,
  parseCookies,
  getCurrentTodo,
  isInvalidPassWord
};
