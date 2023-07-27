import {
    applyMiddleware,
    createStore as createReduxStore,
    DeepPartial,
    StoreEnhancer,
    Reducer,
    compose,
    AnyAction,
} from "redux";
import { composeWithDevTools } from "redux-devtools-extension/developmentOnly";
import { getMiddlewareManager } from "./Managers/MiddlewareManager";
import { IExtension, IModule, IModuleStore, IModuleTuple } from "./Contracts";
import { getModuleManager } from "./Managers/ModuleManager";
import { getRefCountedManager } from "./Managers/RefCountedManager";
import { flatten } from "./Utils/Flatten";

type ModuleStoreSettings<S> = {
    initialState?: DeepPartial<S>;
    enhancers?: StoreEnhancer[];
    extensions?: IExtension[];
    advancedComposeEnhancers?: typeof compose;
    advancedCombineReducers?: (
        reducers: ConditionalReducersMapObject<S>
    ) => Reducer<UnionToIntersection<StateType<S>>>;
};

// Helper types to calculate the final State type
type UnionToIntersection<U> = (U extends any
    ? (arg: U) => void
    : never) extends (arg: infer I) => void
    ? I
    : never;

type CombineModuleStates<S> = S extends IModuleStore<infer State>
    ? State
    : never;

type StateType<S> = S extends Reducer<infer State, any> ? State : never;

type ConditionalReducersMapObject<S> = { [K in keyof S]: Reducer<S[K], any> };

/**
 * Configure the module store
 */
export function createStore<S1>(
    moduleStoreSettings: ModuleStoreSettings<S1>,
    reduxModule: IModule<S1>
): IModuleStore<S1>;
export function createStore<S1, S2>(
    moduleStoreSettings: ModuleStoreSettings<S1 & S2>,
    m1: IModule<S1>,
    m2: IModule<S2>
): IModuleStore<S1 & S2>;
export function createStore<S1, S2, S3>(
    moduleStoreSettings: ModuleStoreSettings<S1 & S2 & S3>,
    m1: IModule<S1>,
    m2: IModule<S2>,
    m3: IModule<S3>
): IModuleStore<S1 & S2 & S3>;
export function createStore<S1, S2, S3, S4>(
    moduleStoreSettings: ModuleStoreSettings<S1 & S2 & S3 & S4>,
    m1: IModule<S1>,
    m2: IModule<S2>,
    m3: IModule<S3>,
    m4: IModule<S4>
): IModuleStore<S1 & S2 & S3 & S4>;
export function createStore<S1, S2, S3, S4, S5>(
    moduleStoreSettings: ModuleStoreSettings<S1 & S2 & S3 & S4 & S5>,
    m1: IModule<S1>,
    m2: IModule<S2>,
    m3: IModule<S3>,
    m4: IModule<S4>,
    m5: IModule<S5>
): IModuleStore<S1 & S2 & S3 & S4 & S5>;
export function createStore<S1, S2, S3, S4, S5, S6>(
    moduleStoreSettings: ModuleStoreSettings<S1 & S2 & S3 & S4 & S5 & S6>,
    m1: IModule<S1>,
    m2: IModule<S2>,
    m3: IModule<S3>,
    m4: IModule<S4>,
    m5: IModule<S5>,
    m6: IModule<S6>
): IModuleStore<S1 & S2 & S3 & S4 & S5 & S6>;
export function createStore<S1, S2, S3, S4, S5, S6, S7>(
    moduleStoreSettings: ModuleStoreSettings<S1 & S2 & S3 & S4 & S5 & S6 & S7>,
    m1: IModule<S1>,
    m2: IModule<S2>,
    m3: IModule<S3>,
    m4: IModule<S4>,
    m5: IModule<S5>,
    m6: IModule<S6>,
    m7: IModule<S7>
): IModuleStore<S1 & S2 & S3 & S4 & S5 & S6 & S7>;
export function createStore<S1, S2, S3, S4, S5, S6, S7, S8>(
    moduleStoreSettings: ModuleStoreSettings<
        S1 & S2 & S3 & S4 & S5 & S6 & S7 & S8
    >,
    m1: IModule<S1>,
    m2: IModule<S2>,
    m3: IModule<S3>,
    m4: IModule<S4>,
    m5: IModule<S5>,
    m6: IModule<S6>,
    m7: IModule<S7>,
    m8: IModule<S8>
): IModuleStore<S1 & S2 & S3 & S4 & S5 & S6 & S7 & S8>;
export function createStore<State>(
    moduleStoreSettings: ModuleStoreSettings<State>,
    ...initialModules: IModule<any>[]
): IModuleStore<State>;
export function createStore<State>(
    moduleStoreSettings: ModuleStoreSettings<State>,
    ...initialModules: IModule<any>[]
): IModuleStore<CombineModuleStates<typeof initialModules[number]>> {
    const {
        initialState = {} as DeepPartial<
            CombineModuleStates<typeof initialModules[number]>
        >,
        extensions = [],
        enhancers = [],
        advancedComposeEnhancers = composeWithDevTools({}),
        advancedCombineReducers,
    } = moduleStoreSettings;

    const extensionMiddleware = extensions.reduce((mw, p) => {
        if (p.middleware) {
            mw.push(...p.middleware);
        }

        return mw;
    }, []);

    const middlewareManager = getRefCountedManager(
        getMiddlewareManager(),
        (a, b) => a === b
    );

    const enhancer = advancedComposeEnhancers<{}>(
        ...enhancers,
        applyMiddleware(...extensionMiddleware, middlewareManager.enhancer)
    ) as StoreEnhancer<{}, {}>;

    const moduleManager = getRefCountedManager(
        getModuleManager<State>(
            middlewareManager,
            extensions,
            advancedCombineReducers as (
                reducers: ConditionalReducersMapObject<State>
            ) => Reducer<State>
        ),
        (a: IModule<any>, b: IModule<any>) => a.id === b.id,
        a => a.retained
    );

    // Create store
    const store = createReduxStore<State, AnyAction, {}, {}>(
        moduleManager.getReducer,
        initialState,
        enhancer
    ) as IModuleStore<CombineModuleStates<typeof initialModules[number]>>;

    moduleManager.setDispatch(store.dispatch);

    const addModules = (modulesToBeAdded: IModuleTuple) => {
        const flattenedModules = flatten(modulesToBeAdded);
        moduleManager.add(flattenedModules);
        return {
            remove: () => {
                moduleManager.remove(flattenedModules);
            },
        };
    };

    const addModule = (moduleToBeAdded: IModule<any>) => {
        return addModules([moduleToBeAdded]);
    };

    extensions.forEach(p => {
        if (p.onModuleManagerCreated) {
            p.onModuleManagerCreated({ addModule, addModules });
        }
    });

    store.addModule = addModule;
    store.addModules = addModules;

    store.dispose = () => {
        // get all added modules and remove them
        moduleManager.dispose();
        middlewareManager.dispose();
        extensions.forEach(p => {
            if (p.dispose) {
                p.dispose();
            }
        });
    };

    store.addModules(initialModules);

    return store as IModuleStore<
        CombineModuleStates<typeof initialModules[number]>
    >;
}
