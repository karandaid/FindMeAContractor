import React from 'react';
import {View, TouchableOpacity, Platform} from 'react-native';
import {Button as BTN, Layout, Text} from '@ui-kitten/components';

export function OutlineButton({onPress, centered, style, textProps, ...props}) {
  return (
    <BTN
      accessoryLeft={props.leftIcon && props.leftIcon}
      accessoryRight={props.rightIcon && props.rightIcon}
      onPress={onPress}
      appearance="outline"
      status={dark && 'warning'}
      // style={{
      //   backgroundColor: dark ? 'black' : undefined,
      // }}
    >
      <Text
        {...textProps}
        style={{
          flex: 1,
          // fontFamily: 'Andale Mono',
          // fontSize: 16,
          textAlign: centered && 'center',
          color: dark ? 'white' : 'black',
          ...props.textStyle,
        }}>
        {props.children}
      </Text>
    </BTN>

    // <TouchableOpacity onPress={onPress}>
    //   <View
    //     style={{
    //       borderWidth: 1,
    //       borderColor: 'black',
    //       borderRadius: 8,
    //       paddingHorizontal: 8,
    //       paddingVertical: 18,
    //       backgroundColor: 'white',
    //       ...style,
    //     }}>
    //     {props.leftIcon && props.leftIcon}
    //     <Text
    //       {...textProps}
    //       style={{
    //         fontSize: 15,
    //         fontFamily: 'Andale Mono',
    //         textAlign: centered && 'center',
    //         color: '#707070',
    //         ...textProps,
    //       }}>
    //       {props.children}
    //     </Text>
    //     {props.leftIcon && props.rightIcon}
    //   </View>
    // </TouchableOpacity>
  );
}
export function Button({onPress, style, textProps, centered, dark, ...props}) {
  return (
    <BTN
      accessoryLeft={props.leftIcon && props.leftIcon}
      accessoryRight={props.rightIcon && props.rightIcon}
      onPress={onPress}
      // status={dark && 'warning'}
      // style={{
      //   backgroundColor: dark ? 'black' : undefined,
      // }}
    >
      <Text
        {...textProps}
        style={{
          flex: 1,
          // fontFamily: 'Andale Mono',
          // fontSize: 16,
          textAlign: centered && 'center',
          color: !dark ? 'white' : 'black',
          ...props.textStyle,
        }}>
        {props.children}
      </Text>
    </BTN>
    // <TouchableOpacity onPress={onPress}>
    //   <View
    //     style={{
    //       display: 'flex',
    //       flexDirection: 'row',
    //       flexWrap: 'wrap',
    //       paddingHorizontal: 12,
    //       paddingVertical: Platform.os == 'ios' ? 15 : 12,
    //       backgroundColor: dark ? 'black' : 'white',
    //       justifyContent: 'center',
    //       alignItems: 'center',
    //       ...style,
    //     }}>
    //     {props.leftIcon && props.leftIcon}
    //     <Text
    //       {...textProps}
    //       style={{
    //         flex: 1,
    //         fontFamily: 'Andale Mono',
    //         fontSize: 16,
    //         textAlign: centered && 'center',
    //         color: dark ? 'white' : 'black',
    //         ...props.textStyle,
    //       }}>
    //       {props.children}
    //     </Text>
    //     {props.leftIcon && props.rightIcon}
    //   </View>
    // </TouchableOpacity>
  );
}
