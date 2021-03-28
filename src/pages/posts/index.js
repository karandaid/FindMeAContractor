import React, {useEffect, useState} from 'react';
import {
  Image,
  View,
  FlatList,
  Modal,
  Dimensions,
  TouchableOpacity,
  Alert,
  ScrollView,
  Platform,
} from 'react-native';
import {Input} from '../../components/Input';
import {Button} from '../../components/Button';
import {Layout} from '../../components/layout';
import {Section} from '../../components/section';
import ModalDropdown from 'react-native-modal-dropdown';
import {connect} from 'dva';
import {addAJob, startmessage} from '../../models/app';
import {launchImageLibrary} from 'react-native-image-picker';
import {Storage} from 'aws-amplify';
import {
  APIURL,
  getData,
  RANDOMWORDS,
  getCountryName,
  getCurrentLocation,
} from '../../utils';
import {EmptyListMessage} from '../job';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import Textarea from 'react-native-textarea';
import {Text} from '@ui-kitten/components';

export default connect(
  ({app}) => ({categories: app.categories, message: app.message.post}),
  {addAJob, startmessage},
)(function Posts(props) {
  const [text, settext] = useState();
  const [description, setdescription] = useState();
  const [category, setcategory] = useState();
  const [images, setimages] = useState([]);
  const [modal, setmodal] = useState(false);
  const [price, setprice] = useState([0, 0, '$']);
  const [loading, setloading] = useState(false);
  const [locationmodal, setlocationmodal] = useState(false);
  const [city, setcity] = useState();

  const create = async () => {
    if (text && description && category) {
      // Upload Images to the DB
      const img = [];
      if (images.length > 0) {
        for (let i = 0; i < images.length; i++) {
          const e = images[i];
          try {
            const fileName = 'jobs/' + RANDOMWORDS(4) + '_' + e.fileName;
            const response = await fetch(e.uri);
            const blob = await response.blob();
            const a = await Storage.put(fileName, blob, {
              contentType: e.type, // contentType is optional
            });
            img.push(fileName);
          } catch (err) {
            Alert.alert(
              'Error',
              err.message,
              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
              {cancelable: false},
            );
            return;
          }
        }
      }
      // Create a JOB with the images reference
      const JOB = {
        title: text,
        description,
        category,
        city,
        price,
      };
      if (img.length > 0) JOB.images = img;
      props.addAJob(JOB);
    } else {
      Alert.alert(
        'Error',
        'Make sure to fill all the required feilds',
        [{text: 'OK', onPress: () => console.log('OK Pressed')}],
        {cancelable: false},
      );
    }
  };
  const setPricing = (index, cost) => {
    const p = price;
    p[index] = cost;
    setprice(p);
  };

  useEffect(() => {
    props.startmessage('post', undefined);
  }, []);

  useEffect(() => {
    if (props.message) {
      setmodal(false);
      setloading(false);
      if (props.message.errors) {
        Alert.alert(
          'Error',
          'Unable to create a post, some error occured.',
          [
            {
              text: 'OK',
              onPress: () => {
                props.startmessage('post', undefined);
              },
            },
          ],
          {cancelable: false},
        );
      } else {
        Alert.alert(
          'Success',
          'Successfull Posted a Job.',
          [
            {
              text: 'View All',
              onPress: () => {
                props.startmessage('post', undefined);
                props.navigation.replace('MyProjects');
              },
            },
          ],
          {cancelable: false},
        );
      }
    }
  }, [props.message]);
  return (
    <Layout
      level={'2'}
      btnProps={{
        children: 'Post',
        onPress: () => {
          if (text && description && category && city) {
            if (description.length < 100)
              return Alert.alert(
                'Error',
                'Make sure to entered at least 100 character or more as the description.',
              );
            setmodal(true);
          } else {
            Alert.alert(
              'Error',
              'Make sure to fill all the required feilds',
              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
              {cancelable: false},
            );
          }
        },
      }}
      btnEnabled
      disableTabs>
      <ScrollView>
        <Section style={{height: '100%'}}>
          <Text
            category="h1"
            style={
              {
                // fontSize: 26,
                // fontWeight: 'bold',
                //
              }
            }>
            Post a Job
          </Text>

          <View style={{height: 40}} />
          <View style={{flex: 1}}>
            <View style={{marginBottom: 10}}>
              <Text
                style={{
                  color: '#707070',
                  //
                  marginBottom: 5,
                }}>
                Title
              </Text>
              <Input
                inputProps={{
                  onChangeText: (e) => settext(e),
                  placeholder: 'Add a title',
                }}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <Text
                style={{
                  color: '#707070',
                  //
                  marginBottom: 5,
                }}>
                Categories
              </Text>
              <ModalDropdown
                onSelect={(e) => setcategory(props.categories[e].name)}
                dropdownStyle={{width: '100%', fontSize: 16, marginTop: 10}}
                style={{
                  paddingHorizontal: 10,
                  paddingVertical: 12,
                  fontSize: 14,
                  backgroundColor: 'white',
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                }}
                textStyle={{
                  fontSize: 18,
                  //
                }}
                renderButtonText={(e) => <Text>{e}</Text>}
                renderRowText={(e) => <Text style={{fontSize: 16}}>{e}</Text>}
                options={props?.categories?.map((e) => e.name)}
              />
            </View>
            <Button onPress={() => setlocationmodal(true)} dark centered>
              {city ? city : 'Select a City'}
            </Button>

            <View>
              <Text
                style={{
                  color: '#707070',
                  //
                  marginVertical: 5,
                  marginTop: 7,
                }}>
                Description
              </Text>
              {/* <Input
                onChangeText={(e) => setdescription(e)}
                containerStyle={{height: 200, alignItems: 'flex-start'}}
                inputProps={{
                  multiline: true,
                  numberOfLines: 4,
                  onChangeText: (e) => setdescription(e),
                }}
              /> */}
              <Textarea
                containerStyle={{backgroundColor: 'white'}}
                style={{padding: 10, fontSize: 16}}
                onChangeText={(e) => setdescription(e)}
                // defaultValue={this.state.text}
                maxLength={500}
                placeholder={'Add a appropriate description.'}
                placeholderTextColor={'#c7c7c7'}
                underlineColorAndroid={'transparent'}
              />
            </View>
            <View style={{height: 10}} />
          </View>
          <ImageSection images={[images, setimages]} />
        </Section>
      </ScrollView>
      <ModalView
        setprice={setPricing}
        create={create}
        visible={modal}
        loading={loading}
        setloading={setloading}
        onRequestClose={() => setmodal(false)}
      />

      <LocationCom
        setlocationmodal={setlocationmodal}
        locationmodal={locationmodal}
        onSelect={(e) => {
          console.log({city: e});
          setcity(e);
          setlocationmodal(false);
        }}
      />
    </Layout>
  );
});

