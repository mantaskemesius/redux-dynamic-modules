(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("redux"));
	else if(typeof define === 'function' && define.amd)
		define(["redux"], factory);
	else if(typeof exports === 'object')
		exports["redux-dynamic-modules-core"] = factory(require("redux"));
	else
		root["redux-dynamic-modules-core"] = factory(root["redux"]);
})(window, function(__WEBPACK_EXTERNAL_MODULE_redux__) {
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

/***/ "./lib/Managers/MiddlewareManager.js":
/*!*******************************************!*\
  !*** ./lib/Managers/MiddlewareManager.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

//inspired from https://github.com/pofigizm/redux-dynamic-middlewares
exports.__esModule = true;
exports.getMiddlewareManager = void 0;
var redux_dynamic_middlewares_1 = __webpack_require__(/*! redux-dynamic-middlewares */ "./node_modules/redux-dynamic-middlewares/lib/index.js");
exports.getMiddlewareManager = function () {
    var dynamicMiddlewaresInstance = redux_dynamic_middlewares_1.createDynamicMiddlewares();
    var add = function (middlewares) {
        dynamicMiddlewaresInstance.addMiddleware.apply(dynamicMiddlewaresInstance, middlewares);
        return middlewares;
    };
    var remove = function (middlewares) {
        middlewares.forEach(dynamicMiddlewaresInstance.removeMiddleware);
        return middlewares;
    };
    return {
        getItems: function () { return []; },
        enhancer: dynamicMiddlewaresInstance.enhancer,
        add: add,
        remove: remove,
        dispose: function () {
            dynamicMiddlewaresInstance.resetMiddlewares();
        }
    };
};


/***/ }),

