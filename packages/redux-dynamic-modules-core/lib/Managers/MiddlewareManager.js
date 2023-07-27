"use strict";
//inspired from https://github.com/pofigizm/redux-dynamic-middlewares
exports.__esModule = true;
exports.getMiddlewareManager = void 0;
var redux_dynamic_middlewares_1 = require("redux-dynamic-middlewares");
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
