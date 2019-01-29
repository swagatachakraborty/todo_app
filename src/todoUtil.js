const { createInstanceOf } = require("./util");

const withTags = function(tag, content, attribute, value) {
  if (attribute) {
    return `<${tag} ${attribute}="${value}">${content}</${tag}>`;
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
      "id",
      user.todoList[element].title
    );
    return withLi;
  });
  return withLi.join("");
};

const createItemsView = function(items) {
  let allItems = Object.keys(items);

  const withLi = allItems.map(element => {
    let value = withTags("td", items[element].value);
    let hasChecked = items[element].status ? "checked" : "unchecked";
    let status = withTags(
      "td",
      `<input type='checkbox' id='${
        items[element].value
      }' ${hasChecked} onclick='toggleState()' />`
    );
    return withTags("tr", status + value);
  });

  return withTags("table", withLi.join(""));
};

module.exports = {
  todoListsHtml,
  createItemsView
};
