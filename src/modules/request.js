import { SUCCESS_SUFFIX } from "redux-axios-middleware";

const APPROVE_REQUEST = "APPROVE_REQUEST";
const REJECT_REQUEST = "REJECT_REQUEST";

const requestReducer = (state = [], action) => {
  switch (action.type) {
    case APPROVE_REQUEST + SUCCESS_SUFFIX:
      return action.payload.data;

    default:
      return state;
  }
};

export default requestReducer;

export const approveRequest = (id) => ({
  type: APPROVE_REQUEST,
  payload: {
    request: {
      url: `/pac-go-server/request/${id}/approve`,
      method: "POST",
    },
  },
});

export const rejectRequest = (id) => ({
  type: REJECT_REQUEST,
  payload: {
    request: {
      url: `/pac-go-server/request/${id}/reject`,
      method: "POST",
    },
  },
});
