const assert = require("assert");
const { getFilePath, parse, setCookie, decode } = require("../src/util");

describe("getFilePath", function() {
  it("should give path of login.html when the url is /", function() {
    let expectedOutput = "./public/login.html";
    assert.equal(getFilePath("/"), expectedOutput);
  });

  it("should add ./public with the given url if it is not /", function() {
    let expectedOutput = "./public/signup.html";
    assert.equal(getFilePath("/signup.html"), expectedOutput);
  });
});

describe("parse", function() {
  it("should parse the given content and return an object", function() {
    let expectedOutput = {
      name: "abc",
      password: "123abc"
    };
    let input = "name=abc&password=123abc";
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
    setCookie(res, "abc");
    let expectedOutput = "email=abc";
    let actual = res.headers.cookie;
    assert.deepEqual(actual, expectedOutput);
  });
});

describe("decode", () => {
  it("behaviour", () => {
    let string = "%40+%2C+%21+%28+%29";
    let expectedOutput = "@ , ! ( )";
    let actual = decode(string);
    assert.equal(actual, expectedOutput);
  });
});
