const getFilePath = function(url) {
  if (url == "/") {
    return "./public/login.html";
  }
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

const parse = function(content) {
  let keyValPairs = content.split("&");
  let user = {};
  keyValPairs.forEach(element => {
    let [key, value] = element.split("=");
    user[key] = value;
  });

  return user;
};

const createUserInstance = function(User, { name, email, password }) {
  return new User(name, email, password);
};

module.exports = {
  getFilePath,
  send,
  parse,
  redirectTo,
  createUserInstance
};
