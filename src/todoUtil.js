const withTags = function(tag, content, attribute, value) {
  if (attribute) {
    return `<${tag} ${attribute}="${value}">${content}</${tag}>`;
  }
  return `<${tag}>${content}</${tag}>`;
};

const createButton = function(value, onclick) {
  return `<input type='button' value=${value} onclick='${onclick}' />`;
};

const createCheckBox = function(id, hasChecked, onclick) {
  return `<input type='checkbox' id='${id}' ${hasChecked} onclick='${onclick}' />`;
};
//-------------------------------------------- todo.html todo-list

const todoListsHtml = function(user) {
  const allTodoLists = Object.keys(user["todoList"]);
  const todoList = allTodoLists.map(element => {
    return createTitleRow(user.todoList[element]);
  });
  return todoList.join("");
};

const createTitleRow = function(element) {
  const bullet = withTags("td", "&#128467");
  const button = createButton(`&#128465`, `deleteTodo("${element.title}")`);
  const deleteButton = withTags("td", button);
  const todoTitle = withTags("td", element.title, "id", element.title);
  const deleteTitle = withTags("td", deleteButton);
  return withTags("tr", bullet + todoTitle + deleteTitle);
};

//-------------------------------------------- editTodo.html item-list

const createItemsView = function(items) {
  const allItems = Object.keys(items);
  const rows = allItems.map(element => createItemRow(items[element]));
  return withTags("table", rows.join(""));
};

const createItemRow = function(element) {
  const value = withTags("td", element.value, "id", element.value + "Item");
  const hasChecked = element.status ? "checked" : "unchecked";

  const status = withTags(
    "td",
    createCheckBox(element.value, hasChecked, `toggleState("${element.value}")`)
  );

  const editButton = withTags(
    "td",
    createButton(`Edit`, `editItem("${element.value}")`),
    "id",
    element.value + "Button"
  );

  const deleteButton = withTags(
    "td",
    createButton(`&#128465`, `deleteItem("${element.value}")`)
  );
  return withTags("tr", status + value + editButton + deleteButton);
};

module.exports = {
  todoListsHtml,
  createItemsView
};
