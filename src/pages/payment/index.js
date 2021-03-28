import React, {useEffect, useState} from 'react';
import {
  Image,
  View,
  FlatList,
  TouchableOpacity,
  Alert,
  Modal,
  Platform,
} from 'react-native';
import {Button} from '../../components/Button';
import {Layout} from '../../components/layout';
import {Section} from '../../components/section';
import {addABid, startmessage} from '../../models/app';
import {connect} from 'dva';
import {WebView} from 'react-native-webview';
import Icon from 'react-native-vector-icons/Ionicons';
import {APIURL, PAYPALURL} from '../../utils';
import {Text} from '@ui-kitten/components';

export default connect(
  ({app}) => ({message: app.message.payment, user: app.user}),
  {
    addABid,
    startmessage,
  },
)(function Payment(props) {
  const [Select, setSelect] = useState(1);
  const [tab, settab] = useState(0);
  const [payment, setpayment] = useState();
  const [paymentM, setpaymentM] = useState(false);
  const paymentMethod = ['Yes, Please.', 'No, Continue'];
  let data = props.route.params.data;
  data = {
    ...data,
    highlighted: {...payment, status: payment ? 'paid' : 'unpaid'},
  };
  const [loading, setloading] = useState(false);

  useEffect(() => {
    return () => {
      setpayment(undefined);
      setpaymentM(false);
    };
  }, []);

  useEffect(() => {
    if (props.message) {
      setloading(false);
      if (props.message.errors) {
        Alert.alert(
          'Error',
          'Unable to create a Bid, some error occured.',
          [
            {
              text: 'OK',
              onPress: () => {
                props.startmessage('payment', undefined);
              },
            },
          ],
          {cancelable: false},
        );
      } else {
        props.startmessage('payment', undefined);

        props.navigation.replace('Success', {
          data: props.message,
          status: payment ? true : false,
        });
      }
    }
  }, [props.message]);

  const onPaymentReceive = (data) => {
    if (data.title == 'success') {
      const paypal = data.url
        .split('?')[1]
        .split('&')
        .map((e) => {
          const split = e.split('=');
          return {
            [split[0]]: split[1],
          };
        });
      setpayment(paypal);
      setpaymentM(false);
    } else if (data.title == 'cancel') {
      console.log('Failed', {data});
      setpaymentM(false);
    }
  };

  useEffect(() => {
    if (payment) {
      props.addABid(data);
      setloading(true);
    }
  }, [payment]);

  const Accept = () => {
    if (Select == 0 && !payment) return Alert.alert('Woah! You cant do that.');
    Alert.alert(
      'Are you sure you want to procced.',
      'You sure you want to procced with the bid, you wont be able to make any cahnges.',
      [
        {
          text: 'Accept',
          onPress: () => {
            props.addABid(data);
            setloading(true);
          },
        },
        {text: 'Cancel', onPress: () => console.log('No Pressed')},
      ],
      {cancelable: false},
    );
  };
  return (
    <Layout
      btnProps={{
        children: 'Accept',
        onPress: Accept,
      }}
      btnEnabled
      disableTabs>
      <Section style={{height: '100%'}}>
        <Text
          category={'h2'}
          style={
            {
              // fontSize: 26,
              // fontWeight: 'bold',
            }
          }>
          Highlight your Bid
        </Text>
        <View style={{height: 40}} />
        <FlatList
          data={paymentMethod}
          renderItem={({item, index}) => {
            return (
              <>
                <TouchableOpacity
                  onPress={() => setSelect(index)}
                  style={{
                    paddingHorizontal: 14,
                    paddingVertical: 18,
                    backgroundColor: 'white',
                    marginBottom: 20,
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <Text category={'p1'} style={{}}>
                    {item}
                  </Text>
                  <Image
                    style={{}}
                    source={
                      index !== Select
                        ? require(`../../assets/images/notselected.png`)
                        : require(`../../assets/images/selected.png`)
                    }
                  />
                </TouchableOpacity>

                {Select == 0 && index == 0 && (
                  <View style={{backgroundColor: 'white', marginBottom: 10}}>
                    <Section>
                      <Button
                        status={'warning'}
                        onPress={() => setpaymentM(true)}
                        centered
                        // dark
                      >
                        Pay Now with PayPal
                      </Button>
                    </Section>
                  </View>
                )}
              </>
            );
          }}
        />
      </Section>

      <Modal
        animationType="slide"
        transparent={false}
        visible={paymentM}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          // setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            flex: 1,
            paddingVertical: Platform.OS == 'ios' ? 30 : undefined,
            zIndex: 999,
            position: 'relative',
          }}>
          <View
            style={{
              width: '100%',
              alignItems: 'flex-end',
            }}>
            <Section>
              <TouchableOpacity onPress={() => setpaymentM(false)}>
                <Icon size={30} color={'black'} name={'close'} />
              </TouchableOpacity>
            </Section>
          </View>
          <WebView
            source={{
              html: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Document</title>
  </head>
  <body style="height: 100vh">
    <div
      style="
        justify-content: center;
        align-items: center;
        text-align: center;
        margin: auto;
        display: flex;
        height: 100%;
      "
    >
      <!-- <h1>Paypal</h1> -->
      <form name="f1" style="display:none" action="${PAYPALURL}/pay">
        <button type="submit">Pay</button>
      </form>
      <lottie-player
        src="https://assets4.lottiefiles.com/packages/lf20_BzUyid.json"
        background="transparent"
        speed="0.6"
        loop
        autoplay
      ></lottie-player>
    </div>
    <script src="https://unpkg.com/@lottiefiles/lottie-player@latest/dist/lottie-player.js"></script>
    <script>
      setTimeout(() => {
        document.f1.submit();
      }, 1000);
    </script>
  </body>
</html>
`,
            }}
            // source={{uri: PAYPALURL}}
            onNavigationStateChange={onPaymentReceive}
            injectedJavaScript={`setTimeout(()=>document.f1.submit(),1000)`}
          />
        </View>
      </Modal>
    </Layout>
  );
});
