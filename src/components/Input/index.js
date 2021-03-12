import React from 'react';
import {View, TextInput} from 'react-native';

export function Input(props) {
  return (
    <View
      style={{
        paddingHorizontal: 10,
        paddingVertical: 12,
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
        style={{
          marginLeft: 10,
          flex: 1,
          fontSize: 20,
          fontFamily: 'Andale Mono',
          ...props.inputStyle,
        }}
      />
      {props.rightComponent && props.rightComponent}
    </View>
  );
}
