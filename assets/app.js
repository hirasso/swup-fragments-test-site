/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./assets-src/scss/app.scss":
/*!**********************************!*\
  !*** ./assets-src/scss/app.scss ***!
  \**********************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "../swup/node_modules/delegate-it/index.js":
/*!*************************************************!*\
  !*** ../swup/node_modules/delegate-it/index.js ***!
  \*************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const ledger = /* @__PURE__ */ new WeakMap();
function editLedger(wanted, baseElement, callback, setup) {
  var _a, _b;
  if (!wanted && !ledger.has(baseElement)) {
    return false;
  }
  const elementMap = (_a = ledger.get(baseElement)) !== null && _a !== void 0 ? _a : /* @__PURE__ */ new WeakMap();
  ledger.set(baseElement, elementMap);
  if (!wanted && !ledger.has(baseElement)) {
    return false;
  }
  const setups = (_b = elementMap.get(callback)) !== null && _b !== void 0 ? _b : /* @__PURE__ */ new Set();
  elementMap.set(callback, setups);
  const existed = setups.has(setup);
  if (wanted) {
    setups.add(setup);
  } else {
    setups.delete(setup);
  }
  return existed && wanted;
}
function isEventTarget(elements) {
  return typeof elements.addEventListener === "function";
}
function safeClosest(event, selector) {
  let target = event.target;
  if (target instanceof Text) {
    target = target.parentElement;
  }
  if (target instanceof Element && event.currentTarget instanceof Element) {
    const closest = target.closest(selector);
    if (closest && event.currentTarget.contains(closest)) {
      return closest;
    }
  }
}
function delegate(base, selector, type, callback, options) {
  if (typeof base === "string") {
    base = document.querySelectorAll(base);
  }
  if (!isEventTarget(base)) {
    const subscriptions = Array.prototype.map.call(base, (element) => delegate(element, selector, type, callback, options));
    return {
      destroy() {
        for (const subscription of subscriptions) {
          subscription.destroy();
        }
      }
    };
  }
  const baseElement = base instanceof Document ? base.documentElement : base;
  const capture = Boolean(typeof options === "object" ? options.capture : options);
  const listenerFn = (event) => {
    const delegateTarget = safeClosest(event, selector);
    if (delegateTarget) {
      event.delegateTarget = delegateTarget;
      callback.call(baseElement, event);
    }
  };
  if (typeof options === "object") {
    delete options.once;
  }
  const setup = JSON.stringify({ selector, type, capture });
  const isAlreadyListening = editLedger(true, baseElement, callback, setup);
  const delegateSubscription = {
    destroy() {
      baseElement.removeEventListener(type, listenerFn, options);
      editLedger(false, baseElement, callback, setup);
    }
  };
  if (!isAlreadyListening) {
    baseElement.addEventListener(type, listenerFn, options);
  }
  return delegateSubscription;
}
/* harmony default export */ __webpack_exports__["default"] = (delegate);


/***/ }),

/***/ "../swup/src/helpers.js":
/*!******************************!*\
  !*** ../swup/src/helpers.js ***!
  \******************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Link": function() { return /* reexport safe */ _helpers_index_js__WEBPACK_IMPORTED_MODULE_0__.Link; },
/* harmony export */   "classify": function() { return /* reexport safe */ _helpers_index_js__WEBPACK_IMPORTED_MODULE_0__.classify; },
/* harmony export */   "cleanupAnimationClasses": function() { return /* reexport safe */ _helpers_index_js__WEBPACK_IMPORTED_MODULE_0__.cleanupAnimationClasses; },
/* harmony export */   "createHistoryRecord": function() { return /* reexport safe */ _helpers_index_js__WEBPACK_IMPORTED_MODULE_0__.createHistoryRecord; },
/* harmony export */   "fetch": function() { return /* reexport safe */ _helpers_index_js__WEBPACK_IMPORTED_MODULE_0__.fetch; },
/* harmony export */   "getCurrentUrl": function() { return /* reexport safe */ _helpers_index_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentUrl; },
/* harmony export */   "getDataFromHtml": function() { return /* reexport safe */ _helpers_index_js__WEBPACK_IMPORTED_MODULE_0__.getDataFromHtml; },
/* harmony export */   "markSwupElements": function() { return /* reexport safe */ _helpers_index_js__WEBPACK_IMPORTED_MODULE_0__.markSwupElements; },
/* harmony export */   "normalizeUrl": function() { return /* reexport safe */ _helpers_index_js__WEBPACK_IMPORTED_MODULE_0__.normalizeUrl; },
/* harmony export */   "updateHistoryRecord": function() { return /* reexport safe */ _helpers_index_js__WEBPACK_IMPORTED_MODULE_0__.updateHistoryRecord; }
/* harmony export */ });
/* harmony import */ var _helpers_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./helpers/index.js */ "../swup/src/helpers/index.js");



/***/ }),

/***/ "../swup/src/helpers/Link.js":
/*!***********************************!*\
  !*** ../swup/src/helpers/Link.js ***!
  \***********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Link; }
/* harmony export */ });
class Link {
  constructor(elementOrUrl) {
    if (elementOrUrl instanceof Element || elementOrUrl instanceof SVGElement) {
      this.link = elementOrUrl;
    } else {
      this.link = document.createElement("a");
      this.link.href = elementOrUrl;
    }
  }
  getPath() {
    let path = this.link.pathname;
    if (path[0] !== "/") {
      path = "/" + path;
    }
    return path;
  }
  getAddress() {
    let path = this.link.pathname + this.link.search;
    if (this.link.getAttribute("xlink:href")) {
      path = this.link.getAttribute("xlink:href");
    }
    if (path[0] !== "/") {
      path = "/" + path;
    }
    return path;
  }
  getHash() {
    return this.link.hash;
  }
}


/***/ }),

