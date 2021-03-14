import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, TouchableOpacity, Alert} from 'react-native';
import {Layout} from '../../components/layout';
import {Section} from '../../components/section';
import {BidsCard} from '../../components/Card/BidsCard';
import Bid from '../../service/bid';
import {connect} from 'dva';
import {awardABid} from '../../models/app';
import Jobs from '../../service/jobs';

export default connect(({app}) => ({jb: app.message.bids}), {awardABid})(
  function Bids(props) {
    const [Select, setSelect] = useState(undefined);
    const [userSelect, setuserSelect] = useState(undefined);
    const [bids, setbids] = useState([]);
    const jid = props.route.params;
    const [loading, setloading] = useState(false);
    useEffect(() => {
      Bid.getBids(
        0,
        10,
        'created_at:desc',
        'jid:' + jid.id + ',status:active',
      ).then(({data}) => {
        setbids(data.data);
      });
    }, []);

    useEffect(() => {
      if (props.jb) {
        console.log({props}, props.jb);
        Jobs.getJobs(
          0,
          1,
          'created_at:desc',
          'awarded:' + bids[Select]._id,
        ).then((e) => {
          console.log({e});
          props.navigation.replace('Post', {
            data: {item: e.data.data[0], index: 0},
            awarded: true,
          });
        });
      }
    }, [props.jb]);

    return (
      <Layout
        btnProps={{
          children: 'Accept',
          onPress: () => {
            if (Select != undefined) {
              Alert.alert(
                'Hold on!',
                'You sure you want to award this bid?',
                [
                  {
                    text: 'Yes',
                    onPress: () => {
                      props.awardABid({jid: jid.id, bid: bids[Select]._id});
                    },
                  },
                  {
                    text: 'No',
                    onPress: () => {},
                  },
                ],
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
            Bids
          </Text>
          <View style={{height: 40}} />
          <FlatList
            data={bids}
            ListEmptyComponent={EmptyListMessage}
            renderItem={({index, item}) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    Select == index ? setSelect(undefined) : setSelect(index)
                  }
                  style={{marginBottom: 10}}>
                  <BidsCard data={{item, index}} active={Select == index} />
                </TouchableOpacity>
              );
            }}
          />
        </Section>
      </Layout>
    );
  },
);
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
