import * as React from "react";
import { IModuleStore, IModuleTuple } from "redux-dynamic-modules-core";
export interface IDynamicModuleLoaderProps {
    /** Explicitly name children as a prop to work with @types/react@18 */
    children: React.ReactNode;
    /** Modules that need to be dynamically registerd */
    modules: IModuleTuple;
    /**
     * Set this flag to indicate that this component is being rendered in 'Strict Mode'
     * React 'StrictMode' does not allow constructor side-effects, so we defer adding modules to componentDidMount
     * when this flag is set.
     * This has the effect of adding a second render.
     */
    strictMode?: boolean;
    /** Optional callback which returns a store instance. This would be called if no store could be loaded from th  e context. */
    createStore?: () => IModuleStore<any>;
}
/**
 * The DynamicModuleLoader adds a way to register a module on mount
 * When this component is initialized, the reducer and saga from the module passed as props will be registered with the system
 * On unmount, they will be unregistered
 */
export declare class DynamicModuleLoader extends React.Component<IDynamicModuleLoaderProps> {
    render(): JSX.Element;
}
