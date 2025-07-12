class Todo {
  constructor(data, selector, handleCheck, handleDelete) {
    this._data = data;
    this._templateElement = document.querySelector(selector);
    this._handleCheck = handleCheck;
    this._handleDelete = handleDelete;
  }

  _setEventListener() {
    //  Set up delete button
    const todoDeleteBtn = this._todoElement.querySelector(".todo__delete-btn");
    if (todoDeleteBtn) {
      todoDeleteBtn.addEventListener("click", () => {
        this._todoElement.remove();

        // Call external delete handler
        if (typeof this._handleDelete === "function") {
          this._handleDelete(this._data);
        }
      });
    }

    //  Set up checkbox toggle
    if (this._todoCheckboxEl) {
      this._todoCheckboxEl.addEventListener("change", () => {
        this._data.completed = !this._data.completed;
        this._handleCheck(this._data.completed);
        //  Call external check handler
        // if (typeof this._handleCheck === "function") {
        //   this._handleCheck(this._data);
        // }
      });
    }
  }

  _generateCheckboxEl() {
    this._todoCheckboxEl = this._todoElement.querySelector(".todo__completed");
    this._todoLabel = this._todoElement.querySelector(".todo__label");

    this._todoCheckboxEl.checked = this._data.completed;
    this._todoCheckboxEl.id = `todo-${this._data.id}`;
    this._todoLabel.setAttribute("for", `todo-${this._data.id}`);
  }

  getView() {
    this._todoElement = this._templateElement.content
      .querySelector(".todo")
      .cloneNode(true);

    const todoNameEl = this._todoElement.querySelector(".todo__name");
    const todoDate = this._todoElement.querySelector(".todo__date");

    todoNameEl.textContent = this._data.name;

    this._dueDate = this._data.date ? new Date(this._data.date) : null;
    if (!isNaN(this._dueDate)) {
      todoDate.textContent = `Due: ${this._dueDate.toLocaleString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}`;
    }

    this._generateCheckboxEl();
    this._setEventListener();

    return this._todoElement;
  }
}

export default Todo;
