import { IMyAccount } from './my-account';

export const state: IMyAccount = {
  orderTableData: { entries: [], offset: 0, page: 1, totalRows: 0 },
  quoteTableData: { entries: [], offset: 0, page: 1, totalRows: 0 },
  invoiceTableData: { entries: [], offset: 0, page: 1, totalRows: 0,total:0 },
  purchaseTableData: {
    rows: [],
    offset: 0,
    page: 1,
    totalRows: 0,
    total:0,
  },
  stockTakeTableData: {
    rows: [],
    offset: 0,
    page: 1,
    totalRows: 0,
    total:0,
  },
  currentReportFilter: {
    from: '',
    to: '',
    search: '',
    reportType: '',
  },
  dummyData : {
    asset_collector_ignore : [],
  }
};
