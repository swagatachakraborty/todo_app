const assert = require("assert");
const { Todo } = require("../src/todo");

const todo = new Todo("study", "javascript");

describe("Todo", function() {
  it("changeTitle: should change the existing todo title", function() {
    todo.changeTitle("language");
    assert.equal(todo.getTitle(), "language");
  });

  it("changeDescription: should change the existing description ", function() {
    todo.changeDescription("java");
    assert.equal(todo.getDescription(), "java");
  });

  it("addItem: should change the existing description ", function() {
    todo.addItem("read class");
    let expectedOutput = ["read class"];
    assert.deepEqual(todo.getItems(), expectedOutput);
  });

  it("deleteItem: should change the existing description ", function() {
    todo.deleteItem("read class");
    let expectedOutput = [];
    assert.deepEqual(todo.getItems(), expectedOutput);
  });
});
