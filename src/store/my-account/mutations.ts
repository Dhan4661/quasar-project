import { MutationTree } from 'vuex';
import { IMyAccount } from './my-account';
import { MutationTypes } from './mutation-types';

// Mutation contracts
export type Mutations<S = IMyAccount> = {
  [MutationTypes.SET_ORDER_TABLE_DATA](
    state: S,
    payload: IMyAccount['orderTableData']
  ): void;
  [MutationTypes.SET_QUOTE_TABLE_DATA](
    state: S,
    payload: IMyAccount['quoteTableData']
  ): void;
  [MutationTypes.SET_INVOICE_TABLE_DATA](
    state: S,
    payload: IMyAccount['invoiceTableData']
  ): void;
  [MutationTypes.SET_STOCK_TAKE_TABLE_DATA](
    state: S,
    payload: IMyAccount['stockTakeTableData']
  ): void;
  [MutationTypes.SET_PURCHASE_TABLE_DATA](
    state: S,
    payload: IMyAccount['purchaseTableData']
  ): void;
  [MutationTypes.SET_REPORT_FILTER](
    state: S,
    payload: IMyAccount['currentReportFilter']
  ): void;
  [MutationTypes.SET_DUMMY_DATA](
    state: S,
    payload: IMyAccount['dummyData']
  ): void;
};

const mutations: MutationTree<IMyAccount> & Mutations = {
  [MutationTypes.SET_ORDER_TABLE_DATA](
    state: IMyAccount,
    payload: IMyAccount['orderTableData']
  ) {
    state.orderTableData = payload;
  },
  [MutationTypes.SET_QUOTE_TABLE_DATA](
    state: IMyAccount,
    payload: IMyAccount['quoteTableData']
  ) {
    state.quoteTableData = payload;
  },
  [MutationTypes.SET_INVOICE_TABLE_DATA](
    state: IMyAccount,
    payload: IMyAccount['invoiceTableData']
  ) {
    state.invoiceTableData = payload;
  },
  [MutationTypes.SET_STOCK_TAKE_TABLE_DATA](
    state: IMyAccount,
    payload: IMyAccount['stockTakeTableData']
  ) {
    state.stockTakeTableData = payload;
  },
  [MutationTypes.SET_PURCHASE_TABLE_DATA](
    state: IMyAccount,
    payload: IMyAccount['purchaseTableData']
  ) {
    state.purchaseTableData = payload;
  },
  [MutationTypes.SET_REPORT_FILTER](
    state: IMyAccount,
    payload: IMyAccount['currentReportFilter']
  ) {
    state.currentReportFilter = payload;
  },
  [MutationTypes.SET_DUMMY_DATA](
    state: IMyAccount,
    payload: IMyAccount['dummyData']
  ) {
    debugger;
    let temp = payload;
    if(temp.hasOwnProperty('asset_collector_ignore')){
      
    }
    state.dummyData = temp;
    //state.dummyData = payload;
  },
};
export default mutations;
