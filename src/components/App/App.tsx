import { FC } from "react";
import { Layout } from "antd";
const { Header, Sider, Content } = Layout;
import Search from "src/components/Search/Search";
import Filter from "src/components/Filter/Filter";
import SortBar from "src/components/SortBar/SortBar";
import Products from "src/components/Products/Products";
import "antd/dist/reset.css";
import "./index.scss";

const App: FC = () => (
  <Layout className="layout" data-testid="app">
    <Header className="header">
      <Search />
    </Header>
    <Layout>
      <Sider className="sider" width={300}>
        <Filter />
      </Sider>
      <Content className="content">
        <SortBar />
        <Products />
      </Content>
    </Layout>
  </Layout>
);

export default App;
