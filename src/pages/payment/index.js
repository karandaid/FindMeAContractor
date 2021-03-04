import React, {useState} from 'react';
import {Text, Image, View, FlatList, TouchableOpacity} from 'react-native';
import {Input} from '../../components/Input';
import {Button, OutlineButton} from '../../components/Button';
import {TextTabs} from '../../components/Tab';
import Icon from 'react-native-vector-icons/Ionicons';
import {APJobCard} from '../../components/Card/APJobCard';
import {JobCard} from '../../components/Card/JobCard';
import {Layout} from '../../components/layout';
import {Section} from '../../components/section';
import {BidsCard} from '../../components/Card/BidsCard';

export default function Payment(props) {
  const [Select, setSelect] = useState();
  const [tab, settab] = useState(0);
  const paymentMethod = ['Yes, Please.', 'No, Countinue'];
  return (
    <Layout
      btnProps={{
        children: 'Accept',
        onPress: () => props.navigation.navigate('Success'),
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

                {index == 0 && (
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
}
