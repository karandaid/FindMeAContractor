import React, {useState} from 'react';
import {Text, View, Alert} from 'react-native';
import {Input} from '../../components/Input';
import {Layout} from '../../components/layout';
import {Section} from '../../components/section';
import Textarea from 'react-native-textarea';

export default function Bid(props) {
  const [description, setdescription] = useState();
  const [cost, setamount] = useState();
  const jid = props.route.params.id;
  console.log(props.route.params);
  const uid = props.route.params.uid;
  return (
    <Layout
      btnProps={{
        children: 'Confirmed',
        onPress: () => {
          if (
            description &&
            description.length > 100 &&
            cost &&
            parseInt(cost)
          ) {
            props.navigation.navigate('Payment', {
              data: {description, cost, jid, uid},
            });
          } else {
            Alert.alert(
              'Woah',
              'Make sure you have filled the required input feilds.',
              [{text: 'OK', onPress: () => console.log('OK Pressed')}],
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
          Your Bid
        </Text>
        <View style={{height: 40}} />
        <View style={{flex: 1}}>
          <View style={{marginBottom: 10}}>
            <Text
              style={{
                color: '#707070',
                fontFamily: 'Andale Mono',
                marginBottom: 5,
              }}>
              Paid to you
            </Text>
            <Input
              inputProps={{
                onChangeText: (e) => setamount(e),
                keyboardType: 'numeric',
                placeholder: 'Enter an amount.',
              }}
            />
          </View>

          <View>
            <Text
              style={{
                color: '#707070',
                fontFamily: 'Andale Mono',
                marginBottom: 5,
              }}>
              Description
            </Text>
            {/* <Input
              containerStyle={{height: '90%', alignItems: 'flex-start'}}
              inputProps={{
                multiline: true,
                numberOfLines: 10,
                onChangeText: (e) => setdescription(e),
              }}
            /> */}
            <Textarea
              containerStyle={{
                backgroundColor: 'white',
                height: '90%',
                padding: 10,
              }}
              style={{padding: 10, fontSize: 16, fontFamily: 'Andale Mono'}}
              onChangeText={(e) => setdescription(e)}
              maxLength={500}
              placeholder={'Add a appropriate description.'}
              placeholderTextColor={'gray'}
              underlineColorAndroid={'transparent'}
            />
          </View>
          <View style={{height: 0}} />
        </View>
      </Section>
    </Layout>
  );
}
