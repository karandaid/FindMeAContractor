import React from 'react';
import {View, TextInput, Platform} from 'react-native';
import {Input as Inp} from '@ui-kitten/components';

export function Input(props) {
  return (
    <>
      <Inp
        label={props.label}
        accessoryRight={() => props.rightComponent || null}
        accessoryLeft={() => props.leftComponent || null}
        {...props.inputProps}
        // value={value}
        // onChangeText={(nextValue) => setValue(nextValue)}
      />
    </>
  );
}
