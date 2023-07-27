import { IModule, IItemManager, IExtension } from "../Contracts";
import { AnyAction, ReducersMapObject, Dispatch, Middleware, Reducer } from "redux";
export interface IModuleManager<State> extends IItemManager<IModule<State>> {
    setDispatch: (dispatch: Dispatch<AnyAction>) => void;
    getReducer: (state: State, action: AnyAction) => State;
}
export declare function getModuleManager<State = {}>(middlewareManager: IItemManager<Middleware>, extensions: IExtension[], advancedCombineReducers?: (reducers: ReducersMapObject<State, any>) => Reducer<State>): IModuleManager<State>;