/***/ "../swup/src/helpers/classify.js":
/*!***************************************!*\
  !*** ../swup/src/helpers/classify.js ***!
  \***************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const classify = (text) => {
  let output = text.toString().toLowerCase().replace(/\s+/g, "-").replace(/\//g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
  if (output[0] === "/")
    output = output.splice(1);
  if (output === "")
    output = "homepage";
  return output;
};
/* harmony default export */ __webpack_exports__["default"] = (classify);


/***/ }),

/***/ "../swup/src/helpers/cleanupAnimationClasses.js":
/*!******************************************************!*\
  !*** ../swup/src/helpers/cleanupAnimationClasses.js ***!
  \******************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const cleanupAnimationClasses = () => {
  document.documentElement.className.split(" ").forEach((classItem) => {
    if (new RegExp("^to-").test(classItem) || classItem === "is-changing" || classItem === "is-rendering" || classItem === "is-popstate" || classItem === "is-fragment") {
      document.documentElement.classList.remove(classItem);
    }
  });
};
/* harmony default export */ __webpack_exports__["default"] = (cleanupAnimationClasses);


/***/ }),

/***/ "../swup/src/helpers/createHistoryRecord.js":
/*!**************************************************!*\
  !*** ../swup/src/helpers/createHistoryRecord.js ***!
  \**************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const createHistoryRecord = (url, customData = {}) => {
  url = url || window.location.href.split(window.location.hostname)[1];
  const data = __spreadValues({
    url,
    random: Math.random(),
    source: "swup"
  }, customData);
  window.history.pushState(data, document.title, url);
};
/* harmony default export */ __webpack_exports__["default"] = (createHistoryRecord);


/***/ }),

/***/ "../swup/src/helpers/fetch.js":
/*!************************************!*\
  !*** ../swup/src/helpers/fetch.js ***!
  \************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
const fetch = (setOptions, callback = false) => {
  let defaults = {
    url: window.location.pathname + window.location.search,
    method: "GET",
    data: null,
    headers: {}
  };
  let options = __spreadValues(__spreadValues({}, defaults), setOptions);
  let request = new XMLHttpRequest();
  request.onreadystatechange = function() {
    if (request.readyState === 4) {
      if (request.status !== 500) {
        callback(request);
      } else {
        callback(request);
      }
    }
  };
  request.open(options.method, options.url, true);
  Object.keys(options.headers).forEach((key) => {
    request.setRequestHeader(key, options.headers[key]);
  });
  request.send(options.data);
  return request;
};
/* harmony default export */ __webpack_exports__["default"] = (fetch);


/***/ }),

/***/ "../swup/src/helpers/getCurrentUrl.js":
/*!********************************************!*\
  !*** ../swup/src/helpers/getCurrentUrl.js ***!
  \********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const getCurrentUrl = () => {
  return window.location.pathname + window.location.search;
};
/* harmony default export */ __webpack_exports__["default"] = (getCurrentUrl);


/***/ }),

/***/ "../swup/src/helpers/getDataFromHtml.js":
/*!**********************************************!*\
  !*** ../swup/src/helpers/getDataFromHtml.js ***!
  \**********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "../swup/src/utils.js");

const getDataFromHtml = (html, options) => {
  let fakeDom = document.createElement("html");
  fakeDom.innerHTML = html;
  let blocks = [];
  let fragments = {};
  if (Array.isArray(options)) {
    options = { containers: options };
  }
  const { containers = [], fragmentContainerAttr } = options || {};
  containers.forEach((selector) => {
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.query)(selector, fakeDom) == null) {
      console.warn(`[swup] Container ${selector} not found on page.`);
      return null;
    } else {
      if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.queryAll)(selector).length !== (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.queryAll)(selector, fakeDom).length) {
        console.warn(`[swup] Mismatched number of containers found on new page.`);
      }
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.queryAll)(selector).forEach((item, index) => {
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.queryAll)(selector, fakeDom)[index].setAttribute("data-swup", blocks.length);
        blocks.push((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.queryAll)(selector, fakeDom)[index].outerHTML);
      });
    }
  });
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.queryAll)(`[${fragmentContainerAttr}]`, fakeDom).forEach((container) => {
    const name = container.getAttribute(fragmentContainerAttr);
    if (!name) {
      console.warn("[swup] Fragment container is missing required name");
    } else if (fragments[name]) {
      console.warn(`[swup] Duplicate fragment container found with name #${name}`);
    } else {
      fragments[name] = container.outerHTML;
    }
  });
  const title = (fakeDom.querySelector("title") || {}).innerText;
  const pageClass = fakeDom.querySelector("body").className;
  fakeDom.innerHTML = "";
  fakeDom = null;
  return { title, pageClass, blocks, fragments, originalContent: html };
};
/* harmony default export */ __webpack_exports__["default"] = (getDataFromHtml);


/***/ }),

/***/ "../swup/src/helpers/index.js":
/*!************************************!*\
  !*** ../swup/src/helpers/index.js ***!
  \************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Link": function() { return /* reexport safe */ _Link_js__WEBPACK_IMPORTED_MODULE_8__["default"]; },
