const fs = require("fs");
const { App } = require("./express");
const { createCache } = require("./cache");
const { logger, serveFile } = require("./requestsHandlers");

const FILES_CACHE = createCache(fs);
const app = new App();

app.use(logger);
app.use(serveFile.bind(null, FILES_CACHE));

module.exports = app.handleRequests.bind(app);
