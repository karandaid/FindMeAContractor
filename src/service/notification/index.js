import axios from 'axios';
import {APIURL} from '../../utils';
import messaging from '@react-native-firebase/messaging';

const sendNotification = (uid, notification) => {
  return axios.post(APIURL + 'notification/' + uid, notification);
};
const sendCustomNotification = (notification) => {
  return axios.post(APIURL + 'notification', notification);
};

const subscriptToATopic = (topic) => {
  return messaging().subscribeToTopic(topic);
};

export default Notification = {
  sendNotification,
  subscriptToATopic,
  sendCustomNotification,
};
