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
/******/ 	return __webpack_require__(__webpack_require__.s = 17);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(3)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */,
/* 8 */,
/* 9 */,
/* 10 */,
/* 11 */,
/* 12 */,
/* 13 */,
/* 14 */,
/* 15 */,
/* 16 */,
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(18);


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

Nova.booting(function (Vue, router) {
    router.addRoutes([{
        name: 'nova-google-analytics',
        path: '/nova-google-analytics',
        component: __webpack_require__(19)
    }]);
});

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(20)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(22)
/* template */
var __vue_template__ = __webpack_require__(32)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/Tool.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-68ff5483", Component.options)
  } else {
    hotAPI.reload("data-v-68ff5483", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(21);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("6e5db1d0", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-68ff5483\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Tool.vue", function() {
     var newContent = require("!!../../../node_modules/css-loader/index.js!../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-68ff5483\",\"scoped\":false,\"hasInlineConfig\":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./Tool.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n/* Scoped Styles */\n", ""]);

// exports


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PaginationLinks_vue__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PaginationLinks_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__PaginationLinks_vue__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_dayjs__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_dayjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_dayjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_dayjs_plugin_duration__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_dayjs_plugin_duration___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_dayjs_plugin_duration__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_dayjs_plugin_utc__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_dayjs_plugin_utc___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_dayjs_plugin_utc__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__FilterMenu__ = __webpack_require__(29);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__FilterMenu___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4__FilterMenu__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//







__WEBPACK_IMPORTED_MODULE_1_dayjs___default.a.extend(__WEBPACK_IMPORTED_MODULE_2_dayjs_plugin_duration___default.a);
__WEBPACK_IMPORTED_MODULE_1_dayjs___default.a.extend(__WEBPACK_IMPORTED_MODULE_3_dayjs_plugin_utc___default.a);

/* harmony default export */ __webpack_exports__["default"] = ({
  components: {
    'pagination-links': __WEBPACK_IMPORTED_MODULE_0__PaginationLinks_vue___default.a,
    'dayjs': __WEBPACK_IMPORTED_MODULE_1_dayjs___default.a,
    'filter-menu': __WEBPACK_IMPORTED_MODULE_4__FilterMenu___default.a
  },
  data: function data() {
    return {
      title: 'Google Analytics',
      pages: [],
      duration: 'week',
      initialLoading: true,
      loading: true,
      hasMore: true,
      page: 1,
      totalPages: 1,
      search: '',
      sortBy: 'ga:pageviews',
      sortDirection: 'desc',
      limit: 10
    };
  },
  metaInfo: function metaInfo() {
    return {
      title: this.title
    };
  },

  methods: {
    updateDuration: function updateDuration(event) {
      this.duration = event.target.value;
      this.getPages();
    },
    updateLimit: function updateLimit(value) {
      console.log("update limit called");
      this.limit = value;
      this.getPages();
    },
    getPages: function getPages() {
      var _this = this;

      Nova.request().get('/nova-vendor/nova-google-analytics/pages?limit=' + this.limit + '&duration=' + this.duration + '&page=' + this.page + '&s=' + this.search + '&sortBy=' + this.sortBy + '&sortDirection=' + this.sortDirection).then(function (response) {
        _this.pages = response.data.pages;
        _this.totalPages = response.data.totalPages;
        _this.hasMore = response.data.hasMore;
        _this.loading = false;
      });
    },
    nextPage: function nextPage() {
      this.loading = true;
      this.page++;
      this.getPages();
    },
    previousPage: function previousPage() {
      this.loading = true;
      if (this.hasPrevious) {
        this.page--;
      }
      this.getPages();
    },
    performSearch: function performSearch(event) {
      if (event.which != 9) {
        this.page = 1;
        this.getPages();
      }
    },
    sortByChange: function sortByChange(event) {
      var direction = this.sortDirection == 'asc' ? 'desc' : 'asc';

      if (this.sortBy != event.key) {
        direction = 'asc';
      }

      this.sortBy = event.key;
      this.sortDirection = direction;
      this.getPages();
    },
    resetOrderBy: function resetOrderBy(event) {
      this.sortBy = 'ga:pageviews';
      this.sortDirection = 'desc';
      this.getPages();
    },
    getFormattedTime: function getFormattedTime(timeString) {
      return __WEBPACK_IMPORTED_MODULE_1_dayjs___default.a.utc(__WEBPACK_IMPORTED_MODULE_1_dayjs___default.a.duration({ seconds: timeString }).asMilliseconds()).format('HH:mm:ss');
    },
    getFormattedPercent: function getFormattedPercent(percentString) {
      return parseFloat(percentString).toFixed(2) + '%';
    },
    getFormattedCurrency: function getFormattedCurrency(percentString) {
      //return '$'+parseFloat(percentString).toFixed(2)
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(percentString);
    }
  },
  computed: {
    hasPrevious: function hasPrevious() {
      return this.page > 1;
    }
  },
  mounted: function mounted() {
    this.getPages();
    this.initialLoading = false;
  }
});

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(24)
/* template */
var __vue_template__ = __webpack_require__(25)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/PaginationLinks.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2963ad24", Component.options)
  } else {
    hotAPI.reload("data-v-2963ad24", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: ['data', 'hasMore', 'hasPrevious', 'currentPage', 'totalPages'],
  methods: {
    /**
     * Select the previous page.
     */
    previousPage: function previousPage() {
      this.$emit('previous');
    },

    /**
     * Select the next page.
     */
    nextPage: function nextPage() {
      this.$emit('next');
    }
  }
});

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "bg-20 rounded-b" }, [
    _vm.data.length > 0
      ? _c("nav", { staticClass: "flex justify-between items-center" }, [
          _c("div", [
            _c(
              "button",
              {
                staticClass: "btn btn-link py-3 px-4",
                class: {
                  "text-primary dim": _vm.hasPrevious,
                  "text-80 opacity-50 cursor-not-allowed": !_vm.hasPrevious
                },
                attrs: {
                  disabled: !_vm.hasPrevious,
                  rel: "prev",
                  dusk: "previous"
                },
                on: {
                  click: function($event) {
                    $event.preventDefault()
                    return _vm.previousPage()
                  }
                }
              },
              [_vm._v("\n        " + _vm._s(_vm.__("Previous")) + "\n      ")]
            )
          ]),
          _vm._v(" "),
          _vm.currentPage && _vm.totalPages
            ? _c("div", { staticClass: "text-sm text-80 px-4" }, [
                _vm._v(
                  _vm._s(_vm.currentPage) +
                    " " +
                    _vm._s(_vm.__("of")) +
                    " " +
                    _vm._s(_vm.totalPages)
                )
              ])
            : _vm._e(),
          _vm._v(" "),
          _c("div", [
            _c(
              "button",
              {
                staticClass: "ml-auto btn btn-link py-3 px-4",
                class: {
                  "text-primary dim": _vm.hasMore,
                  "text-80 opacity-50 cursor-not-allowed": !_vm.hasMore
                },
                attrs: { disabled: !_vm.hasMore, rel: "next", dusk: "next" },
                on: {
                  click: function($event) {
                    $event.preventDefault()
                    return _vm.nextPage()
                  }
                }
              },
              [_vm._v("\n        " + _vm._s(_vm.__("Next")) + "\n      ")]
            )
          ])
        ])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-2963ad24", module.exports)
  }
}

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,e){ true?module.exports=e():"function"==typeof define&&define.amd?define(e):(t="undefined"!=typeof globalThis?globalThis:t||self).dayjs=e()}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},D="en",v={};v[D]=M;var p=function(t){return t instanceof _},S=function(t,e,n){var r;if(!t)return D;if("string"==typeof t)v[t]&&(r=t),e&&(v[t]=e,r=t);else{var i=t.name;v[i]=t,r=i}return!n&&r&&(D=r),r||!n&&D},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var D=this.$locale().weekStart||0,v=(y<D?y+7:y)-D;return $(r?m-v:m+(6-v),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,D=O.m(this,M);return D=(l={},l[c]=D/12,l[f]=D,l[h]=D/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?D:O.a(D)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return v[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),b=_.prototype;return w.prototype=b,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=v[D],w.Ls=v,w.p={},w}));

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,s){ true?module.exports=s():"function"==typeof define&&define.amd?define(s):(t="undefined"!=typeof globalThis?globalThis:t||self).dayjs_plugin_duration=s()}(this,(function(){"use strict";var t,s,n=1e3,i=6e4,e=36e5,r=864e5,o=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,u=31536e6,h=2592e6,a=/^(-|\+)?P(?:([-+]?[0-9,.]*)Y)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)W)?(?:([-+]?[0-9,.]*)D)?(?:T(?:([-+]?[0-9,.]*)H)?(?:([-+]?[0-9,.]*)M)?(?:([-+]?[0-9,.]*)S)?)?$/,d={years:u,months:h,days:r,hours:e,minutes:i,seconds:n,milliseconds:1,weeks:6048e5},c=function(t){return t instanceof p},f=function(t,s,n){return new p(t,n,s.$l)},m=function(t){return s.p(t)+"s"},l=function(t){return t<0},$=function(t){return l(t)?Math.ceil(t):Math.floor(t)},y=function(t){return Math.abs(t)},g=function(t,s){return t?l(t)?{negative:!0,format:""+y(t)+s}:{negative:!1,format:""+t+s}:{negative:!1,format:""}},p=function(){function l(t,s,n){var i=this;if(this.$d={},this.$l=n,void 0===t&&(this.$ms=0,this.parseFromMilliseconds()),s)return f(t*d[m(s)],this);if("number"==typeof t)return this.$ms=t,this.parseFromMilliseconds(),this;if("object"==typeof t)return Object.keys(t).forEach((function(s){i.$d[m(s)]=t[s]})),this.calMilliseconds(),this;if("string"==typeof t){var e=t.match(a);if(e){var r=e.slice(2).map((function(t){return Number(t)}));return this.$d.years=r[0],this.$d.months=r[1],this.$d.weeks=r[2],this.$d.days=r[3],this.$d.hours=r[4],this.$d.minutes=r[5],this.$d.seconds=r[6],this.calMilliseconds(),this}}return this}var y=l.prototype;return y.calMilliseconds=function(){var t=this;this.$ms=Object.keys(this.$d).reduce((function(s,n){return s+(t.$d[n]||0)*d[n]}),0)},y.parseFromMilliseconds=function(){var t=this.$ms;this.$d.years=$(t/u),t%=u,this.$d.months=$(t/h),t%=h,this.$d.days=$(t/r),t%=r,this.$d.hours=$(t/e),t%=e,this.$d.minutes=$(t/i),t%=i,this.$d.seconds=$(t/n),t%=n,this.$d.milliseconds=t},y.toISOString=function(){var t=g(this.$d.years,"Y"),s=g(this.$d.months,"M"),n=+this.$d.days||0;this.$d.weeks&&(n+=7*this.$d.weeks);var i=g(n,"D"),e=g(this.$d.hours,"H"),r=g(this.$d.minutes,"M"),o=this.$d.seconds||0;this.$d.milliseconds&&(o+=this.$d.milliseconds/1e3);var u=g(o,"S"),h=t.negative||s.negative||i.negative||e.negative||r.negative||u.negative,a=e.format||r.format||u.format?"T":"",d=(h?"-":"")+"P"+t.format+s.format+i.format+a+e.format+r.format+u.format;return"P"===d||"-P"===d?"P0D":d},y.toJSON=function(){return this.toISOString()},y.format=function(t){var n=t||"YYYY-MM-DDTHH:mm:ss",i={Y:this.$d.years,YY:s.s(this.$d.years,2,"0"),YYYY:s.s(this.$d.years,4,"0"),M:this.$d.months,MM:s.s(this.$d.months,2,"0"),D:this.$d.days,DD:s.s(this.$d.days,2,"0"),H:this.$d.hours,HH:s.s(this.$d.hours,2,"0"),m:this.$d.minutes,mm:s.s(this.$d.minutes,2,"0"),s:this.$d.seconds,ss:s.s(this.$d.seconds,2,"0"),SSS:s.s(this.$d.milliseconds,3,"0")};return n.replace(o,(function(t,s){return s||String(i[t])}))},y.as=function(t){return this.$ms/d[m(t)]},y.get=function(t){var s=this.$ms,n=m(t);return"milliseconds"===n?s%=1e3:s="weeks"===n?$(s/d[n]):this.$d[n],0===s?0:s},y.add=function(t,s,n){var i;return i=s?t*d[m(s)]:c(t)?t.$ms:f(t,this).$ms,f(this.$ms+i*(n?-1:1),this)},y.subtract=function(t,s){return this.add(t,s,!0)},y.locale=function(t){var s=this.clone();return s.$l=t,s},y.clone=function(){return f(this.$ms,this)},y.humanize=function(s){return t().add(this.$ms,"ms").locale(this.$l).fromNow(!s)},y.milliseconds=function(){return this.get("milliseconds")},y.asMilliseconds=function(){return this.as("milliseconds")},y.seconds=function(){return this.get("seconds")},y.asSeconds=function(){return this.as("seconds")},y.minutes=function(){return this.get("minutes")},y.asMinutes=function(){return this.as("minutes")},y.hours=function(){return this.get("hours")},y.asHours=function(){return this.as("hours")},y.days=function(){return this.get("days")},y.asDays=function(){return this.as("days")},y.weeks=function(){return this.get("weeks")},y.asWeeks=function(){return this.as("weeks")},y.months=function(){return this.get("months")},y.asMonths=function(){return this.as("months")},y.years=function(){return this.get("years")},y.asYears=function(){return this.as("years")},l}();return function(n,i,e){t=e,s=e().$utils(),e.duration=function(t,s){var n=e.locale();return f(t,{$l:n},s)},e.isDuration=c;var r=i.prototype.add,o=i.prototype.subtract;i.prototype.add=function(t,s){return c(t)&&(t=t.asMilliseconds()),r.bind(this)(t,s)},i.prototype.subtract=function(t,s){return c(t)&&(t=t.asMilliseconds()),o.bind(this)(t,s)}}}));

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

