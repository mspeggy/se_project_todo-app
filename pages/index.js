import { v4 as uuidv4 } from "https://jspm.dev/uuid";

import { initialTodos, validationConfig } from "../utils/constants.js";

import Todo from "../components/Todo.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithForm from "../components/PopupWithForm.js";
import TodoCounter from "../components/TodoCounter.js";

const addTodoButton = document.querySelector(".button_action_add");
const addTodoPopupEl = document.querySelector("#add-todo-popup");
const addTodoForm = addTodoPopupEl.querySelector(".popup__form");
const addTodoCloseBtn = addTodoPopupEl.querySelector(".popup__close");
const todosList = document.querySelector(".todos__list");

//  Create counter instance after initialTodos are loaded
const todoCounter = new TodoCounter(initialTodos, ".counter__text");

const handleCheck = (checked) => {
  todoCounter.updateCompleted(checked);
};

const handleDelete = (completed) => {
  todoCounter.updateTotal(false);
  if (completed) {
    todoCounter.updateCompleted(false);
  }
};

const addTodoPopup = new PopupWithForm({
  popupSelector: "#add-todo-popup",
  handleFormSubmit: (inputValues) => {
    const name = inputValues.name;
    const dateInput = inputValues.date;

    // Create a date object and adjust for timezone
    const date = new Date(dateInput);
    date.setMinutes(date.getMinutes() + date.getTimezoneOffset());

    const id = uuidv4();

    const values = { name, date, id, completed: false };

    const todoElement = generateTodo(values);
    todosList.append(todoElement);

    //  Update total counter on add
    todoCounter.updateTotal(true, false);

    newTodoValidator.resetValidation();
    addTodoPopup.close();
  },
});
addTodoPopup.setEventListeners();

const section = new Section({
  items: initialTodos,
  renderer: (item) => {
    const todoElement = generateTodo(item);
    todosList.append(todoElement);
  },
  containerSelector: ".todos__list",
});

//  Render initial todos
section.renderItems();

// Open popup on button click
addTodoButton.addEventListener("click", () => {
  addTodoPopup.open();
});

//  Generate todo with proper callbacks for check/delete
function generateTodo(data) {
  const todo = new Todo(data, "#todo-template", handleCheck, handleDelete);
  return todo.getView();
}

//  Enable form validation
const newTodoValidator = new FormValidator(validationConfig, addTodoForm);
newTodoValidator.enableValidation();
