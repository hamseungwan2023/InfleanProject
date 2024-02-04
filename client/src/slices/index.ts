import { combineReducers } from "redux";
import storage from "redux-persist/lib/storage";
import loginReducer from "./reducers/auth";
import commentListReducer from "./reducers/commentList";
import { persistReducer } from "redux-persist";
import categoryReducer from "./reducers/category";
import locationReducer from "./reducers/location";
import searchReducer from "./reducers/search";
import orderByReducer from "./reducers/orderBy";

const reducers = combineReducers({
  auth: loginReducer,
  commentList: commentListReducer,
  category: categoryReducer,
  location: locationReducer,
  search: searchReducer,
  orderBy: orderByReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export interface itemReducerType {}

export default persistedReducer;
