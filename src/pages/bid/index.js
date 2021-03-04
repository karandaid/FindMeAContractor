import React from 'react';
import {Text, Image, View, FlatList} from 'react-native';
import {Input} from '../../components/Input';
import {Button, OutlineButton} from '../../components/Button';
import {TextTabs} from '../../components/Tab';
import Icon from 'react-native-vector-icons/Ionicons';
import {APJobCard} from '../../components/Card/APJobCard';
import {JobCard} from '../../components/Card/JobCard';
import {Layout} from '../../components/layout';
import {Section} from '../../components/section';

export default function Bid(props) {
  return (
    <Layout
      btnProps={{
        children: 'Confirmed',
        onPress: () => props.navigation.navigate('Payment'),
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
            <Input />
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
              inputProps={{multiline: true, numberOfLines: 10}}
            />
          </View>
          <View style={{height: 0}} />
        </View>
      </Section>
    </Layout>
  );
}