/***/ "./lib/Managers/ModuleManager.js":
/*!***************************************!*\
  !*** ./lib/Managers/ModuleManager.js ***!
  \***************************************/
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
exports.getModuleManager = void 0;
var ReducerManager_1 = __webpack_require__(/*! ./ReducerManager */ "./lib/Managers/ReducerManager.js");
function getModuleManager(middlewareManager, extensions, advancedCombineReducers) {
    var _dispatch = null;
    var _reducerManager;
    var _modules = [];
    var _moduleIds = new Set();
    var _seedReducers = function () {
        _dispatch({ type: "@@Internal/ModuleManager/SeedReducers" });
    };
    var _dispatchActions = function (actions) {
        if (!actions) {
            return;
        }
        if (!_dispatch) {
            throw new Error("setDispatch should be called on ModuleManager before adding any modules.");
        }
        actions.forEach(_dispatch);
    };
    var _addMiddlewares = function (middlewares) {
        if (!middlewares) {
            return;
        }
        middlewareManager.add(middlewares);
    };
    var _removeMiddlewares = function (middlewares) {
        if (!middlewares) {
            return;
        }
        middlewareManager.remove(middlewares);
    };
    var _addReducers = function (reducerMap) {
        if (!reducerMap) {
            return;
        }
        if (!_reducerManager) {
            _reducerManager = ReducerManager_1.getRefCountedReducerManager(
            // @ts-ignore
            ReducerManager_1.getReducerManager(reducerMap, advancedCombineReducers));
        }
        else {
            for (var key in reducerMap) {
                _reducerManager.add(key, reducerMap[key]);
            }
        }
    };
    var _removeReducers = function (reducerMap) {
        if (!reducerMap || !_reducerManager) {
            return;
        }
        for (var key in reducerMap) {
            _reducerManager.remove(key);
        }
    };
    // Create reduce function which redirects to _reducers.reduce
    var _reduce = function (s, a) {
        if (_reducerManager) {
            return _reducerManager.reduce(s, a);
        }
        return s || null;
    };
    var moduleManager = {
        getReducer: _reduce,
        setDispatch: function (dispatch) {
            _dispatch = dispatch;
        },
        getItems: function () { return []; },
        add: function (modulesToAdd) {
            if (!modulesToAdd || modulesToAdd.length === 0) {
                return;
            }
            modulesToAdd = modulesToAdd.filter(function (module) { return module; });
            var justAddedModules = [];
            modulesToAdd.forEach(function (module) {
                if (!_moduleIds.has(module.id)) {
                    _moduleIds.add(module.id);
                    _modules.push(module);
                    _addReducers(module.reducerMap);
                    var middlewares = module.middlewares;
                    if (middlewares) {
                        _addMiddlewares(middlewares);
                    }
                    justAddedModules.push(module);
                }
            });
            /* Fire an action so that the newly added reducers can seed their initial state */
            _seedReducers();
            // add the sagas and dispatch actions at the end so all the reducers are registered
            justAddedModules.forEach(function (module) {
                // Let the extensions know we added a module
                extensions.forEach(function (p) {
                    if (p.onModuleAdded) {
                        p.onModuleAdded(module);
                    }
                });
                // Dispatch the initial actions
                var moduleAddedAction = {
                    type: "@@Internal/ModuleManager/ModuleAdded",
                    payload: module.id
                };
                _dispatchActions(module.initialActions
                    ? __spreadArrays([moduleAddedAction], module.initialActions) : [moduleAddedAction]);
            });
        },
        remove: function (modulesToRemove) {
            if (!modulesToRemove) {
                return;
            }
            modulesToRemove = modulesToRemove
                .filter(function (module) { return module; })
                .reverse();
            modulesToRemove.forEach(function (module) {
                if (_moduleIds.has(module.id)) {
                    _dispatchActions(module.finalActions);
                    _removeReducers(module.reducerMap);
                    _removeMiddlewares(module.middlewares);
                    // Let the extensions know we removed a module
                    extensions.forEach(function (p) {
                        if (p.onModuleRemoved) {
                            p.onModuleRemoved(module);
                        }
                    });
                    _moduleIds["delete"](module.id);
                    _modules = _modules.filter(function (m) { return m.id !== module.id; });
                    _dispatchActions([
                        {
                            type: "@@Internal/ModuleManager/ModuleRemoved",
                            payload: module.id
                        },
                    ]);
                }
            });
        },
        dispose: function () {
            moduleManager.remove(_modules);
        }
    };
    return moduleManager;
}
exports.getModuleManager = getModuleManager;


/***/ }),

/***/ "./lib/Managers/ReducerManager.js":
/*!****************************************!*\
  !*** ./lib/Managers/ReducerManager.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.getReducerManager = exports.getRefCountedReducerManager = void 0;
var redux_1 = __webpack_require__(/*! redux */ "redux");
var RefCounter_1 = __webpack_require__(/*! ../Utils/RefCounter */ "./lib/Utils/RefCounter.js");
/**
 * Adds reference counting to reducer manager and adds/remove keys only when ref count is zero
 */
function getRefCountedReducerManager(manager) {
    var reducerKeyRefCounter = RefCounter_1.getStringRefCounter();
    for (var key in manager.getReducerMap()) {
        reducerKeyRefCounter.add(key);
    }
    return {
        reduce: manager.reduce,
        getReducerMap: manager.getReducerMap,
        add: function (key, reducer) {
            if (reducerKeyRefCounter.getCount(key) === 0) {
                manager.add(key, reducer);
            }
            reducerKeyRefCounter.add(key);
        },
        remove: function (key) {
            reducerKeyRefCounter.remove(key);
            if (reducerKeyRefCounter.getCount(key) === 0) {
                manager.remove(key);
            }
        }
    };
}
exports.getRefCountedReducerManager = getRefCountedReducerManager;
/**
 * Create a combined reducer as in the fashion of Redux's combineReducers() function,
 * but allows for the dynamic registration of additional reducers
 * @param initialReducers The initial set of reducers
 * @returns An object with three functions: the reducer, an addReducer function, and a removeReducer function
 */
