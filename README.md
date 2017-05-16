# input-validator
Lightweight validator for input control.

If you only use `core.js`. You will see different notification on different browser.

| Chrome | Firefox | IE |
| --- | --- | --- |
| ![chrome](./assets/noti/chrome.png) | ![firefox](./assets/noti/firefox.png) | ![ie](./assets/noti/ie.png) |

Test this [core feature online](https://zhoukekestar.github.io/input-validator/test/core.html).

# API
* `HTMLInputValidatorElement.setDefaultMessages` to set messages for `patternMismatch`, `valueMissing` and so on.
* `HTMLInputValidatorElement.registerType` to register your custom type.

# Dispatch Event
This is an enhancement feature (not W3C).
* `input-valid` if an input set a valid value.
* `input-invalid` if an input set a invalid value.
* `invalid` Native event that can't bubbles to parent node.

# Submit
This is an enhancement feature (not W3C).

Browser won't check validity if you call native submit by js. We hook the native submit to check validity.

# Browser Compatibility
* `checkValidity` [IE 10+](http://caniuse.com/#search=checkValidity)

# Read More
* [constraintvalidation on html5rocks](https://www.html5rocks.com/en/tutorials/forms/constraintvalidation/)
* [Form_validation on MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Forms/Form_validation)
