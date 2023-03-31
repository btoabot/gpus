import { useContext } from "react";
import type { RadioChangeEvent } from "antd";
import { Radio, Space, Row } from "antd";
import { SortTuple } from "src/interfaces/IState";
import { StateContext } from "src/context/StateContext";

function SortBar(): JSX.Element {
  const { sort, handleSortChange } = useContext(StateContext);
  const value = `${sort.field}:${sort.direction}`;

  const onChange = (e: RadioChangeEvent): void => {
    const val: string = e.target.value;
    const [filed, direction]: SortTuple = val.split(":") as SortTuple;
    handleSortChange(filed, direction);
  };
  return (
    <Row justify="start" align="middle">
      <Radio.Group
        onChange={onChange}
        defaultValue={value}
        style={{ margin: "16px 0" }}
        buttonStyle="solid"
      >
        <Space wrap size={[16, 16]}>
          <Radio.Button value="price:asc">Price Low to High</Radio.Button>
          <Radio.Button value="price:desc">Price High to Low</Radio.Button>
          <Radio.Button value="rating:desc">Popular first</Radio.Button>
        </Space>
      </Radio.Group>
    </Row>
  );
}

export default SortBar;
