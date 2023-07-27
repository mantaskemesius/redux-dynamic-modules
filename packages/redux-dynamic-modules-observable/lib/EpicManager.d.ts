import { IItemManager } from "redux-dynamic-modules-core";
import { Epic, EpicMiddleware } from "redux-observable";
export interface IEpicManager extends IItemManager<Epic> {
}
/**
 * Creates an epic manager which manages epics being run in the system
 */
export declare function getEpicManager(epicMiddleware: EpicMiddleware<any>): IEpicManager;
