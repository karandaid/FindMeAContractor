import {CognitoIdToken} from 'amazon-cognito-identity-js';
import {Auth, Hub} from 'aws-amplify';
import Jobs from '../service/jobs';
import Categories from '../service/categories';
import User from '../service/user';
import Bids from '../service/bid';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  storeData,
  getData,
  getCurrentLocation,
  capitalizeString,
} from '../utils/index';
import Geolocation, {
  requestAuthorization,
} from 'react-native-geolocation-service';
import messaging from '@react-native-firebase/messaging';
import Notification from '../service/notification';

const namespace = 'app';
export const authenticated = () => {
  return {type: `${namespace}/authenticated`};
};
export const awardABid = (data) => {
  return {type: `${namespace}/awardABid`, data};
};
export const addAJob = (data) => {
  return {type: `${namespace}/addAJob`, data};
};
export const getJobs = (payload) => {
  return {type: `${namespace}/getJobs`, ...payload};
};
export const getBids = (data) => {
  return {type: `${namespace}/getBids`, ...data};
};
export const addABid = (data) => {
  return {type: `${namespace}/addABid`, data};
};
export const updateUser = (user) => {
  return {type: `${namespace}/setState`, user};
};
export const logout = () => {
  return {type: `${namespace}/setState`, user: undefined};
};

const startLoading = (loadingType) => ({type: `startLoading`, loadingType});
const stopLoading = (loadingType) => ({type: `stopLoading`, loadingType});
export const startmessage = (messageType, data) => ({
  type: `${namespace}/startmessage`,
  messageType,
  data,
});