export const LocationCom = ({onSelect, locationmodal, setlocationmodal}) => {
  const [input, setinput] = useState('');
  const [cites, setcites] = useState([]);
  const findLocation = () => {
    axios.get(APIURL + 'cities/' + input).then(({data}) => {
      setcites(data.cities);
    });
  };

  return (
    <Modal visible={locationmodal} animationType="slide" transparent={false}>
      <View
        style={{
          height: Platform.OS == 'ios' ? 40 : 0,
          backgroundColor: 'black',
        }}
      />
      <View style={{flex: 1}}>
        <View style={{borderWidth: 1, borderColor: 'gray'}}>
          <Input
            rightComponent={
              <TouchableOpacity onPress={() => setlocationmodal(false)}>
                <Icon size={30} color={'black'} name={'close'} />
              </TouchableOpacity>
            }
            inputProps={{
              placeholder: 'Type A City',
              placeholderTextColor: 'gray',
              onSubmitEditing: findLocation,
              onChangeText: setinput,
            }}
          />
        </View>
        <FlatList
          data={cites}
          renderItem={({item, index}) => (
            <Button
              leftIcon={<Icon size={20} color={'black'} name={'pin-outline'} />}
              onPress={() => {
                onSelect(item.name);
              }}
              style={{
                backgroundColor: 'white',
              }}
              centered>
              {item.name}, {getCountryName(item.country)}
            </Button>
          )}
          ListEmptyComponent={EmptyListMessage}
        />
      </View>
      <Button
        onPress={async () => {
          getCurrentLocation()
            .then((e) => {
              console.log({e});
              onSelect(e.address.city);
            })
            .catch(console.log);
        }}
        centered
        dark>
        Use Current Location
      </Button>
    </Modal>
  );
};

