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

export default function Post(props) {
  const selfCheck = props.route.params?.self;
  return (
    <Layout
      btnEnabled
      btnProps={{
        children: selfCheck ? 'See All Bids' : 'Place a Bid',
        onPress: () => props.navigation.navigate(selfCheck ? 'Bids' : 'Bid'),
      }}
      disableTabs>
      <Section>
        <Text
          style={{
            marginTop: 10,
            fontFamily: 'Andale Mono',
            fontSize: 30,
          }}>
          Need a Plumber
        </Text>
        <Text
          style={{
            marginTop: 10,
            fontFamily: 'Andale Mono',
            fontSize: 20,
          }}>
          Carpenter
        </Text>
        <Text
          style={{
            marginTop: 10,
            fontFamily: 'Andale Mono',
            fontSize: 16,
            color: '#6C6C6C',
          }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </Text>
      </Section>
      <Image
        style={{width: '100%', backgroundColor: 'white', height: 200}}
        resizeMode={'contain'}
        source={require('../../assets/images/image.png')}
      />
      <View style={{height: 10}} />
      <FlatList
        data={[1, 23, 4]}
        a
        horizontal
        renderItem={(e) => (
          <Image
            style={{flex: 1, marginRight: 10}}
            resizeMode={'contain'}
            source={require('../../assets/images/image.png')}
          />
        )}
      />
    </Layout>
  );
}
