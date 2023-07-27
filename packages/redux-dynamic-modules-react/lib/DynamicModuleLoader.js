"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
exports.DynamicModuleLoader = void 0;
var React = require("react");
//@ts-ignore // ReactReduxContext is not officially exported
var react_redux_1 = require("react-redux");
/**
 * The DynamicModuleLoader adds a way to register a module on mount
 * When this component is initialized, the reducer and saga from the module passed as props will be registered with the system
 * On unmount, they will be unregistered
 */
var DynamicModuleLoader = /** @class */ (function (_super) {
    __extends(DynamicModuleLoader, _super);
    function DynamicModuleLoader() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DynamicModuleLoader.prototype.render = function () {
        var _this = this;
        return (React.createElement(react_redux_1.ReactReduxContext.Consumer, null, function (reactReduxContext) { return (React.createElement(DynamicModuleLoaderImpl, __assign({}, _this.props, { reactReduxContext: reactReduxContext }))); }));
    };
    return DynamicModuleLoader;
}(React.Component));
exports.DynamicModuleLoader = DynamicModuleLoader;
var DynamicModuleLoaderImpl = /** @class */ (function (_super) {
    __extends(DynamicModuleLoaderImpl, _super);
    function DynamicModuleLoaderImpl(props) {
        var _this = _super.call(this, props) || this;
        /** Flag that indicates we need to create a store/provider because a parent store was not provided */
        _this._providerInitializationNeeded = false;
        /**
         * Unregister sagas and reducers
         */
        _this._cleanup = function () {
            if (_this._addedModules) {
                _this._addedModules.remove();
                _this._addedModules = undefined;
            }
        };
        if (props.reactReduxContext == null) {
            var message = "Tried to render DynamicModuleLoader, but no ReactReduxContext was provided";
            console.error(message);
            throw new Error(message);
        }
        _this._store = props.reactReduxContext
            ? props.reactReduxContext.store
            : undefined;
        // We are not in strict mode, let's add the modules ASAP
        if (!_this.props.strictMode) {
            _this._addModules();
            _this.state = { readyToRender: true };
        }
        else {
            // We are in strict mode, so have to wait for CDM to add modules.
            // Thus, we cannot render the children at this time
            _this.state = { readyToRender: false };
        }
        return _this;
    }
    DynamicModuleLoaderImpl.prototype.render = function () {
        if (this.state.readyToRender) {
            if (this._providerInitializationNeeded) {
                return (React.createElement(react_redux_1.Provider, { store: this._store },
                    React.createElement(DynamicModuleLoader, __assign({}, this.props))));
            }
            return (React.createElement(React.Fragment, null,
                this._renderLoader(),
                React.createElement(AddedModulesCleanup, { cleanup: this._cleanup })));
        }
        return null;
    };
    /**
     * Render a Redux provider
     */
    DynamicModuleLoaderImpl.prototype._renderLoader = function () {
        return this.props.children
            ? typeof this.props.children === "function"
                ? this.props.children()
                : this.props.children
            : null;
    };
    DynamicModuleLoaderImpl.prototype._addModules = function () {
        var _a = this.props, createStore = _a.createStore, modules = _a.modules;
        if (!this._store) {
            // If we need to create a store, do that here. We will skip adding the modules and render DML again
            if (createStore) {
                this._store = createStore();
                this._providerInitializationNeeded = true;
            }
            else {
                throw new Error("Store could not be resolved from React context");
            }
        }
        else {
            // Add the modules here
            this._addedModules = this._store.addModules(modules);
        }
    };
    DynamicModuleLoaderImpl.prototype.componentDidMount = function () {
        if (this.props.strictMode) {
            this._addModules();
            this.setState({ readyToRender: true });
        }
    };
    return DynamicModuleLoaderImpl;
}(React.Component));
/**
 * This component is rendered as the last child of DynamicModuleLoaderImpl
 * so react runs willUnmount on connected(react-redux) children before this
 * cleanup and allows them to unsubscribe from store before dynamic reducers
 * removing (and avoid errors in selectors)
 */
var AddedModulesCleanup = /** @class */ (function (_super) {
    __extends(AddedModulesCleanup, _super);
    function AddedModulesCleanup() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AddedModulesCleanup.prototype.render = function () {
        return null;
    };
    AddedModulesCleanup.prototype.componentWillUnmount = function () {
        this.props.cleanup();
    };
    return AddedModulesCleanup;
}(React.Component));
