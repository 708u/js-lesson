import { App } from "./src/App.js";

const formElement = document.querySelector("#js-form");
const inputElement = document.querySelector("#js-form-input");
const containerElement = document.querySelector("#js-todo-list");
const todoItemCountElement = document.querySelector("#js-todo-count");
const app = new App({form: formElement, input: inputElement, container: containerElement, todoItemCount: todoItemCountElement});

addEventListener('load', () => {
    app.mount();
})

addEventListener('unload', () => {
    app.unmount();
})
