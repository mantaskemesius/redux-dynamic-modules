(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("redux-dynamic-modules-core"), require("redux-saga"));
	else if(typeof define === 'function' && define.amd)
		define(["redux-dynamic-modules-core", "redux-saga"], factory);
	else if(typeof exports === 'object')
		exports["redux-dynamic-modules-saga"] = factory(require("redux-dynamic-modules-core"), require("redux-saga"));
	else
		root["redux-dynamic-modules-saga"] = factory(root["redux-dynamic-modules-core"], root["redux-saga"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_redux_dynamic_modules_core__, __WEBPACK_EXTERNAL_MODULE_redux_saga__) {
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

/***/ "./lib/SagaComparer.js":
/*!*****************************!*\
  !*** ./lib/SagaComparer.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.sagaEquals = void 0;
function sagaEquals(a, b) {
    if (typeof a === "function" && typeof b === "function") {
        return a === b;
    }
    if (!a || !b) {
        return a === b;
    }
    if (typeof a === "function") {
        var sagaA = a;
        var sagaB = b;
        return sagaA === sagaB.saga && !sagaB.argument;
    }
    else if (typeof b === "function") {
        var sagaA = a;
        var sagaB = b;
        return sagaA.saga === sagaB && !sagaA.argument;
    }
    else {
        // both are objects
        var sagaA = a;
        var sagaB = b;
        return (sagaA.saga === sagaB.saga && sagaA.argument === sagaB.argument // TODO: This needs to be a deep equals
        );
    }
}
exports.sagaEquals = sagaEquals;


/***/ }),

/***/ "./lib/SagaExtension.js":
/*!******************************!*\
  !*** ./lib/SagaExtension.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.getSagaExtension = void 0;
var redux_saga_1 = __webpack_require__(/*! redux-saga */ "redux-saga");
var redux_dynamic_modules_core_1 = __webpack_require__(/*! redux-dynamic-modules-core */ "redux-dynamic-modules-core");
var SagaManager_1 = __webpack_require__(/*! ./SagaManager */ "./lib/SagaManager.js");
var SagaComparer_1 = __webpack_require__(/*! ./SagaComparer */ "./lib/SagaComparer.js");
/**
 * Get an extension that integrates saga with the store
 * @param sagaContext The context to provide to the saga
 */
function getSagaExtension(sagaContext, onError) {
    var sagaMonitor = undefined;
    //@ts-ignore
    if ("development" === "development" && typeof window !== "undefined") {
        sagaMonitor = window["__SAGA_MONITOR_EXTENSION__"] || undefined;
    }
    // Setup the saga middleware
    var sagaMiddleware = redux_saga_1["default"]({
        context: sagaContext,
        sagaMonitor: sagaMonitor,
        onError: onError
    });
    var _sagaManager = redux_dynamic_modules_core_1.getRefCountedManager(SagaManager_1.getSagaManager(sagaMiddleware), SagaComparer_1.sagaEquals);
    return {
        middleware: [sagaMiddleware],
        onModuleManagerCreated: function (moduleManager) {
            if (sagaContext) {
                sagaContext["moduleManager"] = moduleManager;
            }
        },
        onModuleAdded: function (module) {
            if (module.sagas) {
                _sagaManager.add(module.sagas);
            }
        },
        onModuleRemoved: function (module) {
            if (module.sagas) {
                _sagaManager.remove(module.sagas);
            }
        },
        dispose: function () {
            _sagaManager.dispose();
        }
    };
}
exports.getSagaExtension = getSagaExtension;


/***/ }),

/***/ "./lib/SagaManager.js":
/*!****************************!*\
  !*** ./lib/SagaManager.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
exports.getSagaManager = void 0;
var SagaComparer_1 = __webpack_require__(/*! ./SagaComparer */ "./lib/SagaComparer.js");
var redux_dynamic_modules_core_1 = __webpack_require__(/*! redux-dynamic-modules-core */ "redux-dynamic-modules-core");
/**
 * Creates saga items which can be used to start and stop sagas dynamically
 */
function getSagaManager(sagaMiddleware) {
    var tasks = redux_dynamic_modules_core_1.getMap(SagaComparer_1.sagaEquals);
    return {
        getItems: function () { return __spreadArrays(tasks.keys); },
        add: function (sagas) {
            if (!sagas) {
                return;
            }
            sagas.forEach(function (saga) {
                if (saga && !tasks.get(saga)) {
                    tasks.add(saga, runSaga(sagaMiddleware, saga));
                }
            });
        },
        remove: function (sagas) {
            if (!sagas) {
                return;
            }
            sagas.forEach(function (saga) {
                if (tasks.get(saga)) {
                    var task = tasks.remove(saga);
                    task.cancel();
                }
            });
        },
        dispose: function () {
            // Cancel everything
            tasks.keys.forEach(function (k) { return tasks.get(k).cancel(); });
        }
    };
}
exports.getSagaManager = getSagaManager;
function runSaga(sagaMiddleware, sagaRegistration) {
    if (typeof sagaRegistration === "function") {
        var saga_1 = sagaRegistration;
        return sagaMiddleware.run(saga_1);
    }
    var saga = sagaRegistration.saga;
    var argument = sagaRegistration.argument;
    return sagaMiddleware.run(saga, argument);
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
__exportStar(__webpack_require__(/*! ./Contracts */ "./lib/Contracts.js"), exports);
__exportStar(__webpack_require__(/*! ./SagaExtension */ "./lib/SagaExtension.js"), exports);


/***/ }),

/***/ "redux-dynamic-modules-core":
/*!*********************************************!*\
  !*** external "redux-dynamic-modules-core" ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_redux_dynamic_modules_core__;

/***/ }),

/***/ "redux-saga":
/*!*****************************!*\
  !*** external "redux-saga" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_redux_saga__;

/***/ })

/******/ });
});
//# sourceMappingURL=redux-dynamic-modules-saga.js.map