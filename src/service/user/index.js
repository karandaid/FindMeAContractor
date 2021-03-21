import axios from 'axios';
import {APIURL} from '../../utils';

const getUser = (uid) => {
  return axios.get(APIURL + 'users/' + uid);
};
const getUsers = (page, limit, sort, filter) => {
  return axios.get(APIURL + 'users', {params: {page, limit, sort, filter}});
};

const addUser = (params) => {
  return axios.post(APIURL + 'users', params);
};

const updateUsers = (id, params) => {
  return axios.patch(APIURL + 'users/' + id, params);
};

const User = {
  getUser,
  addUser,
  getUsers,
  updateUsers,
};
export default User;
