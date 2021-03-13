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
import {Button, OutlineButton} from '../../components/Button';
import {TextTabs} from '../../components/Tab';
import Icon from 'react-native-vector-icons/Ionicons';
import {APJobCard} from '../../components/Card/APJobCard';
import {JobCard} from '../../components/Card/JobCard';
import {Layout} from '../../components/layout';
import {Section} from '../../components/section';
import {BidsCard} from '../../components/Card/BidsCard';
import {addABid, startmessage} from '../../models/app';
import {connect} from 'dva';

export default connect(
  ({app}) => ({message: app.message.payment, user: app.user}),
  {
    addABid,
    startmessage,
  },
)(function Payment(props) {
  const [Select, setSelect] = useState(1);
  const [tab, settab] = useState(0);
  const paymentMethod = ['Yes, Please.', 'No, Countinue'];
  let data = props.route.params.data;
  data = {...data, highlighted: false};
  const [loading, setloading] = useState(false);
  useEffect(() => {
    if (props.message) {
      // setmodal(false);
      setloading(false);
      if (props.message.errors) {
        Alert.alert(
          'Error',
          'Unable to create a Bid, some error occured.',
          [
            {
              text: 'OK',
              onPress: () => {
                props.startmessage('payment', undefined);
              },
            },
          ],
          {cancelable: false},
        );
      } else {
        props.startmessage('payment', undefined);

        props.navigation.navigate('Success', {data: props.message});
      }
    }
  }, [props.message]);

  return (
    <Layout
      btnProps={{
        children: 'Accept',
        onPress: () => {
          Alert.alert(
            'Are you sure you want to procced.',
            'You sure you want to procced with the bid, you wont be able to make any cahnges.',
            [
              {
                text: 'Accept',
                onPress: () => {
                  props.addABid(data);
                  setloading(true);
                },
              },
              {text: 'Cancel', onPress: () => console.log('No Pressed')},
            ],
            {cancelable: false},
          );
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
          Highlight your Bid
        </Text>
        <View style={{height: 40}} />
        <FlatList
          data={paymentMethod}
          renderItem={({item, index}) => {
            return (
              <>
                <TouchableOpacity
                  onPress={() => setSelect(index)}
                  style={{
                    paddingHorizontal: 14,
                    paddingVertical: 18,
                    backgroundColor: 'white',
                    marginBottom: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={{fontSize: 17, fontFamily: 'Andale Mono'}}>
                    {item}
                  </Text>
                  <Image
                    style={{}}
                    source={
                      index !== Select
                        ? require(`../../assets/images/notselected.png`)
                        : require(`../../assets/images/selected.png`)
                    }
                  />
                </TouchableOpacity>

                {Select == 0 && index == 0 && (
                  <View style={{backgroundColor: 'white', marginBottom: 10}}>
                    <TextTabs
                      onTabChange={(e) => settab(e)}
                      tabsContent={['Paypal', 'Credit Card']}
                    />
                    <Section>
                      {tab != 0 ? (
                        <View>
                          <Text
                            style={{
                              color: '#707070',
                              fontFamily: 'Andale Mono',
                              marginBottom: 5,
                            }}>
                            card number here
                          </Text>
                          <Input containerStyle={{borderBottomWidth: 1}} />
                          <View style={{flexDirection: 'row', marginTop: 10}}>
                            <View style={{flex: 1, marginRight: 10}}>
                              <Text
                                style={{
                                  color: '#707070',
                                  fontFamily: 'Andale Mono',
                                  marginBottom: 5,
                                }}>
                                exp
                              </Text>
                              <Input containerStyle={{borderBottomWidth: 1}} />
                            </View>
                            <View style={{flex: 1}}>
                              <Text
                                style={{
                                  color: '#707070',
                                  fontFamily: 'Andale Mono',
                                  marginBottom: 5,
                                }}>
                                CSV
                              </Text>
                              <Input containerStyle={{borderBottomWidth: 1}} />
                            </View>
                          </View>
                        </View>
                      ) : (
                        <Button dark>Pay Now</Button>
                      )}
                    </Section>
                  </View>
                )}
              </>
            );
          }}
        />
      </Section>
    </Layout>
  );
});
