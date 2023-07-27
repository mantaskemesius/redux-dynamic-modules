import { Middleware } from "redux";
import { IItemManager } from "../Contracts";
export interface IDynamicMiddlewareManager extends IItemManager<Middleware> {
    enhancer: Middleware;
}
export declare const getMiddlewareManager: () => IDynamicMiddlewareManager;
