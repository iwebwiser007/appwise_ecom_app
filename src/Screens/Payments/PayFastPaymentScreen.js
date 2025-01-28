import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { WebView } from 'react-native-webview';
import { createShipmentOrder } from '../../Services/CouriorGuyService/ShipmentServices';
import { fetchCartItems, removeItemFromCart } from '../../Api/api';
const PayFastPaymentScreen = ({ route, navigation }) => {
  const { totalAmount, userData, shippingData, productId } = route.params;
  const [loading, setLoading] = useState(true);
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  useEffect(() => {
    console.log('User Data:', userData);
    console.log('Shipping Data:', shippingData);
  }, [shippingData, userData]);

  const merchantId = '10000100'; // Merchant ID
  const merchantKey = '46f0cd694581a'; // Merchant key
  const returnURL = 'https://yourwebsite.com/success'; // Success URL
  const cancelURL = 'https://yourwebsite.com/cancel'; // Cancel URL
  const notifyURL = 'https://yourwebsite.com/notify'; // Notify URL

  // PayFast URL
  const payfastURL = `https://sandbox.payfast.co.za/eng/process?merchant_id=${merchantId}&merchant_key=${merchantKey}&amount=${totalAmount}&item_name=Test&item_description=Test&return_url=${returnURL}&cancel_url=${cancelURL}&notify_url=${notifyURL}`;
  const clearCart = async () => {
    try {
      const cartItems = await fetchCartItems(userData.id);
      for (const item of cartItems) {
        await removeItemFromCart(userData.id, item.product_id);
      }
      console.log('Cart cleared successfully');
    } catch (error) {
      console.error('Error clearing cart:', error);
    }
  };
  const placeOrderAndShipment = async () => {
    if (isOrderPlaced) {return;}
    setIsOrderPlaced(true);
    let orderId;
    let shipmentId;
    try {
      // Place Order
      const orderResponse = await fetch('http://213.210.21.175:5000/AW0001/api/v1/addorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userData.id,
          shipping_id: shipmentId,
          delivery_option: 'Standard',
          shipping_charges: shippingData.deliveryCost,
          order_status: 'Pending',
          coupon_code: '',
          payment_method: 'PayFast',
          payment_gateway: 'PayFast',
          grand_total: totalAmount,
          courier_name: 'The Courior Guy',
          tracking_number: '',
          is_pushed: '0',
        }),
      });

      const orderResult = await orderResponse.json();

      if (!orderResponse.ok) {
        console.error('Error creating order:', orderResult);
        throw new Error(orderResult.message || 'Failed to create order.');
      }

      console.log('Order placed:', orderResult);
      orderId = orderResult.data.id; // Extract order_id

      // Create  shipment
      const shipmentResult = await createShipmentOrder(
        shippingData.id,
        productId,
        userData.id,
        orderId
      );

      console.log('Shipment created:', shipmentResult);
      shipmentId = shipmentResult.id;
        // Clear the cart
        await clearCart();

      // Navigate to the success screen
      navigation.reset({
        index: 0,
        routes: [{ name: 'SucessOrder' }],
      });
    } catch (error) {
      console.error('Error:', error);

      // order if shipment creation failed
      if (orderId) {
        await fetch(`http://213.210.21.175:5000/AW0001/api/v1/deleteorder/${orderId}`, {
          method: 'DELETE',
        }).catch((deleteError) => {
          console.error('Error rolling back order:', deleteError);
        });
      }

      Alert.alert('Error', 'Failed to process the order and shipment. Please try again.');
    }
  };

  const handleNavigationStateChange = (event) => {
    if (event.url.includes('success')) {
      placeOrderAndShipment();
    } else if (event.url.includes('cancel')) {
      Alert.alert('Payment Cancelled', 'You have cancelled the payment.');
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      {loading && (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />
      )}
      <WebView
        source={{ uri: payfastURL }}
        onLoadEnd={() => setLoading(false)}
        onNavigationStateChange={handleNavigationStateChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  loader: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -25 }, { translateY: -25 }],
  },
});

export default PayFastPaymentScreen;
