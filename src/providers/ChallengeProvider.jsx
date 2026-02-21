import {  useReducer,useState } from "react";
import { ChallengeReducer } from "../reducers/challengeReducer";
import { challengeInstance } from "../config/challengeInstance";
import { ChallengeContext } from "../contexts/challenge";
import { actionTypes } from "../types/types";

const initialState = {
  candidate: null,
  jobs: [],
  loading: false,
  error: null,
};


export const ChallengeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ChallengeReducer, initialState);
  const [loadingJobs, setLoadingJobs] = useState(false);

  const fetchInitialData = async (email) => {
    try {
      setLoadingJobs(true);

      dispatch({ type: actionTypes.SET_LOADING, payload: true });

      const candidate = await challengeInstance.get(`/api/candidate/get-by-email?email=${email}`);
      dispatch({
        type: actionTypes.SET_CANDIDATE,
        payload: candidate.data,
      });

      const jobs = await challengeInstance.get("/api/jobs/get-list");
      dispatch({
        type: actionTypes.SET_JOBS,
        payload: jobs.data,
      });
    } catch (error) {
      dispatch({
        type: actionTypes.SET_ERROR,
        payload: error.message || "Unexpected error",
      });
    } finally {
      setLoadingJobs(false);
    }
  };

const ApplyToJob = async (uuid,jobId, applicationId, repoUrl,candidateId) => {
  try {
    const response = await challengeInstance.post(
      "/api/candidate/apply-to-job",
      {
        uuid,
        jobId,
        applicationId,
        repoUrl,
        // candidateId
      }
    );

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    const backendError = error.response?.data;

    if (backendError?.details?.fieldErrors) {
      const fieldErrors = backendError.details.fieldErrors;

      // Tomamos el primer error disponible
      const firstErrorKey = Object.keys(fieldErrors)[0];
      const firstErrorMessage = fieldErrors[firstErrorKey][0];

      return {
        success: false,
        message: firstErrorMessage,
      };
    }

    return {
      success: false,
      message:
        backendError?.error ||
        error.message ||
        "Error applying to job",
    };
  }
};
  return (
    <ChallengeContext.Provider
      value={{
        ...state,
        dispatch,
        fetchInitialData,
        ApplyToJob,
        loadingJobs,
      }}
    >
      {children}
    </ChallengeContext.Provider>
  );
};