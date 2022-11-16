import { store } from 'quasar/wrappers';
import { InjectionKey } from 'vue';
import {
  createStore,
  Store as VuexStore,
  useStore as vuexUseStore,
} from 'vuex';
import auth from './auth';
import product from './product';

import { IAuth } from './auth/auth';
import { IProduct } from './product/product';
import VuexPersistence from 'vuex-persist';

// import example from './module-example'
// import { ExampleStateInterface } from './module-example/state';

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation;
 *
 * The function below can be async too; either use
 * async/await or return a Promise which resolves
 * with the Store instance.
 */

export interface IRootState {
  // Define your own store structure, using submodules if needed
  auth: IAuth;
  product: IProduct;
  // example: unknown;
}

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  example: unknown;
}

// provide typings for `this.$store`
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $store: VuexStore<IRootState>;
  }
}

// provide typings for `useStore` helper
export const storeKey: InjectionKey<VuexStore<IRootState>> = Symbol('vuex-key');

// export default store(function (/* { ssrContext } */) {});

  // const Store = createStore<IRootState>({
  //   modules: {
  //     // example
  //     auth,
  //     product,
  //   },

  //   // enable strict mode (adds overhead!)
  //   // for dev mode and --debug builds only
  //   strict: !!process.env.DEBUGGING,
  // });

  // return Store;

export default store(function (/* { ssrContext } */) {
  const vuexPersist = new VuexPersistence({
    key: 'sf-ecommerce',
    storage: localStorage,
  });
  const Store = createStore<IRootState>({
    modules: {
      auth,
     product
    },
    plugins: [vuexPersist.plugin],
    // enable strict mode (adds overhead!)
    // for dev mode and --debug builds only
    strict: !!process.env.DEBUGGING,
  });

  return Store;
});

export function useStore() {
  return vuexUseStore(storeKey);
}
