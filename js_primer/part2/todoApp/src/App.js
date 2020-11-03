import { TodoListModel } from "./model/TodoListModel.js";
import { TodoItemModel } from "./model/TodoItemModel.js";
import { TodoListView } from "./view/TodoListView.js";
import { render } from "./view/html-util.js";

export class App {
    constructor({ form: formElement, input: inputElement, container: containerElement, todoItemCount: todoItemCountElement }) {
        this.form = formElement;
        this.input = inputElement;
        this.container = containerElement;
        this.todoItemCount = todoItemCountElement;
        this.todoListModel = new TodoListModel();
        this.todoListView = new TodoListView();
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

        this.form.addEventListener("submit", (event) => {
            event.preventDefault();
            this.handleAdd(this.input.value);
            this.input.value = "";
        })
    }
}
