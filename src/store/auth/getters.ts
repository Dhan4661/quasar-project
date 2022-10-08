import { GetterTree } from 'vuex';
import { IRootState } from '../index';
import { IAuth } from './auth';

export type Getters = {
  currentUserDetails(state: IAuth): IAuth['currentUserData'];
}

const getters: GetterTree<IAuth, IRootState> & Getters = {
  currentUserDetails: (state) => { return state.currentUserData; },
};

export default getters;
