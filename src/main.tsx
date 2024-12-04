import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";

import { Provider } from "react-redux";
import { composeWithDevTools } from "@redux-devtools/extension";

import rootReducer from "./store";

import "./index.css";
import router from "./router";
import { configureStore } from "@reduxjs/toolkit";
const store = configureStore({ reducer: rootReducer }, composeWithDevTools());
createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>
  </Provider>
);
