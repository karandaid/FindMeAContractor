import React from 'react';
import {View} from 'react-native';
import {Button} from '../Button';
import {Tab} from '../Tab';

export function Layout(props) {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#F6F6F8',
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
        <Button {...props.btnProps} centered>
          {props.btnProps.children}
        </Button>
      )}
    </View>
  );
}
