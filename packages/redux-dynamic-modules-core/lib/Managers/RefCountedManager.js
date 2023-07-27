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
var RefCounter_1 = require("../Utils/RefCounter");
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
