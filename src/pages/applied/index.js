import React, {useEffect, useState} from 'react';
import {
  Text,
  Image,
  View,
  FlatList,
  ActivityIndicator,
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
import {connect} from 'dva';
import {getBids} from '../../models/app';
import Bids from '../../service/bid';
import {LIMIT} from '../../utils';

export default connect(
  ({app}) => ({bids: app.bids, loading: app.loading.bids, user: app.user}),
  {getBids},
)(function Applied(props) {
  const awarded = ['Active', 'Awarded', 'Completed', 'Closed'];
  const [selected, setselected] = useState(0);
  const [pagination, setpagination] = useState(0);

  useEffect(() => {
    setpagination(0);
  }, [selected]);
  useEffect(() => {
    if (selected == 0) {
      props?.getBids({
        page: pagination,
        limit: LIMIT,
        sort: 'created_at:desc',
        filter: `uid:${props.user._id},status:active`,
      });
    } else if (selected == 1) {
      props?.getBids({
        page: pagination,
        limit: LIMIT,
        sort: 'created_at:desc',
        filter: `status:awarded,uid:${props.user._id}`,
      });
    } else if (selected == 2) {
      props?.getBids({
        page: pagination,
        limit: LIMIT,
        sort: 'created_at:desc',
        filter: `status:completed,uid:${props.user._id}`,
      });
    } else if (selected == 3) {
      props?.getBids({
        page: pagination,
        limit: LIMIT,
        sort: 'created_at:desc',
        filter: `status:closed,uid:${props.user._id}`,
      });
    }
  }, [selected, pagination]);
  return (
    <Layout active={2}>
      <TextTabs tabsContent={awarded} onTabChange={(e) => setselected(e)} />
      <View style={{flex: 1}}>
        <Section>
          <FlatList
            ListFooterComponent={() => (
              <Section>
                <Button
                  dark
                  centered
                  onPress={() => setpagination(pagination + 1)}>
                  Load More
                </Button>
              </Section>
            )}
            ListEmptyComponent={EmptyListMessage}
            renderItem={(e) => (
              <APJobCard
                onPress={() => {
                  console.log('---', e.item, e.item.status == 'active');
                  let buttons = [
                    {
                      text: 'Cancel',
                      onPress: () => console.log(''),
                    },
                  ];

                  if (e.item.status == 'awarded') {
                    buttons.push({
                      text: 'Conversation',
                      onPress: () =>
                        props.navigation.navigate('Chat', {id: e.item.jid}),
                    });
                  }

                  if (e.item.status == 'active') {
                    buttons.push({
                      text: 'Delete',
                      onPress: () =>
                        Bids.deleteABid(e.item._id).then((e) =>
                          console.log(e.data),
                        ),
                    });
                    buttons.push({
                      text: 'Closed',
                      onPress: () => {
                        Bids.updateBids(e.item._id, {
                          status: 'closed',
                        }).then((e) => console.log(e.data));
                        setselected(2);
                      },
                    });
                  }
                  console.log({buttons});

                  Alert.alert('Actions', 'Perform an action', buttons);
                }}
                data={e}></APJobCard>
            )}
            data={props.bids}
          />
        </Section>
        {props.loading && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              right: 0,
              left: 0,
              bottom: 0,
              backgroundColor: 'rgba(255,255,255,0.4)',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <ActivityIndicator color={'black'} />
          </View>
        )}
      </View>
    </Layout>
  );
});

const EmptyListMessage = ({item}) => {
  return (
    // Flat List Item
    <Text
      style={{
        padding: 10,
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Andale Mono',
      }}
      onPress={() => getItem(item)}>
      No Data Found
    </Text>
  );
};
