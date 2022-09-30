import { AxiosResponse } from 'axios';
import { api } from 'src/boot/axios';
import { ISuccessMessage, ResponseResult } from 'src/common';
import { ActionContext, ActionTree } from 'vuex';
import { IRootState } from '../index';
import { ActionTypes } from './action-types';
import {
  IAuth,
  ICategoriesAccsets,
  ILoginModel,
  ISearchAccountResponse,
  ISwitchAccountModel,
  ISwitchAccountResponse,
  ITradeCustomerModel,
  IUser,
  IUserStafModel,
  IVerifyTokenResponse,
} from './auth';
import { Mutations } from './mutations';

// Actions context
type AugmentedActionContext = {
  commit<K extends keyof Mutations>(
    key: K,
    payload: Parameters<Mutations[K]>[1]
  ): ReturnType<Mutations[K]>;
} & Omit<ActionContext<IAuth, IRootState>, 'commit'>;

// Actions contracts
export interface Actions {
  [ActionTypes.LOGIN](
    { commit }: AugmentedActionContext,
    param: ILoginModel
  ): Promise<ResponseResult<IAuth>>;
  [ActionTypes.REGISTER](
    { commit }: AugmentedActionContext,
    param: { model: IUser; apiName: string }
  ): Promise<ResponseResult<ISuccessMessage>>;
  [ActionTypes.FORGOT_PASSWORD](
    { commit }: AugmentedActionContext,
    param: { emailAddress: string }
  ): Promise<ResponseResult<ISuccessMessage>>;
  [ActionTypes.VERIFY_TOKEN](
    { commit }: AugmentedActionContext,
    token: string
  ): Promise<ResponseResult<IVerifyTokenResponse>>;
  [ActionTypes.RESET_PASSWORD](
    { commit }: AugmentedActionContext,
    params: {
      model: { password: string; confirmPassword: string };
      token: string;
    }
  ): Promise<ResponseResult<ISuccessMessage>>;
  [ActionTypes.SWITCH_ACCOUNT](
    { commit }: AugmentedActionContext,
    params: ISwitchAccountModel
  ): Promise<ResponseResult<ISwitchAccountResponse>>;
  [ActionTypes.SEARCH_ACCOUNTS](
    { commit }: AugmentedActionContext,
    searchItem: string
  ): Promise<ResponseResult<ISearchAccountResponse>>;
  [ActionTypes.LOGOUT](): Promise<ResponseResult<ISuccessMessage>>;
  [ActionTypes.GET_CATEGORIES_ACCSETS](): Promise<
    ResponseResult<ICategoriesAccsets>
  >;
}

// Define actions
const actions: ActionTree<IAuth, IRootState> & Actions = {
  [ActionTypes.LOGIN]({}, param: ILoginModel): Promise<ResponseResult<IAuth>> {
    return new Promise((resolve, reject) => {
      api
        .post(`auth/${process.env.API_VERSION}/login`, param)
        .then((response: AxiosResponse<ResponseResult<IAuth>>) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.response);
        });
    });
  },
  [ActionTypes.REGISTER](
    {},
    param: { model: IUser; apiName: string }
  ): Promise<ResponseResult<ISuccessMessage>> {
    return new Promise(() => {
      // TODO: store local storage
      debugger;
      console.log(param);
    });
  },
  [ActionTypes.FORGOT_PASSWORD](
    {},
    param: { emailAddress: string }
  ): Promise<ResponseResult<ISuccessMessage>> {
    return new Promise((resolve, reject) => {
      api
        .post(`auth/${process.env.API_VERSION}/forgotten`, param)
        .then((response: AxiosResponse<ResponseResult<ISuccessMessage>>) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.response);
        });
    });
  },
  [ActionTypes.VERIFY_TOKEN](
    {},
    token: string
  ): Promise<ResponseResult<IVerifyTokenResponse>> {
    return new Promise((resolve, reject) => {
      api
        .get(`auth/${process.env.API_VERSION}/forgotten/${token}`)
        .then(
          (response: AxiosResponse<ResponseResult<IVerifyTokenResponse>>) => {
            resolve(response.data);
          }
        )
        .catch((error) => {
          reject(error.response);
        });
    });
  },
  [ActionTypes.RESET_PASSWORD](
    {},
    params: {
      model: { password: string; confirmPassword: string };
      token: string;
    }
  ): Promise<ResponseResult<ISuccessMessage>> {
    return new Promise((resolve, reject) => {
      api
        .post(
          `auth/${process.env.API_VERSION}/forgotten/${params.token}`,
          params.model
        )
        .then((response: AxiosResponse<ResponseResult<ISuccessMessage>>) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.response);
        });
    });
  },
  [ActionTypes.SWITCH_ACCOUNT](
    {},
    param: ISwitchAccountModel
  ): Promise<ResponseResult<ISwitchAccountResponse>> {
    return new Promise((resolve, reject) => {
      api
        .post(`auth/${process.env.API_VERSION}/switch`, param)
        .then(
          (response: AxiosResponse<ResponseResult<ISwitchAccountResponse>>) => {
            resolve(response.data);
          }
        )
        .catch((error) => {
          reject(error.response);
        });
    });
  },
  [ActionTypes.SEARCH_ACCOUNTS](
    {},
    searchItem: string
  ): Promise<ResponseResult<ISearchAccountResponse>> {
    return new Promise((resolve, reject) => {
      api
        .get(
          `member/${process.env.API_VERSION}/GetCustomer?searchterm=${searchItem}&offset=0&limit=16`
        )
        .then(
          (response: AxiosResponse<ResponseResult<ISearchAccountResponse>>) => {
            resolve(response.data);
          }
        )
        .catch((error) => {
          reject(error.response);
        });
    });
  },
  [ActionTypes.LOGOUT](): Promise<ResponseResult<ISuccessMessage>> {
    return new Promise((resolve, reject) => {
      api
        .get(`auth/${process.env.API_VERSION}/logout`)
        .then((response: AxiosResponse<ResponseResult<ISuccessMessage>>) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.response);
        });
    });
  },
  [ActionTypes.GET_CATEGORIES_ACCSETS](): Promise<
    ResponseResult<ICategoriesAccsets>
  > {
    return new Promise((resolve, reject) => {
      api
        .get(`catalog/${process.env.API_VERSION}/MainCategory`)
        .then((response: AxiosResponse<ResponseResult<ICategoriesAccsets>>) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.response);
        });
    });
  },
};
export default actions;
