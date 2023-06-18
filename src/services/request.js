import UserService from "./UserService";
import axios from "axios";

const _axios = axios.create();
_axios.interceptors.request.use((config) => {
  if (UserService.isLoggedIn()) {
    const cb = () => {
      config.headers.Authorization = `Bearer ${UserService.getToken()}`;
      return Promise.resolve(config);
    };
    return UserService.updateToken(cb);
  }
});

export const allGroups = () => {
  const url = "/pac-go-server/groups";
  const token = UserService.getToken();
  const headers = { Authorization: `Bearer ${token}` };

  return axios.get(url, { headers })
    .then(response => ({
      type: "LIST_GROUPS",
      payload: response.data
    }))
    .catch(error => ({
      type: "API_ERROR",
      payload: error
    }));
};

export const getGroup = (id)=>{
  const url = `/pac-go-server/group/${id}`;
  const token = UserService.getToken();
  const headers = { Authorization: `Bearer ${token}` };

  return axios.get(url, { headers })
  .then(response => ({
    type: "LIST_GROUP",
    payload: response.data
  }))
  .catch(error => ({
    type: "API_ERROR",
    payload: error
  }));
};

export const newRequest = (group) => {
  const url = `/pac-go-server/group/${group.id}/request`;
  const token = UserService.getToken();
  const headers = { Authorization: `Bearer ${token}` };

  const requestData = {
    justification: group.justification,
  };

  return axios
    .post(url, requestData, { headers })
    .then((response) => ({
      type: "LIST_GROUP",
      payload: response.data,
    }))
    .catch((error) => ({
      type: "API_ERROR",
      payload: error,
    }));
};

export const deleteGroup = (group) => {
  const url = `/pac-go-server/groups/${group.id}`;
  const token = UserService.getToken();
  const headers = { Authorization: `Bearer ${token}` };

  return axios
    .post(url, group, { headers })
    .then((response) => ({
      type: "DELETE_GROUP",
      payload: response.data,
    }))
    .catch((error) => ({
      type: "API_ERROR",
      payload: error,
    }));
};

export const allRequests = () => {
  const url = "/pac-go-server/requests";
  const token = UserService.getToken();
  const headers = { Authorization: `Bearer ${token}` };

  return axios.get(url, { headers })
    .then(response => ({
      type: "LIST_REQUESTS",
      payload: response.data
    }))
    .catch(error => ({
      type: "API_ERROR",
      payload: error
    }));
};

export const approveRequest = (id) => {
  const url = `/pac-go-server/request/${id}/approve`;
  const token = UserService.getToken();
  const headers = { Authorization: `Bearer ${token}` };

  return axios.post(url,null, { headers })
    .then(response => ({
      type: "APPROVE_REQUEST",
      payload: response.data
    }))
    .catch(error => ({
      type: "API_ERROR",
      payload: error
    }));
};

