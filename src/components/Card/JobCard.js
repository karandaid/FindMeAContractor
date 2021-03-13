import React, {useEffect} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Jobs from '../../service/jobs';
import {FORMATE_DATE, S3BUCKETURL} from '../../utils';

export function JobCard(props) {
  const {item, index} = props.data;

  return (
    <TouchableOpacity {...props}>
      <View
        style={{
          minHeight: 182,
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
          <View
            style={{
              flex: 1,
            }}>
            <Text
              style={{
                fontFamily: 'Andale Mono',
                fontSize: 18,
                textTransform: 'capitalize',
              }}>
              {item.title}
            </Text>
            <Text
              style={{
                fontFamily: 'Andale Mono',
                fontSize: 14,
                color: '#6C6C6C',
                paddingVertical: 2,
                paddingRight: 3,
              }}
              numberOfLines={4}>
              {item.description}
            </Text>
            <Text
              style={{
                fontFamily: 'Andale Mono',
                fontSize: 12,
                color: 'green',
              }}>
              status :{item.status}
            </Text>
            <Text
              style={{
                fontFamily: 'Andale Mono',
                fontSize: 12,
              }}>
              location :{item.city}
            </Text>
          </View>
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
                {FORMATE_DATE(item.created_at)}
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
                {item.price[0]}
                {item.price[2]} - {item.price[1]}
                {item.price[2]}
              </Text>
            </View>
          </View>
        </View>
        <Image
          style={{
            width: 160,
            marginLeft: 10,
            height: '100%',
          }}
          source={{uri: S3BUCKETURL + item.images[0]}}
        />
      </View>
    </TouchableOpacity>
  );
}
