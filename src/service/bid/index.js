import axios from 'axios';
import {APIURL} from '../../utils';

const getBids = (page, limit, sort, filter) => {
  const params = {page, limit, sort, filter: ''};
  if (filter) {
    params.filter = filter;
  }
  return axios.get(APIURL + 'bids', {params});
};

const setBids = (params) => {
  return axios.post(APIURL + 'bids', params);
};
const updateBids = (id, params) => {
  return axios.patch(APIURL + 'bids/' + id, params);
};

const deleteABid = (id, bulk) => {
  return axios.delete(APIURL + 'bids/' + id, {
    params: bulk && {deleteByJID: bulk},
  });
};

const Bids = {
  getBids,
  setBids,
  updateBids,
  deleteABid,
};
export default Bids;
