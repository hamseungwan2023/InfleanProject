import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import loginReducer from "./reducers/auth";
import commentListReducer from "./reducers/commentList";
import { persistReducer } from "redux-persist";

const reducers = combineReducers({
  auth: loginReducer,
  commentList: commentListReducer
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export interface itemReducerType {}

export default persistedReducer;
