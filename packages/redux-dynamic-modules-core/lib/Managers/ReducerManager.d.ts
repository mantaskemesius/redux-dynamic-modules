import { Reducer, ReducersMapObject, AnyAction } from "redux";
export interface IReducerManager<S> {
    reduce: (state: S, action: AnyAction) => S;
    getReducerMap: () => ReducersMapObject<S>;
    add: <ReducerState>(key: string, reducer: Reducer<ReducerState>) => void;
    remove: (key: string) => void;
}
/**
 * Adds reference counting to reducer manager and adds/remove keys only when ref count is zero
 */
export declare function getRefCountedReducerManager<S>(manager: IReducerManager<S>): IReducerManager<S>;
/**
 * Create a combined reducer as in the fashion of Redux's combineReducers() function,
 * but allows for the dynamic registration of additional reducers
 * @param initialReducers The initial set of reducers
 * @returns An object with three functions: the reducer, an addReducer function, and a removeReducer function
 */
export declare function getReducerManager<S extends {}>(initialReducers: ReducersMapObject<S>, reducerCombiner?: (reducers: ReducersMapObject<S, any>) => Reducer<S>): IReducerManager<S>;
