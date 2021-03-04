import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

export function OutlineButton({onPress, centered, style, textProps, ...props}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'black',
          borderRadius: 8,
          paddingHorizontal: 8,
          paddingVertical: 18,
          backgroundColor: 'white',
          ...style,
        }}>
        {props.leftIcon && props.leftIcon}
        <Text
          {...textProps}
          style={{
            fontSize: 15,
            fontFamily: 'Andale Mono',
            textAlign: centered && 'center',
            color: '#707070',
            ...textProps,
          }}>
          {props.children}
        </Text>
        {props.leftIcon && props.rightIcon}
      </View>
    </TouchableOpacity>
  );
}
export function Button({onPress, style, textProps, centered, dark, ...props}) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          paddingHorizontal: 12,
          paddingVertical: 20,
          backgroundColor: dark ? 'black' : 'white',
          ...style,
        }}>
        {props.leftIcon && props.leftIcon}
        <Text
          {...textProps}
          style={{
            flex: 1,
            fontFamily: 'Andale Mono',
            fontSize: 16,
            textAlign: centered && 'center',
            color: dark ? 'white' : 'black',
            ...textProps,
          }}>
          {props.children}
        </Text>
        {props.leftIcon && props.rightIcon}
      </View>
    </TouchableOpacity>
  );
}
