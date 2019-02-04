const assert = require("assert");
const { createCache } = require("../src/cache");

const fs = {
  readdirSync: path => ["numbers", "alphabet"],
  readFileSync: (path, encoding) => FILES[path]
};

const FILES = {
  "./public/htmls/numbers": "0\n1\n2\n3\n4",
  "./public/htmls/alphabet": "abcd"
};

describe("createCache", function() {
  it("Should return object of file contents", function() {
    let actual = createCache(fs);
    let expectedOutput = {
      "./public/htmls/numbers": "0\n1\n2\n3\n4",
      "./public/htmls/alphabet": "abcd"
    };

    assert.deepEqual(actual, expectedOutput);
  });
});
