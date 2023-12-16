import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import rootReducer from "./reducer/index"
import {Toaster} from "react-hot-toast"
const root = ReactDOM.createRoot(document.getElementById("root"));
const store = configureStore({
  reducer:rootReducer,
})
root.render(
  <React.StrictMode>
    <Provider store= {store}>
      <BrowserRouter>
          <App />
          <Toaster/>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
