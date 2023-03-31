import { useContext } from "react";
import { StateContext } from "src/context/StateContext";
import { Input, Row } from "antd";
const { Search } = Input;
import "./index.scss";

function SearchBar() {
  const { handleFilterChange } = useContext(StateContext);

  function onSearch(value: string): void {
    handleFilterChange({ ["name"]: value.toLowerCase() });
  }

  return (
    <Row justify="start" align="middle" className="search-wrapper">
      <Search
        loading={false}
        placeholder="Input GPU name"
        allowClear
        onSearch={onSearch}
        className="search"
      />
    </Row>
  );
}

export default SearchBar;