/* harmony export */   "classify": function() { return /* reexport safe */ _classify_js__WEBPACK_IMPORTED_MODULE_0__["default"]; },
/* harmony export */   "cleanupAnimationClasses": function() { return /* reexport safe */ _cleanupAnimationClasses_js__WEBPACK_IMPORTED_MODULE_9__["default"]; },
/* harmony export */   "createHistoryRecord": function() { return /* reexport safe */ _createHistoryRecord_js__WEBPACK_IMPORTED_MODULE_1__["default"]; },
/* harmony export */   "fetch": function() { return /* reexport safe */ _fetch_js__WEBPACK_IMPORTED_MODULE_4__["default"]; },
/* harmony export */   "getCurrentUrl": function() { return /* reexport safe */ _getCurrentUrl_js__WEBPACK_IMPORTED_MODULE_5__["default"]; },
/* harmony export */   "getDataFromHtml": function() { return /* reexport safe */ _getDataFromHtml_js__WEBPACK_IMPORTED_MODULE_3__["default"]; },
/* harmony export */   "markSwupElements": function() { return /* reexport safe */ _markSwupElements_js__WEBPACK_IMPORTED_MODULE_7__["default"]; },
/* harmony export */   "normalizeUrl": function() { return /* reexport safe */ _normalizeUrl_js__WEBPACK_IMPORTED_MODULE_6__["default"]; },
/* harmony export */   "updateHistoryRecord": function() { return /* reexport safe */ _updateHistoryRecord_js__WEBPACK_IMPORTED_MODULE_2__["default"]; }
/* harmony export */ });
/* harmony import */ var _classify_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./classify.js */ "../swup/src/helpers/classify.js");
/* harmony import */ var _createHistoryRecord_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./createHistoryRecord.js */ "../swup/src/helpers/createHistoryRecord.js");
/* harmony import */ var _updateHistoryRecord_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./updateHistoryRecord.js */ "../swup/src/helpers/updateHistoryRecord.js");
/* harmony import */ var _getDataFromHtml_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getDataFromHtml.js */ "../swup/src/helpers/getDataFromHtml.js");
/* harmony import */ var _fetch_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./fetch.js */ "../swup/src/helpers/fetch.js");
/* harmony import */ var _getCurrentUrl_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getCurrentUrl.js */ "../swup/src/helpers/getCurrentUrl.js");
/* harmony import */ var _normalizeUrl_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./normalizeUrl.js */ "../swup/src/helpers/normalizeUrl.js");
/* harmony import */ var _markSwupElements_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./markSwupElements.js */ "../swup/src/helpers/markSwupElements.js");
/* harmony import */ var _Link_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Link.js */ "../swup/src/helpers/Link.js");
/* harmony import */ var _cleanupAnimationClasses_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./cleanupAnimationClasses.js */ "../swup/src/helpers/cleanupAnimationClasses.js");












/***/ }),

/***/ "../swup/src/helpers/markSwupElements.js":
/*!***********************************************!*\
  !*** ../swup/src/helpers/markSwupElements.js ***!
  \***********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "../swup/src/utils.js");

const markSwupElements = (element, containers) => {
  let blocks = 0;
  containers.forEach((selector) => {
    if ((0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.query)(selector, element) == null) {
      console.warn(`[swup] Container ${selector} not found on page.`);
    } else {
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.queryAll)(selector).forEach((item, index) => {
        (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.queryAll)(selector, element)[index].setAttribute("data-swup", blocks);
        blocks++;
      });
    }
  });
};
/* harmony default export */ __webpack_exports__["default"] = (markSwupElements);


/***/ }),

/***/ "../swup/src/helpers/normalizeUrl.js":
/*!*******************************************!*\
  !*** ../swup/src/helpers/normalizeUrl.js ***!
  \*******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _Link_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Link.js */ "../swup/src/helpers/Link.js");

const normalizeUrl = (url) => {
  return new _Link_js__WEBPACK_IMPORTED_MODULE_0__["default"](url).getAddress();
};
/* harmony default export */ __webpack_exports__["default"] = (normalizeUrl);


/***/ }),

/***/ "../swup/src/helpers/updateHistoryRecord.js":
/*!**************************************************!*\
  !*** ../swup/src/helpers/updateHistoryRecord.js ***!
  \**************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
const updateHistoryRecord = (url = null, customData = {}) => {
  url = url || window.location.href;
  const data = __spreadValues(__spreadProps(__spreadValues({}, window.history.state), {
    url,
    random: Math.random(),
    source: "swup"
  }), customData);
  window.history.replaceState(data, document.title, url);
};
/* harmony default export */ __webpack_exports__["default"] = (updateHistoryRecord);


/***/ }),

/***/ "../swup/src/index.js":
/*!****************************!*\
  !*** ../swup/src/index.js ***!
  \****************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ Swup; }
/* harmony export */ });
/* harmony import */ var delegate_it__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! delegate-it */ "../swup/node_modules/delegate-it/index.js");
/* harmony import */ var _modules_Cache_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Cache.js */ "../swup/src/modules/Cache.js");
/* harmony import */ var _modules_loadPage_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/loadPage.js */ "../swup/src/modules/loadPage.js");
/* harmony import */ var _modules_leavePage_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/leavePage.js */ "../swup/src/modules/leavePage.js");
/* harmony import */ var _modules_renderPage_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/renderPage.js */ "../swup/src/modules/renderPage.js");
/* harmony import */ var _modules_enterPage_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/enterPage.js */ "../swup/src/modules/enterPage.js");
/* harmony import */ var _modules_triggerEvent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/triggerEvent.js */ "../swup/src/modules/triggerEvent.js");
/* harmony import */ var _modules_on_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modules/on.js */ "../swup/src/modules/on.js");
/* harmony import */ var _modules_off_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/off.js */ "../swup/src/modules/off.js");
/* harmony import */ var _modules_updateTransition_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./modules/updateTransition.js */ "../swup/src/modules/updateTransition.js");
/* harmony import */ var _modules_getAnchorElement_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./modules/getAnchorElement.js */ "../swup/src/modules/getAnchorElement.js");
/* harmony import */ var _modules_getAnimationPromises_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./modules/getAnimationPromises.js */ "../swup/src/modules/getAnimationPromises.js");
/* harmony import */ var _modules_getPageData_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modules/getPageData.js */ "../swup/src/modules/getPageData.js");
/* harmony import */ var _modules_plugins_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./modules/plugins.js */ "../swup/src/modules/plugins.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./utils.js */ "../swup/src/utils.js");
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./helpers.js */ "../swup/src/helpers.js");
var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
















