const withTags = function(tag, content, attribute, value) {
  if (attribute) {
    return `<${tag} ${attribute}="${value}">${content}</${tag}>`;
  }
  return `<${tag}>${content}</${tag}>`;
};

const todoListsHtml = function(user) {
  const allTodoLists = Object.keys(user["todoList"]);

  const todoList = allTodoLists.map(element => {
    return createTitleRow(user.todoList[element]);
  });

  return todoList.join("");
};

const createTitleRow = function(element) {
  const bullet = withTags("td", "&#128467");
  const deleteButton = withTags(
    "td",
    `<input type='button' value=&#128465 onclick='deleteTodo("${
      element.title
    }")' />`
  );

  const todoTitle = withTags("td", element.title, "id", element.title);
  const deleteTitle = withTags("td", deleteButton);

  return withTags("tr", bullet + todoTitle + deleteTitle);
};

//-------------------------∏

const createItemsView = function(items) {
  const allItems = Object.keys(items);
  const rows = allItems.map(element => createItemRow(items[element]));
  return withTags("table", rows.join(""));
};

const createItemRow = function(element) {
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
