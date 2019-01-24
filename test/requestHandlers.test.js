const assert = require("assert");
const { serveFile } = require("../src/requestsHandlers");

const files = {
  "./public/numbers": "0\n1\n2\n3\n4",
  "./public/alphabet": "abcd"
};

describe("serveFile", function() {
  const req = {};
  it("should serve the file content, status code as 200", function() {
    const res = {
      content: undefined,
      statusCode: undefined,
      write: function(x) {
        this.content = x;
      },
      end: function() {
        assert.equal(this.content, "0\n1\n2\n3\n4");
        assert.equal(this.statusCode, 200);
      }
    };

    req.url = "/numbers";
    serveFile(files, req, res);
  });

  it("should give status code as 404 and content as not found", function() {
    const res = {
      content: undefined,
      statusCode: undefined,
      write: function(x) {
        this.content = x;
      },
      end: function() {
        assert.equal(this.content, "404 Not found");
        assert.equal(this.statusCode, 404);
      }
    };

    req.url = "/abc";
    serveFile(files, req, res);
  });
});
