import {Card, Text} from '@ui-kitten/components';
import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Modal,
  Alert,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import User from '../../service/user';
import {Button} from '../Button';
import Icon from 'react-native-vector-icons/Ionicons';
import {theme} from '../../utils/evaTheme';

export function BidsCard(props) {
  const [user, setuser] = useState(user);
  const {item, index} = props.data;
  const [rating, setrating] = useState();
  const select = useState(undefined);
  useEffect(() => {
    User.getUsers(0, 1, 'created_at:desc', '_id:' + item.uid)
      .then(({data}) => {
        setuser(data.data[0]);
      })
      .catch((e) => {
        console.log({e});
      });
    User.getUserRating(item.uid)
      .then(({data}) => {
        console.log({data: data.data[0]});
        setrating(data.data[0].rating);
      })
      .catch((e) => {
        console.log({e});
      });
  }, []);

  const getReviews = () => User.getUserReviews(item.uid);

  //
  console.log({item});
  const stars = [];
  for (let i = 0; i < Math.round(rating); i++) {
    stars.push(1);
  }

  return (
    <View
      style={{
        minHeight: 70,
        paddingHorizontal: 14,
        alignItems: 'center',
        backgroundColor: 'white',
        flexDirection: 'row',
        borderWidth: props.active ? 1 : undefined,
        borderColor: props.active ? '#1A83F9' : undefined,
      }}>
      <Image
        style={{
          width: 80,
          height: 80,
          borderRadius: 40,
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
          category={'h6'}
          style={{
            // fontSize: 18,
            marginBottom: 4,
            textTransform: 'capitalize',
          }}>
          {user?.name}
        </Text>
        <View style={{flexDirection: 'row', marginBottom: 10}}>
          {stars.map((e) => (
            <Icon color={theme['color-primary-500']} size={15} name="star" />
          ))}
        </View>

        <View style={{flexDirection: 'row'}}>
          {item?.highlighted && item.highlighted.status == 'paid' && (
            <Text
              category={'p1'}
              style={{
                padding: 3,
                paddingHorizontal: 6,
                color: 'white',
                backgroundColor: theme['color-danger-500'],
                borderRadius: 5,
                // width: 30,
                textTransform: 'uppercase',

                textAlign: 'center',
              }}>
              {item?.highlighted &&
                item.highlighted.status == 'paid' &&
                'Highlighted'}
            </Text>
          )}
        </View>

        <Text
          category={'p1'}
          style={{
            textTransform: 'capitalize',
          }}
          numberOfLines={3}>
          {item.description}
        </Text>

        <Button style={{marginTop: 10}} dark onPress={() => select[1](index)}>
          EXPAND
        </Button>
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
        <>
          <View style={{flex: 1, marginTop: 100, marginHorizontal: 30}}>
            <ScrollView>
              <Text
                category={'h3'}
                style={{
                  marginBottom: 4,
                  textTransform: 'capitalize',
                }}>
                {user?.name}
              </Text>
              <View style={{flexDirection: 'row', marginBottom: 10}}>
                {stars.map((e) => (
                  <Icon
                    color={theme['color-primary-500']}
                    size={20}
                    name="star"
                  />
                ))}
              </View>
              <Text
                category={'p1'}
                style={{
                  marginBottom: 4,
                  color: 'green',
                  textTransform: 'capitalize',
                }}>
                Pricing {item.cost}
              </Text>
              <Text
                category={'p1'}
                style={{
                  marginVertical: 4,
                  color: 'gray',
                  textTransform: 'capitalize',
                }}>
                {item.description}
              </Text>
              <Text category={'h4'}>Review</Text>
              <Reviews getReviews={getReviews} />
            </ScrollView>
          </View>
          <View>
            <Button onPress={() => select[1](undefined)} centered dark>
              Close
            </Button>
          </View>
        </>
      </Modal>
    </View>
  );
}

const Reviews = (props) => {
  const [reviews, setreviews] = useState([]);
  useEffect(() => {
    props
      .getReviews()
      .then((e) => setreviews(e.data.data))
      .catch(console.log);
  }, []);
  console.log(reviews);
  return (
    <>
      {reviews.map((e) => (
        <Card>
          <Text status={'danger'} category={'c1'}>
            Rating given was {e.rating}
          </Text>
          <Text category={'p1'}>{e.review}</Text>
        </Card>
      ))}
    </>
  );
};