class Swup {
  constructor(setOptions) {
    let defaults = {
      animateHistoryBrowsing: false,
      animationSelector: '[class*="transition-"]',
      linkSelector: `a[href^="${window.location.origin}"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])`,
      cache: true,
      containers: ["#swup"],
      requestHeaders: {
        "X-Requested-With": "swup",
        Accept: "text/html, application/xhtml+xml"
      },
      plugins: [],
      skipPopStateHandling: function(event) {
        return !(event.state && event.state.source === "swup");
      },
      fragmentTargetAttr: "data-swup-to-fragment",
      fragmentContainerAttr: "data-swup-fragment-container"
    };
    const options = __spreadValues(__spreadValues({}, defaults), setOptions);
    this._handlers = {
      animationInDone: [],
      animationInStart: [],
      animationOutDone: [],
      animationOutStart: [],
      animationSkipped: [],
      clickLink: [],
      contentReplaced: [],
      fragmentsReplaced: [],
      disabled: [],
      enabled: [],
      openPageInNewTab: [],
      pageLoaded: [],
      pageRetrievedFromCache: [],
      pageView: [],
      popState: [],
      samePage: [],
      samePageWithHash: [],
      serverError: [],
      transitionStart: [],
      transitionEnd: [],
      willReplaceContent: [],
      willReplaceFragments: []
    };
    this.scrollToElement = null;
    this.preloadPromise = null;
    this.options = options;
    this.plugins = [];
    this.transition = {};
    this.delegatedListeners = {};
    this.boundPopStateHandler = this.popStateHandler.bind(this);
    this.cache = new _modules_Cache_js__WEBPACK_IMPORTED_MODULE_1__["default"]();
    this.cache.swup = this;
    this.loadPage = _modules_loadPage_js__WEBPACK_IMPORTED_MODULE_2__["default"];
    this.leavePage = _modules_leavePage_js__WEBPACK_IMPORTED_MODULE_3__["default"];
    this.renderPage = _modules_renderPage_js__WEBPACK_IMPORTED_MODULE_4__["default"];
    this.enterPage = _modules_enterPage_js__WEBPACK_IMPORTED_MODULE_5__["default"];
    this.triggerEvent = _modules_triggerEvent_js__WEBPACK_IMPORTED_MODULE_6__["default"];
    this.on = _modules_on_js__WEBPACK_IMPORTED_MODULE_7__["default"];
    this.off = _modules_off_js__WEBPACK_IMPORTED_MODULE_8__["default"];
    this.updateTransition = _modules_updateTransition_js__WEBPACK_IMPORTED_MODULE_9__["default"];
    this.getAnimationPromises = _modules_getAnimationPromises_js__WEBPACK_IMPORTED_MODULE_11__["default"];
    this.getPageData = _modules_getPageData_js__WEBPACK_IMPORTED_MODULE_12__["default"];
    this.getAnchorElement = _modules_getAnchorElement_js__WEBPACK_IMPORTED_MODULE_10__["default"];
    this.log = () => {
    };
    this.use = _modules_plugins_js__WEBPACK_IMPORTED_MODULE_13__.use;
    this.unuse = _modules_plugins_js__WEBPACK_IMPORTED_MODULE_13__.unuse;
    this.findPlugin = _modules_plugins_js__WEBPACK_IMPORTED_MODULE_13__.findPlugin;
    this.getCurrentUrl = _helpers_js__WEBPACK_IMPORTED_MODULE_15__.getCurrentUrl;
    this.cleanupAnimationClasses = _helpers_js__WEBPACK_IMPORTED_MODULE_15__.cleanupAnimationClasses;
    this.currentURL = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_15__.getCurrentUrl)();
    this.enable();
  }
  enable() {
    if (typeof Promise === "undefined") {
      console.warn("Promise is not supported");
      return;
    }
    this.delegatedListeners.click = (0,delegate_it__WEBPACK_IMPORTED_MODULE_0__["default"])(
      document,
      this.options.linkSelector,
      "click",
      this.linkClickHandler.bind(this)
    );
    window.addEventListener("popstate", this.boundPopStateHandler);
    if (this.options.cache) {
    }
    (0,_helpers_js__WEBPACK_IMPORTED_MODULE_15__.markSwupElements)(document.documentElement, this.options.containers);
    this.options.plugins.forEach((plugin) => {
      this.use(plugin);
    });
    (0,_helpers_js__WEBPACK_IMPORTED_MODULE_15__.updateHistoryRecord)();
    this.triggerEvent("enabled");
    document.documentElement.classList.add("swup-enabled");
    this.triggerEvent("pageView");
  }
  destroy() {
    this.delegatedListeners.click.destroy();
    window.removeEventListener("popstate", this.boundPopStateHandler);
    this.cache.empty();
    this.options.plugins.forEach((plugin) => {
      this.unuse(plugin);
    });
    (0,_utils_js__WEBPACK_IMPORTED_MODULE_14__.queryAll)("[data-swup]").forEach((element) => {
      element.removeAttribute("data-swup");
    });
    this.off();
    this.triggerEvent("disabled");
    document.documentElement.classList.remove("swup-enabled");
  }
  linkClickHandler(event) {
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      this.triggerEvent("openPageInNewTab", event);
      return;
    }
    if (event.button !== 0) {
      return;
    }
    this.triggerEvent("clickLink", event);
    event.preventDefault();
    const link = new _helpers_js__WEBPACK_IMPORTED_MODULE_15__.Link(event.delegateTarget);
    const url = link.getAddress();
    const hash = link.getHash();
    if (url == (0,_helpers_js__WEBPACK_IMPORTED_MODULE_15__.getCurrentUrl)() || url == "") {
      if (!hash) {
        this.triggerEvent("samePage", event);
      } else {
        this.triggerEvent("samePageWithHash", event);
        const element = (0,_modules_getAnchorElement_js__WEBPACK_IMPORTED_MODULE_10__["default"])(hash);
        if (element) {
          (0,_helpers_js__WEBPACK_IMPORTED_MODULE_15__.updateHistoryRecord)(url + hash);
        } else {
          console.warn(`Element for offset not found (#${hash})`);
        }
      }
    } else {
      this.scrollToElement = hash || null;
      const customTransition = event.delegateTarget.getAttribute("data-swup-transition");
      let fragment = false;
      const { fragmentTargetAttr: attr } = this.options;
      const targetEl = event.delegateTarget.closest(`[${attr}]`);
      if (targetEl && targetEl.matches(`[${attr}]:not([${attr}="_top"])`)) {
        fragment = targetEl.getAttribute(attr) || true;
      }
      this.loadPage({ url, fragment, customTransition }, false);
    }
  }
  popStateHandler(event) {
    if (this.options.skipPopStateHandling(event)) {
      return;
    }
    const { url = window.location.href, fragment } = event.state || {};
    const link = new _helpers_js__WEBPACK_IMPORTED_MODULE_15__.Link(url);
    if (link.getHash()) {
      this.scrollToElement = link.getHash();
    } else {
      event.preventDefault();
    }
    this.triggerEvent("popState", event);
    if (!this.options.animateHistoryBrowsing) {
      document.documentElement.classList.remove("is-animating");
      (0,_helpers_js__WEBPACK_IMPORTED_MODULE_15__.cleanupAnimationClasses)();
    }
    this.loadPage({ url: link.getAddress(), fragment }, event);
  }
}


