import { ISagaRegistration } from "./Contracts";
import { SagaMiddleware } from "redux-saga";
import { IItemManager } from "redux-dynamic-modules-core";
/**
 * Creates saga items which can be used to start and stop sagas dynamically
 */
export declare function getSagaManager(sagaMiddleware: SagaMiddleware<any>): IItemManager<ISagaRegistration<any>>;
