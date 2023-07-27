(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("redux-dynamic-modules-core"), require("redux-observable"), require("rxjs"), require("rxjs/operators"));
	else if(typeof define === 'function' && define.amd)
		define(["redux-dynamic-modules-core", "redux-observable", "rxjs", "rxjs/operators"], factory);
	else if(typeof exports === 'object')
		exports["redux-dynamic-modules-observable"] = factory(require("redux-dynamic-modules-core"), require("redux-observable"), require("rxjs"), require("rxjs/operators"));
	else
		root["redux-dynamic-modules-observable"] = factory(root["redux-dynamic-modules-core"], root["redux-observable"], root["rxjs"], root["rxjs/operators"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_redux_dynamic_modules_core__, __WEBPACK_EXTERNAL_MODULE_redux_observable__, __WEBPACK_EXTERNAL_MODULE_rxjs__, __WEBPACK_EXTERNAL_MODULE_rxjs_operators__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./lib/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./lib/Contracts.js":
/*!**************************!*\
  !*** ./lib/Contracts.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;


/***/ }),

/***/ "./lib/EpicManager.js":
/*!****************************!*\
  !*** ./lib/EpicManager.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.getEpicManager = void 0;
var redux_dynamic_modules_core_1 = __webpack_require__(/*! redux-dynamic-modules-core */ "redux-dynamic-modules-core");
var rxjs_1 = __webpack_require__(/*! rxjs */ "rxjs");
var operators_1 = __webpack_require__(/*! rxjs/operators */ "rxjs/operators");
/**
 * Creates an epic manager which manages epics being run in the system
 */
function getEpicManager(epicMiddleware) {
    var runningEpics = {};
    // @ts-ignore
    var epicRefCounter = redux_dynamic_modules_core_1.getObjectRefCounter();
    return {
        /**
         * Dynamically add epics.
         *
         * We should consider these potential problem:
         * * Epic could add repeatedly
         * * Epic could as a dependency of two or more modules
         * * Module hot load. React-hot-loader will rerender your react root
         * component which means it will invoke all of your logic again. So this is
         * minor worry.
         */
        add: function (epics) {
            if (epics === void 0) { epics = []; }
            epics.forEach(function (epic) {
                var epicKey = epic.toString();
                // Check if epic already exists
                if (!runningEpics.hasOwnProperty(epicKey)) {
                    var replaceableWrapper = createReplaceableWrapper();
                    // we put replaceable Observable wrapper into epicMiddleware
                    epicMiddleware.run(replaceableWrapper);
                    // let's roll epic. Here we make epic run truly
                    replaceableWrapper.replaceWith(epic);
                    /**
                     * We store the reference of replaceableWrapper, so we can check if it exists next time
                     *
                     * Is there a limit on length of the key (string) in JS object?
                     * See https://stackoverflow.com/questions/13367391/is-there-a-limit-on-length-of-the-key-string-in-js-object
                     */
                    runningEpics[epicKey] = replaceableWrapper;
                }
                /**
                 * We follow practice on official document https://redux-dynamic-modules.js.org/#/reference/ModuleCounting
                 * So we use RefCounter to determine when we should remove epic
                 */
                epicRefCounter.add(epic);
            });
        },
        /**
         * Remove epics
         * Actually it will replace the real epic with a empty epic
         *
         * __Note:__
         * Under some circumstances here https://redux-observable.js.org/docs/recipes/AddingNewEpicsAsynchronously.html
         * We can't do a actual replacement.
         * But we can try to replace real epic with empty epic, it works as we expected. This benefit is given by rxjs switchMap
         */
        remove: function (epics) {
            if (epics === void 0) { epics = []; }
            epics.forEach(function (epic) {
                epicRefCounter.remove(epic);
                var epicKey = epic.toString();
                var replaceableWrapper = runningEpics[epicKey];
                // Check if no module reference epic, we will remove epic
                if (replaceableWrapper && !epicRefCounter.getCount(epic)) {
                    // Replace the epic with empty epic, so no more unnecessary logic can cause any side effects.
                    replaceableWrapper.replaceWith(emptyEpic);
                    // Delete unnecessary replaceableWrapper reference
                    delete runningEpics[epicKey];
                }
            });
        },
        dispose: function () {
            runningEpics = null;
            epicRefCounter = undefined;
        }
    };
}
exports.getEpicManager = getEpicManager;
/**
 * create a wrapper which can be replace by a real epic.
 * And we can also use this wrapper along with {@link emptyEpic} to remove real epic logic
 */
function createReplaceableWrapper() {
    var epic$ = new rxjs_1.Subject();
    // Wrap epic$ as a replaceable Observable
    var replaceableWrapper = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return epic$.pipe(
        // @ts-ignore
        operators_1.switchMap(function (epic) { return epic.apply(void 0, args); }));
    };
    // Expose a method. The wrapper can be replaced by real epic, and make it run
    replaceableWrapper.replaceWith = function (epic) {
        epic$.next(epic);
        replaceableWrapper._epic = epic;
    };
    replaceableWrapper.epicRef = function () { return replaceableWrapper._epic; };
    return replaceableWrapper;
}
/**
 * Empty epic
 * This epic do nothing and we need it to be used for real epic replacement
 */
function emptyEpic(action$) {
    return action$.pipe(operators_1.ignoreElements());
}


/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
};
exports.__esModule = true;
exports.getObservableExtension = void 0;
var redux_observable_1 = __webpack_require__(/*! redux-observable */ "redux-observable");
var EpicManager_1 = __webpack_require__(/*! ./EpicManager */ "./lib/EpicManager.js");
__exportStar(__webpack_require__(/*! ./Contracts */ "./lib/Contracts.js"), exports);
function getObservableExtension() {
    var epicMiddleware = redux_observable_1.createEpicMiddleware();
    var epicManager = EpicManager_1.getEpicManager(epicMiddleware);
    return {
        middleware: [epicMiddleware],
        onModuleAdded: function (module) {
            if (module.epics) {
                epicManager.add(module.epics);
            }
        },
        onModuleRemoved: function (module) {
            if (module.epics) {
                epicManager.remove(module.epics);
            }
        },
        dispose: function () {
            epicManager.dispose();
        }
    };
}
exports.getObservableExtension = getObservableExtension;


/***/ }),

/***/ "redux-dynamic-modules-core":
/*!*********************************************!*\
  !*** external "redux-dynamic-modules-core" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_redux_dynamic_modules_core__;

/***/ }),

/***/ "redux-observable":
/*!***********************************!*\
  !*** external "redux-observable" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_redux_observable__;

/***/ }),

/***/ "rxjs":
/*!***********************!*\
  !*** external "rxjs" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_rxjs__;

/***/ }),

/***/ "rxjs/operators":
/*!*********************************!*\
  !*** external "rxjs/operators" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_rxjs_operators__;

/***/ })

/******/ });
});
//# sourceMappingURL=redux-dynamic-modules-observable.js.map