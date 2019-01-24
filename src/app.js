const fs = require("fs");
const { App } = require("./express");
const users = require("./userInfo.json");
const { createCache } = require("./cache");
const { logger, serveFile, signUp, readBody } = require("./requestsHandlers");

const FILES_CACHE = createCache(fs);
const app = new App();

app.use(readBody);
app.use(logger);
app.post("/signup", signUp.bind(null, fs, users));
app.use(serveFile.bind(null, FILES_CACHE));

module.exports = app.handleRequests.bind(app);
