import React from 'react';
import {View, Text, Image} from 'react-native';

export function BidsCard(props) {
  return (
    <View
      style={{
        minHeight: 70,
        paddingHorizontal: 14,
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        borderWidth: props.active && 1,
        borderColor: props.active && '#1A83F9',
      }}>
      <Image
        style={{
          width: 80,
          height: 50,
        }}
        source={{
          uri:
            'https://m.media-amazon.com/images/M/MV5BMjM2OTkyNTY3N15BMl5BanBnXkFtZTgwNzgzNDc2NjE@._V1_CR132,0,761,428_AL_UY268_CR82,0,477,268_AL_.jpg',
        }}
      />
      <View
        style={{
          flex: 1,
          paddingLeft: 14,
        }}>
        <Text
          style={{
            fontFamily: 'Andale Mono',
            fontSize: 17,
            marginBottom: 4,
          }}>
          John Doe
        </Text>
        <Text
          style={{
            padding: 3,
            color: 'white',
            backgroundColor: '#6E2929',
            borderRadius: 5,
            width: 30,
            fontSize: 8,
            textAlign: 'center',
          }}>
          4.3
        </Text>
      </View>
    </View>
  );
}
