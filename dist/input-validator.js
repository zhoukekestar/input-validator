/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(3)(undefined);
// imports


// module
exports.push([module.i, ".formValidator-invalid {\n  outline: none !important;\n  border-color: #a94442;\n  border-width: 1px;\n  border-style: solid;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 6px #ce8483;\n  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;\n}\n.formValidator-valid {\n  outline: none !important;\n  border-color: #3c763d;\n  border-width: 1px;\n  border-style: solid;\n  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 6px #67b168;\n  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;\n}\n.formValidator-errorMsgBox {\n  position: absolute;\n  padding: 5px 10px;\n  background-color: #fff;\n  border: solid 1px #a94442;\n  border-radius: 8px;\n  margin-top: 10px;\n  margin-left: -10px;\n  color: #a94442;\n  font-size: 14px;\n  z-index: 9999;\n}\n.formValidator-errorMsgBox:before,\n.formValidator-errorMsgBox:after {\n  content: '';\n  position: absolute;\n  height: 0;\n  width: 0;\n  border: solid 8px;\n  border-color: transparent transparent #a94442;\n  left: 6px;\n  top: -16px;\n}\n.formValidator-errorMsgBox:after {\n  border-color: transparent transparent #fff;\n  top: -15px;\n}\n", ""]);

// exports