!function(t,i){ true?module.exports=i():"function"==typeof define&&define.amd?define(i):(t="undefined"!=typeof globalThis?globalThis:t||self).dayjs_plugin_utc=i()}(this,(function(){"use strict";var t="minute",i=/[+-]\d\d(?::?\d\d)?/g,e=/([+-]|\d\d)/g;return function(s,f,n){var u=f.prototype;n.utc=function(t){var i={date:t,utc:!0,args:arguments};return new f(i)},u.utc=function(i){var e=n(this.toDate(),{locale:this.$L,utc:!0});return i?e.add(this.utcOffset(),t):e},u.local=function(){return n(this.toDate(),{locale:this.$L,utc:!1})};var o=u.parse;u.parse=function(t){t.utc&&(this.$u=!0),this.$utils().u(t.$offset)||(this.$offset=t.$offset),o.call(this,t)};var r=u.init;u.init=function(){if(this.$u){var t=this.$d;this.$y=t.getUTCFullYear(),this.$M=t.getUTCMonth(),this.$D=t.getUTCDate(),this.$W=t.getUTCDay(),this.$H=t.getUTCHours(),this.$m=t.getUTCMinutes(),this.$s=t.getUTCSeconds(),this.$ms=t.getUTCMilliseconds()}else r.call(this)};var a=u.utcOffset;u.utcOffset=function(s,f){var n=this.$utils().u;if(n(s))return this.$u?0:n(this.$offset)?a.call(this):this.$offset;if("string"==typeof s&&null===(s=function(t){void 0===t&&(t="");var s=t.match(i);if(!s)return null;var f=(""+s[0]).match(e)||["-",0,0],n=f[0],u=60*+f[1]+ +f[2];return 0===u?0:"+"===n?u:-u}(s)))return this;var u=Math.abs(s)<=16?60*s:s,o=this;if(f)return o.$offset=u,o.$u=0===s,o;if(0!==s){var r=this.$u?this.toDate().getTimezoneOffset():-1*this.utcOffset();(o=this.local().add(u+r,t)).$offset=u,o.$x.$localOffset=r}else o=this.utc();return o};var h=u.format;u.format=function(t){var i=t||(this.$u?"YYYY-MM-DDTHH:mm:ss[Z]":"");return h.call(this,i)},u.valueOf=function(){var t=this.$utils().u(this.$offset)?0:this.$offset+(this.$x.$localOffset||(new Date).getTimezoneOffset());return this.$d.valueOf()-6e4*t},u.isUTC=function(){return!!this.$u},u.toISOString=function(){return this.toDate().toISOString()},u.toString=function(){return this.toDate().toUTCString()};var l=u.toDate;u.toDate=function(t){return"s"===t&&this.$offset?n(this.format("YYYY-MM-DD HH:mm:ss:SSS")).toDate():l.call(this)};var c=u.diff;u.diff=function(t,i,e){if(t&&this.$u===t.$u)return c.call(this,t,i,e);var s=this.local(),f=n(t).local();return c.call(s,f,i,e)}}}));

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(30)
/* template */
var __vue_template__ = __webpack_require__(31)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources/js/components/FilterMenu.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-5ba13222", Component.options)
  } else {
    hotAPI.reload("data-v-5ba13222", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  props: {
    trashed: {
      type: String,
      validator: function validator(value) {
        return ['', 'with', 'only'].indexOf(value) != -1;
      }
    },
    perPage: [String, Number],
    perPageOptions: Array
  },

  data: function data() {
    return {
      showDropDown: false
    };
  },

  methods: {
    trashedChanged: function trashedChanged(event) {
      this.$emit('trashed-changed', event.target.value);
    },
    perPageChanged: function perPageChanged(event) {
      this.$emit('per-page-changed', event.target.value);
    },
    toggleDropDown: function toggleDropDown() {
      this.showDropDown = !this.showDropDown;
    }
  },

  computed: {
    filters: function filters() {
      return this.$store.getters[this.resourceName + '/filters'];
    },
    filtersAreApplied: function filtersAreApplied() {
      return this.$store.getters[this.resourceName + '/filtersAreApplied'];
    },
    activeFilterCount: function activeFilterCount() {
      return this.$store.getters[this.resourceName + '/activeFilterCount'];
    }
  }
});

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    {
      on: {
        click: function($event) {
          $event.preventDefault()
          return _vm.toggleDropDown($event)
        }
      }
    },
    [
      _c(
        "div",
        { staticClass: "filter-menu-dropdown" },
        [
          _c(
            "dropdown",
            {
              attrs: {
                dusk: "filter-selector",
                autoHide: false,
                trigger: "manual",
                show: _vm.showDropDown
              }
            },
            [
              _c(
                "dropdown-trigger",
                {
                  staticClass: "bg-30 px-3 border-2 border-30 rounded",
                  class: { "bg-primary border-primary": _vm.filtersAreApplied },
                  attrs: { active: _vm.filtersAreApplied }
                },
                [
                  _c("icon", {
                    class: _vm.filtersAreApplied ? "text-white" : "text-80",
                    attrs: { type: "filter" }
                  }),
                  _vm._v(" "),
                  _vm.filtersAreApplied
                    ? _c(
                        "span",
                        { staticClass: "ml-2 font-bold text-white text-80" },
                        [
                          _vm._v(
                            "\n          " +
                              _vm._s(_vm.activeFilterCount) +
                              "\n        "
                          )
                        ]
                      )
                    : _vm._e()
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "dropdown-menu",
                {
                  attrs: {
                    slot: "menu",
                    width: "290",
                    direction: "rtl",
                    dark: true
                  },
                  slot: "menu"
                },
                [
                  _c(
                    "scroll-wrap",
                    { attrs: { height: 350 } },
                    [
                      _vm.filtersAreApplied
                        ? _c(
                            "div",
                            { staticClass: "bg-30 border-b border-60" },
                            [
                              _c(
                                "button",
                                {
                                  staticClass:
                                    "py-2 w-full block text-xs uppercase tracking-wide text-center text-80 dim font-bold focus:outline-none",
                                  on: {
                                    click: function($event) {
                                      return _vm.$emit("clear-selected-filters")
                                    }
                                  }
                                },
                                [
                                  _vm._v(
                                    "\n              " +
                                      _vm._s(_vm.__("Reset Filters")) +
                                      "\n            "
                                  )
                                ]
                              )
                            ]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _vm._l(_vm.filters, function(filter) {
                        return _c(filter.component, {
                          key: filter.name,
                          tag: "component",
                          attrs: { "filter-key": filter.class, lens: _vm.lens },
                          on: {
                            input: function($event) {
                              return _vm.$emit("filter-changed")
                            },
                            change: function($event) {
                              return _vm.$emit("filter-changed")
                            }
                          }
                        })
                      }),
                      _vm._v(" "),
                      _vm.softDeletes
                        ? _c(
                            "div",
                            { attrs: { dusk: "filter-soft-deletes" } },
                            [
                              _c(
                                "h3",
                                {
                                  staticClass:
                                    "text-sm uppercase tracking-wide text-80 bg-30 p-3",
                                  attrs: { slot: "default" },
                                  slot: "default"
                                },
                                [
                                  _vm._v(
                                    "\n              " +
                                      _vm._s(_vm.__("Trashed")) +
                                      "\n            "
                                  )
                                ]
                              ),
                              _vm._v(" "),
                              _c("div", { staticClass: "p-2" }, [
                                _c(
                                  "select",
                                  {
                                    staticClass:
                                      "block w-full form-control-sm form-select",
                                    attrs: {
                                      slot: "select",
                                      dusk: "trashed-select"
                                    },
                                    domProps: { value: _vm.trashed },
                                    on: { change: _vm.trashedChanged },
                                    slot: "select"
                                  },
                                  [
                                    _c(
                                      "option",
                                      { attrs: { value: "", selected: "" } },
                                      [_vm._v("—")]
                                    ),
                                    _vm._v(" "),
                                    _c("option", { attrs: { value: "with" } }, [
                                      _vm._v(_vm._s(_vm.__("With Trashed")))
                                    ]),
                                    _vm._v(" "),
                                    _c("option", { attrs: { value: "only" } }, [
                                      _vm._v(_vm._s(_vm.__("Only Trashed")))
                                    ])
                                  ]
                                )
                              ])
                            ]
                          )
                        : _vm._e(),
                      _vm._v(" "),
                      _c("div", { attrs: { dusk: "filter-per-page" } }, [
                        _c(
                          "h3",
                          {
                            staticClass:
                              "text-sm uppercase tracking-wide text-80 bg-30 p-3",
                            attrs: { slot: "default" },
                            slot: "default"
                          },
                          [
                            _vm._v(
                              "\n              " +
                                _vm._s(_vm.__("Per Page")) +
                                "\n            "
                            )
                          ]
                        ),
                        _vm._v(" "),
                        _c("div", { staticClass: "p-2" }, [
                          _c(
                            "select",
                            {
                              staticClass:
                                "block w-full form-control-sm form-select",
                              attrs: {
                                slot: "select",
                                dusk: "per-page-select"
                              },
                              domProps: { value: _vm.perPage },
                              on: { change: _vm.perPageChanged },
                              slot: "select"
                            },
                            _vm._l(_vm.perPageOptions, function(option) {
                              return _c("option", { key: option }, [
                                _vm._v(
                                  "\n                  " +
                                    _vm._s(option) +
                                    "\n                "
                                )
                              ])
                            }),
                            0
                          )
                        ])
                      ])
                    ],
                    2
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-5ba13222", module.exports)
  }
}

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "loading-view",
    { attrs: { loading: _vm.initialLoading } },
    [
      _c("heading", { staticClass: "mb-6" }, [_vm._v(_vm._s(_vm.title))]),
      _vm._v(" "),
      _c("div", { staticClass: "flex" }, [
        _c(
          "div",
          { staticClass: "relative h-9 flex-no-shrink mb-6" },
          [
            _c("icon", {
              staticClass: "absolute search-icon-center ml-3 text-70",
              attrs: { type: "search" }
            }),
            _vm._v(" "),
            _c("input", {
              directives: [
                {
                  name: "model",
                  rawName: "v-model",
                  value: _vm.search,
                  expression: "search"
                }
              ],
              staticClass:
                "appearance-none form-search w-search pl-search shadow",
              attrs: {
                "data-testid": "search-input",
                dusk: "search",
                placeholder: _vm.__("Search"),
                type: "search",
                spellcheck: "false"
              },
              domProps: { value: _vm.search },
              on: {
                keydown: function($event) {
                  $event.stopPropagation()
                  return _vm.performSearch($event)
                },
                search: _vm.performSearch,
                input: function($event) {
                  if ($event.target.composing) {
                    return
                  }
                  _vm.search = $event.target.value
                }
              }
            })
          ],
          1
        )
      ]),
      _vm._v(" "),
      _c(
        "loading-card",
        { staticClass: "card relative", attrs: { loading: _vm.loading } },
        [
          _c("div", [
            _c(
              "div",
              { staticClass: "flex items-center py-3 border-b border-50" },
              [
                _c(
                  "div",
                  { staticClass: "flex items-center ml-auto px-3" },
                  [
                    _c("filter-menu", {
                      attrs: {
                        viaResource: false,
                        perPage: _vm.limit,
                        perPageOptions: [10, 25, 50, 100]
                      },
                      on: { "per-page-changed": _vm.updateLimit }
                    })
                  ],
                  1
                )
              ]
            ),
            _vm._v(" "),
            _vm.pages.length > 0
              ? _c(
                  "table",
                  {
                    staticClass: "table w-full table-default",
                    attrs: { cellpadding: "0", cellspacing: "0" }
                  },
                  [
                    _c("thead", [
                      _c(
                        "th",
                        { staticClass: "text-left" },
                        [
                          _c(
                            "sortable-icon",
                            {
                              attrs: {
                                "resource-name": "Pages",
                                "uri-key": "ga:pageTitle",
                                direction: _vm.direction
                              },
                              on: {
                                sort: _vm.sortByChange,
                                reset: _vm.resetOrderBy
                              }
                            },
                            [
                              _c(
                                "span",
                                { staticClass: "inline-flex items-center" },
                                [
                                  _vm._v(
                                    "\n              " +
                                      _vm._s(_vm.__("Name")) +
                                      "\n            "
                                  )
                                ]
                              )
                            ]
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "th",
                        { staticClass: "text-left" },
                        [
                          _c(
                            "sortable-icon",
                            {
                              attrs: {
                                "resource-name": "Paths",
                                "uri-key": "ga:pagePath",
                                direction: _vm.direction
                              },
                              on: {
                                sort: _vm.sortByChange,
                                reset: _vm.resetOrderBy
                              }
                            },
                            [
                              _c(
                                "span",
                                { staticClass: "inline-flex items-center" },
                                [
                                  _vm._v(
                                    "\n              " +
                                      _vm._s(_vm.__("Path")) +
                                      "\n            "
                                  )
                                ]
                              )
                            ]
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "th",
                        { staticClass: "text-left" },
                        [
                          _c(
                            "sortable-icon",
                            {
                              attrs: {
                                "resource-name": "Pages",
                                "uri-key": "ga:pageviews",
                                direction: _vm.direction
                              },
                              on: {
                                sort: _vm.sortByChange,
                                reset: _vm.resetOrderBy
                              }
                            },
                            [
                              _c(
                                "span",
                                { staticClass: "inline-flex items-center" },
                                [
                                  _vm._v(
                                    "\n              " +
                                      _vm._s(_vm.__("Visits")) +
                                      "\n            "
                                  )
                                ]
                              )
                            ]
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "th",
                        { staticClass: "text-left" },
                        [
                          _c(
                            "sortable-icon",
                            {
                              attrs: {
                                "resource-name": "Pages",
                                "uri-key": "ga:uniquePageviews",
                                direction: _vm.direction
                              },
                              on: {
                                sort: _vm.sortByChange,
                                reset: _vm.resetOrderBy
                              }
                            },
                            [
                              _c(
                                "span",
                                { staticClass: "inline-flex items-center" },
                                [
                                  _vm._v(
                                    "\n              " +
                                      _vm._s(_vm.__("Unique Visits")) +
                                      "\n            "
                                  )
                                ]
                              )
                            ]
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "th",
                        { staticClass: "text-left" },
                        [
                          _c(
                            "sortable-icon",
                            {
                              attrs: {
                                "resource-name": "Pages",
                                "uri-key": "ga:avgTimeOnPage",
                                direction: _vm.direction
                              },
                              on: {
                                sort: _vm.sortByChange,
                                reset: _vm.resetOrderBy
                              }
                            },
                            [
                              _c(
                                "span",
                                { staticClass: "inline-flex items-center" },
                                [
                                  _vm._v(
                                    "\n              " +
                                      _vm._s(_vm.__("Avg. Time on Page")) +
                                      "\n            "
                                  )
                                ]
                              )
                            ]
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "th",
                        { staticClass: "text-left" },
                        [
                          _c(
                            "sortable-icon",
                            {
                              attrs: {
                                "resource-name": "Pages",
                                "uri-key": "ga:entrances",
                                direction: _vm.direction
                              },
                              on: {
                                sort: _vm.sortByChange,
                                reset: _vm.resetOrderBy
                              }
                            },
                            [
                              _c(
                                "span",
                                { staticClass: "inline-flex items-center" },
                                [
                                  _vm._v(
                                    "\n              " +
                                      _vm._s(_vm.__("Entrances")) +
                                      "\n            "
                                  )
                                ]
                              )
                            ]
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "th",
                        { staticClass: "text-left" },
                        [
                          _c(
                            "sortable-icon",
                            {
                              attrs: {
                                "resource-name": "Pages",
                                "uri-key": "ga:bounceRate",
                                direction: _vm.direction
                              },
                              on: {
                                sort: _vm.sortByChange,
                                reset: _vm.resetOrderBy
                              }
                            },
                            [
                              _c(
                                "span",
                                { staticClass: "inline-flex items-center" },
                                [
                                  _vm._v(
                                    "\n              " +
                                      _vm._s(_vm.__("Bounce Rate")) +
                                      "\n            "
                                  )
                                ]
                              )
                            ]
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "th",
                        { staticClass: "text-left" },
                        [
                          _c(
                            "sortable-icon",
                            {
                              attrs: {
                                "resource-name": "Pages",
                                "uri-key": "ga:exitRate",
                                direction: _vm.direction
                              },
                              on: {
                                sort: _vm.sortByChange,
                                reset: _vm.resetOrderBy
                              }
                            },
                            [
                              _c(
                                "span",
                                { staticClass: "inline-flex items-center" },
                                [
                                  _vm._v(
                                    "\n              " +
                                      _vm._s(_vm.__("Exit Rate")) +
                                      "\n            "
                                  )
                                ]
                              )
                            ]
                          )
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "th",
                        { staticClass: "text-left" },
                        [
                          _c(
                            "sortable-icon",
                            {
                              attrs: {
                                "resource-name": "Pages",
                                "uri-key": "ga:pageValue",
                                direction: _vm.direction
                              },
                              on: {
                                sort: _vm.sortByChange,
                                reset: _vm.resetOrderBy
                              }
                            },
                            [
                              _c(
                                "span",
                                { staticClass: "inline-flex items-center" },
                                [
                                  _vm._v(
                                    "\n              " +
                                      _vm._s(_vm.__("Page Value")) +
                                      "\n            "
                                  )
                                ]
                              )
                            ]
                          )
                        ],
                        1
                      )
                    ]),
                    _vm._v(" "),
                    _c(
                      "tbody",
                      _vm._l(_vm.pages, function(page) {
                        return _c("tr", [
                          _c("td", [_vm._v(_vm._s(page.name))]),
                          _vm._v(" "),
                          _c("td", [_vm._v(_vm._s(page.path))]),
                          _vm._v(" "),
                          _c("td", [_vm._v(_vm._s(page.visits))]),
                          _vm._v(" "),
                          _c("td", [_vm._v(_vm._s(page.unique_visits))]),
                          _vm._v(" "),
                          _c("td", [
                            _vm._v(
                              _vm._s(_vm.getFormattedTime(page.avg_page_time))
                            )
                          ]),
                          _vm._v(" "),
                          _c("td", [_vm._v(_vm._s(page.entrances))]),
                          _vm._v(" "),
                          _c("td", [
                            _vm._v(
                              _vm._s(_vm.getFormattedPercent(page.bounce_rate))
                            )
                          ]),
                          _vm._v(" "),
                          _c("td", [
                            _vm._v(
                              _vm._s(_vm.getFormattedPercent(page.exit_rate))
                            )
                          ]),
                          _vm._v(" "),
                          _c("td", [
                            _vm._v(
                              _vm._s(_vm.getFormattedCurrency(page.page_value))
                            )
                          ])
                        ])
                      }),
                      0
                    )
                  ]
                )
              : _vm._e()
          ]),
          _vm._v(" "),
          _c("pagination-links", {
            attrs: {
              data: _vm.pages,
              hasMore: _vm.hasMore,
              hasPrevious: _vm.hasPrevious,
              "current-page": _vm.page,
              "total-pages": _vm.totalPages
            },
            on: { previous: _vm.previousPage, next: _vm.nextPage }
          })
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-68ff5483", module.exports)
  }
}

/***/ })
/******/ ]);