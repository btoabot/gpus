import { useRef, KeyboardEvent } from "react";
import { Card, Space, Checkbox, Row, Col, InputNumber } from "antd";
import type { CheckboxValueType } from "antd/es/checkbox/Group";
import { useContext } from "react";
import { StateContext } from "src/context/StateContext";
import { handleFormat, handleParser } from "src/utils/format";
import "./FilterStyle.scss";

const manufacturerOptions = [
  { label: "AMD", value: "AMD" },
  { label: "NVIDIA", value: "NVIDIA" },
];

const memoryOptions = [
  { label: "2 GB", value: 2 },
  { label: "4 GB", value: 4 },
  { label: "6 GB", value: 6 },
  { label: "8 GB", value: 8 },
  { label: "10 GB", value: 10 },
  { label: "12 GB", value: 12 },
  { label: "16 GB", value: 16 },
  { label: "24 GB", value: 24 },
];

function Filter() {
  const { handleFilterChange } = useContext(StateContext);

  const minPriceRef = useRef(null);
  const maxPriceRef = useRef(null);

  function onChangePrice(type: "min" | "max", value: number | string): void {
    const minValue =
      type === "min" ? Number(value) : Number(minPriceRef.current?.value);
    const maxValue =
      type === "max" ? Number(value) : Number(maxPriceRef.current?.value);
    onFilter("price", [minValue, maxValue]);
  }

  function onFilter(name: string, value: CheckboxValueType[]): void {
    handleFilterChange({ [name]: value });
  }

  function handleKeyPress(event: KeyboardEvent<HTMLInputElement>) {
    const key = event.key;
    const regex = /[0-9]/; // only allow numbers
    if (!regex.test(key)) {
      event.preventDefault(); // prevent non-numeric character from being entered
    }
  }

  return (
    <Space
      direction="vertical"
      size={16}
      style={{ width: "100%", marginTop: 65, display: "flex" }}
    >
      <Card size="small" title={"Manufacturer"}>
        <Row justify="start" align="middle">
          <Checkbox.Group
            name="manufacturer"
            className="checkbox-vertical"
            options={manufacturerOptions}
            onChange={(value) => onFilter("manufacturer", value)}
          />
        </Row>
      </Card>
      <Card size="small" title={"Memory size"}>
        <Row justify="start" align="middle">
          <Checkbox.Group
            name="memory_size"
            className="checkbox-vertical"
            options={memoryOptions}
            onChange={(value) => onFilter("memory_size", value)}
          />
        </Row>
      </Card>
      <Card size="small" title={"Price"}>
        <Row justify="start" align="middle">
          <Col span={11}>
            <InputNumber
              ref={minPriceRef}
              addonBefore="$"
              min={0}
              max={4000}
              onChange={(value) => onChangePrice("min", value)}
              formatter={handleFormat}
              parser={handleParser}
              onKeyPress={handleKeyPress}
              data-testid="min-price"
            />
          </Col>
          <Col span={2}>-</Col>
          <Col span={11}>
            <InputNumber
              ref={maxPriceRef}
              addonBefore="$"
              min={0}
              max={4000}
              onChange={(value) => onChangePrice("max", value)}
              formatter={handleFormat}
              parser={handleParser}
              onKeyPress={handleKeyPress}
              data-testid="max-price"
            />
          </Col>
        </Row>
      </Card>
    </Space>
  );
}

export default Filter;
