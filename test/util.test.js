const assert = require("assert");
const { parse, setCookie, decode } = require("../src/util");

describe("parse", function() {
  it("should parse the given content and return an object", function() {
    let expectedOutput = {
      name: "abc",
      password: "123abc"
    };
    let input = "name=abc&password=123abc";
    assert.deepEqual(parse(input), expectedOutput);
  });

  it("should return object with empty string key with empty string as value", function() {
    let expectedOutput = {
      "": ""
    };
    let input = undefined;
    assert.deepEqual(parse(input), expectedOutput);
  });
});

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

describe("decode", () => {
  it("should decode the givn data when encoded string is given", () => {
    let string = "%40+%2C+%21+%28+%29";
    let expectedOutput = "@ , ! ( )";
    let actual = decode(string);
    assert.equal(actual, expectedOutput);
  });

  it("should return empty string when encoded string is not given", () => {
    let string = undefined;
    let expectedOutput = "";
    let actual = decode(string);
    assert.equal(actual, expectedOutput);
  });
});
