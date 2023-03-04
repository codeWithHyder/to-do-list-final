"use strict";
(self["webpackChunkto_do_list"] = self["webpackChunkto_do_list"] || []).push([["index"],{

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _modules_subClass_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/subClass.js */ "./src/modules/subClass.js");


const dataCollection = new _modules_subClass_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
dataCollection.load();
dataCollection.displayToDoList();
const getInputValue = id => {
  const inputField = document.querySelector(id);
  const inputValue = inputField.value;
  inputField.value = '';
  return inputValue;
};
const enterBtn = document.querySelector('.enterBtn');
enterBtn.addEventListener('click', event => {
  event.preventDefault();
  const inputValue = getInputValue('#inputField');
  dataCollection.setDataInLocal(inputValue);
  dataCollection.displayToDoList();
});
const clearBtn = document.querySelector('.clearCompleted');
clearBtn.addEventListener('click', () => {
  const checks = document.querySelectorAll('input[type=checkbox]');
  const updateItem = [];
  checks.forEach((checkbox, i) => {
    if (checkbox.checked) {
      dataCollection.data.forEach((item, index) => {
        item.index = index;
      });
      updateItem.push(i);
    }
  });
  const updateList = dataCollection.data.filter((item, i) => !updateItem.includes(i));
  updateList.forEach((item, index) => {
    item.index = index;
  });
  dataCollection.data = updateList;
  localStorage.setItem('toDoList', JSON.stringify(updateList));
  dataCollection.displayToDoList();
});
document.querySelector('.fa-refresh').addEventListener('click', () => {
  window.location.reload();
  document.querySelector('.fa-refresh').classList.add('refresh');
});

/***/ }),

/***/ "./src/modules/mainClass.js":
/*!**********************************!*\
  !*** ./src/modules/mainClass.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Main)
/* harmony export */ });
class Main {
  constructor(task, index, completed) {
    this.task = task;
    this.index = index;
    this.completed = completed;
  }
}

/***/ }),

/***/ "./src/modules/subClass.js":
/*!*********************************!*\
  !*** ./src/modules/subClass.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ DataCollection)
/* harmony export */ });
/* harmony import */ var _mainClass_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mainClass.js */ "./src/modules/mainClass.js");

class DataCollection {
  constructor() {
    this.data = [];
  }
  getNextIndex = () => {
    let maxIndex = 0;
    this.data.forEach(toDoList => {
      if (toDoList.index > maxIndex) {
        maxIndex = toDoList.index;
      }
    });
    return maxIndex + 1;
  };
  setDataInLocal = inputValue => {
    const completed = false;
    const index = this.getNextIndex();
    const task = inputValue;
    const info = new _mainClass_js__WEBPACK_IMPORTED_MODULE_0__["default"](task, index, completed);
    this.data.push(info);
    this.save();
  };
  displayToDoList = () => {
    let items = '';
    this.data.forEach(toDoList => {
      items += `
       <div class="textareaContainer">
          <input type="checkbox" class="checkbox" name="completed" />
          <textarea disabled>${toDoList.task}</textarea>
          <i class="fa fa-ellipsis-v editBtn" ></i>
          <div class="controller">
          <i class="fa fa-save saveBtn"></i>
          <i class="fa fa-trash deleteBtn"></i>
          </div>
      </div>
       <hr>
      `;
    });
    document.querySelector('.displayListCont').innerHTML = items;
    this.DeleteListeners();
    this.EditListeners();
    this.SaveListeners();
    this.checkBox();
  };
  updateCompletedStatus = (index, completed) => {
    this.data[index].completed = completed;
    this.save();
  };
  checkBox = () => {
    const checks = document.querySelectorAll('input[type=checkbox]');
    const inputs = document.querySelectorAll('.textareaContainer textarea');
    checks.forEach((ck, i) => {
      const isCompleted = this.data[i].completed;
      if (isCompleted) {
        inputs[i].classList.add('completed');
        checks[i].setAttribute('checked', 'checked');
      }
      ck.addEventListener('change', () => {
        if (checks[i].checked) {
          inputs[i].classList.add('completed');
          this.updateCompletedStatus(i, true);
        } else {
          inputs[i].classList.remove('completed');
          this.updateCompletedStatus(i, false);
        }
      });
    });
  };
  EditListeners = () => {
    const editBtn = document.querySelectorAll('.editBtn');
    const updateController = document.querySelectorAll('.controller');
    const inputs = document.querySelectorAll('.textareaContainer textarea');
    editBtn.forEach((eb, i) => {
      eb.addEventListener('click', () => {
        updateController[i].style.display = 'flex';
        editBtn[i].style.display = 'none';
        inputs[i].disabled = false;
      });
    });
  };

