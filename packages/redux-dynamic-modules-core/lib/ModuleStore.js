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
var redux_1 = require("redux");
var developmentOnly_1 = require("redux-devtools-extension/developmentOnly");
var MiddlewareManager_1 = require("./Managers/MiddlewareManager");
var ModuleManager_1 = require("./Managers/ModuleManager");
var RefCountedManager_1 = require("./Managers/RefCountedManager");
var Flatten_1 = require("./Utils/Flatten");
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
