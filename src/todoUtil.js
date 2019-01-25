const { createInstanceOf } = require("./util");

const withTags = function(tag, content) {
  return `<${tag}>${content}</${tag}>`;
};

const todoListsHtml = function(user) {
  let todoLists = "";
  let allTodoLists = Object.keys(user["todoList"]);

  let withLi = allTodoLists.map(element => {
    let withDt = withTags("dt", user.todoList[element].description);
    withDt = withTags("em", withDt);
    let withLi = withTags("li", user.todoList[element].title + withDt);
    return withLi;
  });
  todoLists = withTags("ul", withLi.join(""));

  return withTags("div", todoLists);
};

module.exports = {
  todoListsHtml
};
