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
var redux_observable_1 = require("redux-observable");
var EpicManager_1 = require("./EpicManager");
__exportStar(require("./Contracts"), exports);
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
