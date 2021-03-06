import React from 'react';
import {View, Text} from 'react-native';
import {Input} from '../../components/Input';
import {Button, OutlineButton} from '../../components/Button';
import {Tab, TextTabs} from '../../components/Tab';
import Icon from 'react-native-vector-icons/Ionicons';
import {APJobCard} from '../../components/Card/APJobCard';
import {JobCard} from '../../components/Card/JobCard';
import {BidsCard} from '../../components/Card/BidsCard';
import {connect} from 'dva';
import {authenticated} from '../../models/app';

export default connect(({}) => ({}), {authenticated})(function Home(props) {
  return (
    <View style={{flex: 1, backgroundColor: '#F6F6F8'}}>
      <Text style={{}}>We are live baby</Text>

      <Input
        leftComponent={
          <Icon size={20} color={'black'} name={'search-outline'} />
        }
      />
      <OutlineButton centered>Hi</OutlineButton>
      <Button dark>Hi</Button>
      <Button>Hi</Button>

      <Tab onTabChange={(e) => console.log(e)}></Tab>
      <TextTabs
        tabsContent={['All', 'Awarded', 'Past']}
        onTabChange={(e) => console.log(e)}
      />
      <APJobCard></APJobCard>

      <JobCard></JobCard>
      <BidsCard></BidsCard>
    </View>
  );
});
