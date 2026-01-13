import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import rootReducer from "./reducer";
import { configureStore } from "@reduxjs/toolkit";
import { Toaster } from "react-hot-toast";

const store = configureStore({
  reducer: rootReducer,
});
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Toaster
          position="top-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              background: "#161D29",
              color: "#F1F2FF",
              borderRadius: "12px",
              padding: "14px 16px",
              fontSize: "14px",
              boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            },
            success: {
              iconTheme: {
                primary: "#22c55e",
                secondary: "#161D29",
              },
            },
            error: {
              iconTheme: {
                primary: "#ef4444",
                secondary: "#161D29",
              },
            },
          }}
        />
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
