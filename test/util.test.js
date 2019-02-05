const assert = require("assert");
const { setCookie } = require("../src/util");

describe("setCookie", () => {
  const res = {
    headers: {
      cookie: undefined
    },
    setHeader: function(key, value) {
      if (key != "Set-Cookie") return;
      this.headers.cookie = value;
    }
  };

  it("should set the cookie to response headers", () => {
    setCookie(res, "email", "abc");
    let expectedOutput = "email=abc";
    let actual = res.headers.cookie;
    assert.deepEqual(actual, expectedOutput);
  });
});