function getReducerManager(initialReducers, reducerCombiner) {
    if (reducerCombiner === void 0) { reducerCombiner = redux_1.combineReducers; }
    var combinedReducer = reducerCombiner(initialReducers);
    var reducers = __assign({}, initialReducers);
    var keysToRemove = [];
    var reduce = function (state, action) {
        if (keysToRemove.length > 0) {
            state = __assign({}, state);
            for (var _i = 0, keysToRemove_1 = keysToRemove; _i < keysToRemove_1.length; _i++) {
                var key = keysToRemove_1[_i];
                delete state[key];
            }
            keysToRemove = [];
        }
        if (state === undefined) {
            state = {};
        }
        return combinedReducer(state, action);
    };
    return {
        getReducerMap: function () { return reducers; },
        reduce: reduce,
        add: function (key, reducer) {
            if (!key || reducers[key]) {
                return;
            }
            reducers[key] = reducer;
            combinedReducer = getCombinedReducer(reducers, reducerCombiner);
        },
        remove: function (key) {
            if (!key || !reducers[key]) {
                return;
            }
            delete reducers[key];
            keysToRemove.push(key);
            combinedReducer = getCombinedReducer(reducers, reducerCombiner);
        }
    };
}
exports.getReducerManager = getReducerManager;
function getCombinedReducer(reducerMap, reducerCombiner) {
    if (reducerCombiner === void 0) { reducerCombiner = redux_1.combineReducers; }
    if (!reducerMap || Object.keys(reducerMap).length === 0) {
        return function (state, action) { return state || null; };
    }
    return reducerCombiner(reducerMap);
}


/***/ }),

/***/ "./lib/Managers/RefCountedManager.js":
/*!*******************************************!*\
  !*** ./lib/Managers/RefCountedManager.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.getRefCountedManager = void 0;
var RefCounter_1 = __webpack_require__(/*! ../Utils/RefCounter */ "./lib/Utils/RefCounter.js");
/**
 * Enhances the given items with ref counting for add remove purposes
 */
function getRefCountedManager(manager, equals, retained // Decides if the item is retained even when the ref count reaches 0 
) {
    var refCounter = RefCounter_1.getObjectRefCounter(equals, retained);
    var items = manager.getItems();
    // Set initial ref counting
    items.forEach(function (item) { return refCounter.add(item); });
    var ret = __assign({}, manager);
    // Wrap add method
    ret.add = function (items) {
        if (!items) {
            return;
        }
        var nonNullItems = items.filter(function (i) { return i; });
        var notAddedItems = nonNullItems.filter(function (i) { return refCounter.getCount(i) === 0; });
        manager.add(notAddedItems);
        nonNullItems.forEach(refCounter.add);
    };
    // Wrap remove
    ret.remove = function (items) {
        if (!items) {
            return;
        }
        items.forEach(function (item) {
            if (item) {
                refCounter.remove(item);
                if (refCounter.getCount(item) === 0) {
                    manager.remove([item]);
                }
            }
        });
    };
    ret.dispose = function () {
        manager.dispose();
    };
    return ret;
}
exports.getRefCountedManager = getRefCountedManager;


/***/ }),

