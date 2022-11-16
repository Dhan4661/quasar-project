import { IProduct } from './product';

export const state: IProduct = {
  products: { totalRecords: 0, page: 0, offset: 0 },
  posts: {
    userId: 0,
    id: 0,
    title: '',
    body: '',
  },
};
