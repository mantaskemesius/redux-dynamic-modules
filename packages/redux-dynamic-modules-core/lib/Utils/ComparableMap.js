"use strict";
exports.__esModule = true;
exports.getMap = void 0;
/**
 * We will use it where we can not use the default Map as the Map class do not allow custom compare function
 * @param equals Optional, a comparer to use
 */
function getMap(equals) {
    var keys = [];
    var values = {};
    return {
        /**
         * Current set of keys
         */
        keys: keys,
        /**
         * Gets value for given key
         */
        get: function (key) {
            if (!key) {
                return undefined;
            }
            var index = keys.findIndex(function (k) { return k && equals(k, key); });
            if (index === -1) {
                return undefined;
            }
            return values[index];
        },
        /**
         * Adds the given key and value
         */
        add: function (key, value) {
            if (!key) {
                return;
            }
            var index = keys.findIndex(function (k) { return k && equals(k, key); });
            if (index === -1) {
                keys.push(key);
                values[keys.length - 1] = value;
            }
        },
        /**
         * Removes the given key and returns the value object if key was found
         */
        remove: function (key) {
            if (!key) {
                return undefined;
            }
            var index = keys.findIndex(function (k) { return k && equals(k, key); });
            if (index === -1) {
                return undefined;
            }
            delete keys[index];
            var value = values[index];
            delete values[index];
            return value;
        }
    };
}
exports.getMap = getMap;
