import React from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export function JobCard(props) {
  return (
    <TouchableOpacity {...props}>
      <View
        style={{
          minHeight: 142,
          paddingHorizontal: 12,
          paddingVertical: 12,
          borderWidth: 1,
          borderColor: '#EDEDED',
          flexDirection: 'row',
        }}>
        <View
          style={{
            flex: 1,
          }}>
          <Text
            style={{
              fontFamily: 'Andale Mono',
              fontSize: 17,
            }}>
            Need a Plumber
          </Text>
          <Text
            style={{
              fontFamily: 'Andale Mono',
              fontSize: 14,
              color: '#6C6C6C',
              paddingVertical: 2,
              paddingRight: 3,
            }}
            numberOfLines={5}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              height: 20,
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Icon size={16} name={'information-circle-outline'} />
              <Text
                style={{
                  fontSize: 12,
                  marginLeft: 3,
                  fontFamily: 'Andale Mono',
                }}>
                2021-04-01
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginLeft: 10,
              }}>
              <Icon size={16} name={'md-cash'} />
              <Text
                style={{
                  fontSize: 12,
                  marginLeft: 3,

                  fontFamily: 'Andale Mono',
                }}>
                20$ - 30$
              </Text>
            </View>
          </View>
        </View>
        <Image
          style={{
            width: 160,
            height: '100%',
          }}
          source={require('../../assets/images/image.png')}
        />
      </View>
    </TouchableOpacity>
  );
}
