"use strict";
exports.__esModule = true;
exports.sagaEquals = void 0;
function sagaEquals(a, b) {
    if (typeof a === "function" && typeof b === "function") {
        return a === b;
    }
    if (!a || !b) {
        return a === b;
    }
    if (typeof a === "function") {
        var sagaA = a;
        var sagaB = b;
        return sagaA === sagaB.saga && !sagaB.argument;
    }
    else if (typeof b === "function") {
        var sagaA = a;
        var sagaB = b;
        return sagaA.saga === sagaB && !sagaA.argument;
    }
    else {
        // both are objects
        var sagaA = a;
        var sagaB = b;
        return (sagaA.saga === sagaB.saga && sagaA.argument === sagaB.argument // TODO: This needs to be a deep equals
        );
    }
}
exports.sagaEquals = sagaEquals;
