class Todo {
  constructor(title, description = "", items = []) {
    this.title = title;
    this.description = description;
    this.items = items;
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
    this.items.push(item);
  }

  deleteItem(item) {
    let index = this.items.indexOf(item);
    this.items.splice(index, 1);
  }
}

module.exports = { Todo };
