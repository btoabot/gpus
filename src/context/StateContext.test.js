import React from "react";
import { render, screen } from "@testing-library/react";
import StateProvider from "./StateContext";

describe("StateProvider", () => {
  it("renders the children components", () => {
    const child = <p>Child component</p>;
    render(<StateProvider>{child}</StateProvider>);
    expect(screen.getByText("Child component")).toBeInTheDocument();
  });
});
