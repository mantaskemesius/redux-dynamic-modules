"use strict";
exports.__esModule = true;
exports.getThunkExtension = void 0;
var redux_thunk_1 = require("redux-thunk");
function getThunkExtension() {
    return {
        middleware: [redux_thunk_1["default"]]
    };
}
exports.getThunkExtension = getThunkExtension;
