const assert = require("assert");
const { Todo } = require("../src/todo");

const todo = new Todo("study", "javascript");

describe("Todo", function() {
  it("should make a empty description when no description is given.", function() {
    let todo = new Todo("game");
    assert.equal(todo.getDescription(), "");
  });

  it("should make a empty item list when no item is given.", function() {
    let todo = new Todo("game");
    assert.deepEqual(todo.getItems(), []);
  });

  it("changeTitle: should change the existing todo title", function() {
    todo.changeTitle("language");
    assert.equal(todo.getTitle(), "language");
  });

  it("changeDescription: should change the existing description ", function() {
    todo.changeDescription("java");
    assert.equal(todo.getDescription(), "java");
  });

  it("addItem: should change the existing description ", function() {
    const item = {
      value: "read class",
      status: false
    };

    todo.addItem(item);

    const expectedOutput = {
      "read class": {
        value: "read class",
        status: false
      }
    };
    assert.deepEqual(todo.getItems(), expectedOutput);
  });

  it("deleteItem: should change the existing description ", function() {
    todo.deleteItem("read class");
    let expectedOutput = {};
    assert.deepEqual(todo.getItems(), expectedOutput);
  });
});
