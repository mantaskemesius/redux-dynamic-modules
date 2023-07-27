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
var redux_1 = require("redux");
var RefCounter_1 = require("../Utils/RefCounter");
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
