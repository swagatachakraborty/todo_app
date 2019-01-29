const withTags = function(tag, content, attribute, value) {
  if (attribute) {
    return `<${tag} ${attribute}="${value}">${content}</${tag}>`;
  }
  return `<${tag}>${content}</${tag}>`;
};

const todoListsHtml = function(user) {
  let allTodoLists = Object.keys(user["todoList"]);
  let withLi = allTodoLists.map(element =>
    createListItem(user.todoList[element])
  );
  return withLi.join("");
};

const createListItem = function(element) {
  let withDt = withTags("dt", element.description);
  withDt = withTags("em", withDt);
  let withLi = withTags("li", element.title + withDt, "id", element.title);
  return withLi;
};

const createItemsView = function(items) {
  const allItems = Object.keys(items);
  const rows = allItems.map(element => createRow(items[element]));
  return withTags("table", rows.join(""));
};

const createRow = function(element) {
  const value = withTags("td", element.value);
  const hasChecked = element.status ? "checked" : "unchecked";

  const status = withTags(
    "td",
    `<input type='checkbox' id='${
      element.value
    }' ${hasChecked} onclick='toggleState("${element.value}")' />`
  );

  const editButton = withTags(
    "td",
    `<input type='button' value='edit' onclick='editItem("${
      element.value
    }")' />`
  );

  const deleteButton = withTags(
    "td",
    `<input type='button' value=&#128465 onclick='deleteItem("${
      element.value
    }")' />`
  );
  return withTags("tr", status + value + editButton + deleteButton);
};

module.exports = {
  todoListsHtml,
  createItemsView
};