/***/ }),

/***/ "../swup/src/modules/Cache.js":
/*!************************************!*\
  !*** ../swup/src/modules/Cache.js ***!
  \************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Cache": function() { return /* binding */ Cache; }
/* harmony export */ });
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers.js */ "../swup/src/helpers.js");

class Cache {
  constructor() {
    this.pages = {};
    this.last = null;
  }
  cacheUrl(page) {
    page.url = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.normalizeUrl)(page.url);
    if (page.url in this.pages === false) {
      this.pages[page.url] = page;
    }
    this.last = this.pages[page.url];
    this.swup.log(`Cache (${Object.keys(this.pages).length})`, this.pages);
  }
  getPage(url) {
    url = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.normalizeUrl)(url);
    return this.pages[url];
  }
  getCurrentPage() {
    return this.getPage((0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentUrl)());
  }
  exists(url) {
    url = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.normalizeUrl)(url);
    return url in this.pages;
  }
  empty() {
    this.pages = {};
    this.last = null;
    this.swup.log("Cache cleared");
  }
  remove(url) {
    delete this.pages[url];
  }
}
/* harmony default export */ __webpack_exports__["default"] = (Cache);


/***/ }),

/***/ "../swup/src/modules/enterPage.js":
/*!****************************************!*\
  !*** ../swup/src/modules/enterPage.js ***!
  \****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "../swup/src/utils.js");

const enterPage = function({ popstate = false, skipTransition = false } = {}) {
  if (skipTransition) {
    this.triggerEvent("transitionEnd", popstate);
    this.cleanupAnimationClasses();
    return [Promise.resolve()];
  }
  (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.nextTick)(() => {
    this.triggerEvent("animationInStart");
    document.documentElement.classList.remove("is-animating");
  });
  const animationPromises = this.getAnimationPromises("in");
  Promise.all(animationPromises).then(() => {
    this.triggerEvent("animationInDone");
    this.triggerEvent("transitionEnd", popstate);
    this.cleanupAnimationClasses();
  });
  return animationPromises;
};
/* harmony default export */ __webpack_exports__["default"] = (enterPage);


/***/ }),

/***/ "../swup/src/modules/getAnchorElement.js":
/*!***********************************************!*\
  !*** ../swup/src/modules/getAnchorElement.js ***!
  \***********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "../swup/src/utils.js");

const getAnchorElement = (hash) => {
  if (!hash) {
    return null;
  }
  if (hash.charAt(0) === "#") {
    hash = hash.substring(1);
  }
  hash = decodeURIComponent(hash);
  hash = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.escapeCssIdentifier)(hash);
  return (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.query)(`#${hash}`) || (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.query)(`a[name='${hash}']`);
};
/* harmony default export */ __webpack_exports__["default"] = (getAnchorElement);


/***/ }),

/***/ "../swup/src/modules/getAnimationPromises.js":
/*!***************************************************!*\
  !*** ../swup/src/modules/getAnimationPromises.js ***!
  \***************************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": function() { return /* binding */ getAnimationPromises; },
/* harmony export */   "getTransitionInfo": function() { return /* binding */ getTransitionInfo; }
/* harmony export */ });
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils.js */ "../swup/src/utils.js");

