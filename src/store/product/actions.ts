import { AxiosResponse } from 'axios';
import { api } from 'src/boot/axios';
import { IFilterModel, ISuccessMessage, ResponseResult } from 'src/common';
import { ActionContext, ActionTree } from 'vuex';
import { IRootState } from '../index';
import { ActionTypes } from './action-types';
import { Mutations } from './mutations';
import {
  IPost,
  IProduct,
} from './product';

// Actions context
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<IProduct['posts'], IRootState>, 'commit'>;

// Actions contracts
export interface Actions {
  [ActionTypes.GET_POSTS](
    { commit }: AugmentedActionContext,
  ): Promise<ResponseResult<{ posts: IProduct['posts'] }>>;
}

// Define actions
const actions: ActionTree<IProduct['posts'], IRootState> & Actions = {
  [ActionTypes.GET_POSTS](
  ): Promise<ResponseResult<{posts: IProduct['posts']} >> {
    return new Promise((resolve, reject) => {
      api
        .get(`https://jsonplaceholder.typicode.com/posts`)
        .then(
          (
            response: AxiosResponse<
              ResponseResult<{posts: IProduct['posts']} >
            >
          ) => {
            resolve(response.data);
          }
        )
        .catch((error) => {
          reject(error.response);
        });
    });
  },
};

export default actions;
