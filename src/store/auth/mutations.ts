import { MutationTree } from 'vuex';
import { IAuth } from './auth';
import { MutationTypes } from './mutation-types';

// Mutation contracts
export type Mutations<S = IAuth> = {
  [MutationTypes.SET_CURRENT_USERDATA](
    state: S,
    payload: IAuth['currentUserData']
  ): void;
};

const mutations: MutationTree<IAuth> & Mutations = {
  [MutationTypes.SET_CURRENT_USERDATA](
    state: IAuth,
    payload: IAuth['currentUserData']
  ) {
    state.currentUserData = payload;
  },
};

export default mutations;
