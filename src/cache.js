const createCache = function(fs) {
  const publicFiles = fs.readdirSync("./public/");
  const cache = {};

  publicFiles.forEach(file => {
    const path = "./public/" + file;

    if (path.endsWith(".jpg")) {
      cache[path] = fs.readFileSync(path);
      return;
    }

    cache[path] = fs.readFileSync(path, "utf8");
  });

  return cache;
};

module.exports = { createCache };
