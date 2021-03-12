import React, {useState} from 'react';
import {Text, Image, View, FlatList, Alert} from 'react-native';
import {Input} from '../../components/Input';
import {Button, OutlineButton} from '../../components/Button';
import {TextTabs} from '../../components/Tab';
import Icon from 'react-native-vector-icons/Ionicons';
import {APJobCard} from '../../components/Card/APJobCard';
import {JobCard} from '../../components/Card/JobCard';
import {Layout} from '../../components/layout';
import {Section} from '../../components/section';
import {addABid} from '../../models/app';

export default function Bid(props) {
  const [description, setdescription] = useState();
  const [cost, setamount] = useState();
  const jid = props.route.params.id;
  return (
    <Layout
      btnProps={{
        children: 'Confirmed',
        onPress: () => {
          if (
            description &&
            description.length > 100 &&
            cost &&
            parseInt(cost)
          ) {
            props.navigation.navigate('Payment', {
              data: {description, cost, jid},
            });
          } else {
            Alert.alert(
              'Woah',
              'Make sure you have filled the required input feilds.',
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
          Your Bid
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
              Paid to you
            </Text>
            <Input
              inputProps={{
                onChangeText: (e) => setamount(e),
                keyboardType: 'numeric',
              }}
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
              containerStyle={{height: '90%', alignItems: 'flex-start'}}
              inputProps={{
                multiline: true,
                numberOfLines: 10,
                onChangeText: (e) => setdescription(e),
              }}
            />
          </View>
          <View style={{height: 0}} />
        </View>
      </Section>
    </Layout>
  );
}
