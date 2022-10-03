import { IAuth } from './auth';

export const state: IAuth = {
  currentUserData: {
    name: '',
    email: '',
  },
  firebaseRegToken: '',
  showAccountSetDialog: false,
  loadingCategoriesAccsets: false,

};
