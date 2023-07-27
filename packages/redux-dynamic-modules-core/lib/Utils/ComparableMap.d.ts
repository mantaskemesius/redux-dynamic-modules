export interface IMap<K, V> {
    keys: K[];
    get(key: K): V;
    add(key: K, value: V): void;
    remove(key: K): V;
}
/**
 * We will use it where we can not use the default Map as the Map class do not allow custom compare function
 * @param equals Optional, a comparer to use
 */
export declare function getMap<K, V>(equals: (key1: K, key2: K) => boolean): IMap<K, V>;