/***/ "./lib/ModuleStore.js":
/*!****************************!*\
  !*** ./lib/ModuleStore.js ***!
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
exports.createStore = void 0;
var redux_1 = __webpack_require__(/*! redux */ "redux");
var developmentOnly_1 = __webpack_require__(/*! redux-devtools-extension/developmentOnly */ "./node_modules/redux-devtools-extension/developmentOnly.js");
var MiddlewareManager_1 = __webpack_require__(/*! ./Managers/MiddlewareManager */ "./lib/Managers/MiddlewareManager.js");
var ModuleManager_1 = __webpack_require__(/*! ./Managers/ModuleManager */ "./lib/Managers/ModuleManager.js");
var RefCountedManager_1 = __webpack_require__(/*! ./Managers/RefCountedManager */ "./lib/Managers/RefCountedManager.js");
var Flatten_1 = __webpack_require__(/*! ./Utils/Flatten */ "./lib/Utils/Flatten.js");
function createStore(moduleStoreSettings) {
    var initialModules = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        initialModules[_i - 1] = arguments[_i];
    }
    var _a = moduleStoreSettings.initialState, initialState = _a === void 0 ? {} : _a, _b = moduleStoreSettings.extensions, extensions = _b === void 0 ? [] : _b, _c = moduleStoreSettings.enhancers, enhancers = _c === void 0 ? [] : _c, _d = moduleStoreSettings.advancedComposeEnhancers, advancedComposeEnhancers = _d === void 0 ? developmentOnly_1.composeWithDevTools({}) : _d, advancedCombineReducers = moduleStoreSettings.advancedCombineReducers;
    var extensionMiddleware = extensions.reduce(function (mw, p) {
        if (p.middleware) {
            mw.push.apply(mw, p.middleware);
        }
        return mw;
    }, []);
    var middlewareManager = RefCountedManager_1.getRefCountedManager(MiddlewareManager_1.getMiddlewareManager(), function (a, b) { return a === b; });
    var enhancer = advancedComposeEnhancers.apply(void 0, __spreadArrays(enhancers, [redux_1.applyMiddleware.apply(void 0, __spreadArrays(extensionMiddleware, [middlewareManager.enhancer]))]));
    var moduleManager = RefCountedManager_1.getRefCountedManager(ModuleManager_1.getModuleManager(middlewareManager, extensions, advancedCombineReducers), function (a, b) { return a.id === b.id; }, function (a) { return a.retained; });
    // Create store
    var store = redux_1.createStore(moduleManager.getReducer, initialState, enhancer);
    moduleManager.setDispatch(store.dispatch);
    var addModules = function (modulesToBeAdded) {
        var flattenedModules = Flatten_1.flatten(modulesToBeAdded);
        moduleManager.add(flattenedModules);
        return {
            remove: function () {
                moduleManager.remove(flattenedModules);
            }
        };
    };
    var addModule = function (moduleToBeAdded) {
        return addModules([moduleToBeAdded]);
    };
    extensions.forEach(function (p) {
        if (p.onModuleManagerCreated) {
            p.onModuleManagerCreated({ addModule: addModule, addModules: addModules });
        }
    });
    store.addModule = addModule;
    store.addModules = addModules;
    store.dispose = function () {
        // get all added modules and remove them
        moduleManager.dispose();
        middlewareManager.dispose();
        extensions.forEach(function (p) {
            if (p.dispose) {
                p.dispose();
            }
        });
    };
    store.addModules(initialModules);
    return store;
}
exports.createStore = createStore;


/***/ }),

/***/ "./lib/Utils/ComparableMap.js":
/*!************************************!*\
  !*** ./lib/Utils/ComparableMap.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.getMap = void 0;
/**
 * We will use it where we can not use the default Map as the Map class do not allow custom compare function
 * @param equals Optional, a comparer to use
 */
function getMap(equals) {
    var keys = [];
    var values = {};
    return {
        /**
         * Current set of keys
         */
        keys: keys,
        /**
         * Gets value for given key
         */
        get: function (key) {
            if (!key) {
                return undefined;
            }
            var index = keys.findIndex(function (k) { return k && equals(k, key); });
            if (index === -1) {
                return undefined;
            }
            return values[index];
        },
        /**
         * Adds the given key and value
         */
        add: function (key, value) {
            if (!key) {
                return;
            }
            var index = keys.findIndex(function (k) { return k && equals(k, key); });
            if (index === -1) {
                keys.push(key);
                values[keys.length - 1] = value;
            }
        },
        /**
         * Removes the given key and returns the value object if key was found
         */
        remove: function (key) {
            if (!key) {
                return undefined;
            }
            var index = keys.findIndex(function (k) { return k && equals(k, key); });
            if (index === -1) {
                return undefined;
            }
            delete keys[index];
            var value = values[index];
            delete values[index];
            return value;
        }
    };
}
exports.getMap = getMap;


