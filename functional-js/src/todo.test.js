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
  let input;

  beforeEach(() => {
    document.body.innerHTML = `
      <div id="app">
        <input id="todo-input" type="text" />
      </div>
    `;
    main();

    app = document.querySelector("#app");
    input = document.querySelector("#todo-input");
  });

  it("adds a new todo, cleaning the input field", () => {
    input.value = "Foo";
    input.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 13 }));

    expect(input.value).toBe("");
    expect(app.innerText).toContain("Foo");
  });

  it("checks a todo as done, moving it to the bottom", () => {
    input.value = "Foo";
    input.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 13 }));

    input.value = "Bar";
    input.dispatchEvent(new KeyboardEvent("keyup", { keyCode: 13 }));

    expect(app.innerText).toMatch(/Bar.*Foo/);

    const doneButton = Array.from(app.querySelectorAll("a")).find(
      (el) => el.innerText == "Done"
    );
    doneButton.click();

    expect(app.innerText).toMatch(/Foo.*Bar/);
  });
});
