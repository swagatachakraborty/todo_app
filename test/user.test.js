const assert = require("assert");
const { User } = require("../src/user");
const { Todo } = require("../src/todo");

const user = new User("name", "email", "password");

describe("isValid", function() {
  it("should return true if the given password is right", function() {
    assert.equal(user.isValid("password"), true);
  });

  it("should return false if the given password is wrong", function() {
    assert.equal(user.isValid("wrong"), false);
  });
});

describe("addTodo", function() {
  it("should add todo to the user todo object", function() {
    let todo = new Todo("game", "cricket", ["practice"]);

    let expectedOutput = {
      game: {
        title: "game",
        description: "cricket",
        items: ["practice"]
      }
    };

    user.addTodo(todo);
    assert.deepEqual(user.getTodoList(), expectedOutput);
  });
});

describe("getTodo", function() {
  it("should give the specified todo object", function() {
    let todo1 = new Todo("game", "cricket", ["practice"]);
    let todo2 = new Todo("study", "java", ["class"]);

    let expectedOutput = {
      title: "game",
      description: "cricket",
      items: ["practice"]
    };

    user.addTodo(todo1);
    user.addTodo(todo2);
    assert.deepEqual(user.getTodo("game"), expectedOutput);
  });
});
