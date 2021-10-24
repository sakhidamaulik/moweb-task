import { combineReducers } from "redux";
import { voucherReducer } from "./Voucher.Reducer";

export const rootReducer = combineReducers({
  voucherState: voucherReducer,
});

export type RootReducerState = ReturnType<typeof rootReducer>;
