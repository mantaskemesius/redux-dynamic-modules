"use strict";
exports.__esModule = true;
exports.getEpicManager = void 0;
var redux_dynamic_modules_core_1 = require("redux-dynamic-modules-core");
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
/**
 * Creates an epic manager which manages epics being run in the system
 */
function getEpicManager(epicMiddleware) {
    var runningEpics = {};
    // @ts-ignore
    var epicRefCounter = redux_dynamic_modules_core_1.getObjectRefCounter();
    return {
        /**
         * Dynamically add epics.
         *
         * We should consider these potential problem:
         * * Epic could add repeatedly
         * * Epic could as a dependency of two or more modules
         * * Module hot load. React-hot-loader will rerender your react root
         * component which means it will invoke all of your logic again. So this is
         * minor worry.
         */
        add: function (epics) {
            if (epics === void 0) { epics = []; }
            epics.forEach(function (epic) {
                var epicKey = epic.toString();
                // Check if epic already exists
                if (!runningEpics.hasOwnProperty(epicKey)) {
                    var replaceableWrapper = createReplaceableWrapper();
                    // we put replaceable Observable wrapper into epicMiddleware
                    epicMiddleware.run(replaceableWrapper);
                    // let's roll epic. Here we make epic run truly
                    replaceableWrapper.replaceWith(epic);
                    /**
                     * We store the reference of replaceableWrapper, so we can check if it exists next time
                     *
                     * Is there a limit on length of the key (string) in JS object?
                     * See https://stackoverflow.com/questions/13367391/is-there-a-limit-on-length-of-the-key-string-in-js-object
                     */
                    runningEpics[epicKey] = replaceableWrapper;
                }
                /**
                 * We follow practice on official document https://redux-dynamic-modules.js.org/#/reference/ModuleCounting
                 * So we use RefCounter to determine when we should remove epic
                 */
                epicRefCounter.add(epic);
            });
        },
        /**
         * Remove epics
         * Actually it will replace the real epic with a empty epic
         *
         * __Note:__
         * Under some circumstances here https://redux-observable.js.org/docs/recipes/AddingNewEpicsAsynchronously.html
         * We can't do a actual replacement.
         * But we can try to replace real epic with empty epic, it works as we expected. This benefit is given by rxjs switchMap
         */
        remove: function (epics) {
            if (epics === void 0) { epics = []; }
            epics.forEach(function (epic) {
                epicRefCounter.remove(epic);
                var epicKey = epic.toString();
                var replaceableWrapper = runningEpics[epicKey];
                // Check if no module reference epic, we will remove epic
                if (replaceableWrapper && !epicRefCounter.getCount(epic)) {
                    // Replace the epic with empty epic, so no more unnecessary logic can cause any side effects.
                    replaceableWrapper.replaceWith(emptyEpic);
                    // Delete unnecessary replaceableWrapper reference
                    delete runningEpics[epicKey];
                }
            });
        },
        dispose: function () {
            runningEpics = null;
            epicRefCounter = undefined;
        }
    };
}
exports.getEpicManager = getEpicManager;
/**
 * create a wrapper which can be replace by a real epic.
 * And we can also use this wrapper along with {@link emptyEpic} to remove real epic logic
 */
function createReplaceableWrapper() {
    var epic$ = new rxjs_1.Subject();
    // Wrap epic$ as a replaceable Observable
    var replaceableWrapper = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        return epic$.pipe(
        // @ts-ignore
        operators_1.switchMap(function (epic) { return epic.apply(void 0, args); }));
    };
    // Expose a method. The wrapper can be replaced by real epic, and make it run
    replaceableWrapper.replaceWith = function (epic) {
        epic$.next(epic);
        replaceableWrapper._epic = epic;
    };
    replaceableWrapper.epicRef = function () { return replaceableWrapper._epic; };
    return replaceableWrapper;
}
/**
 * Empty epic
 * This epic do nothing and we need it to be used for real epic replacement
 */
function emptyEpic(action$) {
    return action$.pipe(operators_1.ignoreElements());
}
