import React, {useEffect, useState} from 'react';
import {
  Text,
  Image,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Alert,
  Modal,
  Dimensions,
} from 'react-native';
import {Input} from '../../components/Input';
import {Button} from '../../components/Button';
import {Layout} from '../../components/layout';
import {Section} from '../../components/section';
import {S3BUCKETURL} from '../../utils';
import Bids from '../../service/bid';
import Jobs from '../../service/jobs';
import {connect} from 'dva';
import {Rating} from 'react-native-ratings';
import {useNavigation} from '@react-navigation/native';
import notification from '../../service/notification';

export default connect(({app}) => ({user: app.user}))(function Post(props) {
  const selfCheck = props.route.params?.self;
  const {item, index} = props.route.params.data;
  const awarded = props.route.params.awarded;
  const [select, setselect] = useState(item?.images[0]);
  const [loading, setloading] = useState(false);
  const [modal, setmodal] = useState(false);

  const deleteJOB = (id) => {
    Jobs.deleteAJob(id, false).then((e) => {
      if (e.data.contact.deletedCount > 0) {
        setloading(false);
        notification.sendCustomNotification({
          notification: {
            title: 'Alert',
            body:
              'The job titled "' +
              item.title +
              '", has been deleted by the owner, and so is your bid.',
          },
          topic: 'jid.' + item.jid,
        });
        Alert.alert('Success', 'Deleted Confirmed', [
          {
            text: 'Go To Home',
            onPress: () => {
              props.navigation.replace('Home');
            },
          },
        ]);
      }
    });
  };
  const deleteAPost = () => {
    // get id
    setloading(true);
    const id = item._id;

    Alert.alert(
      'Performing a Deletion.',
      'You sure you want to delete this JOB POST ?',
      [
        {
          text: 'Yes',
          onPress: () => {
            deleteJOB(id);
          },
        },
        {
          text: 'No',
          onPress: () => {
            setloading(false);
          },
        },
      ],
    );
  };
  const precheckBTN = () => {
    return item.status == 'active' || item.status == 'awarded';
  };

  return (
    <Layout
      loading={loading}
      btnEnabled={precheckBTN()}
      btnProps={{
        dark: awarded && true,
        children: awarded
          ? 'Conversation'
          : selfCheck
          ? 'See All Bids'
          : 'Place a Bid',
        onPress: () => {
          if (awarded) {
            props.navigation.navigate('Chat', {
              id: item._id,
              uid: item.uid,
            });
          } else {
            if (!selfCheck) {
              Bids.getBids(
                0,
                1,
                'created_at:desc',
                `jid:${item._id},uid:${props.user._id}`,
              ).then(({data}) => {
                if (data.data.length !== 0) {
                  Alert.alert('Sorry', 'You already have place a bid.');
                } else {
                  props.navigation.replace('Bid', {
                    id: item._id,
                    uid: item.uid,
                  });
                }
              });
            } else {
              props.navigation.replace('Bids', {
                id: item._id,
                title: item.title,
              });
            }
          }
        },
      }}
      disableTabs>
      <ScrollView>
        <Section>
          <Text
            style={{
              marginTop: 50,
              fontFamily: 'Andale Mono',
              fontSize: 12,
              color: 'gray',
            }}>
            Title
          </Text>
          <Text
            style={{
              fontFamily: 'Andale Mono',
              fontSize: 30,
            }}>
            {item.title}
          </Text>

          <Text
            style={{
              marginTop: 10,
              fontFamily: 'Andale Mono',
              fontSize: 12,
              color: 'gray',
            }}>
            Description
          </Text>
          <Text
            style={{
              fontFamily: 'Andale Mono',
              fontSize: 16,
              color: 'black',
            }}>
            {item.description}
          </Text>
        </Section>
        <Image
          style={{width: '100%', height: 200}}
          resizeMode={'cover'}
          source={{uri: S3BUCKETURL + select}}
        />
        <View style={{height: 10}} />
        <FlatList
          data={item.images}
          a
          horizontal
          renderItem={(e) => {
            return (
              <TouchableOpacity onPress={() => setselect(e.item)}>
                <Image
                  style={{
                    width: 140,
                    height: 140,
                    marginHorizontal: 5,
                  }}
                  resizeMode={'contain'}
                  source={{uri: S3BUCKETURL + e.item}}
                />
              </TouchableOpacity>
            );
          }}
        />
        <Section style={{backgroundColor: 'white'}}>
          <Text
            style={{
              marginTop: 10,
              fontFamily: 'Andale Mono',
              fontSize: 18,
            }}>
            Additional Information
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontFamily: 'Andale Mono',
              fontSize: 18,
              color: 'gray',
            }}>
            From {item.category} category
          </Text>
          <View>
            <Text
              style={{
                marginTop: 10,
                fontFamily: 'Andale Mono',
                fontSize: 18,
                color: 'gray',
              }}>
              Status :{item.status}
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontFamily: 'Andale Mono',
                fontSize: 18,
                color: 'gray',
              }}>
              Rating :{item.rating || 0}
            </Text>
          </View>
          <Text
            style={{
              marginTop: 10,
              fontFamily: 'Andale Mono',
              fontSize: 18,
              color: 'gray',
            }}>
            Reviews :{item.review || 'Review not avaliable at the moment.'}
          </Text>
        </Section>
      </ScrollView>
      {(item.status == 'active' || item.status == 'awarded') &&
        item.uid == props.user._id && (
          <Section style={{marginTop: 20, backgroundColor: 'transparent'}}>
            <Button
              onPress={() => {
                Alert.alert('Actions', 'Select either one of the actions.', [
                  {
                    text: 'Close',
                    onPress: () => {},
                  },
                  {
                    text: 'Delete this Post',
                    onPress: deleteAPost,
                  },
                  {
                    text:
                      item.status == 'awarded'
                        ? 'Mark as Completed.'
                        : 'Mark as Closed.',
                    onPress: () => {
                      if (item.status == 'awarded') {
                        setmodal(true);
                      } else {
                        Jobs.updateJobs(item._id, {
                          status: 'closed',
                        }).then((e) => console.log(e.data));
                        notification.sendCustomNotification({
                          notification: {
                            title: 'Alert',
                            body:
                              'The job titled "' +
                              item.title +
                              '", has been closed by the owner.',
                          },
                          topic: 'jid.' + item.jid,
                        });

                        props.navigation.replace('MyProjects');
                      }
                    },
                  },
                ]);
                // deleteAPost
              }}
              dark
              centered>
              Perform an Action
            </Button>
          </Section>
        )}
      <Mod item={item} setmodal={setmodal} modal={modal} />
    </Layout>
  );
});

