import { Card, Col, Row } from "antd";
const { Meta } = Card;

export default function SkeletonProduct(): JSX.Element {
  return (
    <Row gutter={[16, 16]}>
      {new Array(15).fill(null).map((_, i) => {
        return (
          <Col key={i} span={8}>
            <Card className="product" loading={true} data-testis="card">
              <Meta />
            </Card>
          </Col>
        );
      })}
    </Row>
  );
}
