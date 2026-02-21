import { Row, Col, Spin } from "antd";
import { useContext } from "react";
import { ChallengeContext } from "../contexts/challenge";
import JobItem from "./JobItem";

const JobsList = () => {
const { jobs, loadingJobs } = useContext(ChallengeContext);

 

  if (loadingJobs) {
    return (
      <div style={{ textAlign: "center", marginTop: 100 }}>
        <Spin size="large" />
      </div>
    );
  }
  return (
    <Row gutter={[24, 24]}>
      {jobs.map((job) => (
        <Col xs={24} sm={12} lg={8} key={job.id}>
          <JobItem job={job} />
        </Col>
      ))}
    </Row>
  );
};

export default JobsList;