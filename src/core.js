;(function () {
  var nativeSubmit = HTMLFormElement.prototype.submit;
  var validateForm;
  var validateInput;
  var getFormButton = function (form) {
    var btn = form.querySelector('button,input[type=submit]');
    if (btn) return btn;

    btn = document.createElement('button');
    btn.style.display = 'none';
    form.appendChild(btn);
    return btn;
  }
  // @see https://www.w3schools.com/js/js_validation_api.asp
  var MESSAGES = {
    patternMismatch: '匹配出错',
    rangeOverflow: '数值过大',
    rangeUnderflow: '数值过小',
    stepMismatch: '步长错误',
    tooLong: '输入长度过长',
    typeMismatch: '类型错误',
    valueMissing: '必须填写',
  }

  HTMLFormElement.prototype.submit = function () {
    if (this.hasAttribute('novalidate')) {
      return nativeSubmit.call(this);
    }

    var result = validateForm(this);
    if (result === true) {
      nativeSubmit.call(this);
    } else {
      var btn = getFormButton(this);
      btn.click();
      console.log(result + ' is invalid.')
    }
  }

  /**
   * Button or Input which type is submit will trigger click event
   * that can show invalid message for input by browser with default behavior.
   **/
  document.body.addEventListener('click', function (e) {
    validateForm(this);
  })

  validateForm = function (form) {
    var inputs = form.querySelectorAll('input');
    var i = 0;

    for (; i < inputs.length; i += 1) {
      if (validateInput(inputs[i]) !== true) {
        return inputs[i];
      }
    }
    return true;
  }

  validateInput = function (input) {
    var validity = input.validity;

    if (validity.patternMismatch) {
      return input.setCustomValidity(input.title || MESSAGES.patternMismatch);
    }

    if (validity.rangeOverflow) {
      return input.setCustomValidity(input.title || MESSAGES.rangeOverflow);
    }

    if (validity.rangeUnderflow) {
      return input.setCustomValidity(input.title || MESSAGES.rangeUnderflow);
    }

    if (validity.stepMismatch) {
      return input.setCustomValidity(input.title || MESSAGES.stepMismatch);
    }

    if (validity.tooLong) {
      return input.setCustomValidity(input.title || MESSAGES.tooLong);
    }

    if (validity.typeMismatch) {
      return input.setCustomValidity(input.title || MESSAGES.typeMismatch);
    }

    if (validity.valueMissing) {
      return input.setCustomValidity(input.title || MESSAGES.valueMissing);
    }

    input.setCustomValidity('');
    return true;
  }

  document.body.addEventListener('input', function (e) {
    validateInput(e.target);
  })
})();
