class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.inputErrorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formEl = formEl;

    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );
  }

  showInputError(inputElement, errorMessage) {
    const errorElementId = `#${inputElement.id}-error`; //  use backticks and template literal
    const errorElement = this._formEl.querySelector(errorElementId);

    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._errorClass);
  }

  hideInputError(inputElement) {
    const errorElementId = `#${inputElement.id}-error`; 
    const errorElement = this._formEl.querySelector(errorElementId);

    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = "";
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this.showInputError(
        inputElement,
        inputElement.validationMessage
      );
    } else {
      this.hideInputError(inputElement);
    }
  }

  hasInvalidInput = () => {
    return this._inputList.some(
      (inputElement) => !inputElement.validity.valid
    );
  };

  _disableSubmitButton = () => {
    this._buttonElement.classList.add(this._inactiveButtonClass);
    this._buttonElement.disabled = true;
  };

  toggleButtonState = () => {
    if (this.hasInvalidInput()) {
      this._disableSubmitButton();
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  };

  _setEventListeners() {
    this.toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  resetValidation() {
    this._inputList.forEach((inputElement) => {
      this.hideInputError(inputElement);
    });
    this._disableSubmitButton();
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => evt.preventDefault());
    this._setEventListeners();
  }
}

export default FormValidator;