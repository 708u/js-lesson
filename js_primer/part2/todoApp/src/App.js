import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListView } from "./view/TodoListView.js";
import { render } from "./view/html-util.js";

export class App {
    constructor({ form: formElement, input: inputElement, container: containerElement, todoItemCount: todoItemCountElement }) {
        this.todoListModel = new TodoListModel();
        this.todoListView = new TodoListView();

        this.form = formElement;
        this.input = inputElement;
        this.container = containerElement;
        this.todoItemCount = todoItemCountElement;

        // binding
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleAdd(title) {
        this.todoListModel.addTodo(new TodoItemModel({ title, completed: false}));
    }

    handleUpdate({ id, completed}) {
        this.todoListModel.updateTodo({ id, completed});
    }

    handleDelete({ id }) {
        this.todoListModel.deleteTodo({ id });
    }

    handleSubmit(event) {
        event.preventDefault();
        const inputElement = this.input;
        this.handleAdd(inputElement.value);
        this.input.value = "";
    }

    mount() {
        this.todoListModel.onChange(() => {
            const todoItems = this.todoListModel.getTodoItems();
            const todoListElement = this.todoListView.createElement(todoItems, {
                onUpdateTodo: ({ id, completed }) => this.handleUpdate({ id, completed}),
                onDeleteTodo: ({ id }) => this.handleDelete({ id }),
            });
            render(todoListElement, this.container);
            this.todoItemCount.textContent = `todoアイテム数: ${this.todoListModel.getTotalCount()}`;
        });

        this.form.addEventListener("submit", this.handleSubmit);
    }
}
