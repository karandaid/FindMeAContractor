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

export default function Profile() {
  return (
    <Layout active={5}>
      <View style={{flex: 1}} />
      <View>
        <Section>
          <View style={{alignItems: 'center', position: 'relative'}}>
            <Image
              source={require('../../assets/images/image.png')}
              style={{
                width: 300,
                height: 300,
                borderRadius: 150,
                backgroundColor: 'black',
              }}
            />
            <View
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
            </View>
          </View>
          <View style={{height: 30}} />
          <View style={{marginBottom: 10}}>
            <Text
              style={{
                color: '#707070',
                fontFamily: 'Andale Mono',
                marginBottom: 5,
              }}>
              Name
            </Text>
            <Input inputProps={{placeholder: 'You name'}} />
          </View>
          <View style={{marginBottom: 10}}>
            <Text
              style={{
                color: '#707070',
                fontFamily: 'Andale Mono',
                marginBottom: 5,
              }}>
              Email
            </Text>
            <Input inputProps={{placeholder: 'You name'}} />
          </View>
          <View style={{height: 20}} />
          <Button centered dark>
            UPDATE
          </Button>
        </Section>
      </View>
    </Layout>
  );
}
