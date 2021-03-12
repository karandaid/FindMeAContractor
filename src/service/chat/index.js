import axios from 'axios';
import {APIURL} from '../../utils';

const getChats = (page, limit, sort, filter) => {
  const params = {page, limit, sort, filter: ''};
  if (filter) {
    params.filter = filter;
  }
  return axios.get(APIURL + 'chat', {params});
};

const setChat = (params) => {
  return axios.post(APIURL + 'chat', params);
};
const updateChat = (id, params) => {
  return axios.patch(APIURL + 'chat/' + id, params);
};

const deleteChat = (id, bulk) => {
  return axios.delete(APIURL + 'chat/' + id, {
    params: bulk && {deleteByJID: bulk},
  });
};

const Chats = {
  getChats,
  setChat,
  updateChat,
  deleteChat,
};
export default Chats;
