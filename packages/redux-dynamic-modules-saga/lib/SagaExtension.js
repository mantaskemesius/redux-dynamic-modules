"use strict";
exports.__esModule = true;
exports.getSagaExtension = void 0;
var redux_saga_1 = require("redux-saga");
var redux_dynamic_modules_core_1 = require("redux-dynamic-modules-core");
var SagaManager_1 = require("./SagaManager");
var SagaComparer_1 = require("./SagaComparer");
/**
 * Get an extension that integrates saga with the store
 * @param sagaContext The context to provide to the saga
 */
function getSagaExtension(sagaContext, onError) {
    var sagaMonitor = undefined;
    //@ts-ignore
    if (process.env.NODE_ENV === "development" && typeof window !== "undefined") {
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
