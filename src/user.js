class User {
  constructor(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
    this.todoList = {};
  }

  getName() {
    return this.name;
  }

  getEmail() {
    return this.email;
  }

  isValid(enteredPassword) {
    return this.password == enteredPassword;
  }

  addTodo(todo) {
    this.todoList[todo.title] = todo;
  }

  getTodoList() {
    return this.todoList;
  }

  getTodo(title) {
    return this.todoList[title];
  }

  deleteTodo(todoTitle) {
    delete this.todoList[todoTitle];
  }
}

module.exports = { User };
