import {CognitoIdToken} from 'amazon-cognito-identity-js';
import {Auth} from 'aws-amplify';
import Jobs from '../service/jobs';
import Categories from '../service/categories';
import User from '../service/user';
import Bids from '../service/bid';
import {Alert, PermissionsAndroid, Platform} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {storeData, getData} from '../utils/index';
import Geolocation, {
  requestAuthorization,
} from 'react-native-geolocation-service';
import axios from 'axios';

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
      const u = yield select(({app}) => app.user);
      if (u) {
        yield put(stopLoading('layout'));
        return;
      }
      const {sub, email, email_verified, name} = user.attributes;
      // Pre Checks
      if (!email_verified) {
        // Show Error Here
        Alert.alert('Email Not verified', 'Your email is not verified.', [
          {
            text: 'You are being Logged Out.',
            onPress: () => {
              Auth.signOut();
            },
          },
        ]);
        yield put(stopLoading('layout'));
      }
      // checks
      const getUser = yield User.getUser(sub);
      console.log(getUser);
      if (getUser.data.status == 'failed') {
        console.log('Creating a new user');
        // Create a new User
        const params = {
          uid: sub,
          email,
          name,
        };
        const addUser = yield User.addUser(params);
        yield put({type: 'setState', user: addUser.data.data});
        yield put({type: 'getJobs'});
      } else {
        const user = getUser.data.data[0];

        if (user.status == 'deactivated' || user.status == 'blocked') {
          // throw some error here
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
        }
      }
      yield put(stopLoading('layout'));
    },
    *getJobs(
      {page = 0, limit = 10, sort = 'created_at:desc', filter},
      {put, select, call},
    ) {
      yield put(startLoading('jobs'));
      const oJobs = yield select(({app}) => app.jobs);

      const jobs = yield Jobs.getJobs(page, limit, sort, filter);
      yield put({
        type: 'setState',
        jobs: page == 0 ? jobs.data.data : [...oJobs, ...jobs.data.data],
      });
      yield put(stopLoading('layout'));
      yield put(stopLoading('jobs'));
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
        });
        if (awardedJob.data.error) error.push(awardedJob);
        //
      } catch (e) {}
      console.log({error});
      if (error.length == 0) {
        yield put(startmessage('bids', true));
      } else {
      }
      yield put(stopLoading('layout'));
    },
    *addABid({data}, {put, select, call}) {
      yield put(startLoading('layout'));
      const location = yield getData('@location');
      const user = yield select(({app}) => app.user);
      const cr = yield call(Bids.setBids, {
        ...data,
        uid: user._id,
        location: location.address.city,
      });

      yield put(startmessage('payment', cr.data));
      yield put(stopLoading('layout'));
    },
  },

  subscriptions: {
    async Init({dispatch}) {
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

      Geolocation.getCurrentPosition(
        async (position) => {
          console.log({position: position.coords});
          const location = await getData('@location');
          if (
            !location &&
            location.lat != position.coords.latitude &&
            location.lng != position.coords.longitude
          ) {
            axios
              .get(
                `https://us1.locationiq.com/v1/reverse.php?key=pk.a8f720dfd5eaefeec41bfbb7f41d62c6&lat=${position.coords.latitude}&lon=${position.coords.longitude}&format=json`,
              )
              .then(async ({data}) => {
                storeData(data, '@location');
                const location = await getData('@location');
              });
          }
        },
        (error) => {
          // See error code charts below.
          console.log(error.code, error.message);
        },
        {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
      );
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
