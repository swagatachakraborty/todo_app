const { App } = require("./express");
const { logger, serveFile } = require("./requestsHandlers");

const app = new App();

app.use(logger);
app.use(serveFile);

module.exports = app.handleRequests.bind(app);
