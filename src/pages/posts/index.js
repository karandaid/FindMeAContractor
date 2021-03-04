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

export default function Posts() {
  return (
    <Layout btnProps={{children: 'Post'}} btnEnabled disableTabs>
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
              containerStyle={{height: 200, alignItems: 'flex-start'}}
              inputProps={{multiline: true, numberOfLines: 4}}
            />
          </View>
          <View style={{height: 0}} />
        </View>
        <View style={{flex: 1}}>
          <Button centered dark>
            Upload Images
          </Button>
          <FlatList
            data={[2, 3, 4, 3, 3, 3]}
            numColumns={3}
            renderItem={() => (
              <Image
                style={{flex: 1, margin: 10}}
                source={require('../../assets/images/image.png')}
              />
            )}
          />
        </View>
      </Section>
    </Layout>
  );
}
