import { combineReducers } from "redux";
import groups from "./groups";
import requests from "./requests";
import request from "./request";
import group from "./group";

export default combineReducers({
  groups,
  requests,
  group,
  request,
});