let transitionProp = "transition";
let transitionEndEvent = "transitionend";
let animationProp = "animation";
let animationEndEvent = "animationend";
if (window.ontransitionend === void 0 && window.onwebkittransitionend !== void 0) {
  transitionProp = "WebkitTransition";
  transitionEndEvent = "webkitTransitionEnd";
}
if (window.onanimationend === void 0 && window.onwebkitanimationend !== void 0) {
  animationProp = "WebkitAnimation";
  animationEndEvent = "webkitAnimationEnd";
}
function getAnimationPromises() {
  const selector = this.options.animationSelector;
  const animatedElements = (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.queryAll)(selector, document.body);
  if (!animatedElements.length) {
    console.warn(`[swup] No animated elements found by selector ${selector}`);
    return [Promise.resolve()];
  }
  return animatedElements.map((element) => getAnimationPromiseForElement(element, selector));
}
function getAnimationPromiseForElement(element, selector, expectedType = null) {
  const { type, timeout, propCount } = getTransitionInfo(element, expectedType);
  if (!type || !timeout) {
    console.warn(
      `[swup] No CSS transition duration defined for element of selector ${selector}`
    );
    return Promise.resolve();
  }
  return new Promise((resolve) => {
    const endEvent = type === "transition" ? transitionEndEvent : animationEndEvent;
    const startTime = performance.now();
    let propsTransitioned = 0;
    const end = () => {
      element.removeEventListener(endEvent, onEnd);
      resolve();
    };
    const onEnd = (event) => {
      if (event.target !== element) {
        return;
      }
      const elapsedTime = (performance.now() - startTime) / 1e3;
      if (elapsedTime < event.elapsedTime) {
        return;
      }
      if (++propsTransitioned >= propCount) {
        end();
      }
    };
    setTimeout(() => {
      if (propsTransitioned < propCount) {
        end();
      }
    }, timeout + 1);
    element.addEventListener(endEvent, onEnd);
  });
}
function getTransitionInfo(element, expectedType = null) {
  const styles = window.getComputedStyle(element);
  const transitionDelays = (styles[`${transitionProp}Delay`] || "").split(", ");
  const transitionDurations = (styles[`${transitionProp}Duration`] || "").split(", ");
  const transitionTimeout = calculateTimeout(transitionDelays, transitionDurations);
  const animationDelays = (styles[`${animationProp}Delay`] || "").split(", ");
  const animationDurations = (styles[`${animationProp}Duration`] || "").split(", ");
  const animationTimeout = calculateTimeout(animationDelays, animationDurations);
  let type = "";
  let timeout = 0;
  let propCount = 0;
  if (expectedType === "transition") {
    if (transitionTimeout > 0) {
      type = "transition";
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === "animation") {
    if (animationTimeout > 0) {
      type = "animation";
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0 ? transitionTimeout > animationTimeout ? "transition" : "animation" : null;
    propCount = type ? type === "transition" ? transitionDurations.length : animationDurations.length : 0;
  }
  return {
    type,
    timeout,
    propCount
  };
}
function calculateTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max(...durations.map((duration, i) => (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.toMs)(duration) + (0,_utils_js__WEBPACK_IMPORTED_MODULE_0__.toMs)(delays[i])));
}


/***/ }),

/***/ "../swup/src/modules/getPageData.js":
/*!******************************************!*\
  !*** ../swup/src/modules/getPageData.js ***!
  \******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers.js */ "../swup/src/helpers.js");

const getPageData = function(request) {
  const html = request.responseText;
  const pageObject = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.getDataFromHtml)(html, this.options);
  if (!pageObject) {
    console.warn("[swup] Received page is invalid.");
    return null;
  }
  pageObject.responseURL = request.responseURL || window.location.href;
  return pageObject;
};
/* harmony default export */ __webpack_exports__["default"] = (getPageData);


/***/ }),

/***/ "../swup/src/modules/leavePage.js":
/*!****************************************!*\
  !*** ../swup/src/modules/leavePage.js ***!
  \****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers.js */ "../swup/src/helpers.js");

const leavePage = function(data, { popstate = false, skipTransition = false } = {}) {
  if (skipTransition) {
    this.triggerEvent("animationSkipped");
    return [Promise.resolve()];
  }
  this.triggerEvent("animationOutStart");
  document.documentElement.classList.add("is-changing");
  document.documentElement.classList.add("is-leaving");
  document.documentElement.classList.add("is-animating");
  if (popstate) {
    document.documentElement.classList.add("is-popstate");
  }
  document.documentElement.classList.add(`to-${(0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.classify)(data.url)}`);
  const animationPromises = this.getAnimationPromises("out");
  Promise.all(animationPromises).then(() => {
    this.triggerEvent("animationOutDone");
  });
  return animationPromises;
};
/* harmony default export */ __webpack_exports__["default"] = (leavePage);


/***/ }),

/***/ "../swup/src/modules/loadPage.js":
/*!***************************************!*\
  !*** ../swup/src/modules/loadPage.js ***!
  \***************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers.js */ "../swup/src/helpers.js");
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));

const loadPage = function(data, popstate = false) {
  let animationPromises = [];
  let xhrPromise;
  const { url, fragment, customTransition } = data;
  const skipTransition = fragment || popstate && !this.options.animateHistoryBrowsing;
  this.triggerEvent("transitionStart", popstate);
  this.updateTransition(window.location.pathname, url, customTransition);
  if (customTransition != null) {
    document.documentElement.classList.add(`to-${(0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.classify)(customTransition)}`);
  }
  animationPromises = this.leavePage(data, { popstate, skipTransition });
  if (!popstate) {
    (0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.updateHistoryRecord)(this.currentURL, { fragment });
    (0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.createHistoryRecord)(url + (this.scrollToElement || ""), { fragment });
  }
  this.currentURL = (0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.getCurrentUrl)();
  if (this.cache.exists(url)) {
    xhrPromise = Promise.resolve(this.cache.getPage(url));
    this.triggerEvent("pageRetrievedFromCache");
  } else if (this.preloadPromise && this.preloadPromise.route === url) {
    xhrPromise = this.preloadPromise;
  } else {
    xhrPromise = new Promise((resolve, reject) => {
      (0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.fetch)(__spreadProps(__spreadValues({}, data), { headers: this.options.requestHeaders }), (response) => {
        if (response.status === 500) {
          this.triggerEvent("serverError");
          reject(url);
          return;
        }
        const page = this.getPageData(response);
        if (!page || !page.blocks.length) {
          reject(url);
          return;
        }
        page.url = url;
        this.cache.cacheUrl(page);
        this.triggerEvent("pageLoaded");
        resolve(page);
      });
    });
  }
  Promise.all([xhrPromise].concat(animationPromises)).then(([pageData]) => {
    this.renderPage(pageData, { popstate, fragment, skipTransition });
    this.preloadPromise = null;
  }).catch((errorUrl) => {
    this.options.skipPopStateHandling = function() {
      window.location = errorUrl;
      return true;
    };
    window.history.go(-1);
  });
};
/* harmony default export */ __webpack_exports__["default"] = (loadPage);


/***/ }),

