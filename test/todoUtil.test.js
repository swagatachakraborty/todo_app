const assert = require("assert");
const { todoListsHtml, createItemsView } = require("../src/todoUtil");

const user = {
  name: "tushar",
  email: "tusharst30999%40gmail.com",
  password: "tu",
  todoList: {
    game: {
      title: "game",
      description: "some games",
      items: ["table tanis", "foosball"]
    },
    study: {
      title: "study",
      description: "physics and chem",
      items: ["sub"]
    }
  }
};

describe("todoListsHtml", () => {
  it("should return html code for todo lists of user", () => {
    let expectedOutput = '<li id="game">game<em><dt>some games</dt></em></li>';
    expectedOutput +=
      '<li id="study">study<em><dt>physics and chem</dt></em></li>';
    const actual = todoListsHtml(user);
    assert.equal(actual, expectedOutput);
  });
});

describe("createItemsView", () => {
  it("should return items in html list format", () => {
    const expectedOutput =
      "<table><tr><td><input type='checkbox' id='item1' checked onclick='toggleState()' /></td><td>item1</td></tr><tr><td><input type='checkbox' id='item2' checked onclick='toggleState()' /></td><td>item2</td></tr></table>";
    const items = {
      item1: { value: "item1", status: "TODO" },
      item2: { value: "item2", status: "DONE" }
    };

    const actual = createItemsView(items);
    assert.equal(actual, expectedOutput);
  });
});
