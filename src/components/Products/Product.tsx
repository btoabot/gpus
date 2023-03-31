import { Card, Image, Rate, Row, Typography } from "antd";
import { IItemProps } from "src/interfaces/IGPU";
const { Meta } = Card;
const { Title } = Typography;

export default function Product({ item }: IItemProps): JSX.Element {
  return (
    <Card
      className={"product"}
      hoverable
      cover={
        <div>
          <Image
            rootClassName="product-content"
            src={item.image_url}
            preview={false}
            width={200}
          />
        </div>
      }
    >
      <Meta
        title={`${item.name} ( ${item.memory_size} GB )`}
        description={
          <>
            <Row justify="center" align="middle">
              <Title level={3}>{item.price}$</Title>
              <Rate
                rootClassName={"product-description"}
                disabled
                defaultValue={(item.rating * 10) >> 1}
              />
            </Row>
          </>
        }
      />
    </Card>
  );
}
