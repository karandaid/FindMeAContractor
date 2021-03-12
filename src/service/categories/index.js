import axios from 'axios';
import {APIURL} from '../../utils';

const getCategories = (page, limit, sorti) => {
  return axios.get(APIURL + 'categories', {params: {page, limit}});
};

const Categories = {
  getCategories,
};
export default Categories;
