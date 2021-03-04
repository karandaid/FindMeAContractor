import React from 'react';
import {View} from 'react-native';

export function Section(props) {
  return (
    <View
      style={{
        paddingHorizontal: 20,
        paddingVertical: 10,
        flexDirection: props.row && 'row',
        ...props.style,
      }}>
      {props.children}
    </View>
  );
}
