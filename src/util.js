const createInstanceOf = function(protoClass, object) {
  if (!object) return;
  object.__proto__ = protoClass.prototype;
  return object;
};

const isInvalidPassWord = function(User, userObj, password) {
  let user = createInstanceOf(User, userObj);
  if (user.isValid(password)) return false;
  return true;
};

const getCurrentTodo = function(CURRENTUSER, req) {
  const currentTodo = req.cookies.currentTodo;
  return CURRENTUSER.todoList[currentTodo];
};

module.exports = {
  createInstanceOf,
  getCurrentTodo,
  isInvalidPassWord
};
