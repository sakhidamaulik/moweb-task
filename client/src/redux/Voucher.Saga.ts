import { call, put, takeLatest, takeEvery } from "redux-saga/effects";
import { SagaIterator } from "redux-saga";
import {
  VoucherActionTypes,
  Action,
  VoucherActions,
} from "./Voucher.Action";
import { IVoucher } from "../Model/Voucher.Model";
import { voucherService } from "../Service/Voucher.Service";

function* CreateVoucher(
  action: Action<VoucherActionTypes.CREATE_VOUCHER, IVoucher>
): SagaIterator {
  try {
    const voucherResult = yield call(
      voucherService.createVoucher,
      action.payload
    );
    yield put(VoucherActions.CreateVoucherSuccess(voucherResult));
  } catch (e: any) {
    yield put(VoucherActions.CreateVoucherFailure(e));
  }
}

function* GetVouchers(action: Action<VoucherActionTypes.GET_VOUCHER, {}>): SagaIterator {
  try {
    const vouchers = yield call(voucherService.getVouchers);
    yield put(VoucherActions.GetVoucherSuccess(vouchers));
  } catch (e: any) {
    yield put(VoucherActions.GetVoucherFailure(e));
  }
}

export function* WatchVoucherSagas(): SagaIterator {
  yield takeEvery(VoucherActionTypes.CREATE_VOUCHER, CreateVoucher);
  yield takeLatest(VoucherActionTypes.GET_VOUCHER, GetVouchers);
}
