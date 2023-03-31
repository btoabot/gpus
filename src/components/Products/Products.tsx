import { useContext } from "react";
import { Empty } from "antd";
import { StateContext } from "src/context/StateContext";
import "./index.scss";

import SkeletonProduct from "src/components/Products/ProductsSkeleton";
import ProductList from "src/components/Products/ProductList";

function Products(): JSX.Element {
  const { sortedData, loading } = useContext(StateContext);
  if (!loading && sortedData && sortedData.length === 0) {
    return <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />;
  }
  if (loading) {
    return <SkeletonProduct />;
  }
  return <ProductList gpuList={sortedData} />;
}

export default Products;