/***/ }),
/* 1 */
/***/ (function(module, exports) {

;(function() {

  var defaultHolder = 'body'
    , boxs = [];

  /**
  * Show only one message in one minute.
  */
  var showOnlyOneMessageInOneMinute = true;
  document.addEventListener('invalid', function(e) {

    boxs.push(e.target);

    e.target.classList.add('formValidator-invalid');
    e.target.classList.remove('formValidator-valid');

    /*
    * e._type : [focusout] NOT 'input' event
    */
    if (e._type !== 'input') {

      if (e.target.errorMsgBox && e.target.errorMsgBox.innerHTML !== e._invalidationMessage) {
        // remove & update
        e.target.errorMsgBox.remove()
        e.target.errorMsgBox = null;
      }

      if (!e.target.errorMsgBox) {
        var target = e.target
          , width  = +(getComputedStyle(target).width.split('px')[0])
          , height = +(getComputedStyle(target).height.split('px')[0])
          , top    = document.body.scrollTop + target.getBoundingClientRect().top
          , left   = document.body.scrollLeft + target.getBoundingClientRect().left;

        var errorMsgBox = document.createElement('div');
        errorMsgBox.innerHTML = e._invalidationMessage;
        errorMsgBox.classList.add('formValidator-errorMsgBox');

        // append it to holder
        var holder = e.target.getAttribute('data-errorMsgBoxHolder') || defaultHolder;
        holder = document.querySelector(holder);
        holder.appendChild(errorMsgBox);

        if (holder !== document.body) {

          // Set holder's style
          if (getComputedStyle(holder).position === 'static') {
            holder.style.position = 'relative'
          }
          top -= (document.body.scrollTop + holder.getBoundingClientRect().top);
          top += holder.scrollTop;
          left -= (document.body.scrollLeft + holder.getBoundingClientRect().left);
          left += holder.scrollLeft;
        }


        errorMsgBox.style.left = (left + width / 2) + 'px';
        errorMsgBox.style.top  = (top + height) + 'px';

        e.target.errorMsgBox = errorMsgBox;
      }

      // if (showOnlyOneMessageInOneMinute) {
      //   var alert = window.toast || window.alert;
      //   showOnlyOneMessageInOneMinute = false;
      //   alert(e._invalidationMessage);
      //
      // }
      // setTimeout(function(){
      //   showOnlyOneMessageInOneMinute = true;
      // }, 100)

    }
  })

  document.addEventListener('formOnInvalid-setDefaultHolder', function(e) {
    defaultHolder = e.value;
  })

  document.addEventListener('valid', function(e) {
    var index = boxs.indexOf(e.target);
    (index !== -1) && boxs.splice(index, 1);

    e.target.classList.add('formValidator-valid');
    e.target.classList.remove('formValidator-invalid');
    if (e.target.errorMsgBox) {
      e.target.errorMsgBox.remove()
      e.target.errorMsgBox = null;
    }
  })

  setInterval(function() {
    for (var i = boxs.length - 1; i >= 0; i--) {
      var rect = boxs[i].getBoundingClientRect();
      if (rect.bottom + rect.height + rect.left + rect.right + rect.top + rect.width === 0 && boxs[i].errorMsgBox) {
        boxs[i].errorMsgBox.remove();
        boxs[i].errorMsgBox = null;
      }
    }
  }, 1000)
})();


/***/ }),
/* 2 */
/***/ (function(module, exports) {

;(function() {

  var validator = {

    // Form validation: type=[email,number,cellphone]
    type: function(ele, msg) {

      var value = ele.value;

      // @see https://github.com/jzaefferer/jquery-validation/blob/master/src/core.js
      switch (ele.getAttribute("type")) {
        case undefined:
          return "";
        case "hidden":
          return "";
        case "submit":
          return "";
        case "email":
          return /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/.test(value) ? "" : msg.email;
        case "number":
          return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value) ? "" : msg.number;
        case "cellphone":
          return /^[1][3,4,5,7,8][0-9]{9}$/.test(value) ? "" : msg.cellphone;
        case "integer":
          return /^\d+$/.test(value) ? "" : msg.integer;
        case "url":
          return /^(https?|s?ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(value) ? "" : msg.url;
        case 'date':
          return isNaN(new Date(value).getTime()) ? msg.date : '';
        default:
          return "";
      }

    },
    // Form validation: required.
    required: function(ele, msg) {
      if (ele.getAttribute("required") !== null && !ele.value)
        return msg.required;
      return "";
    },
    // Form validation: pattern.
    pattern: function(ele, msg) {
      if (!ele.getAttribute("pattern"))
        return "";
      var reg = new RegExp(ele.getAttribute("pattern"));
      return reg.test(ele.value) ? "" : msg.pattern;
    },
    // Form validation: data-equalto=[selector].
    equalto: function(ele, msg) {
      if (!ele.getAttribute("data-equalto"))
        return "";
      var ele = document.querySelector(ele.getAttribute("data-equalto"));
      if (ele && ele.value === ele.value)
        return "";
      return msg.equalto;
    },
    minlength: function(ele, msg) {
      var l = ele.getAttribute('minlength');
      if (!l)
        return "";
      l = +l;
      if (ele.value.length >= l) {
        return "";
      } else {
        return msg.minlength.replace("{1}", l);
      }
    },
    maxlength: function(ele, msg) {
      var l = ele.getAttribute('maxlength');
      if (!l)
        return "";
      l = +l;
      if (ele.value.length <= l) {
        return "";
      } else {
        return msg.maxlength.replace("{1}", l)
      }
    },
    defaultMsg: {
      email: "邮箱地址错误",
      number: "数字格式错误",
      cellphone: "手机号错误",
      integer: "请输入整数",
      url: "请输入正确的网址",
      date: "日期错误",
      required: "必须填写",
      pattern: "请输入正确的值",
      equalto: "输入值不同",
      fun: "请输入正确的值",
      minlength: "最小长度为{1}",
      maxlength: "最大长度为{1}"
    }
  }

  var validIt = function() {
    var validMsg = JSON.parse(this.getAttribute('data-validMsg')),
      key,
      msg = {},
      returnMsg;

    for (key in validator.defaultMsg) {
      msg[key] = validator.defaultMsg[key];
    }
    for (key in validMsg) {
      msg[key] = validMsg[key];
    }

    returnMsg =
      // check type
      validator.type(this, msg) ||

      // check required
      validator.required(this, msg) ||

      // check equalto
      validator.equalto(this, msg) ||

      // check pattern
      validator.pattern(this, msg) ||

      // check custom function
      validator.minlength(this, msg) ||

      // check custom function
      validator.maxlength(this, msg);

    return returnMsg;

  }

  var namespace = '_';
  var inputHandler = function(target, type) {

    // Disabled special type input.
    var inputType = target.getAttribute('type');
    if (inputType === 'submit' || inputType === 'hidden')
      return;


    var msg = validIt.call(target) || (target[namespace + 'checkValidity'] && target[namespace + 'checkValidity'].call(target));

    if (msg) {
      target[namespace + 'invalid'] = true;
      target[namespace + 'invalidationMessage'] = msg;

      var e = new Event('invalid', {
        bubbles: true
      });
      e[namespace + 'invalidationMessage'] = msg;
      e[namespace + 'type'] = type;
      target.dispatchEvent(e);

    } else {

      target[namespace + 'invalid'] = false;
      target[namespace + 'invalidationMessage'] = '';

      var e = new Event('valid', {
        bubbles: true
      });
      e[namespace + 'invalidationMessage'] = '';
      e[namespace + 'type'] = type;
      target.dispatchEvent(e);

    }

    msg = msg || '';
    return msg;
  }

  /**
   * Event bind
   *
   */
  document.body.addEventListener('focusout', function(e) {
    if (e.target.getAttribute('data-role') === 'formValidator')
      inputHandler(e.target, e.type)
  })

  document.body.addEventListener('input', function(e) {
    if (e.target.getAttribute('data-role') === 'formValidator' && e.target[namespace + 'invalid'] !== undefined)
      inputHandler(e.target, e.type);
  });

  /**
  * Stop propagation 'submit' event if necessary before bubbling to `document` node.
  */
  document.body.addEventListener('submit', function(e) {

    var inputs = [].slice.apply(e.target.querySelectorAll('[data-role="formValidator"]'));
    var isValid = true;

    for (var i = 0, max = inputs.length; i < max; i++) {

      var type = inputs[i].getAttribute('type');
      if (type === 'submit' || type === 'hidden')
        continue;

      inputHandler(inputs[i], e.type) === '' || (isValid = false);

      // if (!isValid)
      //   break;
    }

    /*
    * Stop everything if invalid input is existed.
    */
    if (!isValid) {
      e.preventDefault();
      e.stopPropagation();
    }

  });

})();


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
__webpack_require__(1);
__webpack_require__(0);


/***/ })
/******/ ]);