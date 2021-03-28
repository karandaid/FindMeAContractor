import {connect} from 'dva';
import React from 'react';
import {ActivityIndicator, Platform, View} from 'react-native';
import {Button} from '../Button';
import {Tab} from '../Tab';
import {Layout as Lay} from '@ui-kitten/components';

export const Layout = connect(
  ({app}) => ({loading: app.loading.layout}),
  {},
)((props) => {
  return (
    <Lay
      level={props.level || '2'}
      style={{
        flex: 1,
        // backgroundColor: '#F6F6F8',
      }}>
      <View
        style={{
          flex: 1,
        }}>
        {props.children}
      </View>
      {!props.disableTabs && (
        <Tab active={props.active} onTabChange={(e) => console.log(e)}></Tab>
      )}
      {props.btnEnabled && (
        <Button
          {...props.btnProps}
          style={{
            paddingBottom: Platform.OS == 'ios' ? 20 : undefined,
            ...props.btnProps.style,
          }}
          textStyle={{fontSize: 18, color: 'black'}}
          centered>
          {props.btnProps.children}
        </Button>
      )}

      {props.loading && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(255,255,255,0.4)',
          }}>
          <ActivityIndicator color={'black'} />
        </View>
      )}
    </Lay>
  );
});
