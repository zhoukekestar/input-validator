# input-validator
Validator for input control. Test this [online](https://zhoukekestar.github.io/input-validator/test/core.html).

# API
We use `checkValidity` & `setCustomValidity` to validate the input value. [See more details.](https://www.w3schools.com/js/js_validation_api.asp).

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
* [constraintvalidation](https://www.html5rocks.com/en/tutorials/forms/constraintvalidation/)
