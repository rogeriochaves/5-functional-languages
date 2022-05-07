export default () => {
  const todoList = document.querySelector("#app");

  function render(state) {
    const currentDiv = todoList.querySelector("div");
    if (currentDiv) {
      void todoList.removeChild(todoList.querySelector("div"));
    }

    const orderedTodos = state.todos.sort((a, b) => a.done - b.done);
    const listItems = orderedTodos.map((todo) => {
      return `<span style="${
        todo.done ? "text-decoration: line-through" : ""
      }">${todo.text}</span>${
        todo.done ? "" : `<a href="#" style="padding-left: 5px">Done</a>`
      }`;
    });

    const el = createElementFromHtml(`
      <input id="todo-input" type="text" value="" />
      ${listItems.join("")}
    `);

    void el.querySelectorAll("a").forEach((el, index) => {
      void el.addEventListener("click", () => {
        const newState = {
          todos: state.todos.map((todo, i) => {
            if (i == index) {
              return { ...todo, done: true };
            } else {
              return todo;
            }
          }),
        };
        void render(newState);
      });
    });

    void el.querySelector("input").addEventListener("keyup", (e) => {
      const ENTER_KEY = 13;
      if (e.keyCode == ENTER_KEY) {
        void addTodo(state, e.target.value);
      }
    });

    void todoList.appendChild(el);
  }

  function addTodo(state, text) {
    const todo = {
      done: false,
      text,
    };

    void render({
      todos: [todo, ...state.todos],
    });
  }

  const initialState = {
    todos: [],
  };

  void render(initialState);
};

function createElementFromHtml(html) {
  const el = document.createElement("div");
  // eslint-disable-next-line fp/no-mutation, no-implicit-side-effects/no-implicit-side-effects
  el.innerHTML = html;

  return el;
}
