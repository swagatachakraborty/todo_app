const displayEditTodo = function() {
  const clickedTodo = event.target.id;
  if (!clickedTodo || clickedTodo == "todo_list") return;
  document.cookie = "currentTodo=" + clickedTodo;
  location.href = "/editTodo.html";
};

const deleteTodo = function(todo) {
  fetch("/deleteTodo", {
    method: "POST",
    body: todo
  })
    .then(res => {
      return res.text();
    })
    .then(itemHtml => {
      document.getElementById("todo_list").innerHTML = itemHtml;
    });
};
