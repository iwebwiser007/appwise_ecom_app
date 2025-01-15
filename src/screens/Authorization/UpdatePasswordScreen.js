import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UpdatePasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleFocus = (input) => setFocusedInput(input);
  const handleBlur = () => setFocusedInput(null);
  const handleLogin = async () => {
    try {
      const response = await fetch('https://xljhj9lk-3000.inc1.devtunnels.ms/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        await AsyncStorage.setItem('token', data.token);
        navigation.replace('MainApp');
      } else {
        console.error('Login failed:', data.error);
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };


  const renderInput = (label, value, setValue, inputKey, secureTextEntry = false) => (
    <View style={[styles.card, focusedInput === inputKey || value ? styles.focusedCard : {}]}>
      <Text style={[styles.label, focusedInput === inputKey || value ? styles.activeLabel : {}]}>
        {label}
      </Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={setValue}
          onFocus={() => handleFocus(inputKey)}
          onBlur={handleBlur}
          secureTextEntry={secureTextEntry}
          keyboardType={inputKey === 'email' ? 'email-address' : 'default'}
        />
        <View style={styles.password}>
          {inputKey === 'password' && (
            <TouchableOpacity
              style={styles.eyeButton}
              onPress={() => setPasswordVisible(!isPasswordVisible)}
            >
              <Icon name={isPasswordVisible ? 'eye-off' : 'eye'} size={24} color="#222222" />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="chevron-back-outline" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.header}>Update Password</Text>

      {renderInput('New Password', email, setEmail, 'email')}
      {renderInput('Confrim Password', password, setPassword, 'password', !isPasswordVisible)}


      <TouchableOpacity style={styles.updateButton} onPress={()=>handleLogin()}>
        <Text style={styles.updateButtonText}>UPDATE</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    backgroundColor: '#F9F9F9',
  },
  header: {
    fontSize: 34,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'left',
    marginBottom: 60,
    color:'#222222',

  },
  card: {
    height: 54,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 0,
    borderColor: '#ccc',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    elevation: 1,
  },
  focusedCard: {
    borderColor: '#00B0FF',
    elevation: 5,
  },
  password:{
    marginBottom:4,
  },
  eyeButton: {
    paddingHorizontal: 4,
    justifyContent: 'right',
    left: 250,
    bottom: 20,
  },
  label: {
    position: 'absolute',
    top: 8,
    left: 15,
    fontSize: 11,
    color: '#aaa',
  },
  activeLabel: {
    top: 2,
    fontSize: 12,
    color: '#00B0FF',
  },
  input: {
    height: 40,
    fontSize: 16,
    paddingTop: 15,
    paddingBottom: 0,
    marginBottom: 0,
    marginTop: 10,
  },
  forgotPassword: {
    textAlign: 'right',
    marginVertical: 10,
    color: '#222222',
    fontSize: 14,
  },
  link: {
    color: '#00B0FF',
    fontWeight: 'bold',
    width: 70,
    textAlign: 'center',
  },
  updateButton: {
    backgroundColor: '#00B0FF',
    paddingVertical: 10,
    borderRadius: 35,
    alignItems: 'center',
    marginTop: 20,
    elevation: 4,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  down: {
    marginTop: 170,
  },
  orText: {
    textAlign: 'center',
    color: '#222222',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
    backgroundColor:'#f9f9f9',
  },
  socialButton: {
    width: 92,
    height: 64,
    borderRadius: 25,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});

export default UpdatePasswordScreen;







