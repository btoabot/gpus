import { render, fireEvent } from "@testing-library/react";
import { StateContext } from "src/context/StateContext";
import Filter from "./Filter";

const handleFilterChange = jest.fn();

const mockStateContext = {
  handleFilterChange,
};

describe("Filter", () => {
  it("should render the Filter component", () => {
    const { getByText } = render(
      <StateContext.Provider value={mockStateContext}>
        <Filter />
      </StateContext.Provider>,
    );

    expect(getByText("Manufacturer")).toBeInTheDocument();
    expect(getByText("Memory size")).toBeInTheDocument();
    expect(getByText("Price")).toBeInTheDocument();
  });

  it("should call handleFilterChange when a checkbox is checked/unchecked NVIDIA", () => {
    const { getByLabelText } = render(
      <StateContext.Provider value={mockStateContext}>
        <Filter />
      </StateContext.Provider>,
    );

    const nvidiaCheckbox = getByLabelText("NVIDIA");

    fireEvent.click(nvidiaCheckbox);

    expect(handleFilterChange).toHaveBeenCalledWith({
      manufacturer: ["NVIDIA"],
    });
  });

  it("should call handleFilterChange when a checkbox is checked/unchecked AMD", () => {
    const { getByLabelText } = render(
      <StateContext.Provider value={mockStateContext}>
        <Filter />
      </StateContext.Provider>,
    );

    const amdCheckbox = getByLabelText("AMD");

    fireEvent.click(amdCheckbox);

    expect(handleFilterChange).toHaveBeenCalledWith({
      manufacturer: ["AMD"],
    });
  });

  it("should call handleFilterChange when the price range is changed", () => {
    const { getByTestId } = render(
      <StateContext.Provider value={mockStateContext}>
        <Filter />
      </StateContext.Provider>,
    );

    const minPriceInput = getByTestId("min-price");
    const maxPriceInput = getByTestId("max-price");

    fireEvent.change(minPriceInput, { target: { value: "500" } });
    fireEvent.change(maxPriceInput, { target: { value: "1000" } });

    expect(handleFilterChange).toHaveBeenCalledTimes(2);
    expect(handleFilterChange).toHaveBeenCalledWith({ price: [500, 0] });
    expect(handleFilterChange).toHaveBeenCalledWith({ price: [500, 1000] });
  });

  it("should not allow non-numeric characters to be entered in the price inputs", () => {
    const { getByTestId } = render(
      <StateContext.Provider value={mockStateContext}>
        <Filter />
      </StateContext.Provider>,
    );

    const minPriceInput = getByTestId("min-price");
    const maxPriceInput = getByTestId("max-price");

    fireEvent.keyPress(minPriceInput, { key: "a" });
    fireEvent.keyPress(maxPriceInput, { key: "b" });

    expect(minPriceInput).toHaveValue("");
    expect(maxPriceInput).toHaveValue("");
  });
});
