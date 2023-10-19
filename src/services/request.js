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

export const tncStatus = () => {
const url = "/pac-go-server/tnc";
  return _axios.get(url)
        .then((response) => ({
          acceptance: response.data.accepted
        }))
        .catch((error) => {
          console.log(error)
        });    
}

export const getTnCText = () => {
  const url = "https://raw.githubusercontent.com/PDeXchange/pac-support/main/Terms%20and%20Conditions.md";
  return axios.get(url).then((response) => ({
    text: response.data
  }))
  .catch((error) => {
    console.log(error)
  });      
}

export const acceptTnC = () => {
    const url1 = "/pac-go-server/tnc";
    return _axios.post(url1)
              .then((response) => {
                console.log(response.data)
              })
              .catch((error) => {
                console.log(error)
              });
            
    }
export const allGroups = () => {
  const url = "/pac-go-server/groups";

  return _axios
    .get(url)
    .then((response) => ({
      type: "LIST_GROUPS",
      payload: response.data,
    }))
    .catch((error) => ({
      type: "API_ERROR",
      payload: error,
    }));
};

export const getGroup = (id) => {
  const url = `/pac-go-server/groups/${id}`;

  return _axios
    .get(url)
    .then((response) => ({
      type: "LIST_GROUP",
      payload: response.data,
    }))
    .catch((error) => ({
      type: "API_ERROR",
      payload: error,
    }));
};

export const newRequest = (group) => {
  const url = `/pac-go-server/groups/${group.id}/request`;

  const requestData = {
    justification: group.justification,
    type: "GROUP",
  };
  return _axios
    .post(url, requestData)
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
  const url = `/pac-go-server/groups/${group.id}/exit`;

  const requestData = {
    justification: group.justification,
    type: "GROUP_EXIT",
  };

  return _axios
    .post(url, requestData)
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

  return _axios
    .get(url)
    .then((response) => ({
      type: "LIST_REQUESTS",
      payload: response.data,
    }))
    .catch((error) => ({
      type: "API_ERROR",
      payload: error,
    }));
};

export const getRequest = (id) => {
  const url = `/pac-go-server/requests/${id}`;

  return _axios
    .get(url)
    .then((response) => ({
      type: "REQUEST_DETAILS",
      payload: response.data,
    }))
    .catch((error) => ({
      type: "API_ERROR",
      payload: error,
    }));
};

export const rejectRequest = (request) => {
  const url = `/pac-go-server/requests/${request.id}/reject`;

  return _axios
    .post(url, request)
    .then((response) => ({
      type: "REJECT_REQUEST",
      payload: response.data,
    }))
    .catch((error) => ({
      type: "API_ERROR",
      payload: error,
    }));
};

export const approveRequest = (id) => {
  const url = `/pac-go-server/requests/${id}/approve`;

  return _axios
    .post(url, null)
    .then((response) => ({
      type: "APPROVE_REQUEST",
      payload: response.data,
    }))
    .catch((error) => ({
      type: "API_ERROR",
      payload: error,
    }));
};

export const deleteRequest = (id) => {
  const url = `/pac-go-server/requests/${id}`;
  return _axios
    .delete(url)
    .then((response) => ({
      type: "DELETE_REQUEST",
      payload: response.data,
    }))
    .catch((error) => ({
      type: "API_ERROR",
      payload: error,
    }));
};

export const allKeys = () => {
  const url = `/pac-go-server/keys`;
  return _axios
    .get(url)
    .then((response) => ({
      type: "LIST_REQUESTS",
      payload: response.data,
    }))
    .catch((error) => ({
      type: "API_ERROR",
      payload: error,
    }));
};
export const createKeys = (payload) => {
  const url = `/pac-go-server/keys`;
  return _axios
    .post(url, payload)
    .then((response) => ({
      type: "LIST_REQUESTS",
      payload: response.data,
    }))
    .catch((error) => ({
      type: "API_ERROR",
      payload: error,
    }));
};

export const deleteKeys = (id) => {
  const url = `/pac-go-server/keys/${id.id}`;
  return _axios
    .delete(url)
    .then((response) => ({
      type: "LIST_REQUESTS",
      payload: response.data,
    }))
    .catch((error) => ({
      type: "API_ERROR",
      payload: error,
    }));
};

export const getAllCatalogs = () => {
  const url = `/pac-go-server/catalogs`;
  return _axios
    .get(url)
    .then((response) => ({
      type: "LIST_REQUESTS",
      payload: response.data,
    }))
    .catch((error) => ({
      type: "API_ERROR",
      payload: error,
    }));
};

export const deleteCatalog = (name) => {
  const url = `/pac-go-server/catalogs/${name}`;
  return _axios
    .delete(url)
    .then((response) => ({
      type: "LIST_REQUESTS",
      payload: response.data,
    }))
    .catch((error) => ({
      type: "API_ERROR",
      payload: error,
    }));
};

export const retireCatalog = (name) => {
  const url = `/pac-go-server/catalogs/${name}/retire`;
  return _axios
    .put(url)
    .then((response) => ({
      type: "RETIRE_CATALOG",
      payload: response.data,
    }))
    .catch((error) => ({
      type: "API_ERROR",
      payload: error,
    }));
};

export const deployCatalog = (payload) => {
  const url = `/pac-go-server/services`;
  return _axios
    .post(url, payload)
    .then((response) => ({
      type: "LIST_REQUESTS",
      payload: response.data,
    }))
    .catch((error) => ({
      type: "API_ERROR",
      payload: error,
    }));
};

export const getServices = () => {
  const url = `/pac-go-server/services?all=true`;
  return _axios
    .get(url)
    .then((response) => ({
      type: "LIST_REQUESTS",
      payload: response.data,
    }))
    .catch((error) => ({
      type: "API_ERROR",
      payload: error,
    }));
};

export const deleteServices = (name) => {
  const url = `/pac-go-server/services/${name}`;
  return _axios
    .delete(url)
    .then((response) => ({
      type: "LIST_REQUESTS",
      payload: response.data,
    }))
    .catch((error) => ({
      type: "API_ERROR",
      payload: error,
    }));
};

export const extendServices = (name, payload) => {
  const url = `/pac-go-server/services/${name}/expiry`;
  return _axios
    .put(url, payload)
    .then((response) => ({
      type: "LIST_REQUESTS",
      payload: response.data,
    }))
    .catch((error) => ({
      type: "API_ERROR",
      payload: error,
    }));
};

export const allUsers = () => {
  const url = `/pac-go-server/users`;
  return _axios
    .get(url)
    .then((response) => ({
      type: "LIST_REQUESTS",
      payload: response.data,
    }))
    .catch((error) => ({
      type: "API_ERROR",
      payload: error,
    }));
};

export const getEvents = (page, per_page) => {
  const url = `/pac-go-server/events?page=${page}&per_page=${per_page}`;
  return _axios
    .get(url)
    .then((response) => ({
      type: "LIST_REQUESTS",
      payload: response.data,
    }))
    .catch((error) => ({
      type: "API_ERROR",
      payload: error,
    }));
};

export const getQuota = () => {
  const url = `/pac-go-server/quota`;
  return _axios
    .get(url)
    .then((response) => ({
      type: "LIST_REQUESTS",
      payload: response.data,
    }))
    .catch((error) => ({
      type: "API_ERROR",
      payload: error,
    }));
};
