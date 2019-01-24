const fs = require("fs");

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

const logger = function(req, res, next) {
  console.log("URL:", req.url);
  console.log("Method:", req.method);
  console.log("-------------------------------------------------------------");
  next();
};

const serveFile = function(req, res) {
  let url = getFilePath(req.url);

  fs.readFile(url, (err, data) => {
    if (err) {
      send(res, "404 Not found", 404);
      return;
    }
    send(res, data);
  });
};

module.exports = { serveFile, logger };
