import React, {useState} from 'react';
import {
  Text,
  Image,
  View,
  TouchableOpacity,
  Alert,
  ScrollView,
  Modal,
  ActivityIndicator,
} from 'react-native';
import {Input} from '../../components/Input';
import {Button} from '../../components/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import {Layout} from '../../components/layout';
import {Section} from '../../components/section';
import {connect} from 'dva';
import {launchImageLibrary} from 'react-native-image-picker';
import User from '../../service/user';
import {RANDOMWORDS, S3BUCKETURL} from '../../utils';
import {Storage} from 'aws-amplify';
import {updateUser} from '../../models/app';

export default connect(({app}) => ({user: app.user}), {updateUser})(
  function Profile(props) {
    const [images, setimages] = useState([]);
    const [name, setname] = useState();
    const [address, setaddress] = useState();
    const [phone, setphone] = useState();
    const [loading, setloading] = useState(false);
    console.log({loading});
    return (
      <Layout active={5}>
        <View style={{flex: 1}} />
        <ScrollView>
          <Section>
            <View style={{alignItems: 'center', position: 'relative'}}>
              <Image
                source={{
                  uri:
                    images.length == 0
                      ? S3BUCKETURL + props?.user?.image
                      : images[0]?.uri,
                }}
                style={{
                  width: 200,
                  height: 200,
                  borderRadius: 100,
                  backgroundColor: 'black',
                }}
              />

              <TouchableOpacity
                onPress={() =>
                  launchImageLibrary({}, async (e) => {
                    if (!e.didCancel) {
                      const img = [...images, e];
                      setimages([...img]);
                    }
                  })
                }
                style={{
                  position: 'absolute',
                  bottom: 0,
                  right: 0,
                  width: 100,
                  height: 100,
                  borderRadius: 150,
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 1,
                  },
                  shadowOpacity: 0.18,
                  shadowRadius: 1.0,

                  elevation: 1,
                }}>
                <Icon name={'md-add-outline'} size={50} />
              </TouchableOpacity>
            </View>
            <View style={{height: 30}} />
            <View style={{marginBottom: 10}}>
              <Text
                style={{
                  color: '#707070',

                  marginBottom: 5,
                }}>
                Name
              </Text>
              <Input
                inputProps={{
                  placeholder: 'You name',
                  value: name != undefined ? name : props?.user?.name,
                  onChangeText: setname,
                }}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <Text
                style={{
                  color: '#707070',

                  marginBottom: 5,
                }}>
                Phone
              </Text>
              <Input
                inputProps={{
                  placeholder: 'Your Phone',
                  value: phone != undefined ? phone : props?.user?.phone,
                  onChangeText: setphone,
                }}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <Text
                style={{
                  color: '#707070',

                  marginBottom: 5,
                }}>
                Address
              </Text>
              <Input
                inputProps={{
                  placeholder: 'You address',
                  value: address != undefined ? address : props?.user?.address,
                  onChangeText: setaddress,
                }}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <Text
                style={{
                  color: '#707070',

                  marginBottom: 5,
                }}>
                Email
              </Text>
              <Input
                inputProps={{
                  placeholder: 'You name',
                  value: props?.user?.email,
                  editable: false,
                  disabled: true,
                }}
                inputStyle={{color: 'gray'}}
              />
            </View>
            <View style={{height: 20}} />
            <Button
              onPress={() =>
                Alert.alert(
                  'Update ?',
                  'You sure you want to update the profile.',
                  [
                    {
                      text: 'Confirmed',
                      onPress: async () => {
                        setloading(true);
                        try {
                          const e = images[0];
                          const fileName =
                            'profile/' + RANDOMWORDS(4) + '_' + e?.fileName;
                          if (images.length > 0) {
                            const response = await fetch(e.uri);
                            const blob = await response.blob();
                            await Storage.put(fileName, blob, {
                              contentType: e.type, // contentType is optional
                            });
                          }
                          // get all the user input here
                          const params = {
                            phone,
                            address,
                            name,
                          };
                          if (images.length > 0) params['image'] = fileName;

                          User.updateUsers(props?.user?._id, params)
                            .then((e) => {
                              setloading(false);

                              if (e.data.error) return;
                              props.updateUser(e.data.data);
                              Alert.alert(
                                'Success',
                                'Profile Updated',
                                [
                                  {
                                    text: 'OK',
                                    onPress: () => console.log('OK Pressed'),
                                  },
                                ],
                                {cancelable: false},
                              );
                            })
                            .catch((e) => console.log(e));
                          setloading(false);
                        } catch (err) {
                          console.log('Error uploading file:', err);
                          Alert.alert(
                            'Error',
                            err.message,
                            [
                              {
                                text: 'OK',
                                onPress: () => console.log('OK Pressed'),
                              },
                            ],
                            {cancelable: false},
                          );
                          setloading(false);

                          return;
                        }
                      },
                    },
                    {text: 'Cancel', onPress: () => console.log('OK Pressed')},
                  ],
                  {cancelable: false},
                )
              }
              centered
              dark>
              UPDATE
            </Button>
          </Section>
        </ScrollView>
        <Modal visible={loading} transparent={true}>
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator />
          </View>
        </Modal>
      </Layout>
    );
  },
);
