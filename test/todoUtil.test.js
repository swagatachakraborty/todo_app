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
    let expectedOutput = `<tr><td>&#128467</td><td id="game">game</td><td><td><input type='button' value=&#128465 onclick='deleteTodo("game")' /></td></td></tr><tr><td>&#128467</td><td id="study">study</td><td><td><input type='button' value=&#128465 onclick='deleteTodo("study")' /></td></td></tr>`;
    const actual = todoListsHtml(user);
    assert.equal(actual, expectedOutput);
  });
});
