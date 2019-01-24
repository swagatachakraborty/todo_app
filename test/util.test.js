const assert = require("assert");
const { getFilePath, parse } = require("../src/util");

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
