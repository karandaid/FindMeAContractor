import {useNavigation} from '@react-navigation/native';
import {BottomNavigation, BottomNavigationTab} from '@ui-kitten/components';
import {connect} from 'dva';
import React, {useEffect, useState} from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
export const Tab = connect(
  ({app}) => ({user: app.user}),
  {},
)(({containerStyle, onTabChange, active, ...props}) => {
  const [selected, setselected] = useState(active ? active - 1 : 0);
  console.log({props});
  const tabs = [
    {name: 'search-outline', onPress: () => navigation.replace('Home')},
    {
      name: 'newspaper-outline',
      onPress: () => props.user && navigation.replace('Projects'),
    },
    {
      name: 'ios-add-circle-outline',
      onPress: () => navigation.navigate('Posts'),
    },
    {
      name: 'paper-plane-outline',
      onPress: () => props.user && navigation.replace('MyProjects'),
    },
    {
      name: 'ios-person-circle-outline',
      onPress: () => navigation.replace('Profile'),
    },
  ];

  useEffect(() => {
    onTabChange && onTabChange(selected);
  }, [selected]);
  const navigation = useNavigation();

  return (
    // <View
    //   style={{
    //     backgroundColor: 'white',
    //     paddingBottom: Platform.OS == 'ios' ? 20 : 0,

    //     height: Platform.OS == 'ios' ? 70 : 50,
    //     flexDirection: 'row',
    //     ...containerStyle,
    //   }}>
    //   {tabs.map((e, i) => (
    //     <TouchableOpacity
    //       key={i + 't'}
    //       onPress={e.onPress}
    //       style={{
    //         flex: 1,
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         borderTopWidth: selected == i ? 2 : undefined,
    //         borderTopColor: selected == i ? 'black' : undefined,
    //       }}>
    //       <Icon size={25} color={'black'} name={e.name} />
    //     </TouchableOpacity>
    //   ))}
    // </View>
    <BottomNavigation
      selectedIndex={selected}
      onSelect={(index) => {
        setselected(index);
        tabs[index].onPress();
      }}
      // onTabChange={(e) => console.log(tabs[e])}
    >
      {tabs.map((e, i) => (
        <BottomNavigationTab
          icon={() => <Icon size={25} color={'black'} name={e.name} />}
          title=""
        />
      ))}
      {/* // <BottomNavigationTab icon={BellIcon} title="ORDERS" />
      // <BottomNavigationTab icon={EmailIcon} title="TRANSACTIONS" /> */}
    </BottomNavigation>
  );
});
export function TextTabs({containerStyle, onTabChange, tabsContent}) {
  const [selected, setselected] = useState(0);

  useEffect(() => {
    onTabChange && onTabChange(selected);
  }, [selected]);
  return (
    <View
      style={{
        backgroundColor: 'white',
        height: 50,
        flexDirection: 'row',
        ...containerStyle,
      }}>
      {tabsContent.map((e, i) => (
        <TouchableOpacity
          key={i}
          onPress={() => setselected(i)}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderTopWidth: selected == i ? 1 : undefined,
            borderTopColor: selected == i ? 'black' : undefined,
            borderBottomWidth: selected == i ? 1 : undefined,
            borderBottomColor: selected == i ? 'black' : undefined,
          }}>
          <Text style={{}}>{e}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
