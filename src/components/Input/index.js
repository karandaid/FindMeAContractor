import React from 'react';
import {View, TextInput, Platform} from 'react-native';

export function Input(props) {
  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: Platform.OS == 'ios' ? 12 : 0,
        fontSize: 14,
        backgroundColor: 'white',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        ...props.containerStyle,
      }}>
      {props.leftComponent && props.leftComponent}
      <TextInput
        {...props.inputProps}
        placeholderTextColor={'gray'}
        style={{
          marginLeft: 10,
          flex: 1,
          fontSize: 16,
          fontFamily: 'Andale Mono',
          ...props.inputStyle,
        }}
      />
      {props.rightComponent && props.rightComponent}
    </View>
  );
}
