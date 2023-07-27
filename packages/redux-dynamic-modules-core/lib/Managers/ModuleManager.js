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
var ReducerManager_1 = require("./ReducerManager");
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
