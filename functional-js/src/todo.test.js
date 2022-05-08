import { beforeEach, describe, expect, it } from "vitest";
/**
 * @vitest-environment jsdom
 */

import main from "./todo";

// Fix for https://github.com/jsdom/jsdom/issues/1245
Object.defineProperty(HTMLElement.prototype, "innerText", {
  set(text) {
    this.innerHTML = text;
  },
  get() {
    return this.textContent;
  },
});

describe("Todo App", () => {
  let app;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="app">
        <input id="todo-input" type="text" />
      </div>
    `;
    main();

    app = document.querySelector("#app");
  });

  it("adds a new todo, cleaning the input field", () => {
    let input = document.querySelector("#todo-input");
    input.value = "Foo";
    input.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 13 }));

    expect(input.value).toBe("");
    expect(app.innerText).toContain("Foo");
  });

  it("checks a todo as done removing it from the dom", () => {
    let input = document.querySelector("#todo-input");
    input.value = "Foo";
    input.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 13 }));

    input = document.querySelector("#todo-input");
    input.value = "Bar";
    input.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 13 }));

    expect(app.innerText).toMatch(/Foo.*Bar/);

    const doneButton = Array.from(app.querySelectorAll("a")).find(
      (el) => el.innerText == "Done"
    );
    doneButton.click();

    expect(app.innerText.trim()).toMatch(/^Bar/);
  });
});
