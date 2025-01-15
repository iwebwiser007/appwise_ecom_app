/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
/* eslint-disable no-unused-vars */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CheckBox from '@react-native-community/checkbox';
import {useFocusEffect} from '@react-navigation/native';
import {generatePayment} from '../APIServer';

const CheckoutScreen = ({navigation, route}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [shippingAddress, setShippingAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('Online Payment');
  const [cartItems, setCartItems] = useState([]);
  const [deliveryCost, setDeliveryCost] = useState(90);
  const [userId, setUserId] = useState(null);
  const [isChecked, setIsChecked] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (cartItems.length > 0 && shippingAddress) {
      fetchDeliveryCostValue();
    }
  }, [cartItems, shippingAddress]);


  useEffect(() => {
    const deliveryIdFromShipping = route.params?.deliveryId || null;
    if (deliveryIdFromShipping) {
      setDeliveryCost(0);
      setIsLoading(true);
      fetchDeliveryCostValue(deliveryIdFromShipping);
    }
  }, [route.params?.deliveryId]);

  useEffect(() => {
    const calculateTotalAmount = () => {
      const cartTotal = cartItems.reduce((acc, item) => {
        const price = item.price || 0;
        const quantity = item.quantity || 0;
        return acc + price * quantity;
      }, 0);
      const finalTotal = cartTotal + deliveryCost;

      console.log('Updated Cart Total:', cartTotal, 'Delivery Cost:', deliveryCost, 'Final Total:', finalTotal);
      setTotalAmount(finalTotal);
    };

    calculateTotalAmount();
  }, [cartItems, deliveryCost]);
  useEffect(() => {
    const fetchLocalStorageData = async () => {
      try {
        setIsLoading(true);

        const storedUserId = await AsyncStorage.getItem('userId');
        const storedSelectedAddress = await AsyncStorage.getItem('selectedAddress');
        const storedCartItems = await AsyncStorage.getItem('cartItems');

        if (storedUserId) {setUserId(JSON.parse(storedUserId));}
        if (storedSelectedAddress) {setShippingAddress(JSON.parse(storedSelectedAddress));}
        if (storedCartItems) {setCartItems(JSON.parse(storedCartItems));}

      } catch (error) {
        console.error('Error fetching data from local storage:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocalStorageData();
  }, []);

  // Fetch delivery cost from API
  const fetchDeliveryCostValue = async (deliveryId) => {
    try {
      if (!shippingAddress || cartItems.length === 0) {
        setDeliveryCost(0);
        return;
      }

      const productIds = cartItems.map(item => item.id);

      const requestBody = {
        company_Id: '1',
        delivery_Id: deliveryId,
        product_Id: productIds.join(','),
      };

      const response = await fetch(
        'http://213.210.21.175:5000/AW0001/api/v1/calculateRate',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        }
      );

      const data = await response.json();

      console.log('Delivery Cost API Response:', data);

      if (data?.data?.rates?.length > 0) {
        const deliveryCharge = data.data.rates[0].base_rate.charge;
        setDeliveryCost(deliveryCharge);

        // Update total amount to include delivery charge
        const cartTotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
      setTotalAmount(cartTotal + deliveryCharge);
      } else {
        setDeliveryCost(0);
      }
    } catch (error) {
      console.error('Error fetching delivery cost:', error);
      setDeliveryCost(0);
    }
  };

  // Update total amount based on fetched delivery cost
  useEffect(() => {
    if (route.params?.totalAmount) {
      const finalTotal = route.params.totalAmount + deliveryCost;
      setTotalAmount(finalTotal);
    }
  }, [route.params?.totalAmount, deliveryCost]);

  useFocusEffect(
    React.useCallback(() => {
      const fetchSelectedAddress = async () => {
        try {
          const storedSelectedAddress = await AsyncStorage.getItem(
            'selectedAddress',
          );
          if (storedSelectedAddress) {
            setShippingAddress(JSON.parse(storedSelectedAddress));
          }
        } catch (error) {
          console.error('Error fetching selected address:', error);
        }
      };
      fetchSelectedAddress();
    }, []),
  );

  const handleSubmitOrder = async () => {
    setIsLoading(true);
    const paymentData = {
      amount: totalAmount,
      items: cartItems,
      payment_method: paymentMethod,
      shipping_address: shippingAddress,
      user_id: userId,
      merchant_id: '10000100',
      merchant_key: '46f0cd694581a',
    };

    const paymentResponse = await generatePayment(paymentData);

    if (paymentResponse?.status) {
      let payFastUrl = paymentResponse.data.payFastUrl;
      payFastUrl = payFastUrl.replace(/\.$/, '');

      navigation.navigate('PayFastPaymentScreen', {
        totalAmount: totalAmount,
        deliveryCost: deliveryCost,
        payFastUrl,
        userData: {id: userId},
        shippingData: shippingAddress,
      });
    } else {
      alert('Payment initiation failed. Please try again.');
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00B0FF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Checkout</Text>
      </View>

      {/* Shipping Address */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shipping address</Text>
        <View style={styles.card}>
          <TouchableOpacity>
            <Text
              style={styles.changeText}
              onPress={() => navigation.navigate('ShippingAddress', {userId})}>
              Change
            </Text>
          </TouchableOpacity>
          {shippingAddress ? (
            <>
              <Text style={styles.addressText}>{shippingAddress.name}</Text>
              <Text style={styles.addressText}>{shippingAddress.address}</Text>
              <Text style={styles.addressText}>
                {shippingAddress.city}, {shippingAddress.state},{' '}
                {shippingAddress.pincode}
              </Text>
              <Text style={styles.addressText}>
                Mobile: {shippingAddress.mobile}
              </Text>
            </>
          ) : (
            <Text style={styles.addressText}>No address selected</Text>
          )}
        </View>
      </View>

      {/* Payment Method */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Payment</Text>
        <View style={styles.Courior}>
          <Text style={styles.paymentText}>{paymentMethod}</Text>
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={isChecked}
            onValueChange={setIsChecked}
            style={styles.checkbox}
            tintColors={{true: '#222222', false: 'black'}}
          />
          <Text style={styles.checkboxText}>I agree to pay with PayFast.</Text>
        </View>
      </View>

      {/* Delivery Method */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Delivery Partner</Text>
        <View style={styles.Courior}>
          <Image
            source={require('../../components/imgs/delivery.png')}
            style={styles.paymentIcon}
          />
        </View>
      </View>

      {/* Order Summary */}
      <View style={styles.summaryRow}>
        <Text>Order:</Text>
        <Text style={styles.price}>R{(totalAmount - deliveryCost).toFixed(2)}</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text>Delivery:</Text>
        <Text style={styles.price}>R{deliveryCost.toFixed(2)}</Text>
      </View>
      <View style={styles.summaryRow}>
        <Text>Summary:</Text>
        <Text style={styles.price}>R{totalAmount.toFixed(2)}</Text>
      </View>

      {/* Submit Order */}
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmitOrder}>
        <Text style={styles.submitButtonText}>SUBMIT ORDER</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F9F9F9',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 70,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  card: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  addressText: {
    fontSize: 14,
    marginBottom: 4,
    fontFamily: 'Metropolis',
  },
  changeText: {
    color: '#00B0FF',
    fontWeight: '600',
    alignSelf: 'flex-end',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxText: {
    fontSize: 14,
    color: '#000',
  },
  Courior: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  paymentIcon: {
    width: '100%',
    height: '100%',
  },
  paymentText: {
    flex: 1,
    fontSize: 16,
    textAlign: 'left',
    marginLeft: 10,
  },
  price: {
    fontWeight: 'bold',
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  submitButton: {
    backgroundColor: '#00B0FF',
    paddingVertical: 12,
    borderRadius: 35,
    alignItems: 'center',
    marginVertical: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CheckoutScreen;
