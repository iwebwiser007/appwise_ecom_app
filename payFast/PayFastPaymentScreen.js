import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet, Alert} from 'react-native';
import {WebView} from 'react-native-webview';

const PayFastPaymentScreen = ({route, navigation}) => {
  const {totalAmount, userData, shippingData} = route.params;

  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log('User Data:', userData);
    console.log('Shipping Data:', shippingData);
  }, [shippingData, userData]);
  const merchantId = '10000100'; //Merchant ID
  const merchantKey = '46f0cd694581a'; //Merchant key
  const returnURL = 'https://yourwebsite.com/success'; // Success URL
  const cancelURL = 'https://yourwebsite.com/cancel'; // Cancel URL
  const notifyURL = 'https://yourwebsite.com/notify'; // Notify URL

  //PayFast URL
  const payfastURL = `https://sandbox.payfast.co.za/eng/process?merchant_id=${merchantId}&merchant_key=${merchantKey}&amount=${totalAmount}&item_name=Test&item_description=Test&return_url=${returnURL}&cancel_url=${cancelURL}&notify_url=${notifyURL}`;

  const placeOrder = async () => {
    try {
      const response = await fetch('http://213.210.21.175:5000/AW0001/api/v1/addorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userData.id,
          shipping_id: '45tg',
          name: shippingData.name,
          address: shippingData.address,
          city: shippingData.city,
          state: shippingData.state,
          country: shippingData.country,
          pincode: shippingData.pincode,
          mobile: shippingData.mobile,
          email: shippingData.email,
          delivery_option: 'Standard',
          shipping_charges: 150,
          coupon_code: shippingData.deliveryCost,
          coupon_amount: 0,
          order_status: 'Pending',
          payment_method: 'PayFast',
          payment_gateway: 'PayFast',
          grand_total: totalAmount,
          courier_name: '',
          tracking_number: '',
          is_pushed: '0',
        }),
      });

      const result = await response.json();

      if (response.ok) {
        console.log('Order placed:', result);
        navigation.reset({
          index: 0,
          routes: [{ name: 'SucessOrder' }],
        });
      } else {
        Alert.alert('Error', 'Failed to place order. Please try again.');
      }
    } catch (error) {
      console.error('Error placing order:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      )}
      <WebView
        source={{uri: payfastURL}}
        onLoadEnd={() => setLoading(false)}
        onNavigationStateChange={event => {
          console.log('Navigation state:', event.url);
          if (event.url.includes('success')) {
            console.log('Payment successful!');
            // navigation.reset({
            //   index: 0,
            //   routes: [{name: 'SucessOrder'}],
            // });
            placeOrder();
          } else if (event.url.includes('cancel')) {
            console.log('Payment cancelled!');
            navigation.goBack();
          }
          if (event.statusCode === 400) {
            console.error('Bad request: ', event);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1},
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{translateX: -25}, {translateY: -25}],
  },
});

export default PayFastPaymentScreen;
