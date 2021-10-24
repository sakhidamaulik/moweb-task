import { routerMiddleware } from "connected-react-router";
import { applyMiddleware, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";
import { createBrowserHistory } from "history";
import { rootReducer } from "./RootReducer";
import rootSaga from "./rootSaga";

const sagaMiddleware = createSagaMiddleware();
export const history = createBrowserHistory();

const store = createStore(
  rootReducer,
  {},
  composeWithDevTools(
    applyMiddleware(routerMiddleware(history), sagaMiddleware)
  )
);

export type RootState = ReturnType<typeof rootReducer>;

sagaMiddleware.run(rootSaga);

export default store;