const Mod = ({modal, setmodal, item}) => {
  const [rating, setrating] = useState(0);
  const [review, setreview] = useState('');
  const navigation = useNavigation();
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modal}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setmodal(!modal);
      }}>
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        <View
          style={{
            width: Dimensions.get('window').width * 0.9,
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,

            elevation: 5,
            height: 400,
          }}>
          <Section style={{flex: 1}}>
            <Text
              style={{
                marginTop: 10,
                fontFamily: 'Andale Mono',
                fontSize: 20,
              }}>
              Review
            </Text>
            <Text
              style={{
                marginTop: 10,
                fontFamily: 'Andale Mono',
                fontSize: 16,
                color: 'gray',
              }}>
              Your reivew is very important to us, it will help use refine our
              system
            </Text>
            <Rating
              ratingCount={5}
              imageSize={20}
              showRating
              onFinishRating={setrating}
            />
            <View
              style={{
                borderBottomColor: 'black',
                borderBottomWidth: 1,
                marginTop: 20,
              }}>
              <Input
                inputProps={{
                  placeholder: 'Write a Review.',
                  placeholderTextColor: 'gray',
                  onChangeText: setreview,
                }}
              />
            </View>
          </Section>
          <Button
            onPress={() => {
              Jobs.updateJobs(item._id, {
                status: 'completed',
                rating,
                review,
              }).then((e) => console.log(e.data));

              Bids.updateBids(item.awarded, {
                status: 'completed',
              });
              notification.sendNotification(item.awardedBy, {
                notification: {
                  title: 'Job Completed.',
                  body: `The Job "${item.title}" has been marked Completed by the owner.`,
                },
              });

              navigation.replace('MyProjects');
            }}
            dark
            centered>
            Submit
          </Button>
          <Button
            onPress={() => {
              setmodal(false);
            }}
            centered>
            Close
          </Button>
        </View>
      </View>
    </Modal>
  );
};
