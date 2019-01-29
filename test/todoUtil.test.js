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
    console.log(actual);
    assert.equal(actual, expectedOutput);
  });
});

describe("createItemsView", () => {
  it("should return items in html list format", () => {
    const expectedOutput = "<ul><li>item1</li><li>item2</li></ul>";
    const items = ["item1", "item2"];
    const actual = createItemsView(items);
    assert.equal(actual, expectedOutput);
  });
});
