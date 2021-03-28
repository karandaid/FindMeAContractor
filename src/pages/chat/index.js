import React, {useEffect, useState} from 'react';
import {
  Text,
  Image,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {Input} from '../../components/Input';
import {Button} from '../../components/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import {Layout} from '../../components/layout';
import {Section} from '../../components/section';
import {connect} from 'dva';
import Chats from '../../service/chat';
import {RANDOMWORDS, S3BUCKETURL} from '../../utils';
import {launchImageLibrary} from 'react-native-image-picker';
import {Storage} from 'aws-amplify';

export default connect(
  ({app}) => ({message: app.message.payment, user: app.user}),
  {},
)(function Chat(props) {
  const [pagiantion, setpagiantion] = useState(0);
  const [chat, setchat] = useState([]);
  const [random, setrandom] = useState('');
  const [input, setinput] = useState('');
  const [images, setimages] = useState([]);
  const jid = props.route.params.id;
  console.log(props.route);
  useEffect(() => {
    setchat([]);
    setpagiantion(0);
  }, [random]);
  useEffect(() => {
    // Get the jid
    // Get the chat messages
    console.log({jid});
    Chats.getChats(pagiantion, 4, 'created_at:desc', 'jid:' + jid)
      .then(({data}) => {
        setchat(pagiantion == 0 ? data.data : [...chat, ...data.data]);
      })
      .catch(console.log);
  }, [pagiantion, random]);

  return (
    <Layout disableTabs>
      <View style={{flex: 1}}>
        <View style={{height: 80}}>
          <Section>
            <Button dark centered onPress={() => setrandom(RANDOMWORDS(2))}>
              Refresh
            </Button>
          </Section>
        </View>
        <FlatList
          ListHeaderComponent={() => (
            <View>
              <FlatList
                renderItem={({item, index}) => (
                  <TouchableOpacity
                    onPress={() =>
                      Alert.alert(
                        'Delete',
                        'Do you want to remove this image ?',
                        [
                          {
                            text: 'Yes',
                            onPress: () => {
                              setimages(images.filter((e, i) => i != index));
                            },
                          },
                          {
                            text: 'No',
                            onPress: () => console.log('No'),
                          },
                        ],
                      )
                    }>
                    <Image
                      source={{uri: item.uri}}
                      style={{width: 60, height: 60, margin: 10}}
                    />
                  </TouchableOpacity>
                )}
                horizontal
                data={images}
              />
            </View>
          )}
          ListFooterComponent={
            <Section>
              <Section>
                <Section>
                  <Button
                    onPress={() => setpagiantion(pagiantion + 1)}
                    centered>
                    Load more
                  </Button>
                </Section>
              </Section>
            </Section>
          }
          data={chat}
          inverted
          renderItem={(e) => (
            <View
              style={{padding: 10, backgroundColor: 'white', marginBottom: 10}}>
              <Text
                style={{
                  color: 'blue',
                  fontSize: 20,
                  marginBottom: 10,

                  textTransform: 'capitalize',
                  textAlign: e.item.uid == props.user._id ? 'left' : 'right',
                }}>
                {e.item.alias}
              </Text>
              <Text
                style={{
                  color: 'rgba(0,0,0,0.6)',
                  fontSize: 18,
                  marginHorizontal: 10,

                  textAlign: e.item.uid == props.user._id ? 'left' : 'right',
                }}>
                {e.item.message}
              </Text>
              <View>
                {e.item.attachment != 0 && (
                  <FlatList
                    renderItem={({item, index}) => (
                      <Image
                        source={{uri: S3BUCKETURL + item}}
                        style={{width: 60, height: 60}}
                      />
                    )}
                    horizontal
                    data={e.item.attachment}
                  />
                )}
              </View>
            </View>
          )}
        />
      </View>
      <View style={{backgroundColor: 'white', flexDirection: 'row'}}>
        <TouchableOpacity
          onPress={() => {
            launchImageLibrary({}, async (e) => {
              const img = [...images, e];
              setimages([...img]);
            });
          }}
          style={{
            width: 50,
            backgroundColor: 'black',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Icon name={'clipboard-outline'} color={'white'} size={20} />
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <Input inputProps={{onChangeText: setinput, value: input}} />
        </View>
      </View>
      <Button
        onPress={() => {
          if (input != '' || images.length > 0) {
            let attachment = [];
            if (images.length != 0) {
              images.forEach((e) => {
                console.log('Ind');
                const fileName = 'chat/' + RANDOMWORDS(4) + '_' + e.fileName;
                (async () => {
                  const response = await fetch(e.uri);
                  const blob = await response.blob();
                  const a = await Storage.put(fileName, blob, {
                    contentType: e.type, // contentType is optional
                  });
                })();
                console.log({fileName});
                attachment.push(fileName);
              });
            }
            console.log(attachment);
            Chats.setChat({
              jid: jid,
              uid: props.user._id,
              alias: props.user.name,
              message: input,
              attachment,
            })
              .then((e) => {
                console.log({data: e.data});
                if (e.data.message == 'New Mod Added!') {
                  Alert.alert('Success', 'Text has been sended successfully.', [
                    {
                      text: 'OK',
                      onPress: () => {
                        setimages([]);
                        setrandom(RANDOMWORDS(2));
                      },
                    },
                  ]);
                }
              })
              .catch(console.log);
          }
          setinput('');
        }}
        dark
        centered>
        POST
      </Button>
    </Layout>
  );
});
