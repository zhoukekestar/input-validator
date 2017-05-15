# input-validator
Validator for input control.

# API
We use `checkValidity` & `setCustomValidity` to validate the input value. [See more details.](https://www.w3schools.com/js/js_validation_api.asp).

# Dispatch Event (Enhancement)
* `input-valid` if an input set a valid value.
* `input-invalid` if an input set a invalid value.
* `invalid` Native event that can't bubbles to parent node.

# Submit (Enhancement)
Browser won't check validity if you call native submit by js. We hook the native submit to check validity.

# Browser Compality
* `checkValidity` [IE 10+](http://caniuse.com/#search=checkValidity)

# Read More
* [constraintvalidation](https://www.html5rocks.com/en/tutorials/forms/constraintvalidation/)
