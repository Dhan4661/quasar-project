import { Module } from 'vuex';
import { IRootState } from '../index';
import { state } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { IMyAccount } from './my-account';

const myAccount: Module<IMyAccount, IRootState> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default myAccount;
