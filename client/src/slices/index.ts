import { combineReducers } from "redux";

import loginReducer from "./login/reducer";
import authSliceReducer from "./login/reducer";

const rootReducer = combineReducers({
  auth: loginReducer,
});

export interface itemReducerType {}

export default rootReducer;
