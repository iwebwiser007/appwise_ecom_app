/* eslint-disable no-alert */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Linking,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleIcon, FacebookLogo, Arrow} from '../../../components/svg';
import {Buffer} from 'buffer';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleFocus = input => setFocusedInput(input);
  const handleBlur = () => setFocusedInput(null);

  const handleLogin = async () => {
    try {
      const response = await fetch(
        'http://213.210.21.175:5000/AW0001/api/v1/signin',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({email, password}),
        },
      );
      const data = await response.json();

      // Log the response for debugging
      console.log('API Response:', data);
      if (response.ok && data.data) {
        const token = data.data;

        // Decode JWT to extract the payload
        const payload = JSON.parse(
          Buffer.from(token.split('.')[1], 'base64').toString('utf8'),
        );

        // Extract user ID from the decoded payload
        const userId = payload.id;
        console.log(userId);
        // Save token and user ID to AsyncStorage
        await AsyncStorage.setItem('token', token);
        await AsyncStorage.setItem('userId', userId.toString());

        navigation.replace('MainApp');
      } else {
        console.error('Login failed:', data.message);
        alert(data.message || 'Login failed. Please try again.');
      }
    } catch (error) {
      console.error('Error logging in:', error.message);
    }
  };

  const handleDeepLink = url => {
    try {
      const token = new URL(url).searchParams.get('token');
      if (token) {
        // If the token exists, use it to auto-fill or perform actions
        console.log('Received token:', token);
        setEmail(token);
      }
    } catch (error) {
      console.error('Error handling deep link:', error);
    }
  };

  // Listen for deep link
  useEffect(() => {
    const handleOpenURL = ({url}) => handleDeepLink(url);

    // Adding event listener for deep link
    Linking.addEventListener('url', handleOpenURL);

    // Check if the app was launched from a deep link
    Linking.getInitialURL().then(url => {
      if (url) {
        handleDeepLink(url);
      }
    });

    // Cleanup listener when component unmounts
    return () => {
      Linking.removeAllListeners('url', handleOpenURL);
    };
  }, []);

  const renderInput = (
    label,
    value,
    setValue,
    inputKey,
    secureTextEntry = false,
  ) => (
    <View
      style={[
        styles.card,
        focusedInput === inputKey || value ? styles.focusedCard : {},
      ]}>
      <Text
        style={[
          styles.label,
          focusedInput === inputKey || value ? styles.activeLabel : {},
        ]}>
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
              onPress={() => setPasswordVisible(!isPasswordVisible)}>
              <Icon
                name={isPasswordVisible ? 'eye-off' : 'eye'}
                size={24}
                color="#222222"
              />
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.navigate('SignUpScreen')}>
        <Icon name="chevron-back-outline" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.header}>Login</Text>
      {renderInput('Email', email, setEmail, 'email')}
      {renderInput(
        'Password',
        password,
        setPassword,
        'password',
        !isPasswordVisible,
      )}
      <TouchableOpacity
        onPress={() => navigation.navigate('ForgotPasswordScreen')}
        style={styles.forgetContainer}>
        <Text style={styles.forgotPassword}>
          Forgot your password?
          <TouchableOpacity style={styles.arrow}>
            <Arrow />
          </TouchableOpacity>
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => handleLogin()}>
        <Text style={styles.loginButtonText}>LOGIN</Text>
      </TouchableOpacity>
      <View style={styles.down}>
        <Text style={styles.orText}>Or login with social account</Text>
        <View style={styles.socialContainer}>
          <TouchableOpacity style={styles.socialButton}>
            <GoogleIcon />
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton}>
            <FacebookLogo />
          </TouchableOpacity>
        </View>
      </View>
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
    fontFamily: 'Metropolis',
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'left',
    marginBottom: 60,
    color: '#222222',
  },
  card: {
    height: 64,
    width: 320,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: {width: 0, height: 2},
  },
  focusedCard: {
    borderColor: '#00B0FF',
  },
  password: {
    marginBottom: 4,
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
    fontFamily: 'Metropolis',
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
    fontFamily: 'Metropolis',
    paddingTop: 15,
    paddingBottom: 0,
    marginBottom: 0,
    marginTop: 10,
  },
  forgetContainer: {
    flexDirection: 'row',
    marginLeft: 142,
    justifyContent: 'space-between',
  },
  forgotPassword: {
    textAlign: 'right',
    marginVertical: 10,
    color: '#222222',
    fontSize: 14,
    fontFamily: 'Metropolis',
  },
  arrow: {},
  loginButton: {
    backgroundColor: '#00B0FF',
    paddingVertical: 10,
    borderRadius: 35,
    alignItems: 'center',
    marginTop: 20,
    elevation: 4,
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Metropolis',
    textAlign: 'center',
  },
  down: {
    marginTop: 150,
  },
  orText: {
    textAlign: 'center',
    color: '#222222',
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 8,
    backgroundColor: '#f9f9f9',
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

export default LoginScreen;
