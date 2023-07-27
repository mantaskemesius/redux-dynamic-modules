export interface IRefCounter<T> {
    /**
     * Gets refeerence count for given item
     */
    getCount: (item: T) => number;
    /**
     * Adds given item
     */
    add: (item: T) => void;
    /**
     * Removes the given item
     * @returns true when ref counter reaches zero and item is removed, false otherwise
     */
    remove: (item: T) => boolean;
}
/** Ref counts given object */
export declare function getObjectRefCounter<T>(equals: (a: T, b: T) => boolean, retained?: (a: T) => boolean): IRefCounter<T>;
/**
 * Ref counts strings
 */
export declare function getStringRefCounter(): IRefCounter<string>;
