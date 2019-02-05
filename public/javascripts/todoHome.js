const displayEditTodo = function() {
  const clickedTodo = event.target.id;
  if (!clickedTodo || clickedTodo == "todo_list") return;
  document.getElementById("currentTodo").value = clickedTodo;
  document.getElementById("todoListForm").submit();
};

const deleteTodo = function(todo) {
  fetch("/deleteTodo", {
    method: "POST",
    body: `todo=${todo}`,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded"
    }
  })
    .then(res => {
      return res.text();
    })
    .then(itemHtml => {
      document.getElementById("todo_list").innerHTML = itemHtml;
    });
};
