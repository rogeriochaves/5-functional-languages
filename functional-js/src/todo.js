const main = () => {
  let todoList = document.querySelector("#app");
  let todoInput = document.querySelector("#todo-input");

  let state = {
    todos: [],
  };

  class TodoList {
    constructor() {
      new TodoInput(todoList);
    }

    static addTodo(text) {
      new Todo(text);
      TodoList.reorderTodos();
    }

    static reorderTodos() {
      state.todos = state.todos.sort((a, b) => a.done - b.done);
      for (const todo of state.todos) {
        todoList.removeChild(todo.el);
        todoList.appendChild(todo.el);
      }
    }
  }

  class TodoInput {
    constructor() {
      todoInput.addEventListener("keyup", TodoInput.onKeyUp);
    }

    static onKeyUp(e) {
      const ENTER_KEY = 13;
      if (e.keyCode == ENTER_KEY) {
        TodoList.addTodo(todoInput.value);
        todoInput.value = "";
      }
    }
  }

  class Todo {
    constructor(text) {
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

      todo.doneButton.addEventListener("click", Todo.setDone(todo));

      Todo.setText(todo, text);

      state.todos.unshift(todo);
    }

    static setText(todo, text) {
      todo.todoText.innerText = text;
    }

    static setDone(todo) {
      return () => {
        todo.el.removeChild(todo.doneButton);
        todo.todoText.style.textDecoration = "line-through";
        todo.done = true;
        TodoList.reorderTodos();
      };
    }
  }

  new TodoList();
};

export default () => {
  main();
};
