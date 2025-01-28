import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import InputField from '../../Utility/Modal/Input';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [focusedInput, setFocusedInput] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleEmailChange = (text) => {
    setEmail(text);
    setIsValid(/\S+@\S+\.\S+/.test(text));
  };

  const handleFocus = (input) => setFocusedInput(input);
  const handleBlur = () => setFocusedInput(null);

  const handleSend = async () => {
    if (!isValid || !email) {
      Alert.alert('Invalid Input', 'Please enter a valid email address.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('https://1rf6hcdj-3000.inc1.devtunnels.ms/api/users/forgot-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'A reset link has been sent to your email.');
        navigation.goBack();
      } else {
        Alert.alert('Error', result.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Network Error', 'Please check your internet connection and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="chevron-back-outline" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.header}>Forgot password</Text>
      <Text style={styles.instructions}>
        Please enter your email address. You will receive a link to create a new password via email.
      </Text>
      <InputField
        label="Email"
        value={email}
        setValue={handleEmailChange}
        inputKey="email"
        focusedInput={focusedInput}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
      />
      {!isValid && (
        <Text style={styles.errorText}>Not a valid email address. Should be your@email.com</Text>
      )}
      <TouchableOpacity
        style={[styles.sendButton, isLoading ? styles.disabledButton : {}]}
        onPress={handleSend}
        disabled={isLoading}
      >
        {isLoading ? (
          <ActivityIndicator size="small" color="#fff" />
        ) : (
          <Text style={styles.sendButtonText}>SEND</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  backButton: {
    fontSize: 24,
    color: '#333',
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#222222',
  },
  instructions: {
    fontSize: 14,
    color: '#6D6D6D',
    marginBottom: 30,
    marginTop: 40,
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    marginTop: 12,
  },
  sendButton: {
    backgroundColor: '#00B0FF',
    paddingVertical: 10,
    borderRadius: 35,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    backgroundColor: '#7ecbff',
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 14,
  },
});

export default ForgotPasswordScreen;
