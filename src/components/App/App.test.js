import React from "react";
import { render } from "@testing-library/react";
import App from "./App";
import { ConfigProvider } from "antd";
import StateContext from "../../context/StateContext";

describe("App component", () => {
  it("should render", () => {
    const { getByTestId } = render(
      <ConfigProvider>
        <StateContext>
          <App />
        </StateContext>
      </ConfigProvider>,
    );
    expect(getByTestId("app")).toBeInTheDocument();
  });
});
