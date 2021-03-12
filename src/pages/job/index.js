import React, {useEffect, useState} from 'react';
import {Text, Image, View, FlatList} from 'react-native';
import {Input} from '../../components/Input';
import {Button, OutlineButton} from '../../components/Button';
import {TextTabs} from '../../components/Tab';
import Icon from 'react-native-vector-icons/Ionicons';
import {APJobCard} from '../../components/Card/APJobCard';
import {JobCard} from '../../components/Card/JobCard';
import {Layout} from '../../components/layout';
import {Section} from '../../components/section';
import {connect} from 'dva';
import {authenticated, getJobs} from '../../models/app';
import ModalDropdown from 'react-native-modal-dropdown';
import Jobs from '../../service/jobs';
import throttle from 'lodash.throttle';
import {LIMIT} from '../../utils';

export default connect(
  ({app}) => ({
    categories: app.categories,
    jobs: app.jobs,
    user: app.user,
    loading: app.loading.jobs,
    pagination: app.pagination.jobs,
  }),
  {getJobs, authenticated},
)(function Job(props) {
  const [pagination, setpagination] = useState(0);
  const [filter, setfilter] = useState('status:active');
  useEffect(() => {
    props.authenticated();
  }, []);

  useEffect(() => {
    props.getJobs({
      page: pagination,
      limit: LIMIT,
      sort: 'created_at:desc',
      filter: filter,
    });
  }, [filter, pagination]);
  const [search, setsearch] = useState([]);
  const [searchInput, setsearchInput] = useState(undefined);

  const getSearchContent = (str) => {
    setpagination(0);
    setfilter('title:' + `${str}-search,status:active`);
  };
  const filterByCate = (str) => {
    if (!str) {
      setfilter(false);
      setpagination(0);
    } else {
      setfilter('category:' + `${str}-search,status:active`);
      setpagination(0);
    }
  };

  return (
    <Layout>
      <Section row>
        <Input
          containerStyle={{flex: 1, borderRadius: 8}}
          inputStyle={{flex: 1}}
          inputProps={{
            onChangeText: setsearchInput,
            onSubmitEditing: () => getSearchContent(searchInput),
          }}
          leftComponent={
            <Icon size={20} color={'black'} name={'search-outline'} />
          }
        />
        <View style={{width: 8}} />
        {/* <OutlineButton centered>Categories</OutlineButton> */}
        <ModalDropdown
          defaultValue={'Categories'}
          onSelect={(e) =>
            filterByCate([{name: undefined}, ...props.categories][e]?.name)
          }
          style={{
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 8,
            paddingHorizontal: 8,
            paddingVertical: 18,
            backgroundColor: 'white',
            fontFamily: 'Andale Mono',
          }}
          textStyle={{fontFamily: 'Andale Mono'}}
          renderRowText={(e) => (
            <Text style={{fontSize: 16, fontFamily: 'Andale Mono'}}>{e}</Text>
          )}
          options={['categories', ...props?.categories?.map((e) => e.name)]}
        />
      </Section>

      <FlatList
        ListFooterComponent={() => (
          <Section>
            <Button dark centered onPress={() => setpagination(pagination + 1)}>
              Load More
            </Button>
          </Section>
        )}
        ListEmptyComponent={EmptyListMessage}
        onRefresh={() => {
          setpagination(0);
          props.getJobs({
            page: 0,
            limit: 4,
            sort: 'created_at:desc',
            filter: false,
          });
        }}
        refreshing={props.loading}
        renderItem={(e) => (
          <JobCard
            data={e}
            onPress={() =>
              props.navigation.navigate('Post', {data: e})
            }></JobCard>
        )}
        data={search.length > 0 ? search : props.jobs}
      />
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