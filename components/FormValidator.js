class FormValidator {
  constructor(settings, formEl) {
    this._inputSelector = settings.inputSelector;
    this._submitButtonSelector = settings.submitButtonSelector;
    this._errorClass = settings.errorClass;
    this._inputErrorClass = settings.errorClass;
    this._inactiveButtonClass = settings.inactiveButtonClass;
    this._formEl = formEl;
  }

  showInputError(inputElement) {
    this._errorElementId = `#${inputElement.id}-error`;
    this._errorElement = formElement.querySelector(errorElementId);
    this._inputElement.classList.add(settings.inputErrorClass);
    this._errorElement.textContent = errorMessage;
    this._errorElement.classList.add(settings.errorClass);
  }

  hideInputError(inputElement) {
    this._errorElementId = `#${inputElement.id}-error`;
    this._errorElement = formElement.querySelector(errorElementId);
    this._inputElement.classList.remove(settings.inputErrorClass);
    this._errorElement.classList.remove(settings.errorClass);
    this._errorElement.textContent = "";
  }

  resetValidation() {
    this._disableSubmitButton();
    this._resetForminputs();
  }

  hasInvalidInput = () => {
    this._return = this._inputList.some((inputElement) => {
      this._return = !inputElement.validity.valid;
    });
  };

  toggleButtonState = () => {
    if (this.hasInvalidInput()) {
      this._buttonElement.classList.add(this._inactiveButtonClass);
      this._buttonElement.disabled = true;
    } else {
      this._buttonElement.classList.remove(this._inactiveButtonClass);
      this._buttonElement.disabled = false;
    }
  };

  _checkInputValidity(inputElement) {
    if (!inputElement) {
      showInputError(
        this._formElement,
        this._inputElement,
        this._inputElement.validationMessage,
        this._settings
      );
    } else {
      this.hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._inputList = Array.from(
      this._formEl.querySelectorAll(this._inputSelector)
    );
    this._buttonElement = this._formEl.querySelector(
      this._submitButtonSelector
    );

    this.toggleButtonState();

    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this.toggleButtonState();
      });
    });
  }

  enableValidation() {
    this._formEl.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}

export default FormValidator;
