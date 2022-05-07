class TodoList {
  constructor() {
    this.el = document.querySelector("#app");
    this.todoInput = new TodoInput(this);
    this.todos = [];
  }

  addTodo(text) {
    const todo = new Todo(this);
    todo.setText(text);
    this.todos.unshift(todo);
    this.el.appendChild(todo.el);
    this.reorderTodos();
  }

  reorderTodos() {
    this.todos = this.todos.sort((a, b) => a.done - b.done);
    for (const todo of this.todos) {
      this.el.removeChild(todo.el);
      this.el.appendChild(todo.el);
    }
  }
}

class TodoInput {
  constructor(todoList) {
    this.el = document.querySelector("#todo-input");
    this.el.addEventListener("keyup", this.onKeyUp.bind(this));
    this.todoList = todoList;
  }

  onKeyUp(e) {
    const ENTER_KEY = 13;
    if (e.keyCode == ENTER_KEY) {
      this.todoList.addTodo(this.el.value);
      this.el.value = "";
    }
  }
}

class Todo {
  constructor(todoList) {
    this.todoList = todoList;
    this.done = false;

    this.todoText = document.createElement("span");

    this.doneButton = document.createElement("a");
    this.doneButton.href = "#";
    this.doneButton.innerText = "Done";
    this.doneButton.style.paddingLeft = "5px";
    this.doneButton.addEventListener("click", this.setDone.bind(this));

    this.el = document.createElement("div");
    this.el.appendChild(this.todoText);
    this.el.appendChild(this.doneButton);
  }

  setText(text) {
    this.todoText.innerText = text;
  }

  setDone() {
    this.el.removeChild(this.doneButton);
    this.todoText.style.textDecoration = "line-through";
    this.done = true;
    this.todoList.reorderTodos();
  }
}

export default () => {
  new TodoList();
};
