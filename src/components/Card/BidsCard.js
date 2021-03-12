import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  Modal,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import User from '../../service/user';
import {Button} from '../Button';

export function BidsCard(props) {
  const [user, setuser] = useState(user);
  const {item, index} = props.data;
  const select = useState(undefined);
  useEffect(() => {
    User.getUsers(0, 1, 'created_at:desc', '_id:' + item.uid)
      .then(({data}) => {
        setuser(data.data[0]);
      })
      .catch((e) => {
        console.log({e});
      });
  }, []);
  //
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
          marginTop: 20,
          alignSelf: 'flex-start',
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
          paddingVertical: 20,
        }}>
        <Text
          style={{
            fontFamily: 'Andale Mono',
            fontSize: 18,
            marginBottom: 4,
            textTransform: 'capitalize',
          }}>
          {user?.name}
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
          {user?.rating}
        </Text>
        <Text
          style={{
            fontFamily: 'Andale Mono',
            fontSize: 15,
            marginVertical: 4,
            color: 'gray',
            textTransform: 'capitalize',
          }}
          numberOfLines={3}>
          {item.description}
        </Text>

        <TouchableOpacity onPress={() => select[1](index)}>
          <Text style={{textAlign: 'right', marginTop: 20}}>EXPAND</Text>
        </TouchableOpacity>
      </View>
      <Modal
        animationType="slide"
        transparent={false}
        visible={select[0] == index ? true : false}
        style={{justifyContent: 'center', alignItems: 'center'}}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          // setModalVisible(!modalVisible);
        }}>
        <View style={{flex: 1, marginTop: 100, marginHorizontal: 30}}>
          <ScrollView>
            <Text
              style={{
                fontFamily: 'Andale Mono',
                fontSize: 30,
                marginBottom: 4,
                textTransform: 'capitalize',
              }}>
              {user?.name}
            </Text>
            <Text
              style={{
                fontFamily: 'Andale Mono',
                fontSize: 20,
                marginBottom: 4,
                color: 'green',
                textTransform: 'capitalize',
              }}>
              Pricing {item.cost}
            </Text>
            <Text
              style={{
                fontFamily: 'Andale Mono',
                fontSize: 18,
                marginVertical: 4,
                color: 'gray',
                textTransform: 'capitalize',
              }}>
              {item.description}
            </Text>
          </ScrollView>
        </View>
        <View>
          <Button onPress={() => select[1](undefined)} centered dark>
            Close
          </Button>
        </View>
      </Modal>
    </View>
  );
}
