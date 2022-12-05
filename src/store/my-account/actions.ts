import { AxiosResponse } from 'axios';
import { api } from 'src/boot/axios';
import {
  IObject,
  IServerTableReqParams,
  ISuccessMessage,
  ResponseResult,
} from 'src/common';
import { ActionContext, ActionTree } from 'vuex';
import { IRootState } from '../index';
import { ActionTypes } from './action-types';
import { Mutations } from './mutations';
import {
  IAccountDetails,
  IMyAccount,
  IUpdateUserDetailsParams,
  IUserDetails,
  IAccountMembers,
} from './my-account';
import { IAuth } from '../auth/auth';

// Actions context
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<IMyAccount, IRootState>, 'commit'>;

// Actions contracts
export interface Actions {
  [ActionTypes.GET_ALL](
    { commit }: AugmentedActionContext,
    reqParams: IServerTableReqParams
  ): Promise<ResponseResult<IObject[]>>;
  [ActionTypes.GET_DETAILS](): Promise<ResponseResult<IUserDetails>>;
  [ActionTypes.GET_MEMBERS](): Promise<ResponseResult<IAccountMembers>>;
  [ActionTypes.UPDATE_USER_DETAILS](
    { commit }: AugmentedActionContext,
    reqParams: IUpdateUserDetailsParams
  ): Promise<ResponseResult<ISuccessMessage>>;
  [ActionTypes.UPDATE_PASSWORD](
    { commit }: AugmentedActionContext,
    reqParams: { oldPassword: string; newPassword: string }
  ): Promise<ResponseResult<{ accessToken: string }>>;
  [ActionTypes.UPDATE_BILLING_ADDRESS](
    { commit }: AugmentedActionContext,
    reqParams: {
      address: string;
      suburb: string;
      city: string;
    }
  ): Promise<ResponseResult<ISuccessMessage>>;
  [ActionTypes.UPDATE_MEMBER_PASSWORD](
    { commit }: AugmentedActionContext,
    reqParams: { memberId: string; newPassword: string }
  ): Promise<ResponseResult<ISuccessMessage>>;
  [ActionTypes.GET_ACCOUNT_DETAILS](
    { commit }: AugmentedActionContext,
    apiUrl: string
  ): Promise<ResponseResult<IAccountDetails>>;
  [ActionTypes.GET_IMPERSONATE_USER](
    {commit}:AugmentedActionContext,
    memberId:string
  ):Promise<ResponseResult<IAuth['currentUserData']>>
}

// Define actions
const actions: ActionTree<IMyAccount, IRootState> & Actions = {
  [ActionTypes.GET_ALL](
    {},
    // { pagination, filterModel, apiUrl }
  ): Promise<ResponseResult<IObject[]>> {
    return new Promise((resolve, reject) => {
      /* let queryParams = pagination
        ? `page=${pagination?.page ? pagination?.page : 1}${
            pagination?.rowsPerPage
              ? '&limit=' + pagination?.rowsPerPage.toString()
              : ''
          }`
        : '';
      if (filterModel) {
        queryParams += filterModel.search ? `&q=${filterModel.search}` : '';
        queryParams += filterModel.from ? `&from=${filterModel.from}` : '';
        queryParams += filterModel.to ? `&to=${filterModel.to}` : '';
      } */
      debugger;
      api
        .get(
          'https://script.crazyegg.com/pages/data-scripts/0108/7905/site/apilist.fun.json?t=1'
        )
        .then((response: AxiosResponse<ResponseResult<IObject[]>>) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.response);
        });
    });
  },
  [ActionTypes.GET_DETAILS](): Promise<ResponseResult<IUserDetails>> {
    return new Promise((resolve, reject) => {
      api
        .get('member/v1')
        .then((response: AxiosResponse<ResponseResult<IUserDetails>>) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.response);
        });
    });
  },
  [ActionTypes.GET_MEMBERS](): Promise<ResponseResult<IAccountMembers>> {
    return new Promise((resolve, reject) => {
      api
        .get('member/v1/memberaccount')
        .then((response: AxiosResponse<ResponseResult<IAccountMembers>>) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.response);
        });
    });
  },
  [ActionTypes.UPDATE_USER_DETAILS](
    {},
    reqParams: IUpdateUserDetailsParams
  ): Promise<ResponseResult<ISuccessMessage>> {
    return new Promise((resolve, reject) => {
      api
        .post('member/v1', reqParams)
        .then((response: AxiosResponse<ResponseResult<ISuccessMessage>>) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.response);
        });
    });
  },
  [ActionTypes.UPDATE_BILLING_ADDRESS](
    {},
    reqParams: {
      address: string;
      suburb: string;
      city: string;
    }
  ): Promise<ResponseResult<ISuccessMessage>> {
    return new Promise((resolve, reject) => {
      api
        .post('member/v1/billing', reqParams)
        .then((response: AxiosResponse<ResponseResult<ISuccessMessage>>) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.response);
        });
    });
  },
  [ActionTypes.UPDATE_PASSWORD](
    {},
    reqParams: { oldPassword: string; newPassword: string }
  ): Promise<ResponseResult<{ accessToken: string }>> {
    return new Promise((resolve, reject) => {
      api
        .post('auth/v1/changePassword', reqParams)
        .then(
          (
            response: AxiosResponse<ResponseResult<{ accessToken: string }>>
          ) => {
            resolve(response.data);
          }
        )
        .catch((error) => {
          reject(error.response);
        });
    });
  },
  [ActionTypes.UPDATE_MEMBER_PASSWORD](
    {},
    reqParams: { memberId: string; newPassword: string }
  ): Promise<ResponseResult<ISuccessMessage>> {
    return new Promise((resolve, reject) => {
      api
        .post('auth/v1/memberPassword', reqParams)
        .then((response: AxiosResponse<ResponseResult<ISuccessMessage>>) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.response);
        });
    });
  },
  [ActionTypes.GET_ACCOUNT_DETAILS](
    {},
    apiUrl: string
  ): Promise<ResponseResult<IAccountDetails>> {
    return new Promise((resolve, reject) => {
      api
        .get(`member/v1/account/${apiUrl}`)
        .then((response: AxiosResponse<ResponseResult<IAccountDetails>>) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.response);
        });
    });
  },
  [ActionTypes.GET_IMPERSONATE_USER](
    {},
    memberId:string
  ):Promise<ResponseResult<IAuth['currentUserData']>>{
    return new Promise((resolve, reject)=>{
      api
      .get(`auth/v1/Impersonate/${memberId}`).then((response:AxiosResponse<ResponseResult<IAuth['currentUserData']>>)=>{
        resolve(response.data);
      })
      .catch((error)=>{
        reject(error.response);
      })
    })
  }
};

export default actions;
