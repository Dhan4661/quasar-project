import { Module } from 'vuex';
import { IRootState } from '../index';
import { state } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';
import { IProduct } from './product';

const product: Module<IProduct, IRootState> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
};

export default product;
