class Todo {
  constructor(title, description = "") {
    this.title = title;
    this.description = description;
    this.items = {};
  }

  getTitle() {
    return this.title;
  }

  getDescription() {
    return this.description;
  }

  getItems() {
    return this.items;
  }

  changeDescription(desc) {
    this.description = desc;
  }

  changeTitle(newTitle) {
    this.title = newTitle;
  }

  addItem(item) {
    this.items[item.value] = item;
  }

  deleteItem(item) {
    delete this.items[item];
  }
}

module.exports = { Todo };
