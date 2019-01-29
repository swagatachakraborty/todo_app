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

const toggleState = function() {
  console.log(event.target.id);
  fetch("/changeItemState", {
    method: "POST",
    body: event.target.id
  });
};

window.onload = function() {
  document.getElementById("add").onclick = addItem;
};
