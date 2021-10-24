import {IVoucher, LoadState } from "../Model/Voucher.Model";
import {
  VoucherActionsAllTypes,
  VoucherActionTypes,
} from "./Voucher.Action";

export interface IVoucherState {
  voucher: IVoucher[];
  voucherLoadState: LoadState;
}

const initialState: IVoucherState = {
  voucher: [],
  voucherLoadState: LoadState.Initial,
};

export function voucherReducer(
  state: IVoucherState = initialState,
  action: VoucherActionsAllTypes
): IVoucherState {

  switch (action.type) {
    case VoucherActionTypes.CREATE_VOUCHER:
      return {
        ...state,
        voucherLoadState: LoadState.Loading,
      };
    case VoucherActionTypes.CREATE_VOUCHER_SUCCESS:
      const newVoucher = [action.payload, ...state.voucher];
      return {
        ...state,
        voucher: newVoucher,
        voucherLoadState: LoadState.LoadSuccessful,
      };
    case VoucherActionTypes.CREATE_VOUCHER_FAILURE:
      return {
        ...state,
        voucherLoadState: LoadState.LoadFailed,
      };

    case VoucherActionTypes.GET_VOUCHER:
      return {
        ...state,
        voucherLoadState: LoadState.Loading,
      };
    case VoucherActionTypes.GET_VOUCHER_SUCCESS:
      return {
        ...state,
        voucher: state.voucher,
        voucherLoadState: LoadState.LoadSuccessful,
      };
    case VoucherActionTypes.GET_VOUCHER_FAILURE:
      return {
        ...state,
        voucherLoadState: LoadState.LoadFailed,
      };
    default:
      return state;
  }
}

export type VoucherReducerState = ReturnType<typeof voucherReducer>;
