import { MutationTree } from 'vuex';
import { IProduct } from './product';
import { MutationTypes } from './mutation-types';


// Mutation contracts
export type Mutations<S = IProduct> = {
  // [MutationTypes.SET_PRODUCTS](state: S, payload: IProduct['products']): void;
  // [MutationTypes.RESET_PRODUCTS](state: S, payload: IProduct['products']): void;
  // [MutationTypes.SET_SEARCH_PARAMS](
  //   state: S,
  //   payload: { q: string; accset: string }
  // ): void;
  // [MutationTypes.UPDATE_FAVOURITE](state: S, index: number): void;
  // [MutationTypes.UPDATE_PRODUCT_STOCK](
  //   state: S,
  //   payload: {
  //     cartItems: ICartItem[];
  //     isRevert: boolean;
  //     removeRows: ICartItem[];
  //   }
  // ): void;
  // [MutationTypes.UPDATE_SOH_BY_UNIT](
  //   state: S,
  //   payload: { product: IProductObj; stockUnit: string }
  // ): void;
};

const mutations: MutationTree<IProduct> & Mutations = {
  // [MutationTypes.SET_PRODUCTS](state: IProduct, payload: IProduct['products']) {
  //   state.products = payload;
  // },
  // [MutationTypes.SET_SEARCH_PARAMS](
  //   state: IProduct,
  //   payload: { q: string; accset: string }
  // ) {
  //   state.searchParams = payload;
  // },
  // [MutationTypes.UPDATE_FAVOURITE](state: IProduct, index: number) {
  //   state.products.products[index].isFavourite =
  //     !state.products.products[index].isFavourite;
  // },
  // [MutationTypes.RESET_PRODUCTS](state: IProduct) {
  //   state.products = { totalRecords: 0, page: 0, offset: 0, products: [] };
  // },
  // [MutationTypes.UPDATE_PRODUCT_STOCK](
  //   state: IProduct,
  //   payload: { cartItems: ICartItem[]; isRevert: boolean }
  // ) {
  //   payload.cartItems.forEach((x) => {
  //     const index = state.products.products.findIndex(
  //       (y) => y.sku == x.sku && !y.stockIsInfinite
  //     );
  //     if (index != -1) {
  //       state.products.products[index].stockAvailable = x.availableStock;
  //       state.products.products[index].units = x.units;
  //       state.products.products[index].stockUnit = x.unit;
  //     }
  //   });
  // },
  // [MutationTypes.UPDATE_SOH_BY_UNIT](
  //   state: IProduct,
  //   payload: { product: IProductObj; stockUnit: string }
  // ) {
  //   state.products.products.forEach((x) => {
  //     if (x.sku == payload.product.sku && !x.stockIsInfinite) {
  //       const unit = x.units.find((x) => x.code == payload.stockUnit);
  //       if (unit) {
  //         x.stockAvailable = unit.stockAvailable;
  //       }
  //     }
  //   });
  // },
};
export default mutations;
