import { IMenu, ISubMenus } from 'src/common';

export interface IAuth {
  currentUserData: {
    name: string,
    email: string,
  };
  firebaseRegToken: string;
  showAccountSetDialog: boolean;
  accsets: ICategoriesAccsets['accsets'];
  loadingCategoriesAccsets: boolean;
  menus: IMenu[];
}
export interface ISwitchAccountResponse {
  accessToken: string;
  minimumOrder: number;
  suppressPricing: boolean;
  canOrder: boolean;
}

export interface ISwitchAccountModel {
  accountCode: string;
  registrationToken?: string;
  deviceId?: string;
  channel: string;
}

export interface ILoginModel {
  appKey: string;
  appVersion?: string;
  emailAddress: string;
  password: string;
  registrationToken?: string;
  deviceId?: string;
  channel: string;
}

export interface IRegisterModel {
  branchID: string;
  phoneNumber: number | string;
  termsAgreed: string | boolean;
  emailAddress: string;
  gRecaptchaResponse: string;
}
export interface IUserStafModel extends IRegisterModel {
  staffNo: string;
  staffFullName: string;
}

export interface IUser {
  name: string;
  email: string;
  phoneNumber: string;
  age: string;
  accept: boolean | string;
}
export interface ITradeCustomerModel extends IRegisterModel {
  businessName: string;
  customerCode: string;
  customerName: string;
}

export interface IVerifyTokenResponse {
  emailAddress: string;
  token: string;
  tokenState: number;
}

export interface ISearchAccountResponse {
  accounts: { code: string; name: string }[];
}

export interface IAccSets {
  code: string;
  name: string;
}

export interface ICategoriesAccsets {
  accsets: IAccSets[];
  nodes: ISubMenus[];
}
