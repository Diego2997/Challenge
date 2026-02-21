import { useState, useContext, useReducer } from "react";
import { Card, Input, Button, message } from "antd";
import { ChallengeContext } from "../contexts/challenge";
import { ChallengeReducer } from "../reducers/challengeReducer";

const JobItem = ({ job }) => {
  const { candidate, ApplyToJob } = useContext(ChallengeContext);
  const [state, dispatch] = useReducer(ChallengeReducer);
  const [repoUrl, setRepoUrl] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
  if (!repoUrl) {
    message.error("Enter your GitHub repo URL");
    return;
  }

  try {
    setLoading(true);

    const response = await ApplyToJob(
      candidate.uuid,
      job.id,
      candidate.applicationId,
      repoUrl,
      candidate.candidateId
    );

    if (response.success || response.status === 200) {
      message.success("Application submitted");
      setRepoUrl("");
    } else {
      message.error(response.message);
    }
  } catch (error) {
    message.error("Something went wrong");
  } finally {
    setLoading(false);
  }
};

  return (
    <Card
      hoverable
      style={{
        borderRadius: 12,
        height: "100%",
      }}
    >
      <h3>{job.title}</h3>

      <Input
        placeholder="https://github.com/tu-usuario/tu-repo"
        value={repoUrl}
        onChange={(e) => setRepoUrl(e.target.value)}
        style={{ marginBottom: 12 }}
      />

      <Button
        type="primary"
        block
        loading={loading}
        onClick={handleSubmit}
      >
        Submit
      </Button>
    </Card>
  );
};

export default JobItem;