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

export default function Bids() {
  const [Select, setSelect] = useState();
  console.log({Select});
  return (
    <Layout btnProps={{children: 'Accept'}} btnEnabled disableTabs>
      <Section style={{height: '100%'}}>
        <Text
          style={{
            fontSize: 26,
            fontWeight: 'bold',
            fontFamily: 'Andale Mono',
          }}>
          Bids
        </Text>
        <View style={{height: 40}} />
        <FlatList
          data={[1, 1, 1, 1, 1, 1]}
          renderItem={({index}) => (
            <TouchableOpacity
              onPress={() =>
                index == Select ? setSelect(undefined) : setSelect(index)
              }
              style={{marginBottom: 10}}>
              <BidsCard active={Select && index == Select ? true : false} />
            </TouchableOpacity>
          )}
        />
      </Section>
    </Layout>
  );
}
