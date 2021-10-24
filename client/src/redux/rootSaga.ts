import { SagaIterator } from "redux-saga";
import { all, fork } from "redux-saga/effects";
import { WatchVoucherSagas } from "./Voucher.Saga";

export default function* rootSaga(): SagaIterator {
  yield all([fork(WatchVoucherSagas)]);
}
