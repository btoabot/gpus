import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import StateContext from "src/context/StateContext";
import "./index.css";
import App from "src/components/App/App";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <ConfigProvider>
    <StateContext>
      <App />
    </StateContext>
  </ConfigProvider>,
);
