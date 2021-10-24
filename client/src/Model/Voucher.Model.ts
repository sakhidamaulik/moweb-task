export enum LoadState {
  Initial,
  Loading,
  LoadSuccessful,
  LoadFailed,
}

export interface IVoucher {
  id: string;
  voucherType?: string;
  voucherDate?: string;
  voucherNumber?: number;
  voucherData: IVoucherData[];
}

export interface IVoucherData {
  accountName: string;
  debit: number;
  credit: number;
  narration: string;
}