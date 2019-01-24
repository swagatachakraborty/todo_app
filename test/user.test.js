const assert = require("assert");
const { User } = require("../src/user");

const user = new User("name", "email", "password");

describe("isValid", function() {
  it("should return true if the given password is right", function() {
    assert.equal(user.isValid("password"), true);
  });

  it("should return false if the given password is wrong", function() {
    assert.equal(user.isValid("wrong"), false);
  });
});
