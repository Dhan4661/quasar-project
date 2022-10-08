
export interface IAuth {
  currentUserData: {
    name: string,
    email: string,
  };
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
  name: string | null;
  email: string | null;
  phoneNumber: string | null;
  age: string | null;
}


export interface IVerifyTokenResponse {
  emailAddress: string;
  token: string;
  tokenState: number;
}


