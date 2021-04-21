import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.min.css";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/global.scss";

import App from "./App";
import { store } from "reduxState/store";

import { createBrowserHistory } from "history";
export const history = createBrowserHistory();
ReactDOM.render(
  <Router history={history}>
    <Provider store={store}>
      <ToastContainer />
      <App />
    </Provider>
  </Router>,
  document.getElementById("root")
);
