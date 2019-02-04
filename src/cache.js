const createCache = function(fs) {
  const publicFiles = fs.readdirSync("./public/htmls");

  const cache = {};

  publicFiles.forEach(file => {
    const path = "./public/htmls/" + file;
    cache[path] = fs.readFileSync(path, "utf8");
  });

  return cache;
};

module.exports = { createCache };
