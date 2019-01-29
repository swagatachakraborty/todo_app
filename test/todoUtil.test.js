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
