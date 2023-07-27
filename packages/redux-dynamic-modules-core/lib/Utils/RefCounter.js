"use strict";
exports.__esModule = true;
exports.getStringRefCounter = exports.getObjectRefCounter = void 0;
/** Ref counts given object */
function getObjectRefCounter(equals, retained) {
    if (!equals) {
        equals = function (a, b) { return a === b; };
    }
    if (!retained) {
        retained = function () { return false; };
    }
    var objects = [];
    var counts = [];
    return {
        /**
         * Gets ref count of given T
         */
        getCount: function (obj) {
            if (obj === undefined || obj === null) {
                return 0;
            }
            var index = objects.findIndex(function (o) { return o && equals(o, obj); });
            if (index === -1) {
                return 0;
            }
            return counts[index];
        },
        /**
         * Add given T or increments ref count
         */
        add: function (obj) {
            if (obj === undefined || obj === null) {
                return;
            }
            var index = objects.findIndex(function (o) { return o && equals(o, obj); });
            var count = 1;
            if (index === -1) {
                index = objects.length;
                objects.push(obj);
            }
            else {
                count = counts[index] + 1;
            }
            // If item is retained then keep it for inifinty
            if (retained(obj)) {
                count = Infinity;
            }
            counts[index] = count;
        },
        /**
         * Decreases ref count for given T, if refcount reaches to zero removes the T and returns true
         */
        remove: function (obj) {
            if (retained(obj)) {
                return false;
            }
            var index = objects.findIndex(function (o) { return o && equals(o, obj); });
            if (index === -1) {
                return false;
            }
            if (counts[index] === 1) {
                delete objects[index];
                delete counts[index];
                return true;
            }
            counts[index] = counts[index] - 1;
            return false;
        }
    };
}
exports.getObjectRefCounter = getObjectRefCounter;
/**
 * Ref counts strings
 */
function getStringRefCounter() {
    var values = {};
    return {
        /**
         * Returns current ref count for the key
         */
        getCount: function (key) {
            if (key === undefined || key === null) {
                return 0;
            }
            return values[key] || 0;
        },
        /**
         * Adds given key for ref counting or increments ref count
         */
        add: function (key) {
            if (key === undefined || key === null) {
                return;
            }
            if (!values[key]) {
                values[key] = 1;
            }
            else {
                values[key]++;
            }
        },
        /**
         * Decreases ref count for the given key, if the ref count reaches 0 removes the key and returns true
         */
        remove: function (key) {
            if (key === undefined || key === null) {
                return false;
            }
            if (!values[key]) {
                return false;
            }
            if (values[key] === 1) {
                delete values[key];
                return true;
            }
            values[key]--;
            return false;
        }
    };
}
exports.getStringRefCounter = getStringRefCounter;
