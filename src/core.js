(function () {
  var nativeSubmit = HTMLFormElement.prototype.submit;
  var TYPES = {}; // Custom types
  var VALIDITY_KEYS = ['patternMismatch', 'rangeOverflow', 'rangeUnderflow', 'stepMismatch', 'tooLong', 'typeMismatch', 'valueMissing'];
  var DEFAULT_MESSAGES = {}; // @see https://www.w3schools.com/js/js_validation_api.asp
  var validateForm;
  var validateInput;
  var getFormButton;

  /**
   * Navite Submit Hook
   */
  HTMLFormElement.prototype.submit = function () {
    var result;
    var btn;

    if (this.hasAttribute('novalidate')) {
      return nativeSubmit.call(this);
    }

    result = validateForm(this);
    if (result === true) {
      nativeSubmit.call(this);
    } else {
      btn = getFormButton(this);
      btn.click();
    }
  };

  /**
   * Get form submit button if it's exist, add new invisible button if none.
   * @param  { FormElement } form
   * @return { Button }  The submit button
   */
  getFormButton = function (form) {
    var btn = form.querySelector('button,input[type=submit]');
    if (btn) return btn;

    btn = document.createElement('button');
    btn.style.display = 'none';
    form.appendChild(btn);
    return btn;
  };

  /**
   * Button or Input which type is submit will trigger click event
   * that can show invalid message for input by browser with default behavior.
   **/
  document.body.addEventListener('click', function (e) {
    var form = e.target;
    var button = e.target;

    if (button.nodeName === 'BUTTON' || (button.nodeName === 'INPUT' && button.type.toLowerCase() === 'submit')) {
      // submit button
    } else {
      // Not a submit button, just return.
      return;
    }

    while (form.nodeName !== 'FORM') {
      form = form.parentNode;
      if (form.nodeName === 'BODY') return;
    }

    validateForm(form);
  });

  /**
   * Validate Form
   * @param  { FormElement } form
   * @param  { Bool } validateAllInputs  validate all inputs or not.
   * @return { [Bool, InputElement] }  true if all inputs is valided, or return first invalid input.
   */
  validateForm = function (form, validateAllInputs) {
    var inputs = form.querySelectorAll('input');
    var i = 0;
    var invalidInput;

    for (; i < inputs.length; i += 1) {
      if (validateInput(inputs[i]) !== true) {
        // If we should not validate all inputs, just return first invalid input.
        if (!validateAllInputs) {
          return inputs[i];
        }
        // Save first invalid input to invalidInput
        if (!invalidInput) invalidInput = inputs[i];
      }
    }
    // Return invalid input if exist.
    if (invalidInput) return invalidInput;
    return true;
  };

  /**
   * Validate a single input.
   * @param  {[type]} input [description]
   * @return {[type]}       [description]
   */
  validateInput = function (input) {
    var validity = input.validity;
    var key;
    var i = 0;
    var type = input.getAttribute('type');
    var typeMessage;

    for (; i < VALIDITY_KEYS.length; i += 1) {
      key = VALIDITY_KEYS[i];
      if (validity[key]) {
        input.dispatchEvent(new CustomEvent('input-invalid', { bubbles: true }));
        return input.setCustomValidity(input.title || DEFAULT_MESSAGES[key] || input.validationMessage);
      }
    }

    if (TYPES[type]) {
      typeMessage = TYPES[type](input.value, input);
      if (typeMessage) {
        input.dispatchEvent(new CustomEvent('input-invalid', { bubbles: true }));
        return input.setCustomValidity(input.title || typeMessage);
      }
    }

    input.dispatchEvent(new CustomEvent('input-valid', { bubbles: true }));
    input.setCustomValidity('');
    return true;
  };

  /**
   * Input listener to validate input realtime.
   */
  document.body.addEventListener('input', function (e) {
    var form = e.target;
    while (form.nodeName !== 'FORM') {
      form = form.parentNode;
      if (form.nodeName === 'BODY') return;
    }
    validateForm(form);
  });

  /**
   * HTMLInputValidatorElement APIS
   * * setDefaultMessages set default messages for different errors.
   * * registerType register custom type
   */
  window.HTMLInputValidatorElement = {
    setDefaultMessages: function (msg) {
      DEFAULT_MESSAGES = Object.assign(DEFAULT_MESSAGES, msg);
    },
    registerType: function (type, func) {
      TYPES[type] = func;
    }
  };
}());
