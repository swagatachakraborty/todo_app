class Item {
  constructor(value, status = false) {
    this.value = value;
    this.status = status;
  }

  editValue(newValue) {
    this.value = newValue;
  }

  toggleStatus() {
    this.status = !this.status;
  }

  getValue() {
    return this.value;
  }

  getStatus() {
    return this.status;
  }
}

module.exports = { Item };