/***/ }),

/***/ "./lib/Utils/Flatten.js":
/*!******************************!*\
  !*** ./lib/Utils/Flatten.js ***!
  \******************************/
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
exports.flatten = void 0;
function flatten(arr) {
    if (arr) {
        var res = arr.slice();
        var i = 0;
        while (i < res.length) {
            if (Array.isArray(res[i])) {
                res.splice.apply(res, __spreadArrays([i, 1], res[i]));
            }
            else {
                i++;
            }
        }
        return res;
    }
    return arr;
}
exports.flatten = flatten;


/***/ }),

/***/ "./lib/Utils/RefCounter.js":
/*!*********************************!*\
  !*** ./lib/Utils/RefCounter.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

exports.__esModule = true;
exports.getStringRefCounter = exports.getObjectRefCounter = void 0;
/** Ref counts given object */
function getObjectRefCounter(equals, retained) {
    if (!equals) {
        equals = function (a, b) { return a === b; };
    }
    if (!retained) {
        retained = function () { return false; };
    }
    var objects = [];
    var counts = [];
    return {
        /**
         * Gets ref count of given T
         */
        getCount: function (obj) {
            if (obj === undefined || obj === null) {
                return 0;
            }
            var index = objects.findIndex(function (o) { return o && equals(o, obj); });
            if (index === -1) {
                return 0;
            }
            return counts[index];
        },
        /**
         * Add given T or increments ref count
         */
        add: function (obj) {
            if (obj === undefined || obj === null) {
                return;
            }
            var index = objects.findIndex(function (o) { return o && equals(o, obj); });
            var count = 1;
            if (index === -1) {
                index = objects.length;
                objects.push(obj);
            }
            else {
                count = counts[index] + 1;
            }
            // If item is retained then keep it for inifinty
            if (retained(obj)) {
                count = Infinity;
            }
            counts[index] = count;
        },
        /**
         * Decreases ref count for given T, if refcount reaches to zero removes the T and returns true
         */
        remove: function (obj) {
            if (retained(obj)) {
                return false;
            }
            var index = objects.findIndex(function (o) { return o && equals(o, obj); });
            if (index === -1) {
                return false;
            }
            if (counts[index] === 1) {
                delete objects[index];
                delete counts[index];
                return true;
            }
            counts[index] = counts[index] - 1;
            return false;
        }
    };
}
exports.getObjectRefCounter = getObjectRefCounter;
/**
 * Ref counts strings
 */
function getStringRefCounter() {
    var values = {};
    return {
        /**
         * Returns current ref count for the key
         */
        getCount: function (key) {
            if (key === undefined || key === null) {
                return 0;
            }
            return values[key] || 0;
        },
        /**
         * Adds given key for ref counting or increments ref count
         */
        add: function (key) {
            if (key === undefined || key === null) {
                return;
            }
            if (!values[key]) {
                values[key] = 1;
            }
            else {
                values[key]++;
            }
        },
        /**
         * Decreases ref count for the given key, if the ref count reaches 0 removes the key and returns true
         */
        remove: function (key) {
            if (key === undefined || key === null) {
                return false;
            }
            if (!values[key]) {
                return false;
            }
            if (values[key] === 1) {
                delete values[key];
                return true;
            }
            values[key]--;
            return false;
        }
    };
}
exports.getStringRefCounter = getStringRefCounter;


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
__exportStar(__webpack_require__(/*! ./ModuleStore */ "./lib/ModuleStore.js"), exports);
__exportStar(__webpack_require__(/*! ./Utils/ComparableMap */ "./lib/Utils/ComparableMap.js"), exports);
__exportStar(__webpack_require__(/*! ./Utils/RefCounter */ "./lib/Utils/RefCounter.js"), exports);
__exportStar(__webpack_require__(/*! ./Managers/MiddlewareManager */ "./lib/Managers/MiddlewareManager.js"), exports);
__exportStar(__webpack_require__(/*! ./Managers/RefCountedManager */ "./lib/Managers/RefCountedManager.js"), exports);
//Dummy change to keep lerna happy


