import { IDummyData, IFilterModel } from 'src/common';

interface ICommonEntries {
  date: string;
  id: string;
  poNumber: string;
}
export interface IAccountEntries extends ICommonEntries {
  orderNumber: string;
  expectedDate: string;
  status: string;
  total: number;
}

export interface IInvoiceAccountEntries extends ICommonEntries {
  amount: number;
  docNumber: string;
  type: string;
}

export interface IMyaccountPagination {
  offset: number;
  page: number;
  totalRows: number;
  total?: number;
}

export interface IAccountTableDataResponse extends IMyaccountPagination {
  entries: IAccountEntries[];
}
export interface IInvoiceAccountTableDataResponse extends IMyaccountPagination {
  entries: IInvoiceAccountEntries[];
}

export interface IStockTakeReport {
  sku: string;
  brand: string;
  accSet: string;
  displayName: string;
  unitCode: string;
  lastPricePaid: string;
}

export interface IPurchaseReport {
  totalQuantity: string;
  locationId: string;
  avgPricePaid: string;
  totalExGST: string;
  accountName: string;
  sku: string;
  brand: string;
  accSet: string;
  displayName: string;
  unitCode: string;
  lastPricePaid: string;
}
export interface IPurchaseResponse extends IMyaccountPagination {
  rows: IStockTakeReport[];
}
export interface IStockTakeResponse extends IMyaccountPagination {
  rows: IPurchaseReport[];
}

export interface IMyAccount {
  orderTableData: IAccountTableDataResponse;
  quoteTableData: IAccountTableDataResponse;
  invoiceTableData: IInvoiceAccountTableDataResponse;
  purchaseTableData: IPurchaseResponse;
  stockTakeTableData: IStockTakeResponse;
  currentReportFilter: IFilterModel;
  dummyData: IDummyData;
}

export interface ICommonContact {
  memberId: string;
  name: string;
  email: string;
  phone: string;
}

export interface ICommonAddress {
  id: string;
  name: string;
  line1: string;
  line2: string;
  line3: string;
  line4: string;
  suburb: string;
  city: string;
  country: string;
}

export interface IUserDetails {
  account: {
    code: string;
    name: string;
    terms: string;
  };
  user: ICommonContact;
  billing: ICommonAddress;
  defaultAddressId: string;
  addresses: ICommonAddress[];
  accountMembers: ICommonContact[];
}
export interface IAccountMembers{
  accountMembers: ICommonContact[];
}

export interface IUpdateUserDetailsParams {
  name: string;
  emailAddress: string;
  phone: string;
}

export interface ITableRow {
  sku: string;
  name: string;
  accSet: string;
  unit: string;
  quantity: number;
  supplied: number;
  price: number;
  total: number;
  comment: string;
}

export interface IAccountDetails {
  orderNumber: string;
  shipmentNumber: string;
  invoiceNumber: string;
  poNumber: string;
  status: string;
  date: string;
  deliveryDate: string;
  reference: string;
  truck: string;
  comments: string;
  billingAddress: ICommonAddress;
  shippingAddress: ICommonAddress;
  taxTotal: number;
  subTotal: number;
  totalIncludingTax: number;
  rows: ITableRow[];
  type?: string;
  creditNoteNumber: string;
  orderId: string;
  total: number;
}