  /* update item when edit */
  updateItem = (task, i) => {
    this.data[i].task = task;
    this.save();
    this.displayToDoList();
  };
  SaveListeners = () => {
    const saveBtn = document.querySelectorAll('.saveBtn');
    const inputs = document.querySelectorAll('.textareaContainer textarea');
    saveBtn.forEach((sb, i) => {
      sb.addEventListener('click', () => {
        this.updateItem(inputs[i].value, i);
      });
    });
  };
  deleteItem = i => {
    this.data = this.data.filter((item, index) => index !== i);
    this.data.forEach((item, index) => {
      item.index = index + 1;
    });
    this.save();
    this.displayToDoList();
  };
  DeleteListeners = () => {
    const deleteBtn = document.querySelectorAll('.deleteBtn');
    deleteBtn.forEach((btn, i) => {
      btn.addEventListener('click', () => {
        this.deleteItem(i);
      });
    });
  };
  save = () => {
    localStorage.setItem('toDoList', JSON.stringify(this.data));
  };
  load = () => {
    const getDataFromLocal = JSON.parse(localStorage.getItem('toDoList')) || [];
    getDataFromLocal.forEach(toDoList => {
      this.data.push(new _mainClass_js__WEBPACK_IMPORTED_MODULE_0__["default"](toDoList.task, toDoList.index, toDoList.completed));
    });
  };
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n  font-family: 'Poppins', sans-serif;\r\n}\r\n\r\nbody {\r\n  background-color: rgba(147, 154, 158, 0.167);\r\n}\r\n\r\n.mainSection {\r\n  width: 50%;\r\n  margin-top: 2rem;\r\n  left: 5%;\r\n  top: 10%;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  background-color: rgb(143, 102, 190);\r\n  box-shadow: 1px 1px 30px grey;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n}\r\n\r\n.padding {\r\n  width: 100%;\r\n  padding: 0 1.5rem;\r\n}\r\n\r\n.mainTitleContainer,\r\n.inputDiv,\r\n.textareaContainer {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  height: 3.5rem;\r\n}\r\n\r\ntextarea {\r\n  width: 85%;\r\n  font-size: 1.2rem;\r\n  margin-left: 0;\r\n  background-color: rgb(255, 255, 255);\r\n  border: none;\r\n  resize: none;\r\n  padding:1px;\r\n  padding-top: 20px;\r\n  height: 3.5rem;\r\n}\r\n\r\n.clearCompleted {\r\n  width: 100%;\r\n  height: 3.5rem;\r\n  font-size: 1.5rem;\r\n  border: none;\r\n  cursor: pointer;\r\n}\r\n\r\n.clearCompleted{\r\n  background-color: rgba(151, 112, 189, 0.575);\r\n}\r\n\r\n.enterBtn {\r\n  border: none;\r\n  background-color: rgb(143, 102, 190);\r\n}\r\n\r\n.inputField {\r\n  padding: 0.5rem;\r\n  width: 85%;\r\n  border: none;\r\n  height: 3.5rem;\r\n  font-size: 1rem;\r\n  font-style: italic;\r\n  margin-left: 3.2rem;\r\n  margin-right: 2rem;\r\n}\r\n\r\nh1 {\r\n  width: 100%;\r\n}\r\n\r\nhr {\r\n  width: 85%;\r\n  height: 1px;\r\n  background-color: black;\r\n  margin: 0 2rem;\r\n  margin-left: 3rem;\r\n}\r\n\r\n.fa,\r\n.checkbox {\r\n  font-size: 2rem;\r\n  cursor: pointer;\r\n}\r\n\r\n.controller {\r\n  display: none;\r\n  flex-direction: row-reverse;\r\n  gap: 15px;\r\n  margin-right: 2rem;\r\n}\r\n\r\n.completed {\r\n  text-decoration: line-through;\r\n  color: gray;\r\n}\r\n\r\n.refresh {\r\n  animation: rotate 0.1s ease-out;\r\n}\r\n\r\n@keyframes rotate {\r\n  0% {\r\n    transform: rotate(0);\r\n    color: rgb(29, 27, 27);\r\n  }\r\n\r\n  100% {\r\n    transform: rotate(360deg);\r\n    color: aqua;\r\n  }\r\n}\r\n", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":"AAAA;EACE,SAAS;EACT,UAAU;EACV,sBAAsB;EACtB,kCAAkC;AACpC;;AAEA;EACE,4CAA4C;AAC9C;;AAEA;EACE,UAAU;EACV,gBAAgB;EAChB,QAAQ;EACR,QAAQ;EACR,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,oCAAoC;EACpC,6BAA6B;EAC7B,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,WAAW;EACX,iBAAiB;AACnB;;AAEA;;;EAGE,aAAa;EACb,8BAA8B;EAC9B,mBAAmB;EACnB,cAAc;AAChB;;AAEA;EACE,UAAU;EACV,iBAAiB;EACjB,cAAc;EACd,oCAAoC;EACpC,YAAY;EACZ,YAAY;EACZ,WAAW;EACX,iBAAiB;EACjB,cAAc;AAChB;;AAEA;EACE,WAAW;EACX,cAAc;EACd,iBAAiB;EACjB,YAAY;EACZ,eAAe;AACjB;;AAEA;EACE,4CAA4C;AAC9C;;AAEA;EACE,YAAY;EACZ,oCAAoC;AACtC;;AAEA;EACE,eAAe;EACf,UAAU;EACV,YAAY;EACZ,cAAc;EACd,eAAe;EACf,kBAAkB;EAClB,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE,WAAW;AACb;;AAEA;EACE,UAAU;EACV,WAAW;EACX,uBAAuB;EACvB,cAAc;EACd,iBAAiB;AACnB;;AAEA;;EAEE,eAAe;EACf,eAAe;AACjB;;AAEA;EACE,aAAa;EACb,2BAA2B;EAC3B,SAAS;EACT,kBAAkB;AACpB;;AAEA;EACE,6BAA6B;EAC7B,WAAW;AACb;;AAEA;EACE,+BAA+B;AACjC;;AAEA;EACE;IACE,oBAAoB;IACpB,sBAAsB;EACxB;;EAEA;IACE,yBAAyB;IACzB,WAAW;EACb;AACF","sourcesContent":["* {\r\n  margin: 0;\r\n  padding: 0;\r\n  box-sizing: border-box;\r\n  font-family: 'Poppins', sans-serif;\r\n}\r\n\r\nbody {\r\n  background-color: rgba(147, 154, 158, 0.167);\r\n}\r\n\r\n.mainSection {\r\n  width: 50%;\r\n  margin-top: 2rem;\r\n  left: 5%;\r\n  top: 10%;\r\n  display: flex;\r\n  flex-direction: column;\r\n  align-items: center;\r\n  background-color: rgb(143, 102, 190);\r\n  box-shadow: 1px 1px 30px grey;\r\n  margin-left: auto;\r\n  margin-right: auto;\r\n}\r\n\r\n.padding {\r\n  width: 100%;\r\n  padding: 0 1.5rem;\r\n}\r\n\r\n.mainTitleContainer,\r\n.inputDiv,\r\n.textareaContainer {\r\n  display: flex;\r\n  justify-content: space-between;\r\n  align-items: center;\r\n  height: 3.5rem;\r\n}\r\n\r\ntextarea {\r\n  width: 85%;\r\n  font-size: 1.2rem;\r\n  margin-left: 0;\r\n  background-color: rgb(255, 255, 255);\r\n  border: none;\r\n  resize: none;\r\n  padding:1px;\r\n  padding-top: 20px;\r\n  height: 3.5rem;\r\n}\r\n\r\n.clearCompleted {\r\n  width: 100%;\r\n  height: 3.5rem;\r\n  font-size: 1.5rem;\r\n  border: none;\r\n  cursor: pointer;\r\n}\r\n\r\n.clearCompleted{\r\n  background-color: rgba(151, 112, 189, 0.575);\r\n}\r\n\r\n.enterBtn {\r\n  border: none;\r\n  background-color: rgb(143, 102, 190);\r\n}\r\n\r\n.inputField {\r\n  padding: 0.5rem;\r\n  width: 85%;\r\n  border: none;\r\n  height: 3.5rem;\r\n  font-size: 1rem;\r\n  font-style: italic;\r\n  margin-left: 3.2rem;\r\n  margin-right: 2rem;\r\n}\r\n\r\nh1 {\r\n  width: 100%;\r\n}\r\n\r\nhr {\r\n  width: 85%;\r\n  height: 1px;\r\n  background-color: black;\r\n  margin: 0 2rem;\r\n  margin-left: 3rem;\r\n}\r\n\r\n.fa,\r\n.checkbox {\r\n  font-size: 2rem;\r\n  cursor: pointer;\r\n}\r\n\r\n.controller {\r\n  display: none;\r\n  flex-direction: row-reverse;\r\n  gap: 15px;\r\n  margin-right: 2rem;\r\n}\r\n\r\n.completed {\r\n  text-decoration: line-through;\r\n  color: gray;\r\n}\r\n\r\n.refresh {\r\n  animation: rotate 0.1s ease-out;\r\n}\r\n\r\n@keyframes rotate {\r\n  0% {\r\n    transform: rotate(0);\r\n    color: rgb(29, 27, 27);\r\n  }\r\n\r\n  100% {\r\n    transform: rotate(360deg);\r\n    color: aqua;\r\n  }\r\n}\r\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ })

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ var __webpack_exports__ = (__webpack_exec__("./src/index.js"));
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguYnVuZGxlLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFxQjtBQUM4QjtBQUVuRCxNQUFNQyxjQUFjLEdBQUcsSUFBSUQsNERBQWMsRUFBRTtBQUMzQ0MsY0FBYyxDQUFDQyxJQUFJLEVBQUU7QUFDckJELGNBQWMsQ0FBQ0UsZUFBZSxFQUFFO0FBQ2hDLE1BQU1DLGFBQWEsR0FBSUMsRUFBRSxJQUFLO0VBQzVCLE1BQU1DLFVBQVUsR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUNILEVBQUUsQ0FBQztFQUM3QyxNQUFNSSxVQUFVLEdBQUdILFVBQVUsQ0FBQ0ksS0FBSztFQUNuQ0osVUFBVSxDQUFDSSxLQUFLLEdBQUcsRUFBRTtFQUNyQixPQUFPRCxVQUFVO0FBQ25CLENBQUM7QUFFRCxNQUFNRSxRQUFRLEdBQUdKLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLFdBQVcsQ0FBQztBQUNwREcsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUdDLEtBQUssSUFBSztFQUM1Q0EsS0FBSyxDQUFDQyxjQUFjLEVBQUU7RUFDdEIsTUFBTUwsVUFBVSxHQUFHTCxhQUFhLENBQUMsYUFBYSxDQUFDO0VBQy9DSCxjQUFjLENBQUNjLGNBQWMsQ0FBQ04sVUFBVSxDQUFDO0VBQ3pDUixjQUFjLENBQUNFLGVBQWUsRUFBRTtBQUNsQyxDQUFDLENBQUM7QUFFRixNQUFNYSxRQUFRLEdBQUdULFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGlCQUFpQixDQUFDO0FBQzFEUSxRQUFRLENBQUNKLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNO0VBQ3ZDLE1BQU1LLE1BQU0sR0FBR1YsUUFBUSxDQUFDVyxnQkFBZ0IsQ0FBQyxzQkFBc0IsQ0FBQztFQUNoRSxNQUFNQyxVQUFVLEdBQUcsRUFBRTtFQUNyQkYsTUFBTSxDQUFDRyxPQUFPLENBQUMsQ0FBQ0MsUUFBUSxFQUFFQyxDQUFDLEtBQUs7SUFDOUIsSUFBSUQsUUFBUSxDQUFDRSxPQUFPLEVBQUU7TUFDcEJ0QixjQUFjLENBQUN1QixJQUFJLENBQUNKLE9BQU8sQ0FBQyxDQUFDSyxJQUFJLEVBQUVDLEtBQUssS0FBSztRQUMzQ0QsSUFBSSxDQUFDQyxLQUFLLEdBQUdBLEtBQUs7TUFDcEIsQ0FBQyxDQUFDO01BQ0ZQLFVBQVUsQ0FBQ1EsSUFBSSxDQUFDTCxDQUFDLENBQUM7SUFDcEI7RUFDRixDQUFDLENBQUM7RUFDRixNQUFNTSxVQUFVLEdBQUczQixjQUFjLENBQUN1QixJQUFJLENBQUNLLE1BQU0sQ0FBQyxDQUFDSixJQUFJLEVBQUVILENBQUMsS0FBSyxDQUFDSCxVQUFVLENBQUNXLFFBQVEsQ0FBQ1IsQ0FBQyxDQUFDLENBQUM7RUFDbkZNLFVBQVUsQ0FBQ1IsT0FBTyxDQUFDLENBQUNLLElBQUksRUFBRUMsS0FBSyxLQUFLO0lBQ2xDRCxJQUFJLENBQUNDLEtBQUssR0FBR0EsS0FBSztFQUNwQixDQUFDLENBQUM7RUFDRnpCLGNBQWMsQ0FBQ3VCLElBQUksR0FBR0ksVUFBVTtFQUNoQ0csWUFBWSxDQUFDQyxPQUFPLENBQUMsVUFBVSxFQUFFQyxJQUFJLENBQUNDLFNBQVMsQ0FBQ04sVUFBVSxDQUFDLENBQUM7RUFDNUQzQixjQUFjLENBQUNFLGVBQWUsRUFBRTtBQUNsQyxDQUFDLENBQUM7QUFFRkksUUFBUSxDQUFDQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUNJLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNO0VBQ3BFdUIsTUFBTSxDQUFDQyxRQUFRLENBQUNDLE1BQU0sRUFBRTtFQUN4QjlCLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDOEIsU0FBUyxDQUFDQyxHQUFHLENBQUMsU0FBUyxDQUFDO0FBQ2hFLENBQUMsQ0FBQzs7Ozs7Ozs7Ozs7Ozs7QUM3Q2EsTUFBTUMsSUFBSSxDQUFDO0VBQ3hCQyxXQUFXQSxDQUFDQyxJQUFJLEVBQUVoQixLQUFLLEVBQUVpQixTQUFTLEVBQUU7SUFDbEMsSUFBSSxDQUFDRCxJQUFJLEdBQUdBLElBQUk7SUFDaEIsSUFBSSxDQUFDaEIsS0FBSyxHQUFHQSxLQUFLO0lBQ2xCLElBQUksQ0FBQ2lCLFNBQVMsR0FBR0EsU0FBUztFQUM1QjtBQUNGOzs7Ozs7Ozs7Ozs7Ozs7QUNOa0M7QUFFbkIsTUFBTTNDLGNBQWMsQ0FBQztFQUNsQ3lDLFdBQVdBLENBQUEsRUFBRztJQUNaLElBQUksQ0FBQ2pCLElBQUksR0FBRyxFQUFFO0VBQ2hCO0VBRUFvQixZQUFZLEdBQUdBLENBQUEsS0FBTTtJQUNuQixJQUFJQyxRQUFRLEdBQUcsQ0FBQztJQUNoQixJQUFJLENBQUNyQixJQUFJLENBQUNKLE9BQU8sQ0FBRTBCLFFBQVEsSUFBSztNQUM5QixJQUFJQSxRQUFRLENBQUNwQixLQUFLLEdBQUdtQixRQUFRLEVBQUU7UUFDN0JBLFFBQVEsR0FBR0MsUUFBUSxDQUFDcEIsS0FBSztNQUMzQjtJQUNGLENBQUMsQ0FBQztJQUNGLE9BQU9tQixRQUFRLEdBQUcsQ0FBQztFQUNyQixDQUFDO0VBRUU5QixjQUFjLEdBQUlOLFVBQVUsSUFBSztJQUMvQixNQUFNa0MsU0FBUyxHQUFHLEtBQUs7SUFDdkIsTUFBTWpCLEtBQUssR0FBRyxJQUFJLENBQUNrQixZQUFZLEVBQUU7SUFDakMsTUFBTUYsSUFBSSxHQUFHakMsVUFBVTtJQUN2QixNQUFNc0MsSUFBSSxHQUFHLElBQUlQLHFEQUFJLENBQUNFLElBQUksRUFBRWhCLEtBQUssRUFBRWlCLFNBQVMsQ0FBQztJQUM3QyxJQUFJLENBQUNuQixJQUFJLENBQUNHLElBQUksQ0FBQ29CLElBQUksQ0FBQztJQUNwQixJQUFJLENBQUNDLElBQUksRUFBRTtFQUNiLENBQUM7RUFFQzdDLGVBQWUsR0FBR0EsQ0FBQSxLQUFNO0lBQ3RCLElBQUk4QyxLQUFLLEdBQUcsRUFBRTtJQUNkLElBQUksQ0FBQ3pCLElBQUksQ0FBQ0osT0FBTyxDQUFFMEIsUUFBUSxJQUFLO01BQzlCRyxLQUFLLElBQUs7QUFDckI7QUFDQTtBQUNBLCtCQUErQkgsUUFBUSxDQUFDSixJQUFLO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsT0FBTztJQUNFLENBQUMsQ0FBQztJQUNGbkMsUUFBUSxDQUFDQyxhQUFhLENBQUMsa0JBQWtCLENBQUMsQ0FBQzBDLFNBQVMsR0FBR0QsS0FBSztJQUM1RCxJQUFJLENBQUNFLGVBQWUsRUFBRTtJQUN0QixJQUFJLENBQUNDLGFBQWEsRUFBRTtJQUNwQixJQUFJLENBQUNDLGFBQWEsRUFBRTtJQUNwQixJQUFJLENBQUNDLFFBQVEsRUFBRTtFQUNqQixDQUFDO0VBRVBDLHFCQUFxQixHQUFHQSxDQUFDN0IsS0FBSyxFQUFFaUIsU0FBUyxLQUFLO0lBQzVDLElBQUksQ0FBQ25CLElBQUksQ0FBQ0UsS0FBSyxDQUFDLENBQUNpQixTQUFTLEdBQUdBLFNBQVM7SUFDdEMsSUFBSSxDQUFDSyxJQUFJLEVBQUU7RUFDYixDQUFDO0VBRUZNLFFBQVEsR0FBR0EsQ0FBQSxLQUFNO0lBQ2YsTUFBTXJDLE1BQU0sR0FBR1YsUUFBUSxDQUFDVyxnQkFBZ0IsQ0FBQyxzQkFBc0IsQ0FBQztJQUNoRSxNQUFNc0MsTUFBTSxHQUFHakQsUUFBUSxDQUFDVyxnQkFBZ0IsQ0FBQyw2QkFBNkIsQ0FBQztJQUN2RUQsTUFBTSxDQUFDRyxPQUFPLENBQUMsQ0FBQ3FDLEVBQUUsRUFBRW5DLENBQUMsS0FBSztNQUN4QixNQUFNb0MsV0FBVyxHQUFHLElBQUksQ0FBQ2xDLElBQUksQ0FBQ0YsQ0FBQyxDQUFDLENBQUNxQixTQUFTO01BQzFDLElBQUllLFdBQVcsRUFBRTtRQUNmRixNQUFNLENBQUNsQyxDQUFDLENBQUMsQ0FBQ2dCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFdBQVcsQ0FBQztRQUNwQ3RCLE1BQU0sQ0FBQ0ssQ0FBQyxDQUFDLENBQUNxQyxZQUFZLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQztNQUM5QztNQUNBRixFQUFFLENBQUM3QyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsTUFBTTtRQUNsQyxJQUFJSyxNQUFNLENBQUNLLENBQUMsQ0FBQyxDQUFDQyxPQUFPLEVBQUU7VUFDckJpQyxNQUFNLENBQUNsQyxDQUFDLENBQUMsQ0FBQ2dCLFNBQVMsQ0FBQ0MsR0FBRyxDQUFDLFdBQVcsQ0FBQztVQUNwQyxJQUFJLENBQUNnQixxQkFBcUIsQ0FBQ2pDLENBQUMsRUFBRSxJQUFJLENBQUM7UUFDckMsQ0FBQyxNQUFNO1VBQ0xrQyxNQUFNLENBQUNsQyxDQUFDLENBQUMsQ0FBQ2dCLFNBQVMsQ0FBQ3NCLE1BQU0sQ0FBQyxXQUFXLENBQUM7VUFDdkMsSUFBSSxDQUFDTCxxQkFBcUIsQ0FBQ2pDLENBQUMsRUFBRSxLQUFLLENBQUM7UUFDdEM7TUFDRixDQUFDLENBQUM7SUFDSixDQUFDLENBQUM7RUFDSixDQUFDO0VBRUE4QixhQUFhLEdBQUNBLENBQUEsS0FBTTtJQUNsQixNQUFNUyxPQUFPLEdBQUd0RCxRQUFRLENBQUNXLGdCQUFnQixDQUFDLFVBQVUsQ0FBQztJQUNyRCxNQUFNNEMsZ0JBQWdCLEdBQUd2RCxRQUFRLENBQUNXLGdCQUFnQixDQUFDLGFBQWEsQ0FBQztJQUNqRSxNQUFNc0MsTUFBTSxHQUFHakQsUUFBUSxDQUFDVyxnQkFBZ0IsQ0FBQyw2QkFBNkIsQ0FBQztJQUN2RTJDLE9BQU8sQ0FBQ3pDLE9BQU8sQ0FBQyxDQUFDMkMsRUFBRSxFQUFFekMsQ0FBQyxLQUFLO01BQ3pCeUMsRUFBRSxDQUFDbkQsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE1BQU07UUFDakNrRCxnQkFBZ0IsQ0FBQ3hDLENBQUMsQ0FBQyxDQUFDMEMsS0FBSyxDQUFDQyxPQUFPLEdBQUcsTUFBTTtRQUMxQ0osT0FBTyxDQUFDdkMsQ0FBQyxDQUFDLENBQUMwQyxLQUFLLENBQUNDLE9BQU8sR0FBRyxNQUFNO1FBQ2pDVCxNQUFNLENBQUNsQyxDQUFDLENBQUMsQ0FBQzRDLFFBQVEsR0FBRyxLQUFLO01BQzVCLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQztFQUNKLENBQUM7O0VBRUQ7RUFDQy9DLFVBQVUsR0FBR0EsQ0FBQ3VCLElBQUksRUFBRXBCLENBQUMsS0FBSztJQUN4QixJQUFJLENBQUNFLElBQUksQ0FBQ0YsQ0FBQyxDQUFDLENBQUNvQixJQUFJLEdBQUdBLElBQUk7SUFDeEIsSUFBSSxDQUFDTSxJQUFJLEVBQUU7SUFDWCxJQUFJLENBQUM3QyxlQUFlLEVBQUU7RUFDeEIsQ0FBQztFQUVGa0QsYUFBYSxHQUFDQSxDQUFBLEtBQU07SUFDbEIsTUFBTWMsT0FBTyxHQUFHNUQsUUFBUSxDQUFDVyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUM7SUFDckQsTUFBTXNDLE1BQU0sR0FBR2pELFFBQVEsQ0FBQ1csZ0JBQWdCLENBQUMsNkJBQTZCLENBQUM7SUFDdkVpRCxPQUFPLENBQUMvQyxPQUFPLENBQUMsQ0FBQ2dELEVBQUUsRUFBRTlDLENBQUMsS0FBSztNQUN6QjhDLEVBQUUsQ0FBQ3hELGdCQUFnQixDQUFDLE9BQU8sRUFBRSxNQUFNO1FBQ2pDLElBQUksQ0FBQ08sVUFBVSxDQUFDcUMsTUFBTSxDQUFDbEMsQ0FBQyxDQUFDLENBQUNaLEtBQUssRUFBRVksQ0FBQyxDQUFDO01BQ3JDLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQztFQUNKLENBQUM7RUFFRytDLFVBQVUsR0FBSS9DLENBQUMsSUFBSztJQUNsQixJQUFJLENBQUNFLElBQUksR0FBRyxJQUFJLENBQUNBLElBQUksQ0FBQ0ssTUFBTSxDQUFDLENBQUNKLElBQUksRUFBRUMsS0FBSyxLQUFLQSxLQUFLLEtBQUtKLENBQUMsQ0FBQztJQUMxRCxJQUFJLENBQUNFLElBQUksQ0FBQ0osT0FBTyxDQUFDLENBQUNLLElBQUksRUFBRUMsS0FBSyxLQUFLO01BQ2pDRCxJQUFJLENBQUNDLEtBQUssR0FBR0EsS0FBSyxHQUFHLENBQUM7SUFDeEIsQ0FBQyxDQUFDO0lBQ0YsSUFBSSxDQUFDc0IsSUFBSSxFQUFFO0lBQ1gsSUFBSSxDQUFDN0MsZUFBZSxFQUFFO0VBQ3hCLENBQUM7RUFFRGdELGVBQWUsR0FBRUEsQ0FBQSxLQUFNO0lBQ3JCLE1BQU1tQixTQUFTLEdBQUcvRCxRQUFRLENBQUNXLGdCQUFnQixDQUFDLFlBQVksQ0FBQztJQUN6RG9ELFNBQVMsQ0FBQ2xELE9BQU8sQ0FBQyxDQUFDbUQsR0FBRyxFQUFFakQsQ0FBQyxLQUFLO01BQzVCaUQsR0FBRyxDQUFDM0QsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLE1BQU07UUFBRSxJQUFJLENBQUN5RCxVQUFVLENBQUMvQyxDQUFDLENBQUM7TUFBRSxDQUFDLENBQUM7SUFDOUQsQ0FBQyxDQUFDO0VBQ0osQ0FBQztFQUVMMEIsSUFBSSxHQUFHQSxDQUFBLEtBQU07SUFDWGpCLFlBQVksQ0FBQ0MsT0FBTyxDQUFDLFVBQVUsRUFBRUMsSUFBSSxDQUFDQyxTQUFTLENBQUMsSUFBSSxDQUFDVixJQUFJLENBQUMsQ0FBQztFQUM3RCxDQUFDO0VBRUR0QixJQUFJLEdBQUdBLENBQUEsS0FBTTtJQUNYLE1BQU1zRSxnQkFBZ0IsR0FBR3ZDLElBQUksQ0FBQ3dDLEtBQUssQ0FBQzFDLFlBQVksQ0FBQzJDLE9BQU8sQ0FBQyxVQUFVLENBQUMsQ0FBQyxJQUFJLEVBQUU7SUFDM0VGLGdCQUFnQixDQUFDcEQsT0FBTyxDQUFFMEIsUUFBUSxJQUFLO01BQ3JDLElBQUksQ0FBQ3RCLElBQUksQ0FBQ0csSUFBSSxDQUFDLElBQUlhLHFEQUFJLENBQUNNLFFBQVEsQ0FBQ0osSUFBSSxFQUFFSSxRQUFRLENBQUNwQixLQUFLLEVBQUVvQixRQUFRLENBQUNILFNBQVMsQ0FBQyxDQUFDO0lBQzdFLENBQUMsQ0FBQztFQUNKLENBQUM7QUFDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FDbklBO0FBQzBHO0FBQ2pCO0FBQ3pGLDhCQUE4QixtRkFBMkIsQ0FBQyw0RkFBcUM7QUFDL0Y7QUFDQSw2Q0FBNkMsZ0JBQWdCLGlCQUFpQiw2QkFBNkIseUNBQXlDLEtBQUssY0FBYyxtREFBbUQsS0FBSyxzQkFBc0IsaUJBQWlCLHVCQUF1QixlQUFlLGVBQWUsb0JBQW9CLDZCQUE2QiwwQkFBMEIsMkNBQTJDLG9DQUFvQyx3QkFBd0IseUJBQXlCLEtBQUssa0JBQWtCLGtCQUFrQix3QkFBd0IsS0FBSyxrRUFBa0Usb0JBQW9CLHFDQUFxQywwQkFBMEIscUJBQXFCLEtBQUssa0JBQWtCLGlCQUFpQix3QkFBd0IscUJBQXFCLDJDQUEyQyxtQkFBbUIsbUJBQW1CLGtCQUFrQix3QkFBd0IscUJBQXFCLEtBQUsseUJBQXlCLGtCQUFrQixxQkFBcUIsd0JBQXdCLG1CQUFtQixzQkFBc0IsS0FBSyx3QkFBd0IsbURBQW1ELEtBQUssbUJBQW1CLG1CQUFtQiwyQ0FBMkMsS0FBSyxxQkFBcUIsc0JBQXNCLGlCQUFpQixtQkFBbUIscUJBQXFCLHNCQUFzQix5QkFBeUIsMEJBQTBCLHlCQUF5QixLQUFLLFlBQVksa0JBQWtCLEtBQUssWUFBWSxpQkFBaUIsa0JBQWtCLDhCQUE4QixxQkFBcUIsd0JBQXdCLEtBQUssMkJBQTJCLHNCQUFzQixzQkFBc0IsS0FBSyxxQkFBcUIsb0JBQW9CLGtDQUFrQyxnQkFBZ0IseUJBQXlCLEtBQUssb0JBQW9CLG9DQUFvQyxrQkFBa0IsS0FBSyxrQkFBa0Isc0NBQXNDLEtBQUssMkJBQTJCLFVBQVUsNkJBQTZCLCtCQUErQixPQUFPLGdCQUFnQixrQ0FBa0Msb0JBQW9CLE9BQU8sS0FBSyxXQUFXLGdGQUFnRixVQUFVLFVBQVUsWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsYUFBYSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsWUFBWSxPQUFPLE9BQU8sVUFBVSxZQUFZLGFBQWEsV0FBVyxPQUFPLEtBQUssVUFBVSxZQUFZLFdBQVcsWUFBWSxXQUFXLFVBQVUsVUFBVSxZQUFZLFdBQVcsT0FBTyxLQUFLLFVBQVUsVUFBVSxZQUFZLFdBQVcsVUFBVSxPQUFPLEtBQUssWUFBWSxPQUFPLEtBQUssVUFBVSxZQUFZLE9BQU8sS0FBSyxVQUFVLFVBQVUsVUFBVSxVQUFVLFVBQVUsWUFBWSxhQUFhLGFBQWEsT0FBTyxLQUFLLFVBQVUsTUFBTSxLQUFLLFVBQVUsVUFBVSxZQUFZLFdBQVcsWUFBWSxPQUFPLE1BQU0sVUFBVSxVQUFVLE9BQU8sS0FBSyxVQUFVLFlBQVksV0FBVyxZQUFZLE9BQU8sS0FBSyxZQUFZLFdBQVcsTUFBTSxLQUFLLFlBQVksT0FBTyxLQUFLLEtBQUssWUFBWSxhQUFhLE9BQU8sS0FBSyxZQUFZLFdBQVcsS0FBSyw0QkFBNEIsZ0JBQWdCLGlCQUFpQiw2QkFBNkIseUNBQXlDLEtBQUssY0FBYyxtREFBbUQsS0FBSyxzQkFBc0IsaUJBQWlCLHVCQUF1QixlQUFlLGVBQWUsb0JBQW9CLDZCQUE2QiwwQkFBMEIsMkNBQTJDLG9DQUFvQyx3QkFBd0IseUJBQXlCLEtBQUssa0JBQWtCLGtCQUFrQix3QkFBd0IsS0FBSyxrRUFBa0Usb0JBQW9CLHFDQUFxQywwQkFBMEIscUJBQXFCLEtBQUssa0JBQWtCLGlCQUFpQix3QkFBd0IscUJBQXFCLDJDQUEyQyxtQkFBbUIsbUJBQW1CLGtCQUFrQix3QkFBd0IscUJBQXFCLEtBQUsseUJBQXlCLGtCQUFrQixxQkFBcUIsd0JBQXdCLG1CQUFtQixzQkFBc0IsS0FBSyx3QkFBd0IsbURBQW1ELEtBQUssbUJBQW1CLG1CQUFtQiwyQ0FBMkMsS0FBSyxxQkFBcUIsc0JBQXNCLGlCQUFpQixtQkFBbUIscUJBQXFCLHNCQUFzQix5QkFBeUIsMEJBQTBCLHlCQUF5QixLQUFLLFlBQVksa0JBQWtCLEtBQUssWUFBWSxpQkFBaUIsa0JBQWtCLDhCQUE4QixxQkFBcUIsd0JBQXdCLEtBQUssMkJBQTJCLHNCQUFzQixzQkFBc0IsS0FBSyxxQkFBcUIsb0JBQW9CLGtDQUFrQyxnQkFBZ0IseUJBQXlCLEtBQUssb0JBQW9CLG9DQUFvQyxrQkFBa0IsS0FBSyxrQkFBa0Isc0NBQXNDLEtBQUssMkJBQTJCLFVBQVUsNkJBQTZCLCtCQUErQixPQUFPLGdCQUFnQixrQ0FBa0Msb0JBQW9CLE9BQU8sS0FBSyx1QkFBdUI7QUFDdHlLO0FBQ0EsaUVBQWUsdUJBQXVCLEVBQUM7Ozs7Ozs7Ozs7O0FDUDFCOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxREFBcUQ7QUFDckQ7QUFDQTtBQUNBLGdEQUFnRDtBQUNoRDtBQUNBO0FBQ0EscUZBQXFGO0FBQ3JGO0FBQ0E7QUFDQTtBQUNBLHFCQUFxQjtBQUNyQjtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCO0FBQ0E7QUFDQSxxQkFBcUI7QUFDckI7QUFDQTtBQUNBLEtBQUs7QUFDTDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNCQUFzQixpQkFBaUI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLHFCQUFxQjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzRkFBc0YscUJBQXFCO0FBQzNHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixpREFBaUQscUJBQXFCO0FBQ3RFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVixzREFBc0QscUJBQXFCO0FBQzNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUNwRmE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCxjQUFjO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNkQSxNQUErRjtBQUMvRixNQUFxRjtBQUNyRixNQUE0RjtBQUM1RixNQUErRztBQUMvRyxNQUF3RztBQUN4RyxNQUF3RztBQUN4RyxNQUFtRztBQUNuRztBQUNBOztBQUVBOztBQUVBLDRCQUE0QixxR0FBbUI7QUFDL0Msd0JBQXdCLGtIQUFhOztBQUVyQyx1QkFBdUIsdUdBQWE7QUFDcEM7QUFDQSxpQkFBaUIsK0ZBQU07QUFDdkIsNkJBQTZCLHNHQUFrQjs7QUFFL0MsYUFBYSwwR0FBRyxDQUFDLHNGQUFPOzs7O0FBSTZDO0FBQ3JFLE9BQU8saUVBQWUsc0ZBQU8sSUFBSSw2RkFBYyxHQUFHLDZGQUFjLFlBQVksRUFBQzs7Ozs7Ozs7Ozs7QUMxQmhFOztBQUViOztBQUVBO0FBQ0E7O0FBRUEsa0JBQWtCLHdCQUF3QjtBQUMxQztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLGtCQUFrQixpQkFBaUI7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLG9CQUFvQiw0QkFBNEI7QUFDaEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUEscUJBQXFCLDZCQUE2QjtBQUNsRDs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7QUN2R2E7O0FBRWI7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0RBQXNEOztBQUV0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDdENhOztBQUViO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7O0FDVmE7O0FBRWI7QUFDQTtBQUNBLGNBQWMsS0FBd0MsR0FBRyxzQkFBaUIsR0FBRyxDQUFJOztBQUVqRjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7Ozs7Ozs7OztBQ1hhOztBQUViO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtEQUFrRDtBQUNsRDs7QUFFQTtBQUNBLDBDQUEwQztBQUMxQzs7QUFFQTs7QUFFQTtBQUNBLGlGQUFpRjtBQUNqRjs7QUFFQTs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTtBQUNBLGFBQWE7QUFDYjs7QUFFQTs7QUFFQTtBQUNBLHlEQUF5RDtBQUN6RCxJQUFJOztBQUVKOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7QUNyRWE7O0FBRWI7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJO0FBQ0o7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSIsInNvdXJjZXMiOlsid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9tb2R1bGVzL21haW5DbGFzcy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vc3JjL21vZHVsZXMvc3ViQ2xhc3MuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL3NyYy9zdHlsZS5jc3MiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9zb3VyY2VNYXBzLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9zcmMvc3R5bGUuY3NzPzcxNjMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL2luamVjdFN0eWxlc0ludG9TdHlsZVRhZy5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qcyIsIndlYnBhY2s6Ly90by1kby1saXN0Ly4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0U3R5bGVFbGVtZW50LmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanMiLCJ3ZWJwYWNrOi8vdG8tZG8tbGlzdC8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvZGlzdC9ydW50aW1lL3N0eWxlRG9tQVBJLmpzIiwid2VicGFjazovL3RvLWRvLWxpc3QvLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZVRhZ1RyYW5zZm9ybS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4vc3R5bGUuY3NzJztcclxuaW1wb3J0IERhdGFDb2xsZWN0aW9uIGZyb20gJy4vbW9kdWxlcy9zdWJDbGFzcy5qcyc7XHJcblxyXG5jb25zdCBkYXRhQ29sbGVjdGlvbiA9IG5ldyBEYXRhQ29sbGVjdGlvbigpO1xyXG5kYXRhQ29sbGVjdGlvbi5sb2FkKCk7XHJcbmRhdGFDb2xsZWN0aW9uLmRpc3BsYXlUb0RvTGlzdCgpO1xyXG5jb25zdCBnZXRJbnB1dFZhbHVlID0gKGlkKSA9PiB7XHJcbiAgY29uc3QgaW5wdXRGaWVsZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoaWQpO1xyXG4gIGNvbnN0IGlucHV0VmFsdWUgPSBpbnB1dEZpZWxkLnZhbHVlO1xyXG4gIGlucHV0RmllbGQudmFsdWUgPSAnJztcclxuICByZXR1cm4gaW5wdXRWYWx1ZTtcclxufTtcclxuXHJcbmNvbnN0IGVudGVyQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVudGVyQnRuJyk7XHJcbmVudGVyQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGV2ZW50KSA9PiB7XHJcbiAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICBjb25zdCBpbnB1dFZhbHVlID0gZ2V0SW5wdXRWYWx1ZSgnI2lucHV0RmllbGQnKTtcclxuICBkYXRhQ29sbGVjdGlvbi5zZXREYXRhSW5Mb2NhbChpbnB1dFZhbHVlKTtcclxuICBkYXRhQ29sbGVjdGlvbi5kaXNwbGF5VG9Eb0xpc3QoKTtcclxufSk7XHJcblxyXG5jb25zdCBjbGVhckJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jbGVhckNvbXBsZXRlZCcpO1xyXG5jbGVhckJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICBjb25zdCBjaGVja3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdpbnB1dFt0eXBlPWNoZWNrYm94XScpO1xyXG4gIGNvbnN0IHVwZGF0ZUl0ZW0gPSBbXTtcclxuICBjaGVja3MuZm9yRWFjaCgoY2hlY2tib3gsIGkpID0+IHtcclxuICAgIGlmIChjaGVja2JveC5jaGVja2VkKSB7XHJcbiAgICAgIGRhdGFDb2xsZWN0aW9uLmRhdGEuZm9yRWFjaCgoaXRlbSwgaW5kZXgpID0+IHtcclxuICAgICAgICBpdGVtLmluZGV4ID0gaW5kZXg7XHJcbiAgICAgIH0pO1xyXG4gICAgICB1cGRhdGVJdGVtLnB1c2goaSk7XHJcbiAgICB9XHJcbiAgfSk7XHJcbiAgY29uc3QgdXBkYXRlTGlzdCA9IGRhdGFDb2xsZWN0aW9uLmRhdGEuZmlsdGVyKChpdGVtLCBpKSA9PiAhdXBkYXRlSXRlbS5pbmNsdWRlcyhpKSk7XHJcbiAgdXBkYXRlTGlzdC5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgaXRlbS5pbmRleCA9IGluZGV4O1xyXG4gIH0pO1xyXG4gIGRhdGFDb2xsZWN0aW9uLmRhdGEgPSB1cGRhdGVMaXN0O1xyXG4gIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b0RvTGlzdCcsIEpTT04uc3RyaW5naWZ5KHVwZGF0ZUxpc3QpKTtcclxuICBkYXRhQ29sbGVjdGlvbi5kaXNwbGF5VG9Eb0xpc3QoKTtcclxufSk7XHJcblxyXG5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmEtcmVmcmVzaCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZmEtcmVmcmVzaCcpLmNsYXNzTGlzdC5hZGQoJ3JlZnJlc2gnKTtcclxufSk7XHJcbiIsImV4cG9ydCBkZWZhdWx0IGNsYXNzIE1haW4ge1xyXG4gIGNvbnN0cnVjdG9yKHRhc2ssIGluZGV4LCBjb21wbGV0ZWQpIHtcclxuICAgIHRoaXMudGFzayA9IHRhc2s7XHJcbiAgICB0aGlzLmluZGV4ID0gaW5kZXg7XHJcbiAgICB0aGlzLmNvbXBsZXRlZCA9IGNvbXBsZXRlZDtcclxuICB9XHJcbn0iLCJpbXBvcnQgTWFpbiBmcm9tICcuL21haW5DbGFzcy5qcyc7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEYXRhQ29sbGVjdGlvbiB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLmRhdGEgPSBbXTtcclxuICB9XHJcblxyXG4gIGdldE5leHRJbmRleCA9ICgpID0+IHtcclxuICAgIGxldCBtYXhJbmRleCA9IDA7XHJcbiAgICB0aGlzLmRhdGEuZm9yRWFjaCgodG9Eb0xpc3QpID0+IHtcclxuICAgICAgaWYgKHRvRG9MaXN0LmluZGV4ID4gbWF4SW5kZXgpIHtcclxuICAgICAgICBtYXhJbmRleCA9IHRvRG9MaXN0LmluZGV4O1xyXG4gICAgICB9XHJcbiAgICB9KTtcclxuICAgIHJldHVybiBtYXhJbmRleCArIDE7XHJcbiAgfVxyXG5cclxuICAgICBzZXREYXRhSW5Mb2NhbCA9IChpbnB1dFZhbHVlKSA9PiB7XHJcbiAgICAgICBjb25zdCBjb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgIGNvbnN0IGluZGV4ID0gdGhpcy5nZXROZXh0SW5kZXgoKTtcclxuICAgICAgIGNvbnN0IHRhc2sgPSBpbnB1dFZhbHVlO1xyXG4gICAgICAgY29uc3QgaW5mbyA9IG5ldyBNYWluKHRhc2ssIGluZGV4LCBjb21wbGV0ZWQpO1xyXG4gICAgICAgdGhpcy5kYXRhLnB1c2goaW5mbyk7XHJcbiAgICAgICB0aGlzLnNhdmUoKTtcclxuICAgICB9O1xyXG5cclxuICAgICAgIGRpc3BsYXlUb0RvTGlzdCA9ICgpID0+IHtcclxuICAgICAgICAgbGV0IGl0ZW1zID0gJyc7XHJcbiAgICAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKCh0b0RvTGlzdCkgPT4ge1xyXG4gICAgICAgICAgIGl0ZW1zICs9IGBcclxuICAgICAgIDxkaXYgY2xhc3M9XCJ0ZXh0YXJlYUNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGNsYXNzPVwiY2hlY2tib3hcIiBuYW1lPVwiY29tcGxldGVkXCIgLz5cclxuICAgICAgICAgIDx0ZXh0YXJlYSBkaXNhYmxlZD4ke3RvRG9MaXN0LnRhc2t9PC90ZXh0YXJlYT5cclxuICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtZWxsaXBzaXMtdiBlZGl0QnRuXCIgPjwvaT5cclxuICAgICAgICAgIDxkaXYgY2xhc3M9XCJjb250cm9sbGVyXCI+XHJcbiAgICAgICAgICA8aSBjbGFzcz1cImZhIGZhLXNhdmUgc2F2ZUJ0blwiPjwvaT5cclxuICAgICAgICAgIDxpIGNsYXNzPVwiZmEgZmEtdHJhc2ggZGVsZXRlQnRuXCI+PC9pPlxyXG4gICAgICAgICAgPC9kaXY+XHJcbiAgICAgIDwvZGl2PlxyXG4gICAgICAgPGhyPlxyXG4gICAgICBgO1xyXG4gICAgICAgICB9KTtcclxuICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRpc3BsYXlMaXN0Q29udCcpLmlubmVySFRNTCA9IGl0ZW1zO1xyXG4gICAgICAgICB0aGlzLkRlbGV0ZUxpc3RlbmVycygpO1xyXG4gICAgICAgICB0aGlzLkVkaXRMaXN0ZW5lcnMoKTtcclxuICAgICAgICAgdGhpcy5TYXZlTGlzdGVuZXJzKCk7XHJcbiAgICAgICAgIHRoaXMuY2hlY2tCb3goKTtcclxuICAgICAgIH07XHJcblxyXG4gdXBkYXRlQ29tcGxldGVkU3RhdHVzID0gKGluZGV4LCBjb21wbGV0ZWQpID0+IHtcclxuICAgdGhpcy5kYXRhW2luZGV4XS5jb21wbGV0ZWQgPSBjb21wbGV0ZWQ7XHJcbiAgIHRoaXMuc2F2ZSgpO1xyXG4gfVxyXG5cclxuY2hlY2tCb3ggPSAoKSA9PiB7XHJcbiAgY29uc3QgY2hlY2tzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnaW5wdXRbdHlwZT1jaGVja2JveF0nKTtcclxuICBjb25zdCBpbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGV4dGFyZWFDb250YWluZXIgdGV4dGFyZWEnKTtcclxuICBjaGVja3MuZm9yRWFjaCgoY2ssIGkpID0+IHtcclxuICAgIGNvbnN0IGlzQ29tcGxldGVkID0gdGhpcy5kYXRhW2ldLmNvbXBsZXRlZDtcclxuICAgIGlmIChpc0NvbXBsZXRlZCkge1xyXG4gICAgICBpbnB1dHNbaV0uY2xhc3NMaXN0LmFkZCgnY29tcGxldGVkJyk7XHJcbiAgICAgIGNoZWNrc1tpXS5zZXRBdHRyaWJ1dGUoJ2NoZWNrZWQnLCAnY2hlY2tlZCcpO1xyXG4gICAgfVxyXG4gICAgY2suYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xyXG4gICAgICBpZiAoY2hlY2tzW2ldLmNoZWNrZWQpIHtcclxuICAgICAgICBpbnB1dHNbaV0uY2xhc3NMaXN0LmFkZCgnY29tcGxldGVkJyk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVDb21wbGV0ZWRTdGF0dXMoaSwgdHJ1ZSk7XHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaW5wdXRzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ2NvbXBsZXRlZCcpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlQ29tcGxldGVkU3RhdHVzKGksIGZhbHNlKTtcclxuICAgICAgfVxyXG4gICAgfSk7XHJcbiAgfSk7XHJcbn1cclxuXHJcbiBFZGl0TGlzdGVuZXJzPSgpID0+IHtcclxuICAgY29uc3QgZWRpdEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5lZGl0QnRuJyk7XHJcbiAgIGNvbnN0IHVwZGF0ZUNvbnRyb2xsZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcuY29udHJvbGxlcicpO1xyXG4gICBjb25zdCBpbnB1dHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGV4dGFyZWFDb250YWluZXIgdGV4dGFyZWEnKTtcclxuICAgZWRpdEJ0bi5mb3JFYWNoKChlYiwgaSkgPT4ge1xyXG4gICAgIGViLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgdXBkYXRlQ29udHJvbGxlcltpXS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgZWRpdEJ0bltpXS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgaW5wdXRzW2ldLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgfSk7XHJcbiAgIH0pO1xyXG4gfVxyXG5cclxuIC8qIHVwZGF0ZSBpdGVtIHdoZW4gZWRpdCAqL1xyXG4gIHVwZGF0ZUl0ZW0gPSAodGFzaywgaSkgPT4ge1xyXG4gICAgdGhpcy5kYXRhW2ldLnRhc2sgPSB0YXNrO1xyXG4gICAgdGhpcy5zYXZlKCk7XHJcbiAgICB0aGlzLmRpc3BsYXlUb0RvTGlzdCgpO1xyXG4gIH1cclxuXHJcbiBTYXZlTGlzdGVuZXJzPSgpID0+IHtcclxuICAgY29uc3Qgc2F2ZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zYXZlQnRuJyk7XHJcbiAgIGNvbnN0IGlucHV0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50ZXh0YXJlYUNvbnRhaW5lciB0ZXh0YXJlYScpO1xyXG4gICBzYXZlQnRuLmZvckVhY2goKHNiLCBpKSA9PiB7XHJcbiAgICAgc2IuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICB0aGlzLnVwZGF0ZUl0ZW0oaW5wdXRzW2ldLnZhbHVlLCBpKTtcclxuICAgICB9KTtcclxuICAgfSk7XHJcbiB9XHJcblxyXG4gICAgIGRlbGV0ZUl0ZW0gPSAoaSkgPT4ge1xyXG4gICAgICAgdGhpcy5kYXRhID0gdGhpcy5kYXRhLmZpbHRlcigoaXRlbSwgaW5kZXgpID0+IGluZGV4ICE9PSBpKTtcclxuICAgICAgIHRoaXMuZGF0YS5mb3JFYWNoKChpdGVtLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICBpdGVtLmluZGV4ID0gaW5kZXggKyAxO1xyXG4gICAgICAgfSk7XHJcbiAgICAgICB0aGlzLnNhdmUoKTtcclxuICAgICAgIHRoaXMuZGlzcGxheVRvRG9MaXN0KCk7XHJcbiAgICAgfVxyXG5cclxuICAgICBEZWxldGVMaXN0ZW5lcnM9ICgpID0+IHtcclxuICAgICAgIGNvbnN0IGRlbGV0ZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5kZWxldGVCdG4nKTtcclxuICAgICAgIGRlbGV0ZUJ0bi5mb3JFYWNoKChidG4sIGkpID0+IHtcclxuICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4geyB0aGlzLmRlbGV0ZUl0ZW0oaSk7IH0pO1xyXG4gICAgICAgfSk7XHJcbiAgICAgfVxyXG5cclxuIHNhdmUgPSAoKSA9PiB7XHJcbiAgIGxvY2FsU3RvcmFnZS5zZXRJdGVtKCd0b0RvTGlzdCcsIEpTT04uc3RyaW5naWZ5KHRoaXMuZGF0YSkpO1xyXG4gfVxyXG5cclxuIGxvYWQgPSAoKSA9PiB7XHJcbiAgIGNvbnN0IGdldERhdGFGcm9tTG9jYWwgPSBKU09OLnBhcnNlKGxvY2FsU3RvcmFnZS5nZXRJdGVtKCd0b0RvTGlzdCcpKSB8fCBbXTtcclxuICAgZ2V0RGF0YUZyb21Mb2NhbC5mb3JFYWNoKCh0b0RvTGlzdCkgPT4ge1xyXG4gICAgIHRoaXMuZGF0YS5wdXNoKG5ldyBNYWluKHRvRG9MaXN0LnRhc2ssIHRvRG9MaXN0LmluZGV4LCB0b0RvTGlzdC5jb21wbGV0ZWQpKTtcclxuICAgfSk7XHJcbiB9XHJcbn0iLCIvLyBJbXBvcnRzXG5pbXBvcnQgX19fQ1NTX0xPQURFUl9BUElfU09VUkNFTUFQX0lNUE9SVF9fXyBmcm9tIFwiLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9ydW50aW1lL3NvdXJjZU1hcHMuanNcIjtcbmltcG9ydCBfX19DU1NfTE9BREVSX0FQSV9JTVBPUlRfX18gZnJvbSBcIi4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvcnVudGltZS9hcGkuanNcIjtcbnZhciBfX19DU1NfTE9BREVSX0VYUE9SVF9fXyA9IF9fX0NTU19MT0FERVJfQVBJX0lNUE9SVF9fXyhfX19DU1NfTE9BREVSX0FQSV9TT1VSQ0VNQVBfSU1QT1JUX19fKTtcbi8vIE1vZHVsZVxuX19fQ1NTX0xPQURFUl9FWFBPUlRfX18ucHVzaChbbW9kdWxlLmlkLCBcIioge1xcclxcbiAgbWFyZ2luOiAwO1xcclxcbiAgcGFkZGluZzogMDtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICBmb250LWZhbWlseTogJ1BvcHBpbnMnLCBzYW5zLXNlcmlmO1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTQ3LCAxNTQsIDE1OCwgMC4xNjcpO1xcclxcbn1cXHJcXG5cXHJcXG4ubWFpblNlY3Rpb24ge1xcclxcbiAgd2lkdGg6IDUwJTtcXHJcXG4gIG1hcmdpbi10b3A6IDJyZW07XFxyXFxuICBsZWZ0OiA1JTtcXHJcXG4gIHRvcDogMTAlO1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE0MywgMTAyLCAxOTApO1xcclxcbiAgYm94LXNoYWRvdzogMXB4IDFweCAzMHB4IGdyZXk7XFxyXFxuICBtYXJnaW4tbGVmdDogYXV0bztcXHJcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuLnBhZGRpbmcge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBwYWRkaW5nOiAwIDEuNXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLm1haW5UaXRsZUNvbnRhaW5lcixcXHJcXG4uaW5wdXREaXYsXFxyXFxuLnRleHRhcmVhQ29udGFpbmVyIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgaGVpZ2h0OiAzLjVyZW07XFxyXFxufVxcclxcblxcclxcbnRleHRhcmVhIHtcXHJcXG4gIHdpZHRoOiA4NSU7XFxyXFxuICBmb250LXNpemU6IDEuMnJlbTtcXHJcXG4gIG1hcmdpbi1sZWZ0OiAwO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgMjU1LCAyNTUpO1xcclxcbiAgYm9yZGVyOiBub25lO1xcclxcbiAgcmVzaXplOiBub25lO1xcclxcbiAgcGFkZGluZzoxcHg7XFxyXFxuICBwYWRkaW5nLXRvcDogMjBweDtcXHJcXG4gIGhlaWdodDogMy41cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4uY2xlYXJDb21wbGV0ZWQge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBoZWlnaHQ6IDMuNXJlbTtcXHJcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcclxcbiAgYm9yZGVyOiBub25lO1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uY2xlYXJDb21wbGV0ZWR7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE1MSwgMTEyLCAxODksIDAuNTc1KTtcXHJcXG59XFxyXFxuXFxyXFxuLmVudGVyQnRuIHtcXHJcXG4gIGJvcmRlcjogbm9uZTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxNDMsIDEwMiwgMTkwKTtcXHJcXG59XFxyXFxuXFxyXFxuLmlucHV0RmllbGQge1xcclxcbiAgcGFkZGluZzogMC41cmVtO1xcclxcbiAgd2lkdGg6IDg1JTtcXHJcXG4gIGJvcmRlcjogbm9uZTtcXHJcXG4gIGhlaWdodDogMy41cmVtO1xcclxcbiAgZm9udC1zaXplOiAxcmVtO1xcclxcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcclxcbiAgbWFyZ2luLWxlZnQ6IDMuMnJlbTtcXHJcXG4gIG1hcmdpbi1yaWdodDogMnJlbTtcXHJcXG59XFxyXFxuXFxyXFxuaDEge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxufVxcclxcblxcclxcbmhyIHtcXHJcXG4gIHdpZHRoOiA4NSU7XFxyXFxuICBoZWlnaHQ6IDFweDtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcclxcbiAgbWFyZ2luOiAwIDJyZW07XFxyXFxuICBtYXJnaW4tbGVmdDogM3JlbTtcXHJcXG59XFxyXFxuXFxyXFxuLmZhLFxcclxcbi5jaGVja2JveCB7XFxyXFxuICBmb250LXNpemU6IDJyZW07XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5jb250cm9sbGVyIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XFxyXFxuICBnYXA6IDE1cHg7XFxyXFxuICBtYXJnaW4tcmlnaHQ6IDJyZW07XFxyXFxufVxcclxcblxcclxcbi5jb21wbGV0ZWQge1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2g7XFxyXFxuICBjb2xvcjogZ3JheTtcXHJcXG59XFxyXFxuXFxyXFxuLnJlZnJlc2gge1xcclxcbiAgYW5pbWF0aW9uOiByb3RhdGUgMC4xcyBlYXNlLW91dDtcXHJcXG59XFxyXFxuXFxyXFxuQGtleWZyYW1lcyByb3RhdGUge1xcclxcbiAgMCUge1xcclxcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwKTtcXHJcXG4gICAgY29sb3I6IHJnYigyOSwgMjcsIDI3KTtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIDEwMCUge1xcclxcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcclxcbiAgICBjb2xvcjogYXF1YTtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXCIsIFwiXCIse1widmVyc2lvblwiOjMsXCJzb3VyY2VzXCI6W1wid2VicGFjazovLy4vc3JjL3N0eWxlLmNzc1wiXSxcIm5hbWVzXCI6W10sXCJtYXBwaW5nc1wiOlwiQUFBQTtFQUNFLFNBQVM7RUFDVCxVQUFVO0VBQ1Ysc0JBQXNCO0VBQ3RCLGtDQUFrQztBQUNwQzs7QUFFQTtFQUNFLDRDQUE0QztBQUM5Qzs7QUFFQTtFQUNFLFVBQVU7RUFDVixnQkFBZ0I7RUFDaEIsUUFBUTtFQUNSLFFBQVE7RUFDUixhQUFhO0VBQ2Isc0JBQXNCO0VBQ3RCLG1CQUFtQjtFQUNuQixvQ0FBb0M7RUFDcEMsNkJBQTZCO0VBQzdCLGlCQUFpQjtFQUNqQixrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSxXQUFXO0VBQ1gsaUJBQWlCO0FBQ25COztBQUVBOzs7RUFHRSxhQUFhO0VBQ2IsOEJBQThCO0VBQzlCLG1CQUFtQjtFQUNuQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsVUFBVTtFQUNWLGlCQUFpQjtFQUNqQixjQUFjO0VBQ2Qsb0NBQW9DO0VBQ3BDLFlBQVk7RUFDWixZQUFZO0VBQ1osV0FBVztFQUNYLGlCQUFpQjtFQUNqQixjQUFjO0FBQ2hCOztBQUVBO0VBQ0UsV0FBVztFQUNYLGNBQWM7RUFDZCxpQkFBaUI7RUFDakIsWUFBWTtFQUNaLGVBQWU7QUFDakI7O0FBRUE7RUFDRSw0Q0FBNEM7QUFDOUM7O0FBRUE7RUFDRSxZQUFZO0VBQ1osb0NBQW9DO0FBQ3RDOztBQUVBO0VBQ0UsZUFBZTtFQUNmLFVBQVU7RUFDVixZQUFZO0VBQ1osY0FBYztFQUNkLGVBQWU7RUFDZixrQkFBa0I7RUFDbEIsbUJBQW1CO0VBQ25CLGtCQUFrQjtBQUNwQjs7QUFFQTtFQUNFLFdBQVc7QUFDYjs7QUFFQTtFQUNFLFVBQVU7RUFDVixXQUFXO0VBQ1gsdUJBQXVCO0VBQ3ZCLGNBQWM7RUFDZCxpQkFBaUI7QUFDbkI7O0FBRUE7O0VBRUUsZUFBZTtFQUNmLGVBQWU7QUFDakI7O0FBRUE7RUFDRSxhQUFhO0VBQ2IsMkJBQTJCO0VBQzNCLFNBQVM7RUFDVCxrQkFBa0I7QUFDcEI7O0FBRUE7RUFDRSw2QkFBNkI7RUFDN0IsV0FBVztBQUNiOztBQUVBO0VBQ0UsK0JBQStCO0FBQ2pDOztBQUVBO0VBQ0U7SUFDRSxvQkFBb0I7SUFDcEIsc0JBQXNCO0VBQ3hCOztFQUVBO0lBQ0UseUJBQXlCO0lBQ3pCLFdBQVc7RUFDYjtBQUNGXCIsXCJzb3VyY2VzQ29udGVudFwiOltcIioge1xcclxcbiAgbWFyZ2luOiAwO1xcclxcbiAgcGFkZGluZzogMDtcXHJcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxyXFxuICBmb250LWZhbWlseTogJ1BvcHBpbnMnLCBzYW5zLXNlcmlmO1xcclxcbn1cXHJcXG5cXHJcXG5ib2R5IHtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTQ3LCAxNTQsIDE1OCwgMC4xNjcpO1xcclxcbn1cXHJcXG5cXHJcXG4ubWFpblNlY3Rpb24ge1xcclxcbiAgd2lkdGg6IDUwJTtcXHJcXG4gIG1hcmdpbi10b3A6IDJyZW07XFxyXFxuICBsZWZ0OiA1JTtcXHJcXG4gIHRvcDogMTAlO1xcclxcbiAgZGlzcGxheTogZmxleDtcXHJcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDE0MywgMTAyLCAxOTApO1xcclxcbiAgYm94LXNoYWRvdzogMXB4IDFweCAzMHB4IGdyZXk7XFxyXFxuICBtYXJnaW4tbGVmdDogYXV0bztcXHJcXG4gIG1hcmdpbi1yaWdodDogYXV0bztcXHJcXG59XFxyXFxuXFxyXFxuLnBhZGRpbmcge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBwYWRkaW5nOiAwIDEuNXJlbTtcXHJcXG59XFxyXFxuXFxyXFxuLm1haW5UaXRsZUNvbnRhaW5lcixcXHJcXG4uaW5wdXREaXYsXFxyXFxuLnRleHRhcmVhQ29udGFpbmVyIHtcXHJcXG4gIGRpc3BsYXk6IGZsZXg7XFxyXFxuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XFxyXFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcclxcbiAgaGVpZ2h0OiAzLjVyZW07XFxyXFxufVxcclxcblxcclxcbnRleHRhcmVhIHtcXHJcXG4gIHdpZHRoOiA4NSU7XFxyXFxuICBmb250LXNpemU6IDEuMnJlbTtcXHJcXG4gIG1hcmdpbi1sZWZ0OiAwO1xcclxcbiAgYmFja2dyb3VuZC1jb2xvcjogcmdiKDI1NSwgMjU1LCAyNTUpO1xcclxcbiAgYm9yZGVyOiBub25lO1xcclxcbiAgcmVzaXplOiBub25lO1xcclxcbiAgcGFkZGluZzoxcHg7XFxyXFxuICBwYWRkaW5nLXRvcDogMjBweDtcXHJcXG4gIGhlaWdodDogMy41cmVtO1xcclxcbn1cXHJcXG5cXHJcXG4uY2xlYXJDb21wbGV0ZWQge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxuICBoZWlnaHQ6IDMuNXJlbTtcXHJcXG4gIGZvbnQtc2l6ZTogMS41cmVtO1xcclxcbiAgYm9yZGVyOiBub25lO1xcclxcbiAgY3Vyc29yOiBwb2ludGVyO1xcclxcbn1cXHJcXG5cXHJcXG4uY2xlYXJDb21wbGV0ZWR7XFxyXFxuICBiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDE1MSwgMTEyLCAxODksIDAuNTc1KTtcXHJcXG59XFxyXFxuXFxyXFxuLmVudGVyQnRuIHtcXHJcXG4gIGJvcmRlcjogbm9uZTtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IHJnYigxNDMsIDEwMiwgMTkwKTtcXHJcXG59XFxyXFxuXFxyXFxuLmlucHV0RmllbGQge1xcclxcbiAgcGFkZGluZzogMC41cmVtO1xcclxcbiAgd2lkdGg6IDg1JTtcXHJcXG4gIGJvcmRlcjogbm9uZTtcXHJcXG4gIGhlaWdodDogMy41cmVtO1xcclxcbiAgZm9udC1zaXplOiAxcmVtO1xcclxcbiAgZm9udC1zdHlsZTogaXRhbGljO1xcclxcbiAgbWFyZ2luLWxlZnQ6IDMuMnJlbTtcXHJcXG4gIG1hcmdpbi1yaWdodDogMnJlbTtcXHJcXG59XFxyXFxuXFxyXFxuaDEge1xcclxcbiAgd2lkdGg6IDEwMCU7XFxyXFxufVxcclxcblxcclxcbmhyIHtcXHJcXG4gIHdpZHRoOiA4NSU7XFxyXFxuICBoZWlnaHQ6IDFweDtcXHJcXG4gIGJhY2tncm91bmQtY29sb3I6IGJsYWNrO1xcclxcbiAgbWFyZ2luOiAwIDJyZW07XFxyXFxuICBtYXJnaW4tbGVmdDogM3JlbTtcXHJcXG59XFxyXFxuXFxyXFxuLmZhLFxcclxcbi5jaGVja2JveCB7XFxyXFxuICBmb250LXNpemU6IDJyZW07XFxyXFxuICBjdXJzb3I6IHBvaW50ZXI7XFxyXFxufVxcclxcblxcclxcbi5jb250cm9sbGVyIHtcXHJcXG4gIGRpc3BsYXk6IG5vbmU7XFxyXFxuICBmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7XFxyXFxuICBnYXA6IDE1cHg7XFxyXFxuICBtYXJnaW4tcmlnaHQ6IDJyZW07XFxyXFxufVxcclxcblxcclxcbi5jb21wbGV0ZWQge1xcclxcbiAgdGV4dC1kZWNvcmF0aW9uOiBsaW5lLXRocm91Z2g7XFxyXFxuICBjb2xvcjogZ3JheTtcXHJcXG59XFxyXFxuXFxyXFxuLnJlZnJlc2gge1xcclxcbiAgYW5pbWF0aW9uOiByb3RhdGUgMC4xcyBlYXNlLW91dDtcXHJcXG59XFxyXFxuXFxyXFxuQGtleWZyYW1lcyByb3RhdGUge1xcclxcbiAgMCUge1xcclxcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgwKTtcXHJcXG4gICAgY29sb3I6IHJnYigyOSwgMjcsIDI3KTtcXHJcXG4gIH1cXHJcXG5cXHJcXG4gIDEwMCUge1xcclxcbiAgICB0cmFuc2Zvcm06IHJvdGF0ZSgzNjBkZWcpO1xcclxcbiAgICBjb2xvcjogYXF1YTtcXHJcXG4gIH1cXHJcXG59XFxyXFxuXCJdLFwic291cmNlUm9vdFwiOlwiXCJ9XSk7XG4vLyBFeHBvcnRzXG5leHBvcnQgZGVmYXVsdCBfX19DU1NfTE9BREVSX0VYUE9SVF9fXztcbiIsIlwidXNlIHN0cmljdFwiO1xuXG4vKlxuICBNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuICBBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzV2l0aE1hcHBpbmdUb1N0cmluZykge1xuICB2YXIgbGlzdCA9IFtdO1xuXG4gIC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcbiAgbGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgdmFyIGNvbnRlbnQgPSBcIlwiO1xuICAgICAgdmFyIG5lZWRMYXllciA9IHR5cGVvZiBpdGVtWzVdICE9PSBcInVuZGVmaW5lZFwiO1xuICAgICAgaWYgKGl0ZW1bNF0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIkBtZWRpYSBcIi5jb25jYXQoaXRlbVsyXSwgXCIge1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChuZWVkTGF5ZXIpIHtcbiAgICAgICAgY29udGVudCArPSBcIkBsYXllclwiLmNvbmNhdChpdGVtWzVdLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQoaXRlbVs1XSkgOiBcIlwiLCBcIiB7XCIpO1xuICAgICAgfVxuICAgICAgY29udGVudCArPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0pO1xuICAgICAgaWYgKG5lZWRMYXllcikge1xuICAgICAgICBjb250ZW50ICs9IFwifVwiO1xuICAgICAgfVxuICAgICAgaWYgKGl0ZW1bMl0pIHtcbiAgICAgICAgY29udGVudCArPSBcIn1cIjtcbiAgICAgIH1cbiAgICAgIGlmIChpdGVtWzRdKSB7XG4gICAgICAgIGNvbnRlbnQgKz0gXCJ9XCI7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGVudDtcbiAgICB9KS5qb2luKFwiXCIpO1xuICB9O1xuXG4gIC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG4gIGxpc3QuaSA9IGZ1bmN0aW9uIGkobW9kdWxlcywgbWVkaWEsIGRlZHVwZSwgc3VwcG9ydHMsIGxheWVyKSB7XG4gICAgaWYgKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKSB7XG4gICAgICBtb2R1bGVzID0gW1tudWxsLCBtb2R1bGVzLCB1bmRlZmluZWRdXTtcbiAgICB9XG4gICAgdmFyIGFscmVhZHlJbXBvcnRlZE1vZHVsZXMgPSB7fTtcbiAgICBpZiAoZGVkdXBlKSB7XG4gICAgICBmb3IgKHZhciBrID0gMDsgayA8IHRoaXMubGVuZ3RoOyBrKyspIHtcbiAgICAgICAgdmFyIGlkID0gdGhpc1trXVswXTtcbiAgICAgICAgaWYgKGlkICE9IG51bGwpIHtcbiAgICAgICAgICBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgZm9yICh2YXIgX2sgPSAwOyBfayA8IG1vZHVsZXMubGVuZ3RoOyBfaysrKSB7XG4gICAgICB2YXIgaXRlbSA9IFtdLmNvbmNhdChtb2R1bGVzW19rXSk7XG4gICAgICBpZiAoZGVkdXBlICYmIGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBpZiAodHlwZW9mIGxheWVyICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgIGlmICh0eXBlb2YgaXRlbVs1XSA9PT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbGF5ZXJcIi5jb25jYXQoaXRlbVs1XS5sZW5ndGggPiAwID8gXCIgXCIuY29uY2F0KGl0ZW1bNV0pIDogXCJcIiwgXCIge1wiKS5jb25jYXQoaXRlbVsxXSwgXCJ9XCIpO1xuICAgICAgICAgIGl0ZW1bNV0gPSBsYXllcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKG1lZGlhKSB7XG4gICAgICAgIGlmICghaXRlbVsyXSkge1xuICAgICAgICAgIGl0ZW1bMl0gPSBtZWRpYTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpdGVtWzFdID0gXCJAbWVkaWEgXCIuY29uY2F0KGl0ZW1bMl0sIFwiIHtcIikuY29uY2F0KGl0ZW1bMV0sIFwifVwiKTtcbiAgICAgICAgICBpdGVtWzJdID0gbWVkaWE7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmIChzdXBwb3J0cykge1xuICAgICAgICBpZiAoIWl0ZW1bNF0pIHtcbiAgICAgICAgICBpdGVtWzRdID0gXCJcIi5jb25jYXQoc3VwcG9ydHMpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGl0ZW1bMV0gPSBcIkBzdXBwb3J0cyAoXCIuY29uY2F0KGl0ZW1bNF0sIFwiKSB7XCIpLmNvbmNhdChpdGVtWzFdLCBcIn1cIik7XG4gICAgICAgICAgaXRlbVs0XSA9IHN1cHBvcnRzO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBsaXN0LnB1c2goaXRlbSk7XG4gICAgfVxuICB9O1xuICByZXR1cm4gbGlzdDtcbn07IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgdmFyIGNvbnRlbnQgPSBpdGVtWzFdO1xuICB2YXIgY3NzTWFwcGluZyA9IGl0ZW1bM107XG4gIGlmICghY3NzTWFwcGluZykge1xuICAgIHJldHVybiBjb250ZW50O1xuICB9XG4gIGlmICh0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiKSB7XG4gICAgdmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KGNzc01hcHBpbmcpKSkpO1xuICAgIHZhciBkYXRhID0gXCJzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtjaGFyc2V0PXV0Zi04O2Jhc2U2NCxcIi5jb25jYXQoYmFzZTY0KTtcbiAgICB2YXIgc291cmNlTWFwcGluZyA9IFwiLyojIFwiLmNvbmNhdChkYXRhLCBcIiAqL1wiKTtcbiAgICByZXR1cm4gW2NvbnRlbnRdLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oXCJcXG5cIik7XG4gIH1cbiAgcmV0dXJuIFtjb250ZW50XS5qb2luKFwiXFxuXCIpO1xufTsiLCJcbiAgICAgIGltcG9ydCBBUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbmplY3RTdHlsZXNJbnRvU3R5bGVUYWcuanNcIjtcbiAgICAgIGltcG9ydCBkb21BUEkgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zdHlsZURvbUFQSS5qc1wiO1xuICAgICAgaW1wb3J0IGluc2VydEZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvaW5zZXJ0QnlTZWxlY3Rvci5qc1wiO1xuICAgICAgaW1wb3J0IHNldEF0dHJpYnV0ZXMgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9zZXRBdHRyaWJ1dGVzV2l0aG91dEF0dHJpYnV0ZXMuanNcIjtcbiAgICAgIGltcG9ydCBpbnNlcnRTdHlsZUVsZW1lbnQgZnJvbSBcIiEuLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2Rpc3QvcnVudGltZS9pbnNlcnRTdHlsZUVsZW1lbnQuanNcIjtcbiAgICAgIGltcG9ydCBzdHlsZVRhZ1RyYW5zZm9ybUZuIGZyb20gXCIhLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9kaXN0L3J1bnRpbWUvc3R5bGVUYWdUcmFuc2Zvcm0uanNcIjtcbiAgICAgIGltcG9ydCBjb250ZW50LCAqIGFzIG5hbWVkRXhwb3J0IGZyb20gXCIhIS4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2Rpc3QvY2pzLmpzIS4vc3R5bGUuY3NzXCI7XG4gICAgICBcbiAgICAgIFxuXG52YXIgb3B0aW9ucyA9IHt9O1xuXG5vcHRpb25zLnN0eWxlVGFnVHJhbnNmb3JtID0gc3R5bGVUYWdUcmFuc2Zvcm1Gbjtcbm9wdGlvbnMuc2V0QXR0cmlidXRlcyA9IHNldEF0dHJpYnV0ZXM7XG5cbiAgICAgIG9wdGlvbnMuaW5zZXJ0ID0gaW5zZXJ0Rm4uYmluZChudWxsLCBcImhlYWRcIik7XG4gICAgXG5vcHRpb25zLmRvbUFQSSA9IGRvbUFQSTtcbm9wdGlvbnMuaW5zZXJ0U3R5bGVFbGVtZW50ID0gaW5zZXJ0U3R5bGVFbGVtZW50O1xuXG52YXIgdXBkYXRlID0gQVBJKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5cblxuZXhwb3J0ICogZnJvbSBcIiEhLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvZGlzdC9janMuanMhLi9zdHlsZS5jc3NcIjtcbiAgICAgICBleHBvcnQgZGVmYXVsdCBjb250ZW50ICYmIGNvbnRlbnQubG9jYWxzID8gY29udGVudC5sb2NhbHMgOiB1bmRlZmluZWQ7XG4iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIHN0eWxlc0luRE9NID0gW107XG5cbmZ1bmN0aW9uIGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpIHtcbiAgdmFyIHJlc3VsdCA9IC0xO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzSW5ET00ubGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoc3R5bGVzSW5ET01baV0uaWRlbnRpZmllciA9PT0gaWRlbnRpZmllcikge1xuICAgICAgcmVzdWx0ID0gaTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIG1vZHVsZXNUb0RvbShsaXN0LCBvcHRpb25zKSB7XG4gIHZhciBpZENvdW50TWFwID0ge307XG4gIHZhciBpZGVudGlmaWVycyA9IFtdO1xuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuICAgIHZhciBpdGVtID0gbGlzdFtpXTtcbiAgICB2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcbiAgICB2YXIgY291bnQgPSBpZENvdW50TWFwW2lkXSB8fCAwO1xuICAgIHZhciBpZGVudGlmaWVyID0gXCJcIi5jb25jYXQoaWQsIFwiIFwiKS5jb25jYXQoY291bnQpO1xuICAgIGlkQ291bnRNYXBbaWRdID0gY291bnQgKyAxO1xuICAgIHZhciBpbmRleEJ5SWRlbnRpZmllciA9IGdldEluZGV4QnlJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgIHZhciBvYmogPSB7XG4gICAgICBjc3M6IGl0ZW1bMV0sXG4gICAgICBtZWRpYTogaXRlbVsyXSxcbiAgICAgIHNvdXJjZU1hcDogaXRlbVszXSxcbiAgICAgIHN1cHBvcnRzOiBpdGVtWzRdLFxuICAgICAgbGF5ZXI6IGl0ZW1bNV1cbiAgICB9O1xuXG4gICAgaWYgKGluZGV4QnlJZGVudGlmaWVyICE9PSAtMSkge1xuICAgICAgc3R5bGVzSW5ET01baW5kZXhCeUlkZW50aWZpZXJdLnJlZmVyZW5jZXMrKztcbiAgICAgIHN0eWxlc0luRE9NW2luZGV4QnlJZGVudGlmaWVyXS51cGRhdGVyKG9iaik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZhciB1cGRhdGVyID0gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucyk7XG4gICAgICBvcHRpb25zLmJ5SW5kZXggPSBpO1xuICAgICAgc3R5bGVzSW5ET00uc3BsaWNlKGksIDAsIHtcbiAgICAgICAgaWRlbnRpZmllcjogaWRlbnRpZmllcixcbiAgICAgICAgdXBkYXRlcjogdXBkYXRlcixcbiAgICAgICAgcmVmZXJlbmNlczogMVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgfVxuXG4gIHJldHVybiBpZGVudGlmaWVycztcbn1cblxuZnVuY3Rpb24gYWRkRWxlbWVudFN0eWxlKG9iaiwgb3B0aW9ucykge1xuICB2YXIgYXBpID0gb3B0aW9ucy5kb21BUEkob3B0aW9ucyk7XG4gIGFwaS51cGRhdGUob2JqKTtcblxuICB2YXIgdXBkYXRlciA9IGZ1bmN0aW9uIHVwZGF0ZXIobmV3T2JqKSB7XG4gICAgaWYgKG5ld09iaikge1xuICAgICAgaWYgKG5ld09iai5jc3MgPT09IG9iai5jc3MgJiYgbmV3T2JqLm1lZGlhID09PSBvYmoubWVkaWEgJiYgbmV3T2JqLnNvdXJjZU1hcCA9PT0gb2JqLnNvdXJjZU1hcCAmJiBuZXdPYmouc3VwcG9ydHMgPT09IG9iai5zdXBwb3J0cyAmJiBuZXdPYmoubGF5ZXIgPT09IG9iai5sYXllcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFwaS51cGRhdGUob2JqID0gbmV3T2JqKTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXBpLnJlbW92ZSgpO1xuICAgIH1cbiAgfTtcblxuICByZXR1cm4gdXBkYXRlcjtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobGlzdCwgb3B0aW9ucykge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgbGlzdCA9IGxpc3QgfHwgW107XG4gIHZhciBsYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obGlzdCwgb3B0aW9ucyk7XG4gIHJldHVybiBmdW5jdGlvbiB1cGRhdGUobmV3TGlzdCkge1xuICAgIG5ld0xpc3QgPSBuZXdMaXN0IHx8IFtdO1xuXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsYXN0SWRlbnRpZmllcnMubGVuZ3RoOyBpKyspIHtcbiAgICAgIHZhciBpZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW2ldO1xuICAgICAgdmFyIGluZGV4ID0gZ2V0SW5kZXhCeUlkZW50aWZpZXIoaWRlbnRpZmllcik7XG4gICAgICBzdHlsZXNJbkRPTVtpbmRleF0ucmVmZXJlbmNlcy0tO1xuICAgIH1cblxuICAgIHZhciBuZXdMYXN0SWRlbnRpZmllcnMgPSBtb2R1bGVzVG9Eb20obmV3TGlzdCwgb3B0aW9ucyk7XG5cbiAgICBmb3IgKHZhciBfaSA9IDA7IF9pIDwgbGFzdElkZW50aWZpZXJzLmxlbmd0aDsgX2krKykge1xuICAgICAgdmFyIF9pZGVudGlmaWVyID0gbGFzdElkZW50aWZpZXJzW19pXTtcblxuICAgICAgdmFyIF9pbmRleCA9IGdldEluZGV4QnlJZGVudGlmaWVyKF9pZGVudGlmaWVyKTtcblxuICAgICAgaWYgKHN0eWxlc0luRE9NW19pbmRleF0ucmVmZXJlbmNlcyA9PT0gMCkge1xuICAgICAgICBzdHlsZXNJbkRPTVtfaW5kZXhdLnVwZGF0ZXIoKTtcblxuICAgICAgICBzdHlsZXNJbkRPTS5zcGxpY2UoX2luZGV4LCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsYXN0SWRlbnRpZmllcnMgPSBuZXdMYXN0SWRlbnRpZmllcnM7XG4gIH07XG59OyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgbWVtbyA9IHt9O1xuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cbmZ1bmN0aW9uIGdldFRhcmdldCh0YXJnZXQpIHtcbiAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcbiAgICB2YXIgc3R5bGVUYXJnZXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7IC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cbiAgICBpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG4gICAgICB0cnkge1xuICAgICAgICAvLyBUaGlzIHdpbGwgdGhyb3cgYW4gZXhjZXB0aW9uIGlmIGFjY2VzcyB0byBpZnJhbWUgaXMgYmxvY2tlZFxuICAgICAgICAvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuICAgICAgICBzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAvLyBpc3RhbmJ1bCBpZ25vcmUgbmV4dFxuICAgICAgICBzdHlsZVRhcmdldCA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG4gIH1cblxuICByZXR1cm4gbWVtb1t0YXJnZXRdO1xufVxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5cblxuZnVuY3Rpb24gaW5zZXJ0QnlTZWxlY3RvcihpbnNlcnQsIHN0eWxlKSB7XG4gIHZhciB0YXJnZXQgPSBnZXRUYXJnZXQoaW5zZXJ0KTtcblxuICBpZiAoIXRhcmdldCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0JyBwYXJhbWV0ZXIgaXMgaW52YWxpZC5cIik7XG4gIH1cblxuICB0YXJnZXQuYXBwZW5kQ2hpbGQoc3R5bGUpO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGluc2VydEJ5U2VsZWN0b3I7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50KG9wdGlvbnMpIHtcbiAgdmFyIGVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic3R5bGVcIik7XG4gIG9wdGlvbnMuc2V0QXR0cmlidXRlcyhlbGVtZW50LCBvcHRpb25zLmF0dHJpYnV0ZXMpO1xuICBvcHRpb25zLmluc2VydChlbGVtZW50LCBvcHRpb25zLm9wdGlvbnMpO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBpbnNlcnRTdHlsZUVsZW1lbnQ7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc2V0QXR0cmlidXRlc1dpdGhvdXRBdHRyaWJ1dGVzKHN0eWxlRWxlbWVudCkge1xuICB2YXIgbm9uY2UgPSB0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gIT09IFwidW5kZWZpbmVkXCIgPyBfX3dlYnBhY2tfbm9uY2VfXyA6IG51bGw7XG5cbiAgaWYgKG5vbmNlKSB7XG4gICAgc3R5bGVFbGVtZW50LnNldEF0dHJpYnV0ZShcIm5vbmNlXCIsIG5vbmNlKTtcbiAgfVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHNldEF0dHJpYnV0ZXNXaXRob3V0QXR0cmlidXRlczsiLCJcInVzZSBzdHJpY3RcIjtcblxuLyogaXN0YW5idWwgaWdub3JlIG5leHQgICovXG5mdW5jdGlvbiBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaikge1xuICB2YXIgY3NzID0gXCJcIjtcblxuICBpZiAob2JqLnN1cHBvcnRzKSB7XG4gICAgY3NzICs9IFwiQHN1cHBvcnRzIChcIi5jb25jYXQob2JqLnN1cHBvcnRzLCBcIikge1wiKTtcbiAgfVxuXG4gIGlmIChvYmoubWVkaWEpIHtcbiAgICBjc3MgKz0gXCJAbWVkaWEgXCIuY29uY2F0KG9iai5tZWRpYSwgXCIge1wiKTtcbiAgfVxuXG4gIHZhciBuZWVkTGF5ZXIgPSB0eXBlb2Ygb2JqLmxheWVyICE9PSBcInVuZGVmaW5lZFwiO1xuXG4gIGlmIChuZWVkTGF5ZXIpIHtcbiAgICBjc3MgKz0gXCJAbGF5ZXJcIi5jb25jYXQob2JqLmxheWVyLmxlbmd0aCA+IDAgPyBcIiBcIi5jb25jYXQob2JqLmxheWVyKSA6IFwiXCIsIFwiIHtcIik7XG4gIH1cblxuICBjc3MgKz0gb2JqLmNzcztcblxuICBpZiAobmVlZExheWVyKSB7XG4gICAgY3NzICs9IFwifVwiO1xuICB9XG5cbiAgaWYgKG9iai5tZWRpYSkge1xuICAgIGNzcyArPSBcIn1cIjtcbiAgfVxuXG4gIGlmIChvYmouc3VwcG9ydHMpIHtcbiAgICBjc3MgKz0gXCJ9XCI7XG4gIH1cblxuICB2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuICBpZiAoc291cmNlTWFwICYmIHR5cGVvZiBidG9hICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgY3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIi5jb25jYXQoYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKSwgXCIgKi9cIik7XG4gIH0gLy8gRm9yIG9sZCBJRVxuXG4gIC8qIGlzdGFuYnVsIGlnbm9yZSBpZiAgKi9cblxuXG4gIG9wdGlvbnMuc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQsIG9wdGlvbnMub3B0aW9ucyk7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpIHtcbiAgLy8gaXN0YW5idWwgaWdub3JlIGlmXG4gIGlmIChzdHlsZUVsZW1lbnQucGFyZW50Tm9kZSA9PT0gbnVsbCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHN0eWxlRWxlbWVudC5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKHN0eWxlRWxlbWVudCk7XG59XG4vKiBpc3RhbmJ1bCBpZ25vcmUgbmV4dCAgKi9cblxuXG5mdW5jdGlvbiBkb21BUEkob3B0aW9ucykge1xuICB2YXIgc3R5bGVFbGVtZW50ID0gb3B0aW9ucy5pbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG4gIHJldHVybiB7XG4gICAgdXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUob2JqKSB7XG4gICAgICBhcHBseShzdHlsZUVsZW1lbnQsIG9wdGlvbnMsIG9iaik7XG4gICAgfSxcbiAgICByZW1vdmU6IGZ1bmN0aW9uIHJlbW92ZSgpIHtcbiAgICAgIHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZUVsZW1lbnQpO1xuICAgIH1cbiAgfTtcbn1cblxubW9kdWxlLmV4cG9ydHMgPSBkb21BUEk7IiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8qIGlzdGFuYnVsIGlnbm9yZSBuZXh0ICAqL1xuZnVuY3Rpb24gc3R5bGVUYWdUcmFuc2Zvcm0oY3NzLCBzdHlsZUVsZW1lbnQpIHtcbiAgaWYgKHN0eWxlRWxlbWVudC5zdHlsZVNoZWV0KSB7XG4gICAgc3R5bGVFbGVtZW50LnN0eWxlU2hlZXQuY3NzVGV4dCA9IGNzcztcbiAgfSBlbHNlIHtcbiAgICB3aGlsZSAoc3R5bGVFbGVtZW50LmZpcnN0Q2hpbGQpIHtcbiAgICAgIHN0eWxlRWxlbWVudC5yZW1vdmVDaGlsZChzdHlsZUVsZW1lbnQuZmlyc3RDaGlsZCk7XG4gICAgfVxuXG4gICAgc3R5bGVFbGVtZW50LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuICB9XG59XG5cbm1vZHVsZS5leHBvcnRzID0gc3R5bGVUYWdUcmFuc2Zvcm07Il0sIm5hbWVzIjpbIkRhdGFDb2xsZWN0aW9uIiwiZGF0YUNvbGxlY3Rpb24iLCJsb2FkIiwiZGlzcGxheVRvRG9MaXN0IiwiZ2V0SW5wdXRWYWx1ZSIsImlkIiwiaW5wdXRGaWVsZCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvciIsImlucHV0VmFsdWUiLCJ2YWx1ZSIsImVudGVyQnRuIiwiYWRkRXZlbnRMaXN0ZW5lciIsImV2ZW50IiwicHJldmVudERlZmF1bHQiLCJzZXREYXRhSW5Mb2NhbCIsImNsZWFyQnRuIiwiY2hlY2tzIiwicXVlcnlTZWxlY3RvckFsbCIsInVwZGF0ZUl0ZW0iLCJmb3JFYWNoIiwiY2hlY2tib3giLCJpIiwiY2hlY2tlZCIsImRhdGEiLCJpdGVtIiwiaW5kZXgiLCJwdXNoIiwidXBkYXRlTGlzdCIsImZpbHRlciIsImluY2x1ZGVzIiwibG9jYWxTdG9yYWdlIiwic2V0SXRlbSIsIkpTT04iLCJzdHJpbmdpZnkiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInJlbG9hZCIsImNsYXNzTGlzdCIsImFkZCIsIk1haW4iLCJjb25zdHJ1Y3RvciIsInRhc2siLCJjb21wbGV0ZWQiLCJnZXROZXh0SW5kZXgiLCJtYXhJbmRleCIsInRvRG9MaXN0IiwiaW5mbyIsInNhdmUiLCJpdGVtcyIsImlubmVySFRNTCIsIkRlbGV0ZUxpc3RlbmVycyIsIkVkaXRMaXN0ZW5lcnMiLCJTYXZlTGlzdGVuZXJzIiwiY2hlY2tCb3giLCJ1cGRhdGVDb21wbGV0ZWRTdGF0dXMiLCJpbnB1dHMiLCJjayIsImlzQ29tcGxldGVkIiwic2V0QXR0cmlidXRlIiwicmVtb3ZlIiwiZWRpdEJ0biIsInVwZGF0ZUNvbnRyb2xsZXIiLCJlYiIsInN0eWxlIiwiZGlzcGxheSIsImRpc2FibGVkIiwic2F2ZUJ0biIsInNiIiwiZGVsZXRlSXRlbSIsImRlbGV0ZUJ0biIsImJ0biIsImdldERhdGFGcm9tTG9jYWwiLCJwYXJzZSIsImdldEl0ZW0iXSwic291cmNlUm9vdCI6IiJ9