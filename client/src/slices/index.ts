import { combineReducers } from "redux";

import loginReducer from "./login/reducer";

const rootReducer = combineReducers({
  login: loginReducer,
});

export interface itemReducerType {}

export default rootReducer;
