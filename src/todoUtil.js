const { createInstanceOf } = require("./util");

const withTags = function(tag, content, id) {
  if (id) {
    return `<${tag} id="${id}">${content}</${tag}>`;
  }
  return `<${tag}>${content}</${tag}>`;
};

const todoListsHtml = function(user) {
  let allTodoLists = Object.keys(user["todoList"]);

  let withLi = allTodoLists.map(element => {
    let withDt = withTags("dt", user.todoList[element].description);
    withDt = withTags("em", withDt);
    let withLi = withTags(
      "li",
      user.todoList[element].title + withDt,
      user.todoList[element].title
    );
    return withLi;
  });

  return withLi.join("");
};

const createItemsView = function(items) {
  const withLi = items.map(element => withTags("li", element)).join("");
  return withTags("ul", withLi);
};

module.exports = {
  todoListsHtml,
  createItemsView
};
