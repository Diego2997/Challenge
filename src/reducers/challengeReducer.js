import {actionTypes} from "../types/types";


export const ChallengeReducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.SET_LOADING:
      return {
        ...state,
        loading: action.payload,
      };

    case actionTypes.SET_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case actionTypes.SET_CANDIDATE:
      return {
        ...state,
        candidate: action.payload,
        loading: false,
        error: null,
      };

    case actionTypes.SET_JOBS:
      return {
        ...state,
        jobs: action.payload,
        loading: false,
        error: null,
      };

    default:
      return state;
  }
};