const ModalView = connect(
  ({}) => ({}),
  {},
)((props) => {
  const [selected, setselected] = useState(false);
  return (
    <Modal style={{}} animationType="slide" transparent={true} {...props}>
      <View
        onPress={() => console.log('HERE')}
        style={{
          width: '100%',
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          // onPress={() => null}
          style={{
            width: Dimensions.get('window').width * 0.9,
            height: 320,
            backgroundColor: 'white',
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 1,
            },
            shadowOpacity: 0.22,
            shadowRadius: 2.22,

            elevation: 3,
          }}>
          <Section style={{flex: 1}}>
            <Text
              category={'h1'}
              style={{
                textAlign: 'center',
                // fontSize: 26,
                fontWeight: 'bold',
                //
                marginTop: 20,
              }}>
              Additional Info
            </Text>
            <View
              style={{flexDirection: 'row', flex: 1, alignItems: 'flex-end'}}>
              <View style={{flex: 1}}>
                <Text
                  style={{
                    color: '#707070',
                    marginBottom: 5,
                  }}>
                  Ideal Pricing
                </Text>
                <Input
                  inputStyle={{
                    borderBottomWidth: 1,
                    width: '100%',
                    borderBottomColor: 'black',
                    paddingBottom: 4,
                  }}
                  inputProps={{
                    keyboardType: 'numeric',
                    placeholder: 'Min',
                    placeholderTextColor: 'gray',
                    onChangeText: (e) => {
                      props.setprice(0, e);
                    },
                  }}
                />
              </View>
              <View style={{flex: 1}}>
                <Input
                  inputStyle={{
                    borderBottomWidth: 1,
                    width: '100%',
                    borderBottomColor: 'black',
                    paddingBottom: 4,
                  }}
                  inputProps={{
                    placeholder: 'Max',
                    keyboardType: 'numeric',
                    onChangeText: (e) => {
                      props.setprice(1, e);
                    },
                    placeholderTextColor: 'gray',
                  }}
                />
              </View>
            </View>
            <View>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity onPress={() => setselected(!selected)}>
                  <Image
                    style={{marginTop: 10}}
                    source={
                      !selected
                        ? require(`../../assets/images/notselected.png`)
                        : require(`../../assets/images/selected.png`)
                    }
                  />
                </TouchableOpacity>
                <Text
                  category={'p1'}
                  style={{
                    paddingHorizontal: 20,
                    fontSize: 18,
                    paddingBottom: 10,
                    color: '#9A9A9A',
                  }}>
                  Terms and condition are applied, make sure to read it
                  thoroughly
                </Text>
              </View>
              <Button
                onPress={() => {
                  if (props.loading) return;
                  if (selected) {
                    props.setloading(true);
                    props.create();
                  }
                }}
                centered
                dark>
                {props.loading ? 'Loading...' : 'Confirmed'}
              </Button>
              <Text
                onPress={() => props.onRequestClose()}
                style={{
                  textAlign: 'center',

                  marginVertical: 10,
                }}>
                or Close
              </Text>
            </View>
          </Section>
        </View>
      </View>
    </Modal>
  );
});

const ImageSection = (props) => {
  const [images, setimages] = props.images;
  console.log({images});
  return (
    <View style={{flex: 1}}>
      <Button
        onPress={async () => {
          launchImageLibrary({}, async (e) => {
            if (e.didCancel) return;
            const img = [...images, e];
            setimages([...img]);
          });
        }}
        centered
        dark>
        Upload Images
      </Button>
      <FlatList
        data={images}
        numColumns={3}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  'Remove',
                  'Make sure to you want to remove this image?',
                  [
                    {
                      text: 'Yes',
                      onPress: () => {
                        setimages(images.filter((e, i) => i != index));
                      },
                    },
                    {text: 'No', onPress: () => console.log('OK Pressed')},
                  ],
                  {cancelable: false},
                );
              }}>
              <Image
                style={{
                  margin: 10,
                  backgroundColor: 'black',
                  width: 100,
                  height: 100,
                }}
                source={{uri: item.uri}}
              />
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};
