export default () => {
  let todoList = document.querySelector("#app");
  let todoInput = document.querySelector("#todo-input");

  let state = {
    todos: [],
  };

  function addTodo(text) {
    let todo = {};
    todo.done = false;

    todo.todoText = document.createElement("span");

    todo.doneButton = document.createElement("a");
    todo.doneButton.href = "#";
    todo.doneButton.innerText = "Done";
    todo.doneButton.style.paddingLeft = "5px";

    todo.el = document.createElement("div");
    todo.el.appendChild(todo.todoText);
    todo.el.appendChild(todo.doneButton);
    todoList.appendChild(todo.el);

    todo.doneButton.addEventListener("click", () => {
      todo.el.removeChild(todo.doneButton);
      todo.todoText.style.textDecoration = "line-through";
      todo.done = true;
      reorderTodos();
    });

    todo.todoText.innerText = text;

    state.todos.unshift(todo);
    reorderTodos();
  }

  function reorderTodos() {
    state.todos = state.todos.sort((a, b) => a.done - b.done);
    for (const todo of state.todos) {
      todoList.removeChild(todo.el);
      todoList.appendChild(todo.el);
    }
  }

  todoInput.addEventListener("keyup", (e) => {
    const ENTER_KEY = 13;
    if (e.keyCode == ENTER_KEY) {
      addTodo(todoInput.value);
      todoInput.value = "";
    }
  });
};
