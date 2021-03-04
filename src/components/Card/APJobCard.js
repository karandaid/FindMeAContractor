import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export function APJobCard({...props}) {
  const data = {
    title: 'Need a plumber',
    status: 'Active',
    by: {
      name: 'Raja Osama',
      avatar:
        'https://m.media-amazon.com/images/M/MV5BMjM2OTkyNTY3N15BMl5BanBnXkFtZTgwNzgzNDc2NjE@._V1_CR132,0,761,428_AL_UY268_CR82,0,477,268_AL_.jpg',
    },
  };

  return (
    <TouchableOpacity {...props}>
      <View
        style={{
          height: 105,
          backgroundColor: 'white',
          marginBottom: 10,
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            paddingHorizontal: 14,
          }}>
          <Text
            style={{
              fontFamily: 'Andale Mono',
              color: 'green',
            }}>
            {data.status}
          </Text>
          <Text
            style={{
              fontSize: 17,
              fontFamily: 'Andale Mono',
            }}>
            {data.title}
          </Text>
        </View>
        <View
          style={{
            height: 33,
            borderTopColor: '#F8F8F8',
            borderTopWidth: 2,
            alignItems: 'center',
            paddingHorizontal: 14,
            flexDirection: 'row',
          }}>
          <Image
            style={{
              width: 20,
              height: 20,
              borderRadius: 20,
            }}
            source={{
              uri: data.by.avatar,
            }}
          />
          <Text
            style={{
              fontFamily: 'Andale Mono',
              flex: 1,
              marginLeft: 10,
            }}>
            {data.by.name}
          </Text>
          <Icon size={20} color={'black'} name={'ellipsis-horizontal'} />
        </View>
      </View>
    </TouchableOpacity>
  );
}
