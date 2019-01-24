const createCache = function(fs) {
  const publicFiles = fs.readdirSync("./public/");
  const cache = {};

  publicFiles.forEach(file => {
    const path = "./public/" + file;
    cache[path] = fs.readFileSync(path, "utf8");
  });

  return cache;
};

module.exports = { createCache };
