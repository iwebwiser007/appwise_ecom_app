import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';


const BASE_URL = 'http://213.210.21.175:5000/AW0001/api/v1';

const AddAddress = ({ navigation, route }) => {
  const { onSaveAddress, addressToEdit} = route.params || {};
  const [name, setName] = useState(addressToEdit ? addressToEdit.name : '');
  const [address, setAddress] = useState(addressToEdit ? addressToEdit.address : '');
  const [city, setCity] = useState(addressToEdit ? addressToEdit.city : '');
  const [state, setState] = useState(addressToEdit ? addressToEdit.state : '');
  const [country, setCountry] = useState(addressToEdit ? addressToEdit.country : '');
  const [pincode, setPincode] = useState(addressToEdit ? addressToEdit.pincode : '');
  const [mobile, setMobile] = useState(addressToEdit ? addressToEdit.mobile : '');

  // Function to send address data to the API
  const handleSave = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        Alert.alert('Error', 'User is not logged in.');
        return;
      }

      if (!name || !address || !city || !state || !country || !pincode || !mobile) {
        Alert.alert('Error', 'All fields are required.');
        return;
      }

      const newAddress = {
        user_id: userId,
        name,
        address,
        city,
        state,
        country,
        pincode,
        mobile,
      };
      // Save the address (API call or local storage)
      try {
        const response = await fetch(`${BASE_URL}/addDeliveryAddress`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newAddress),
        });
        const result = await response.json();
        if (response.ok && result.statuscode === 200) {
          Alert.alert('Success', 'Address saved successfully.');
          if (onSaveAddress) {
            onSaveAddress(result.data);
          }
          navigation.goBack();
        } else {
          Alert.alert('Error', result.message || 'Failed to save address.');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to save address. Please try again later.');
      }
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  };


  const renderInput = (label, value, onChangeText, keyboardType = 'default') => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        placeholder={`Enter ${label}`}
        value={value}
        onChangeText={onChangeText}
        style={styles.input}
        keyboardType={keyboardType}
        placeholderTextColor="#999"
      />
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}> Add Address</Text>
      </View>
      {renderInput('Full Name', name, setName)}
      {renderInput('Address', address, setAddress)}
      {renderInput('City', city, setCity)}
      {renderInput('State', state, setState)}
      {renderInput('Country', country, setCountry)}
      {renderInput('Pincode', pincode, setPincode)}
      {renderInput('Mobile Number', mobile, setMobile)}

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>SAVE ADDRESS</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
  },
  backButton: {
    fontSize: 24,
    color: '#000',
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: 30,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginBottom: 15,
    backgroundColor: '#fff',
  },
  label: {
    position: 'absolute',
    top: -10,
    left: 12,
    fontSize: 12,
    color: '#999',
    backgroundColor: '#f5f5f5',
    paddingHorizontal: 4,
  },
  input: {
    fontSize: 16,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#00B0FF',
    padding: 15,
    borderRadius: 35,
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default AddAddress;
