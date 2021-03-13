import React, {useEffect, useState} from 'react';
import {View, Text, Image, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Jobs from '../../service/jobs';
import User from '../../service/user';
import {S3BUCKETURL} from '../../utils';

export function APJobCard({...props}) {
  const {item, index} = props.data;
  const [job, setjob] = useState(undefined);
  const [user, setuser] = useState(undefined);
  const data = {
    title: item.description,
    status: item.status,
    by: {
      name: user?.name,
      avatar:
        'https://m.media-amazon.com/images/M/MV5BMjM2OTkyNTY3N15BMl5BanBnXkFtZTgwNzgzNDc2NjE@._V1_CR132,0,761,428_AL_UY268_CR82,0,477,268_AL_.jpg',
    },
  };

  useEffect(() => {
    if (!job) return;
    User.getUsers(0, 1, 'created_at:desc', '_id:' + job.uid).then((e) =>
      setuser(e.data.data[0]),
    );
  }, [job]);

  useEffect(() => {
    Jobs.getJobs(0, 1, 'created_at:desc', '_id:' + item.jid).then((e) =>
      setjob(e.data.data[0]),
    );
  }, []);

  return (
    <TouchableOpacity {...props}>
      <View
        style={{
          minheight: 160,
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
              textAlign: 'right',
            }}>
            {data.status}
          </Text>
          <Text
            style={{
              fontSize: 17,
              fontFamily: 'Andale Mono',
            }}>
            {job?.title}
          </Text>
          <Text
            style={{
              fontSize: 15,
              color: 'gray',
              fontFamily: 'Andale Mono',
            }}
            numberOfLines={2}>
            {data.title}
          </Text>
          {item.location && (
            <Text
              style={{
                fontFamily: 'Andale Mono',
              }}>
              location : {item.location}
            </Text>
          )}
          <Text
            style={{
              marginTop: 10,
              fontFamily: 'Andale Mono',
              color: 'red',
            }}>
            {(!job || job.status == 'completed' || job.status == 'closed') &&
              'We Advice you to delete this bid as the job status either completed , closed or deleted '}
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
              uri: user && S3BUCKETURL + user.image,
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
