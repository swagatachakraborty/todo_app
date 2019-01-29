const getFilePath = function(url) {
  // if (url == "/") {
  //   return "./public/todo.html";
  // }
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
    user[key] = decode(value);
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

const isValidUser = function(User, users, req, res) {
  let { email, password } = parse(req.body);
  if (!users[email]) {
    redirectTo(res, "/signup.html");
    return false;
  }

  let user = createInstanceOf(User, users[email]);
  if (!user.isValid(password)) {
    redirectTo(res, "/login.html");
    return false;
  }

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

module.exports = {
  getFilePath,
  send,
  parse,
  redirectTo,
  createInstanceOf,
  setCookie,
  isValidUser,
  decode,
  parseCookies
};
