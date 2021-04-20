import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
// import "react-calendar/dist/Calendar.css";
import "react-datepicker/dist/react-datepicker.css";
import "./styles/global.scss";

import App from "./App";

import { store } from "reduxState/store";

ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </BrowserRouter>,
  document.getElementById("root")
);
