const assert = require("assert");
const { Item } = require("../src/item");

const item = new Item("study");

describe("toggleStatus", () => {
  it("should change the item value with the new value", () => {
    item.editValue("game");
    const expectedOutput = "game";
    const actual = item.getValue();
    assert.equal(actual, expectedOutput);
  });
});

describe("toggleStatus", () => {
  it("should change the item value with the new value", () => {
    item.toggleStatus();
    const expectedOutput = true;
    const actual = item.getStatus();
    assert.equal(actual, expectedOutput);
  });
});
