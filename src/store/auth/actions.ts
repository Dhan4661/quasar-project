import { AxiosResponse } from 'axios';
import { api } from 'src/boot/axios';
import { ISuccessMessage, ResponseResult } from 'src/common';
import { ActionContext, ActionTree } from 'vuex';
import { IRootState } from '../index';
import { ActionTypes } from './action-types';
import {
  IAuth,
  ILoginModel,
  IUser,
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
    return new Promise((resolve, reject) => {
      // TODO: store local storage
      api
        .post(`auth/localhost/${param.apiName}`, param.model)
        .then((response) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.response);
        });
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
    ResponseResult<unknown>
  > {
    return new Promise((resolve, reject) => {
      api
        .get(`catalog/${process.env.API_VERSION}/MainCategory`)
        .then((response: AxiosResponse<ResponseResult<unknown>>) => {
          resolve(response.data);
        })
        .catch((error) => {
          reject(error.response);
        });
    });
  },
};
export default actions;
