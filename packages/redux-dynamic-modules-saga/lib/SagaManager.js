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
var SagaComparer_1 = require("./SagaComparer");
var redux_dynamic_modules_core_1 = require("redux-dynamic-modules-core");
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
