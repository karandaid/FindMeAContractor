import React from 'react';
import {Text, Image, View, FlatList} from 'react-native';
import {Input} from '../../components/Input';
import {Button, OutlineButton} from '../../components/Button';
import {TextTabs} from '../../components/Tab';
import Icon from 'react-native-vector-icons/Ionicons';
import {APJobCard} from '../../components/Card/APJobCard';
import {JobCard} from '../../components/Card/JobCard';
import {Layout} from '../../components/layout';
import {Section} from '../../components/section';
import {connect} from 'dva';

export default connect(
  ({app}) => ({message: app.message.payment}),
  {},
)(function Success(props) {
  return (
    <Layout
      btnEnabled
      btnProps={{
        children: 'Countinue to Home',
        onPress: () => props.navigation.push('Home'),
      }}
      disableTabs>
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text
          style={{
            marginTop: 10,
            fontFamily: 'Andale Mono',
            fontSize: 30,
          }}>
          Success
        </Text>
        <Text
          style={{
            marginTop: 10,
            fontFamily: 'Andale Mono',
            fontSize: 16,
            width: '60%',
            textAlign: 'center',
          }}>
          Payment successfully made.Your bid is now featured.
        </Text>
      </View>
    </Layout>
  );
});
