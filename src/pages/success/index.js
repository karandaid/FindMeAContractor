import React from 'react';
import {Text, View} from 'react-native';
import {Layout} from '../../components/layout';
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
