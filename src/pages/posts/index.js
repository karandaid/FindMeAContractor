import React, {useEffect, useState} from 'react';
import {
  Text,
  Image,
  View,
  FlatList,
  Modal,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Input} from '../../components/Input';
import {Button} from '../../components/Button';
import {Layout} from '../../components/layout';
import {Section} from '../../components/section';
import ModalDropdown from 'react-native-modal-dropdown';
import {connect} from 'dva';
import {addAJob, startmessage} from '../../models/app';
import DocumentPicker from 'react-native-document-picker';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Storage} from 'aws-amplify';
import {RANDOMWORDS} from '../../utils';

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
  const create = async () => {
    if (text && description && category && images.length > 0) {
      // Upload Images to the DB
      const img = [];
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

      // Create a JOB with the images reference
      props.addAJob({title: text, description, category, price, images: img});
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
      btnProps={{
        children: 'Post',
        onPress: () => {
          if (text && description && category) {
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
      <Section style={{height: '100%'}}>
        <Text
          style={{
            fontSize: 26,
            fontWeight: 'bold',
            fontFamily: 'Andale Mono',
          }}>
          Post a Job
        </Text>

        <View style={{height: 40}} />
        <View style={{flex: 1}}>
          <View style={{marginBottom: 10}}>
            <Text
              style={{
                color: '#707070',
                fontFamily: 'Andale Mono',
                marginBottom: 5,
              }}>
              Title
            </Text>
            <Input inputProps={{onChangeText: (e) => settext(e)}} />
          </View>
          <View style={{marginBottom: 10}}>
            <Text
              style={{
                color: '#707070',
                fontFamily: 'Andale Mono',
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
                fontSize: 20,
                fontFamily: 'Andale Mono',
              }}
              renderButtonText={(e) => <Text>{e}</Text>}
              renderRowText={(e) => (
                <Text style={{fontSize: 16, fontFamily: 'Andale Mono'}}>
                  {e}
                </Text>
              )}
              options={props?.categories?.map((e) => e.name)}
            />
          </View>

          <View>
            <Text
              style={{
                color: '#707070',
                fontFamily: 'Andale Mono',
                marginBottom: 5,
              }}>
              Description
            </Text>
            <Input
              onChangeText={(e) => setdescription(e)}
              containerStyle={{height: 200, alignItems: 'flex-start'}}
              inputProps={{
                multiline: true,
                numberOfLines: 4,
                onChangeText: (e) => setdescription(e),
              }}
            />
          </View>
          <View style={{height: 0}} />
        </View>
        <ImageSection images={[images, setimages]} />
      </Section>
      <ModalView
        setprice={setPricing}
        create={create}
        visible={modal}
        loading={loading}
        setloading={setloading}
        onRequestClose={() => setmodal(false)}
      />
    </Layout>
  );
});

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
              style={{
                textAlign: 'center',
                fontSize: 26,
                fontWeight: 'bold',
                fontFamily: 'Andale Mono',
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
                    fontFamily: 'Andale Mono',
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
                  style={{
                    fontFamily: 'Andale Mono',
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
                {props.loading ? 'loading...' : 'Confirmed'}
              </Button>
              <Text
                onPress={() => props.onRequestClose()}
                style={{
                  textAlign: 'center',
                  fontFamily: 'Andale Mono',
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

  return (
    <View style={{flex: 1}}>
      <Button
        onPress={async () => {
          launchImageLibrary({}, async (e) => {
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
