const displayEditTodo = function() {
  const clickedTodo = event.target.id;
  if (!clickedTodo) return;
  document.cookie = "currentTodo=" + clickedTodo;
  location.href = "/editTodo.html";
};

window.onload = () => {
  document.getElementById("todo_list").onclick = displayEditTodo;
};