/***/ "../swup/src/modules/off.js":
/*!**********************************!*\
  !*** ../swup/src/modules/off.js ***!
  \**********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const off = function off2(event, handler) {
  if (event != null) {
    if (handler != null) {
      if (this._handlers[event] && this._handlers[event].filter((savedHandler) => savedHandler === handler).length) {
        let toRemove = this._handlers[event].filter(
          (savedHandler) => savedHandler === handler
        )[0];
        let index = this._handlers[event].indexOf(toRemove);
        if (index > -1) {
          this._handlers[event].splice(index, 1);
        }
      } else {
        console.warn(`Handler for event '${event}' no found.`);
      }
    } else {
      this._handlers[event] = [];
    }
  } else {
    Object.keys(this._handlers).forEach((keys) => {
      this._handlers[keys] = [];
    });
  }
};
/* harmony default export */ __webpack_exports__["default"] = (off);


/***/ }),

/***/ "../swup/src/modules/on.js":
/*!*********************************!*\
  !*** ../swup/src/modules/on.js ***!
  \*********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const on = function on2(event, handler) {
  if (this._handlers[event]) {
    this._handlers[event].push(handler);
  } else {
    console.warn(`Unsupported event ${event}.`);
  }
};
/* harmony default export */ __webpack_exports__["default"] = (on);


/***/ }),

/***/ "../swup/src/modules/plugins.js":
/*!**************************************!*\
  !*** ../swup/src/modules/plugins.js ***!
  \**************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "findPlugin": function() { return /* binding */ findPlugin; },
/* harmony export */   "unuse": function() { return /* binding */ unuse; },
/* harmony export */   "use": function() { return /* binding */ use; }
/* harmony export */ });
const use = function(plugin) {
  if (!plugin.isSwupPlugin) {
    console.warn(`Not swup plugin instance ${plugin}.`);
    return;
  }
  this.plugins.push(plugin);
  plugin.swup = this;
  if (typeof plugin._beforeMount === "function") {
    plugin._beforeMount();
  }
  plugin.mount();
  return this.plugins;
};
const unuse = function(plugin) {
  let pluginReference;
  if (typeof plugin === "string") {
    pluginReference = this.plugins.find((p) => plugin === p.name);
  } else {
    pluginReference = plugin;
  }
  if (!pluginReference) {
    console.warn("No such plugin.");
    return;
  }
  pluginReference.unmount();
  if (typeof pluginReference._afterUnmount === "function") {
    pluginReference._afterUnmount();
  }
  const index = this.plugins.indexOf(pluginReference);
  this.plugins.splice(index, 1);
  return this.plugins;
};
const findPlugin = function(pluginName) {
  return this.plugins.find((p) => pluginName === p.name);
};


/***/ }),

/***/ "../swup/src/modules/renderPage.js":
/*!*****************************************!*\
  !*** ../swup/src/modules/renderPage.js ***!
  \*****************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _helpers_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../helpers.js */ "../swup/src/helpers.js");
/* harmony import */ var _utils_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils.js */ "../swup/src/utils.js");
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));


const renderPage = function(page, { popstate, fragment } = {}) {
  document.documentElement.classList.remove("is-leaving");
  const isCurrentPage = this.getCurrentUrl() === page.url;
  if (!isCurrentPage) {
    console.log("not current page:", this.getCurrentUrl(), "vs", page.url, page);
    return;
  }
  const skipTransition = fragment || popstate && !this.options.animateHistoryBrowsing;
  const url = new _helpers_js__WEBPACK_IMPORTED_MODULE_0__.Link(page.responseURL).getAddress();
  if (window.location.pathname !== url) {
    (0,_helpers_js__WEBPACK_IMPORTED_MODULE_0__.updateHistoryRecord)(url);
    this.cache.cacheUrl(__spreadProps(__spreadValues({}, page), { url }));
  }
  if (!skipTransition) {
    document.documentElement.classList.add("is-rendering");
  }
  const replaceBlocks = () => {
    this.triggerEvent("willReplaceContent", popstate);
    page.blocks.forEach((html, i) => {
      const block = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.query)(`[data-swup="${i}"]`, document.body);
      block.outerHTML = html;
    });
    this.triggerEvent("contentReplaced", popstate);
  };
  const replaceFragments = () => {
    const fragments = Object.entries(page.fragments);
    if (!fragments.length) {
      console.warn("[swup] No fragments found, replacing whole page");
      return false;
    }
    const { fragmentContainerAttr } = this.options;
    const fragmentsOnPage = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.queryAll)(`[${fragmentContainerAttr}]`).filter((el) => fragment === true || fragment === el.getAttribute(fragmentContainerAttr));
    const fragmentsToReplace = fragments.filter(([name]) => fragment === true || fragment === name);
    const hasIdenticalFragmentContainers = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.compareArrays)(
      fragmentsOnPage.map((el) => el.getAttribute(fragmentContainerAttr)),
      fragmentsToReplace.map(([name]) => name)
    );
    if (!hasIdenticalFragmentContainers) {
      console.warn("[swup] Mismatching fragments on current and new page, replacing whole page");
      return false;
    }
    if (typeof fragment === "string" && !page.fragments[fragment]) {
      console.warn(`[swup] Fragment "${fragment}" not found, replacing whole page`);
      return false;
    }
    document.documentElement.classList.add("is-fragment");
    this.triggerEvent("willReplaceContent", popstate);
    this.triggerEvent("willReplaceFragments", popstate);
    fragmentsToReplace.forEach(([name, html]) => {
      const container = (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.query)(`[${fragmentContainerAttr}="${name}"]`);
      if (container) {
        container.outerHTML = html;
      }
    });
    this.triggerEvent("contentReplaced", popstate);
    this.triggerEvent("fragmentsReplaced", popstate);
  };
  if (fragment) {
    if (replaceFragments() === false) {
      console.log("Fragments failed, replacing blocks");
      (0,_utils_js__WEBPACK_IMPORTED_MODULE_1__.nextTick)(() => {
        this.loadPage({ url }, popstate);
      });
      return;
    }
  } else {
    replaceBlocks();
  }
  document.title = page.title;
  this.triggerEvent("pageView", popstate);
  if (!this.options.cache) {
    this.cache.empty();
  }
  this.enterPage({ popstate, skipTransition });
  this.scrollToElement = null;
};
/* harmony default export */ __webpack_exports__["default"] = (renderPage);


