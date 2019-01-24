const assert = require("assert");
const { createCache } = require("../src/cache");

const fs = {
  readdirSync: path => ["numbers", "alphabet"],
  readFileSync: (path, encoding) => FILES[path]
};

const FILES = {
  "./public/numbers": "0\n1\n2\n3\n4",
  "./public/alphabet": "abcd"
};

describe("createCache", function() {
  it("Should return object of file contents", function() {
    let actual = createCache(fs);
    let expectedOutput = {
      "./public/numbers": "0\n1\n2\n3\n4",
      "./public/alphabet": "abcd"
    };

    assert.deepEqual(actual, expectedOutput);
  });
});
