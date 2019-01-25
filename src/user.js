class User {
  constructor(name = "name", email = "email", password = "password") {
    this.name = name;
    this.email = email;
    this.password = password;
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
}

module.exports = { User };
