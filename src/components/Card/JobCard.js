import {Text} from '@ui-kitten/components';
import React, {useEffect} from 'react';
import {View, Image, TouchableOpacity} from 'react-native';
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
            <Text category="h5">{item.title}</Text>
            <Text
              style={{
                // fontFamily: 'Andale Mono',
                // fontSize: 14,
                // color: '#6C6C6C',
                paddingVertical: 2,
                // paddingRight: 3,
              }}
              category="p1"
              // appearance="hint"
              numberOfLines={4}>
              {item.description}
            </Text>
            <Text status="success">status is {item.status}</Text>
            <Text
              // style={{
              //   fontFamily: 'Andale Mono',
              //   fontSize: 12,
              // }}
              category="p1"
              // appearance="hint"
            >
              location is {item.city}
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
                  // fontSize: 12,
                  marginLeft: 3,
                  // fontFamily: 'Andale Mono',
                }}
                category="p2">
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
                  // fontSize: 12,
                  marginLeft: 3,

                  // fontFamily: 'Andale Mono',
                }}
                category="p2">
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
          source={
            item.images.length == 0
              ? require('../../assets/images/image.png')
              : {uri: S3BUCKETURL + item.images[0]}
          }
        />
      </View>
    </TouchableOpacity>
  );
}
