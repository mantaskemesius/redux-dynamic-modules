import { IModule } from "redux-dynamic-modules-core";
export interface ISagaWithArguments<T> {
    saga: (argument?: T) => Iterator<any>;
    argument?: T;
}
export declare type ISagaRegistration<T> = (() => Iterator<any>) | ISagaWithArguments<T>;
export interface ISagaModule<T> extends IModule<T> {
    sagas?: ISagaRegistration<any>[];
}