/***/ }),

/***/ "./node_modules/redux-devtools-extension/developmentOnly.js":
/*!******************************************************************!*\
  !*** ./node_modules/redux-devtools-extension/developmentOnly.js ***!
  \******************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var compose = __webpack_require__(/*! redux */ "redux").compose;

exports.__esModule = true;
exports.composeWithDevTools =
  "development" !== 'production' &&
  typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : function () {
        if (arguments.length === 0) return undefined;
        if (typeof arguments[0] === 'object') return compose;
        return compose.apply(null, arguments);
      };

exports.devToolsEnhancer =
  "development" !== 'production' &&
  typeof window !== 'undefined' &&
  window.__REDUX_DEVTOOLS_EXTENSION__
    ? window.__REDUX_DEVTOOLS_EXTENSION__
    : function () {
        return function (noop) {
          return noop;
        };
      };


/***/ }),

/***/ "./node_modules/redux-dynamic-middlewares/lib/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/redux-dynamic-middlewares/lib/index.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;
exports.createDynamicMiddlewares = exports.resetMiddlewares = exports.removeMiddleware = exports.addMiddleware = undefined;

var _redux = __webpack_require__(/*! redux */ "redux");

var createDynamicMiddlewares = function createDynamicMiddlewares() {
  var allDynamicMiddlewares = [];

  var enhancer = function enhancer(store) {
    return function (next) {
      return function (action) {
        var chain = allDynamicMiddlewares.map(function (middleware) {
          return middleware(store);
        });

        return _redux.compose.apply(undefined, chain)(next)(action);
      };
    };
  };

  var addMiddleware = function addMiddleware() {
    for (var _len = arguments.length, middlewares = Array(_len), _key = 0; _key < _len; _key++) {
      middlewares[_key] = arguments[_key];
    }

    allDynamicMiddlewares = [].concat(allDynamicMiddlewares, middlewares);
  };

  var removeMiddleware = function removeMiddleware(middleware) {
    var index = allDynamicMiddlewares.findIndex(function (d) {
      return d === middleware;
    });

    if (index === -1) {
      // eslint-disable-next-line no-console
      console.error('Middleware does not exist!', middleware);

      return;
    }

    allDynamicMiddlewares = allDynamicMiddlewares.filter(function (_, mdwIndex) {
      return mdwIndex !== index;
    });
  };

  var resetMiddlewares = function resetMiddlewares() {
    allDynamicMiddlewares = [];
  };

  return {
    enhancer: enhancer,
    addMiddleware: addMiddleware,
    removeMiddleware: removeMiddleware,
    resetMiddlewares: resetMiddlewares
  };
};

var dynamicMiddlewaresInstance = createDynamicMiddlewares();

exports.default = dynamicMiddlewaresInstance.enhancer;
var addMiddleware = dynamicMiddlewaresInstance.addMiddleware,
    removeMiddleware = dynamicMiddlewaresInstance.removeMiddleware,
    resetMiddlewares = dynamicMiddlewaresInstance.resetMiddlewares;
exports.addMiddleware = addMiddleware;
exports.removeMiddleware = removeMiddleware;
exports.resetMiddlewares = resetMiddlewares;
exports.createDynamicMiddlewares = createDynamicMiddlewares;

/***/ }),

/***/ "redux":
/*!************************!*\
  !*** external "redux" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_redux__;

/***/ })

/******/ });
});
//# sourceMappingURL=redux-dynamic-modules-core.js.map