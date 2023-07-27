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
