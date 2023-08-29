import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducers";
import { getUser } from "./actions/userAction";
import { getCurrentUser } from "./actions/currentUserAction";
import { BrowserRouter } from "react-router-dom";

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

store.dispatch(getUser());
store.dispatch(getCurrentUser());

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
