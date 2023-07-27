import { DeepPartial, StoreEnhancer, Reducer, compose } from "redux";
import { IExtension, IModule, IModuleStore } from "./Contracts";
declare type ModuleStoreSettings<S> = {
    initialState?: DeepPartial<S>;
    enhancers?: StoreEnhancer[];
    extensions?: IExtension[];
    advancedComposeEnhancers?: typeof compose;
    advancedCombineReducers?: (reducers: ConditionalReducersMapObject<S>) => Reducer<UnionToIntersection<StateType<S>>>;
};
declare type UnionToIntersection<U> = (U extends any ? (arg: U) => void : never) extends (arg: infer I) => void ? I : never;
declare type StateType<S> = S extends Reducer<infer State, any> ? State : never;
declare type ConditionalReducersMapObject<S> = {
    [K in keyof S]: Reducer<S[K], any>;
};
/**
 * Configure the module store
 */
export declare function createStore<S1>(moduleStoreSettings: ModuleStoreSettings<S1>, reduxModule: IModule<S1>): IModuleStore<S1>;
export declare function createStore<S1, S2>(moduleStoreSettings: ModuleStoreSettings<S1 & S2>, m1: IModule<S1>, m2: IModule<S2>): IModuleStore<S1 & S2>;
export declare function createStore<S1, S2, S3>(moduleStoreSettings: ModuleStoreSettings<S1 & S2 & S3>, m1: IModule<S1>, m2: IModule<S2>, m3: IModule<S3>): IModuleStore<S1 & S2 & S3>;
export declare function createStore<S1, S2, S3, S4>(moduleStoreSettings: ModuleStoreSettings<S1 & S2 & S3 & S4>, m1: IModule<S1>, m2: IModule<S2>, m3: IModule<S3>, m4: IModule<S4>): IModuleStore<S1 & S2 & S3 & S4>;
export declare function createStore<S1, S2, S3, S4, S5>(moduleStoreSettings: ModuleStoreSettings<S1 & S2 & S3 & S4 & S5>, m1: IModule<S1>, m2: IModule<S2>, m3: IModule<S3>, m4: IModule<S4>, m5: IModule<S5>): IModuleStore<S1 & S2 & S3 & S4 & S5>;
export declare function createStore<S1, S2, S3, S4, S5, S6>(moduleStoreSettings: ModuleStoreSettings<S1 & S2 & S3 & S4 & S5 & S6>, m1: IModule<S1>, m2: IModule<S2>, m3: IModule<S3>, m4: IModule<S4>, m5: IModule<S5>, m6: IModule<S6>): IModuleStore<S1 & S2 & S3 & S4 & S5 & S6>;
export declare function createStore<S1, S2, S3, S4, S5, S6, S7>(moduleStoreSettings: ModuleStoreSettings<S1 & S2 & S3 & S4 & S5 & S6 & S7>, m1: IModule<S1>, m2: IModule<S2>, m3: IModule<S3>, m4: IModule<S4>, m5: IModule<S5>, m6: IModule<S6>, m7: IModule<S7>): IModuleStore<S1 & S2 & S3 & S4 & S5 & S6 & S7>;
export declare function createStore<S1, S2, S3, S4, S5, S6, S7, S8>(moduleStoreSettings: ModuleStoreSettings<S1 & S2 & S3 & S4 & S5 & S6 & S7 & S8>, m1: IModule<S1>, m2: IModule<S2>, m3: IModule<S3>, m4: IModule<S4>, m5: IModule<S5>, m6: IModule<S6>, m7: IModule<S7>, m8: IModule<S8>): IModuleStore<S1 & S2 & S3 & S4 & S5 & S6 & S7 & S8>;
export declare function createStore<State>(moduleStoreSettings: ModuleStoreSettings<State>, ...initialModules: IModule<any>[]): IModuleStore<State>;
export {};
