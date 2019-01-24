const areMatching = function(req, route) {
  if (route.method && req.method != route.method) return false;
  if (route.url && route.url != req.url) return false;
  return true;
};

class App {
  constructor(routes = []) {
    this.routes = routes;
  }

  filterValidRequests(req) {
    return this.routes.filter(route => areMatching(req, route));
  }

  handleRequests(req, res) {
    let validRequests = this.filterValidRequests(req);
    function next() {
      let currentReq = validRequests.shift();
      if (!currentReq) return;
      currentReq.handler(req, res, next);
    }
    next();
  }

  use(handler) {
    this.routes.push({ handler });
  }

  get(url, handler) {
    this.routes.push({ method: "GET", url, handler });
  }

  post(url, handler) {
    this.routes.push({ method: "POST", url, handler });
  }
}

module.exports = { App };
