import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import rootReducer from "./slices";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({ reducer: rootReducer, devTools: true });

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
