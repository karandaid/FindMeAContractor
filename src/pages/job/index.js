import React, {useEffect, useState} from 'react';
import {Text, View, FlatList, TouchableOpacity} from 'react-native';
import {Input} from '../../components/Input';
import {Button} from '../../components/Button';
import Icon from 'react-native-vector-icons/Ionicons';
import {JobCard} from '../../components/Card/JobCard';
import {Layout} from '../../components/layout';
import {Section} from '../../components/section';
import {connect} from 'dva';
import {authenticated, getJobs} from '../../models/app';
import ModalDropdown from 'react-native-modal-dropdown';
import {getData, LIMIT, RANDOMWORDS} from '../../utils';
import {LocationCom} from '../posts';

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
  const [city, setcity] = useState();
  const [filter, setfilter] = useState('status:active');
  const [locationmodal, setlocationmodal] = useState(false);
  const [random, setrandom] = useState();
  useEffect(() => {
    (async () => {
      const loc = await getData('@location');
      console.log({loc});
      console.log(loc.address.city);
      setcity(loc.address.city);
    })();

    props.authenticated();
  }, []);

  useEffect(() => {
    console.log(0);
    if (city) {
      props.getJobs({
        page: pagination,
        limit: LIMIT,
        sort: 'created_at:desc',
        filter: filter + ',city:' + city + '',
      });
    }
  }, [filter, pagination, city, random]);
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
          rightComponent={
            <TouchableOpacity onPress={() => setlocationmodal(true)}>
              <Icon size={20} color={'black'} name={'md-earth-outline'} />
            </TouchableOpacity>
          }
          leftComponent={
            <TouchableOpacity>
              <Icon size={20} color={'black'} name={'search-outline'} />
            </TouchableOpacity>
          }
        />
        <View style={{width: 8}} />

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
            justifyContent: 'center',
            alignItems: 'center',
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
          setrandom(RANDOMWORDS(2));
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
      <LocationCom
        setlocationmodal={setlocationmodal}
        locationmodal={locationmodal}
        onSelect={(e) => {
          console.log('Location modal Closed');
          setcity(e);
          setlocationmodal(false);
        }}
      />
    </Layout>
  );
});
export const EmptyListMessage = ({item}) => {
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
