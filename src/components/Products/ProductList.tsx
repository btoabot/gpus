import { Col, Row } from "antd";
import { IGPUList } from "src/interfaces/IGPU";
import Product from "src/components/Products/Product";

export default function ProductList({ gpuList }: IGPUList): JSX.Element {
  return (
    <Row gutter={[16, 16]}>
      {gpuList.map((gpu): JSX.Element => {
        return (
          <Col key={gpu.id} span={8}>
            <Product item={gpu} />
          </Col>
        );
      })}
    </Row>
  );
}