/***/ }),

/***/ "../swup/src/modules/triggerEvent.js":
/*!*******************************************!*\
  !*** ../swup/src/modules/triggerEvent.js ***!
  \*******************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const triggerEvent = function(eventName, originalEvent) {
  this._handlers[eventName].forEach((handler) => {
    try {
      handler(originalEvent);
    } catch (error) {
      console.error(error);
    }
  });
  const event = new CustomEvent("swup:" + eventName, { detail: eventName });
  document.dispatchEvent(event);
};
/* harmony default export */ __webpack_exports__["default"] = (triggerEvent);


/***/ }),

/***/ "../swup/src/modules/updateTransition.js":
/*!***********************************************!*\
  !*** ../swup/src/modules/updateTransition.js ***!
  \***********************************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
const updateTransition = function(from, to, custom) {
  this.transition = { from, to, custom };
};
/* harmony default export */ __webpack_exports__["default"] = (updateTransition);


/***/ }),

/***/ "../swup/src/utils.js":
/*!****************************!*\
  !*** ../swup/src/utils.js ***!
  \****************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "compareArrays": function() { return /* reexport safe */ _utils_index_js__WEBPACK_IMPORTED_MODULE_0__.compareArrays; },
/* harmony export */   "escapeCssIdentifier": function() { return /* reexport safe */ _utils_index_js__WEBPACK_IMPORTED_MODULE_0__.escapeCssIdentifier; },
/* harmony export */   "nextTick": function() { return /* reexport safe */ _utils_index_js__WEBPACK_IMPORTED_MODULE_0__.nextTick; },
/* harmony export */   "query": function() { return /* reexport safe */ _utils_index_js__WEBPACK_IMPORTED_MODULE_0__.query; },
/* harmony export */   "queryAll": function() { return /* reexport safe */ _utils_index_js__WEBPACK_IMPORTED_MODULE_0__.queryAll; },
/* harmony export */   "toMs": function() { return /* reexport safe */ _utils_index_js__WEBPACK_IMPORTED_MODULE_0__.toMs; }
/* harmony export */ });
/* harmony import */ var _utils_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./utils/index.js */ "../swup/src/utils/index.js");



/***/ }),

/***/ "../swup/src/utils/index.js":
/*!**********************************!*\
  !*** ../swup/src/utils/index.js ***!
  \**********************************/
/***/ (function(__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "compareArrays": function() { return /* binding */ compareArrays; },
/* harmony export */   "escapeCssIdentifier": function() { return /* binding */ escapeCssIdentifier; },
/* harmony export */   "nextTick": function() { return /* binding */ nextTick; },
/* harmony export */   "query": function() { return /* binding */ query; },
/* harmony export */   "queryAll": function() { return /* binding */ queryAll; },
/* harmony export */   "toMs": function() { return /* binding */ toMs; }
/* harmony export */ });
const query = (selector, context = document) => {
  if (typeof selector !== "string") {
    return selector;
  }
  return context.querySelector(selector);
};
const queryAll = (selector, context = document) => {
  if (typeof selector !== "string") {
    return selector;
  }
  return Array.from(context.querySelectorAll(selector));
};
const nextTick = (callback) => {
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      callback();
    });
  });
};
const escapeCssIdentifier = (ident) => {
  if (window.CSS && window.CSS.escape) {
    return CSS.escape(ident);
  } else {
    return ident;
  }
};
const compareArrays = (array1, array2) => {
  return array1.length === array2.length && array1.every((value, index) => value === array2[index]);
};
const toMs = (s) => {
  return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
};


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 	
/******/ 		        // webpack-livereload-plugin
/******/ 		        (function() {
/******/ 		          if (typeof window === "undefined") { return };
/******/ 		          var id = "webpack-livereload-plugin-script-c0da962ac29b3ff4";
/******/ 		          if (document.getElementById(id)) { return; }
/******/ 		          var el = document.createElement("script");
/******/ 		          el.id = id;
/******/ 		          el.async = true;
/******/ 		          el.src = "//" + location.hostname + ":35729/livereload.js";
/******/ 		          document.getElementsByTagName("head")[0].appendChild(el);
/******/ 		          console.log("[Live Reload] enabled");
/******/ 		        }());
/******/ 		        // Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
!function() {
/*!******************************!*\
  !*** ./assets-src/js/app.js ***!
  \******************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _scss_app_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/app.scss */ "./assets-src/scss/app.scss");
/* harmony import */ var _swup_src_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../swup/src/index.js */ "../swup/src/index.js");


const options = {
  containers: ["#swup", "#nav"],
  cache: true,
  linkSelector: `a[href^="${window.location.origin}"]:not([data-no-swup]), a[href^="./"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])`,
  plugins: []
};
const swup = new _swup_src_index_js__WEBPACK_IMPORTED_MODULE_1__["default"](options);
window.swup = swup;
let modalCloseUrl = null;
const setModalCloseUrl = (e) => {
  const wasFilterSet = Boolean(new URL(window.location.href).searchParams.get("filter"));
  if (wasFilterSet)
    modalCloseUrl = window.location.href;
};
swup.on("transitionStart", setModalCloseUrl);
const applyModalCloseUrl = (e) => {
  if (modalCloseUrl == null)
    return;
  document.querySelectorAll("[data-apply-modal-close-url]").forEach((el) => el.href = modalCloseUrl);
};
swup.on("contentReplaced", applyModalCloseUrl);
const closeModalOnEscape = (e) => {
  if (e.key !== "Escape")
    return;
  const closeLink = document.querySelector("a.character_close");
  if (!closeLink)
    return;
  closeLink.click();
};
window.addEventListener("keydown", closeModalOnEscape);

}();
/******/ })()
;
//# sourceMappingURL=app.js.map