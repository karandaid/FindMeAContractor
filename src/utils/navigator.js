import React, {useEffect, ref, useRef} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../pages/home';
import {Alert, StatusBar, TouchableOpacity, View} from 'react-native';
import Job from '../pages/job';
import Applied from '../pages/applied';
import Projects from '../pages/projects';
import Profile from '../pages/profile';
import Posts from '../pages/posts';
import Post from '../pages/post';
import Bid from '../pages/bid';
import Bids from '../pages/bids';
import Payment from '../pages/payment';
import Success from '../pages/success';
import Chat from '../pages/chat';
import Icon from 'react-native-vector-icons/Ionicons';
import {withAuthenticator, AmplifyTheme} from 'aws-amplify-react-native';
import Bootstrap, {Container} from './theme';
import {Auth} from 'aws-amplify';
import {Authenticator} from 'aws-amplify-react-native/dist/Auth';
import theme from './theme';
import {logout} from '../models/app';
import {connect} from 'dva';
import NotificationPopup from 'react-native-push-notification-popup';
import messaging from '@react-native-firebase/messaging';
import {Text} from '@ui-kitten/components';

const Stack = createStackNavigator();

function StackNavigator(props) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        options={HeaderConfig({
          logout: props.logout,
          title: 'Browse Jobs',
        })}
        name="Home"
        component={Job}
      />
      <Stack.Screen
        options={HeaderConfig({logout: props.logout, title: 'Projects'})}
        name="Projects"
        component={Applied}
      />
      <Stack.Screen
        options={HeaderConfig({logout: props.logout, title: '', back: true})}
        name="Posts"
        component={Posts}
      />
      <Stack.Screen
        options={HeaderConfig({logout: props.logout, title: 'My Projects'})}
        name="MyProjects"
        component={Projects}
      />
      <Stack.Screen
        options={HeaderConfig({logout: props.logout, title: 'Profile'})}
        name="Profile"
        component={Profile}
      />
      <Stack.Screen
        options={HeaderConfig({
          logout: props.logout,
          title: '',
          back: {title: 'Project Details'},
        })}
        name="Post"
        component={Post}
      />
      <Stack.Screen
        options={HeaderConfig({logout: props.logout, title: '', back: true})}
        name="Bid"
        component={Bid}
      />
      <Stack.Screen
        options={HeaderConfig({
          logout: props.logout,
          title: '',
          back: {title: 'Your Projects'},
        })}
        name="Bids"
        component={Bids}
      />
      <Stack.Screen
        options={HeaderConfig({logout: props.logout, title: '', back: true})}
        name="Payment"
        component={Payment}
      />
      <Stack.Screen
        options={HeaderConfig({logout: props.logout, title: ''})}
        name="Success"
        component={Success}
      />
      <Stack.Screen
        options={HeaderConfig({
          logout: props.logout,
          title: 'Conversation',
          back: true,
        })}
        name="Chat"
        component={Chat}
      />
    </Stack.Navigator>
  );
}

const MainNavigator = (props) => {
  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      ref.current.show({
        onPress: function () {
          console.log('Pressed');
        },
        appIconSource: require('../assets/images/image.png'),
        appTitle: 'Find Me a Contractor',
        timeText: 'Now',
        title: remoteMessage.notification.title,
        body: remoteMessage.notification.body,
        slideOutTime: 5000,
      });
    });
    return () => {
      unsubscribe();
    };
  }, []);
  const ref = useRef();
  return (
    <>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <NavigationContainer>
        <StackNavigator logout={props.logout} />
      </NavigationContainer>
      <NotificationPopup ref={ref} />
    </>
  );
};

const HeaderConfig = ({title, back, logout}) => {
  return {
    title: title,
    headerLeft: (e) => {
      if (!e.canGoBack) return <View></View>;
      if (back)
        return (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              alignContent: 'center',
              justifyContent: 'center',
            }}
            onPress={e.onPress}>
            <Icon
              style={{marginLeft: 10}}
              size={20}
              color={'black'}
              name={'ios-chevron-back-sharp'}
            />
            <View>
              <Text
                style={{
                  marginLeft: 20,
                  fontSize: 20,
                  fontWeight: 'bold',
                  //
                  color: '#707070',
                }}>
                {back.title}
              </Text>
            </View>
          </TouchableOpacity>
        );
    },
    headerRight: (e) => {
      const out = async () => {
        try {
          logout();
          await Auth.signOut();
        } catch (error) {}
      };
      return (
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignContent: 'center',
            justifyContent: 'center',
          }}
          onPress={() =>
            Alert.alert(
              'Signing Out',
              'Are you sure you want to sign out.',
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {text: 'OK', onPress: out},
              ],
              {cancelable: false},
            )
          }>
          <Icon
            style={{marginRight: 10}}
            size={20}
            color={'black'}
            name={'exit-outline'}
          />
        </TouchableOpacity>
      );
    },
    headerStyle: {
      elevation: 0, // remove shadow on Android
      shadowOpacity: 0,
      // position: 'absolute',
      // backgroundColor: '#F6F6F8',

      borderColor: '#F6F6F8',
    },
    // headerTintColor: '#707070',
    headerTitleStyle: {
      fontSize: 23,
      fontWeight: 'bold',
      //
    },
  };
};

const signUpConfig = {
  hideAllDefaults: true,
  signUpFields: [
    {
      label: 'Name',
      key: 'name',
      required: true,
      type: 'string',
    },
    {
      label: 'Password',
      key: 'password',
      required: true,
      type: 'password',
    },
    {
      label: 'Email',
      key: 'username',
      required: true,
      type: 'string',
    },
  ],
};

const MyTheme = Object.assign({}, AmplifyTheme, {
  ...theme,
});

export default withAuthenticator(
  connect(() => ({}), {logout})(MainNavigator),
  {
    signUpConfig,
  },
  [],
  null,
  MyTheme,
);
