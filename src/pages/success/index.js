import React from 'react';
import {View} from 'react-native';
import {Layout} from '../../components/layout';
import {connect} from 'dva';
import {Text} from '@ui-kitten/components';

export default connect(
  ({app}) => ({message: app.message.payment}),
  {},
)(function Success(props) {
  const paid = props.route.params.status;
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
          category={'h2'}
          style={{
            marginTop: 10,
          }}>
          Success
        </Text>
        <Text
          style={{
            marginTop: 10,

            fontSize: 16,
            width: '60%',
            textAlign: 'center',
          }}>
          {paid
            ? ' Payment successfully made. Your bid is now featured.'
            : 'Successfully Bided on the Job.'}
        </Text>
      </View>
    </Layout>
  );
});
