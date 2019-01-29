const addItem = function() {
  const newItem = document.getElementById("newItem");
  if (!newItem.value) return;
  fetch("/addItem", {
    method: "POST",
    body: newItem.value
  })
    .then(response => {
      newItem.value = "";
      return response.text();
    })
    .then(itemHtml => {
      document.getElementById("items").innerHTML = itemHtml;
    });
};

const toggleState = function(item) {
  fetch("/changeItemState", {
    method: "POST",
    body: item
  });
};

const deleteItem = function(item) {
  fetch("/deleteItem", {
    method: "POST",
    body: item
  })
    .then(res => {
      return res.text();
    })
    .then(itemHtml => {
      document.getElementById("items").innerHTML = itemHtml;
    });
};

window.onload = function() {
  document.getElementById("add").onclick = addItem;
};
