/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { addNewAddress } from '../APIServer';

const BASE_URL = 'http://213.210.21.175:5000/AW0001/api/v1/';

const ShippingAddress = ({ navigation }) => {
  const [addresses, setAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        const storedAddresses = await AsyncStorage.getItem('userAddresses');
        if (storedAddresses) {
          setAddresses(JSON.parse(storedAddresses));
          setIsLoading(false);
          return;
        }

        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          console.error('User ID not found in storage.');
          return;
        }
        const response = await fetch(`${BASE_URL}/getDeliveryAddress?user_id=${userId}`);

        const result = await response.json();

        if (response.ok && result.statuscode === 200) {
          setAddresses(result.data);
          await AsyncStorage.setItem('userAddresses', JSON.stringify(result.data));
        } else {
          console.error('Failed to fetch addresses:', result.message);
        }
      } catch (error) {
        console.error('Error fetching delivery addresses:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, []);

  const addOrUpdateAddress = async (newAddress) => {
    try {
      const updatedAddresses = [...addresses, newAddress];
      const response = await addNewAddress(newAddress);
      if (response.statuscode === 200) {
        setAddresses(updatedAddresses);
        await AsyncStorage.setItem('userAddresses', JSON.stringify(updatedAddresses));
      }
    } catch (error) {
      console.error('Error adding/updating address:', error);
    }
  };

  const handleAddAddress = () => {
    navigation.navigate('AddAddress', {
      onSaveAddress: addOrUpdateAddress,
    });
  };

  const handleSelectAddress = async (selectedAddress) => {
    try {
      const updatedAddresses = addresses.map((address) => ({
        ...address,
        isSelected: address.id === selectedAddress.id,
      }));
      setAddresses(updatedAddresses);

      await AsyncStorage.setItem('userAddresses', JSON.stringify(updatedAddresses));
      await AsyncStorage.setItem('selectedAddress', JSON.stringify(selectedAddress));

      console.log('Selected Address:', selectedAddress);
      await AsyncStorage.setItem('selectedAddress', JSON.stringify(selectedAddress));
      navigation.goBack( );
    } catch (error) {
      console.error('Error saving selected address or navigating:', error);
    }
  };

  const handleEditAddress = (address) => {
    navigation.navigate('AddAddress', {
      onSaveAddress: addOrUpdateAddress,
      addressToEdit: address,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Shipping Address</Text>
      </View>

      {isLoading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#000" />
        </View>
      ) : (
        <ScrollView contentContainerStyle={styles.addressList}>
          {addresses.map((address) => (
            <TouchableOpacity onPress={()=>handleSelectAddress(address)} key={address.id} style={styles.addressCard}>
              <View style={styles.addressInfo}>
                <View style={styles.upperText}>
                  <Text style={styles.name}>{address.name}</Text>
                  <TouchableOpacity style={{padding:5}} onPress={() => handleEditAddress(address)}>
                    <Text style={styles.editText}>Edit</Text>
                  </TouchableOpacity>
                </View>
                <Text style={styles.addressText}>
                  {address.address}, {address.city}, {address.state}, {address.country} - {address.pincode}
                </Text>
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => handleSelectAddress(address)}
                >
                  <Icon
                    name={address.isSelected ? 'checkbox' : 'square-outline'}
                    size={20}
                    color={address.isSelected ? '#222222' : '#555'}
                  />
                  <Text style={styles.checkboxText}>Use as the shipping address</Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}

      <TouchableOpacity style={styles.addButton} onPress={handleAddAddress}>
        <Icon name="add-circle" size={60} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  upperText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  addressList: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  addressCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addressInfo: {
    marginBottom: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  addressText: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
  },
  checkboxText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 5,
  },
  editText: {
    color: '#00B0FF',
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 30,
    overflow: 'hidden',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ShippingAddress;
