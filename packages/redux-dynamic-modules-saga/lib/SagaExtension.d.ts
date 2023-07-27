import { IExtension } from "redux-dynamic-modules-core";
/**
 * Get an extension that integrates saga with the store
 * @param sagaContext The context to provide to the saga
 */
export declare function getSagaExtension<C>(sagaContext?: C, onError?: (error: Error) => void): IExtension;
