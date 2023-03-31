import { render, fireEvent } from "@testing-library/react";
import { StateContext } from "src/context/StateContext";
import SearchBar from "./Search";

describe("SearchBar", () => {
  it("calls handleFilterChange when the search button is clicked", () => {
    const handleFilterChange = jest.fn();
    const { getByRole } = render(
      <StateContext.Provider value={{ handleFilterChange }}>
        <SearchBar />
      </StateContext.Provider>,
    );

    const searchInput = getByRole("textbox");
    const searchButton = getByRole("button");

    fireEvent.change(searchInput, { target: { value: "test" } });
    fireEvent.click(searchButton);

    expect(handleFilterChange).toHaveBeenCalledWith({ name: "test" });
  });
});
