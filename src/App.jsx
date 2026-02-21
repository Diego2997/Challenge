import { useEffect, useContext } from "react";
import { Layout, Typography } from "antd";
import JobsList from "./components/JobsList";
import { ChallengeContext } from "./contexts/challenge";

const { Header, Content } = Layout;
const { Title } = Typography;

function App() {
  const { fetchInitialData } = useContext(ChallengeContext);

  useEffect(() => {
    fetchInitialData("fmercadodiego@gmail.com");
  }, []);

  return (
    <Layout style={{ minHeight: "100vh", width: "100%" }}>
      <Header style={{ background: "#001529" }}>
        <Title style={{ color: "white", margin: 0 }} level={3}>
          Job Application Portal
        </Title>
      </Header>

      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          padding: "40px 20px",
        }}
      >
        <div
    style={{
      width: "100%",
      maxWidth: "1000px",
    }}
  >
          <JobsList />
        </div>
      </Content>
    </Layout>
  );
}

export default App;