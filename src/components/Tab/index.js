import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {Platform, Text, TouchableOpacity, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export function Tab({containerStyle, onTabChange, active}) {
  const [selected, setselected] = useState(active ? active - 1 : 0);
  const tabs = [
    {name: 'search-outline', onPress: () => navigation.replace('Home')},
    {name: 'newspaper-outline', onPress: () => navigation.replace('Projects')},
    {
      name: 'ios-add-circle-outline',
      onPress: () => navigation.naviga('Posts'),
    },
    {
      name: 'paper-plane-outline',
      onPress: () => navigation.replace('MyProjects'),
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
    <View
      style={{
        backgroundColor: 'white',
        paddingBottom: Platform.OS == 'ios' && 20,

        height: Platform.OS == 'ios' ? 70 : 50,
        flexDirection: 'row',
        ...containerStyle,
      }}>
      {tabs.map((e, i) => (
        <TouchableOpacity
          key={i + 't'}
          onPress={e.onPress}
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            borderTopWidth: selected == i && 2,
            borderTopColor: selected == i && 'black',
          }}>
          <Icon size={25} color={'black'} name={e.name} />
        </TouchableOpacity>
      ))}
    </View>
  );
}
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
            borderTopWidth: selected == i && 1,
            borderTopColor: selected == i && 'black',
            borderBottomWidth: selected == i && 1,
            borderBottomColor: selected == i && 'black',
          }}>
          <Text style={{fontFamily: 'Andale Mono'}}>{e}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}
