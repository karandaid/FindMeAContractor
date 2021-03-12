import axios from 'axios';
import {APIURL} from '../../utils';

const getJobs = (page, limit, sort, filter) => {
  const params = {page, limit, sort, filter: ''};
  if (filter) {
    params.filter = filter;
  }
  return axios.get(APIURL + 'jobs', {params});
};

const setJobs = (params) => {
  return axios.post(APIURL + 'jobs', params);
};
const updateJobs = (id, params) => {
  return axios.patch(APIURL + 'jobs/' + id, params);
};

const deleteAJob = (id, bulk) => {
  return axios.delete(APIURL + 'jobs/' + id, {
    params: bulk && {deleteByJID: bulk},
  });
};

const Jobs = {
  getJobs,
  updateJobs,
  deleteAJob,
  setJobs,
};
export default Jobs;