export default {
  namespace,
  state: {
    user: undefined,
    location: undefined,
    jobs: [],
    bids: [],
    categories: [],
    pagination: {
      jobs: 0,
    },
    message: {
      post: undefined,
      bids: undefined,
    },
    loading: {
      layout: false,
      jobs: false,
      bids: false,
    },
  },

  effects: {
    *authenticated(_, {put, select, call}) {
      yield put(startLoading('layout'));
      const user = yield Auth.currentUserInfo();
      const {sub, email, email_verified, name} = user.attributes;
      const u = yield select(({app}) => app.user);
      if (u) return yield put(stopLoading('layout'));
      // Pre Checks
      if (!email_verified) {
        Alert.alert('Email Not verified', 'Your email is not verified.', [
          {
            text: 'You are being Logged Out.',
            onPress: () => {
              Auth.signOut();
            },
          },
        ]);
      }
      try {
        const getUser = yield User.getUser(sub);
        if (getUser.data.status == 'failed') {
          console.log('Unable to find the user, creating....');
          let FCMToken = yield call(getData, '@FCM');
          if (FCMToken) {
            yield call(RegisterDeviceFCM);
            FCMToken = yield call(getToken);
            yield call(storeData, FCMToken, '@FCM');
          }
          // Create a new User
          const params = {
            uid: sub,
            email,
            name,
            FCMToken,
          };
          const addUser = yield User.addUser(params);
          yield put({type: 'setState', user: addUser.data.data});
          yield put({type: 'getJobs'});
        } else {
          console.log('User Fount, checking');
          const user = getUser.data.data[0];
          let FCMToken = yield call(getData, '@FCM');
          if (!FCMToken) {
            yield call(RegisterDeviceFCM);
            FCMToken = yield call(getToken);
            yield call(storeData, FCMToken, '@FCM');
          }
          if (user.FCMToken != FCMToken) {
            // FCM Update.....
            User.updateUsers(user._id, {FCMToken});
          }
          //* Checking if the user got Blocked or deactivated by admins.
          if (user.status == 'deactivated' || user.status == 'blocked') {
            Alert.alert('No Entry for you.', 'You are being Blocked.', [
              {
                text: 'Log out',
                onPress: () => {
                  Auth.signOut();
                },
              },
            ]);
          } else {
            yield put({type: 'setState', user});
            yield put({type: 'getCategories'});
            yield put(stopLoading('layout'));
          }
        }
      } catch (error) {
        console.log({error});
        Alert.alert('An Error Ocurred', 'Something went wrong. ');

        // yield put(stopLoading('layout'));
      }
      yield put(stopLoading('layout'));
    },
    *getJobs(
      {page = 0, limit = 10, sort = 'created_at:desc', filter},
      {put, select, call},
    ) {
      try {
        yield put(startLoading('jobs'));
        const oJobs = yield select(({app}) => app.jobs);

        const jobs = yield Jobs.getJobs(page, limit, sort, filter);
        yield put({
          type: 'setState',
          jobs: page == 0 ? jobs.data.data : [...oJobs, ...jobs.data.data],
        });
        yield put(stopLoading('layout'));
        yield put(stopLoading('jobs'));
      } catch (error) {
        yield put(stopLoading('jobs'));
        console.log({error});
      }
    },
    *getCategories(
      {page = 0, limit = 10, sort = 'created_at:desc'},
      {put, select, call},
    ) {
      yield put(startLoading('categories'));
      const categories = yield Categories.getCategories(page, limit, sort);
      yield put({type: 'setState', categories: categories.data.data});
      yield put(stopLoading('layout'));
      yield put(stopLoading('categories'));
    },
    *getBids(
      {page = 0, limit = 10, sort = 'created_at:desc', filter = false},
      {put, select, call},
    ) {
      yield put(startLoading('bids'));
      const obids = yield select(({app}) => app.bids);

      const bids = yield Bids.getBids(page, limit, sort, filter);

      yield put({
        type: 'setState',
        bids: page == 0 ? bids.data.data : [...obids, ...bids.data.data],
      });
      yield put(stopLoading('layout'));
      yield put(stopLoading('bids'));
    },

    *addAJob({data}, {put, select, call}) {
      yield put(startLoading('layout'));
      const user = yield select(({app}) => app.user);

      const cr = yield call(Jobs.setJobs, {...data, uid: user._id});
      yield put(startmessage('post', cr.data));
      yield put(stopLoading('layout'));
    },
    *awardABid({data}, {put, select, call}) {
      yield put(startLoading('layout'));
      let error = [];

      // Change status for the bid.
      try {
        const awardedBids = yield call(Bids.updateBids, data.bid, {
          status: 'awarded',
        });
        //

        if (awardedBids.data.error) error.push(awardedBids);
      } catch (e) {}
      try {
        // Change status for job
        const awardedJob = yield call(Jobs.updateJobs, data.jid, {
          status: 'awarded',
          awarded: data.bid,
          awardedBy: data.uid,
        });
        if (awardedJob.data.error) error.push(awardedJob);
      } catch (e) {}
      if (error.length == 0) {
        yield put(startmessage('bids', true));
        try {
          yield call(Notification.sendNotification, data.uid, {
            notification: {
              title: "Congrats's !",
              body: `You have been awarded a Job that you bid on named ${capitalizeString(
                data.title,
              )}`,
            },
          });
          yield call(Notification.subscriptToATopic, 'jid.' + data.jid);
          yield call(Notification.sendCustomNotification, {
            notification: {
              title: 'Alert',
              body:
                'The job titled "' +
                data.title +
                '", has been awarded to user therefore it has been closed.',
            },
            topic: 'jid.' + data.jid,
          });
        } catch (error) {
          console.log({error});
        }
      }
      yield put(stopLoading('layout'));
    },
    *addABid({data}, {put, select, call}) {
      try {
        yield put(startLoading('layout'));
        const location = yield getData('@location');
        const user = yield select(({app}) => app.user);
        const {uid} = data;
        const cr = yield call(Bids.setBids, {
          ...data,
          uid: user._id,
          location: location.address.city,
        });
        yield put(startmessage('payment', cr.data));
        yield put(stopLoading('layout'));
        try {
          yield call(Notification.sendNotification, uid, {
            notification: {
              title: 'You Got a Bid',
              body: `Contractor named ${capitalizeString(
                user.name,
              )} just bided on your Job Post from ${location.address.city}.`,
            },
          });
          yield call(Notification.subscriptToATopic, 'jid.' + data.jid);
        } catch (error) {
          console.log({error});
        }
      } catch (e) {
        console.log('error', {e});
      }
    },
  },

  subscriptions: {
    async Init({dispatch}) {
      const hub = Hub.listen('auth', async (data) => {
        const {payload} = data;
        console.log({payload, data});
        if (payload.event === 'signIn') {
          dispatch({type: `${namespace}/authenticated`});
        }
        if (payload.event === 'signOut') {
          dispatch({type: `${namespace}/setState`, user: undefined});
        }
      });

      if (Platform.OS == 'android') {
        await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Cool Photo App Camera Permission',
            message:
              'Cool Photo App needs access to your camera ' +
              'so you can take awesome pictures.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
      }
      if (Platform.OS === 'ios') {
        const auth = await Geolocation.requestAuthorization('whenInUse');
        if (auth === 'granted') {
          // do something if granted...
        }
      }
      getCurrentLocation();
      await requestUserPermission();
      const a = await messaging().getAPNSToken();

      // const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      //   console.log('HERE');
      //   Alert.alert(
      //     'Notification : ' + remoteMessage.notification.title,
      //     remoteMessage.notification.body,
      //   );
      // });
      return () => {
        // unsubscribe();
        hub();
      };
    },
  },

  reducers: {
    setState(state, newState) {
      return {...state, ...newState};
    },
    startLoading(state, {loadingType}) {
      return {...state, loading: {...state.loading, [loadingType]: true}};
    },
    stopLoading(state, {loadingType}) {
      return {...state, loading: {...state.loading, [loadingType]: false}};
    },
    startmessage(state, {messageType, data}) {
      return {...state, message: {...state.message, [messageType]: data}};
    },
  },
};
async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
  }
}

function RegisterDeviceFCM() {
  return messaging().registerDeviceForRemoteMessages();
}
function getToken() {
  return messaging().getToken();
}
