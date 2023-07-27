import { IItemManager } from "../Contracts";
/**
 * Enhances the given items with ref counting for add remove purposes
 */
export declare function getRefCountedManager<IType extends IItemManager<T>, T>(manager: IType, equals: (a: T, b: T) => boolean, retained?: (a: T) => boolean): IType;
