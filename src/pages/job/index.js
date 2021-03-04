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

export default function Job(props) {
  return (
    <Layout>
      <Section row>
        <Input
          containerStyle={{flex: 1, borderRadius: 8}}
          inputStyle={{flex: 1}}
          leftComponent={
            <Icon size={20} color={'black'} name={'search-outline'} />
          }
        />
        <View style={{width: 8}} />
        <OutlineButton centered>Categories</OutlineButton>
      </Section>

      <FlatList
        renderItem={() => (
          <JobCard onPress={() => props.navigation.navigate('Post')}></JobCard>
        )}
        data={[1, 2, 3, 4, 5, 6, 7, 84]}
      />
    </Layout>
  );
}
