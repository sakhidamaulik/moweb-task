import { IVoucher } from "../Model/Voucher.Model";

export interface Action<T extends string, U> {
  readonly type: T;
  readonly payload: U;
}

export function createAction<T extends string, U extends any>(
  type: T,
  payload: U
): Action<T, U> {
  return {
    type,
    payload,
  };
}

export enum VoucherActionTypes {
  CREATE_VOUCHER = "Create Voucher",
  CREATE_VOUCHER_SUCCESS = "Create Voucher Success",
  CREATE_VOUCHER_FAILURE = "Create Voucher Failure",

  GET_VOUCHER = "Get Voucher",
  GET_VOUCHER_SUCCESS = "Get Voucher Success",
  GET_VOUCHER_FAILURE = "Get Voucher Failure",
}

export const VoucherActions = {
  CreateVoucher: (
    voucher: IVoucher
  ): Action<VoucherActionTypes.CREATE_VOUCHER, IVoucher> => {
    return createAction(VoucherActionTypes.CREATE_VOUCHER, voucher);
  },
  CreateVoucherSuccess: (
    voucher: IVoucher
  ): Action<VoucherActionTypes.CREATE_VOUCHER_SUCCESS, IVoucher> =>
    createAction(VoucherActionTypes.CREATE_VOUCHER_SUCCESS, voucher),
  CreateVoucherFailure: (
    error: Error
  ): Action<VoucherActionTypes.CREATE_VOUCHER_FAILURE, Error> =>
    createAction(VoucherActionTypes.CREATE_VOUCHER_FAILURE, error),

  GetVoucher: (
    voucherId: string
  ): Action<VoucherActionTypes.GET_VOUCHER, string> => {
    return createAction(VoucherActionTypes.GET_VOUCHER, voucherId);
  },
  GetVoucherSuccess: (
    voucher: IVoucher
  ): Action<VoucherActionTypes.GET_VOUCHER_SUCCESS, IVoucher> =>
    createAction(VoucherActionTypes.GET_VOUCHER_SUCCESS, voucher),
  GetVoucherFailure: (
    error: Error
  ): Action<VoucherActionTypes.GET_VOUCHER_FAILURE, Error> =>
    createAction(VoucherActionTypes.GET_VOUCHER_FAILURE, error),
};

export type VoucherActionsAllTypes =
  | ReturnType<typeof VoucherActions.CreateVoucher>
  | ReturnType<typeof VoucherActions.CreateVoucherSuccess>
  | ReturnType<typeof VoucherActions.CreateVoucherFailure>
  | ReturnType<typeof VoucherActions.GetVoucher>
  | ReturnType<typeof VoucherActions.GetVoucherSuccess>
  | ReturnType<typeof VoucherActions.GetVoucherFailure>;
