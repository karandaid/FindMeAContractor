import React, {useEffect, useState} from 'react';
import {Text, Image, View, FlatList, ActivityIndicator} from 'react-native';
import {Input} from '../../components/Input';
import {Button, OutlineButton} from '../../components/Button';
import {TextTabs} from '../../components/Tab';
import Icon from 'react-native-vector-icons/Ionicons';
import {APJobCard} from '../../components/Card/APJobCard';
import {JobCard} from '../../components/Card/JobCard';
import {Layout} from '../../components/layout';
import {Section} from '../../components/section';
import Jobs from '../../service/jobs';
import {connect} from 'dva';
import {LIMIT} from '../../utils';

export default connect(({app}) => ({user: app.user}))(function Projects(props) {
  const awarded = ['Active', 'Awarded', 'Completed', 'Closed'];
  const [selected, setselected] = useState(0);
  const [projects, setprojects] = useState([]);
  const [loading, setloading] = useState(false);
  const [pagination, setpagination] = useState(0);
  useEffect(() => {
    setpagination(0);
  }, [selected]);
  useEffect(() => {
    setloading(true);
    if (selected == 0) {
      Jobs.getJobs(
        pagination,
        LIMIT,
        'created_at:desc',
        'uid:' + props.user._id + ',status:active',
      ).then((e) => {
        setloading(false);
        setprojects(
          pagination == 0 ? e.data.data : [...projects, ...e.data.data],
        );
      });
    } else if (selected == 1) {
      Jobs.getJobs(
        pagination,
        LIMIT,
        'created_at:desc',
        'uid:' + props.user._id + ',status:awarded',
      ).then((e) => {
        setloading(false);
        setprojects(
          pagination == 0 ? e.data.data : [...projects, ...e.data.data],
        );
      });
    } else if (selected == 2) {
      Jobs.getJobs(
        pagination,
        LIMIT,
        'created_at:desc',
        'uid:' + props.user._id + ',status:completed',
      ).then((e) => {
        setloading(false);
        setprojects(
          pagination == 0 ? e.data.data : [...projects, ...e.data.data],
        );
      });
    } else {
      Jobs.getJobs(
        pagination,
        LIMIT,
        'created_at:desc',
        'uid:' + props.user._id + ',status:closed',
      ).then((e) => {
        setloading(false);
        setprojects(
          pagination == 0 ? e.data.data : [...projects, ...e.data.data],
        );
      });
    }
  }, [selected, pagination]);
  return (
    <Layout active={4}>
      <TextTabs tabsContent={awarded} onTabChange={(e) => setselected(e)} />

      {/* <Section> */}
      <FlatList
        ListEmptyComponent={EmptyListMessage}
        ListFooterComponent={() =>
          projects.length > 0 && (
            <Section>
              <Button
                dark
                centered
                onPress={() => setpagination(pagination + 1)}>
                Load More
              </Button>
            </Section>
          )
        }
        renderItem={(e) => (
          <JobCard
            data={e}
            onPress={() =>
              props.navigation.navigate('Post', {
                data: e,
                self: e.item.status != 'awarded' && true,
                awarded: e.item.status == 'awarded' && true,
              })
            }></JobCard>
          // <View />
        )}
        data={projects}
      />
      {loading && (
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
      {/* </Section> */}
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
