import { render, fireEvent } from "@testing-library/react";
import { StateContext } from "src/context/StateContext";
import SortBar from "./SortBar";

describe("SortBar", () => {
  it("should render the component without crashing", () => {
    const sort = {
      field: "price",
      direction: "asc",
    };

    const handleSortChange = jest.fn();
    render(
      <StateContext.Provider value={{ sort, handleSortChange }}>
        <SortBar />
      </StateContext.Provider>,
    );
  });
  it("renders the component with the correct default value", () => {
    const sort = { field: "price", direction: "asc" };
    const handleSortChange = jest.fn();
    const { getByLabelText } = render(
      <StateContext.Provider value={{ sort, handleSortChange }}>
        <SortBar />
      </StateContext.Provider>,
    );
    const selectedRadio = getByLabelText("Price Low to High");
    expect(selectedRadio.checked).toBe(true);
  });

  it("calls handleSortChange with the correct arguments when a radio button is clicked", () => {
    const sort = { field: "price", direction: "desc" };
    const handleSortChange = jest.fn();
    const { getByLabelText } = render(
      <StateContext.Provider value={{ sort, handleSortChange }}>
        <SortBar />
      </StateContext.Provider>,
    );
    const radio = getByLabelText("Price High to Low");
    fireEvent.click(radio);
    expect(handleSortChange).toHaveBeenCalledWith("price", "desc");
  });

  it("should set the correct default value for the radio group", () => {
    const sort = {
      field: "price",
      direction: "asc",
    };

    const handleSortChange = jest.fn();
    const { getByLabelText } = render(
      <StateContext.Provider value={{ sort, handleSortChange }}>
        <SortBar />
      </StateContext.Provider>,
    );

    expect(getByLabelText("Price Low to High")).toBeChecked();
  });
});
