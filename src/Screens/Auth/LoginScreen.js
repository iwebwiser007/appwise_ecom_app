/* eslint-disable no-alert */
import React, {useState, useEffect} from 'react';
import {View, ActivityIndicator, Text, TouchableOpacity, StyleSheet, Linking} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputField from '../../Utility/Modal/Input';
import {Arrow} from '../../Assets/svg';
import {Buffer} from 'buffer';
import { login } from '../../Api/api';

const LoginScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleFocus = input => setFocusedInput(input);
  const handleBlur = () => setFocusedInput(null);
  const [activity, setActivity] = React.useState(false);

  const handleLogin = async () => {
    setActivity(true);
    try {
      const response = await login(email, password);
      console.log('Login Response:', response);

      if (response && response.data && response.data.token) {
        const token = response.data.token;
        if (typeof token === 'string' && token.includes('.')) {
          const payload = JSON.parse(
            Buffer.from(token.split('.')[1], 'base64').toString('utf8'),
          );
          const userId = payload.userId;

          await AsyncStorage.setItem('token', token);
          await AsyncStorage.setItem('userId', userId.toString());
          navigation.replace('AppStack');
        } else {
          alert('Received token is not in a valid JWT format.');
          setActivity(false);
        }
      } else {
        alert(response.message || 'Login failed. Please try again.');
        setActivity(false);
      }
    } catch (error) {
      console.error('Login Error:', error.message);
    }
  };

  const handleDeepLink = url => {
    try {
      const token = new URL(url).searchParams.get('token');
      if (token) {
        console.log('Received token:', token);
        setEmail(token);
      }
    } catch (error) {
      console.error('Error handling deep link:', error);
    }
  };

  useEffect(() => {
    const handleOpenURL = ({url}) => handleDeepLink(url);

    Linking.addEventListener('url', handleOpenURL);
    Linking.getInitialURL().then(url => {
      if (url) {
        handleDeepLink(url);
      }
    });

    return () => {
      Linking.removeAllListeners('url', handleOpenURL);
    };
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <InputField
        label="Email"
        value={email}
        setValue={setEmail}
        inputKey="email"
        focusedInput={focusedInput}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
      />
      <InputField
        label="Password"
        value={password}
        setValue={setPassword}
        inputKey="password"
        secureTextEntry={!isPasswordVisible}
        focusedInput={focusedInput}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
        isPasswordVisible={isPasswordVisible}
        setPasswordVisible={setPasswordVisible}
      />
      <TouchableOpacity
        onPress={() => navigation.navigate('ForgotPasswordScreen')}
        style={styles.forgetContainer}>
        <Text style={styles.forgotPassword}>Forgot your password?</Text>
        <TouchableOpacity style={styles.Arrow}>
          <Arrow />
        </TouchableOpacity>
      </TouchableOpacity>
      <TouchableOpacity
              style={styles.loginButton}
              onPress={() => handleLogin()}>
              {

                activity ?
                  <>
                    <ActivityIndicator
                      color={'#fff'}
                      size="small"
                    />
                  </>
                  :
                  <Text style={styles.loginButtonText}>LOGIN</Text>
              }

            </TouchableOpacity>
      <View style={styles.bottom}>
              <TouchableOpacity onPress={() => navigation.navigate('SignUpScreen')}>

                <Text style={styles.text}>
                  Don't have an account?{' '}
                  <Text style={styles.loginText}>Register</Text>
                </Text>
              </TouchableOpacity>
            </View>
    </View>
  );
};

const styles = StyleSheet.create({
  bottom: {
    alignItems: 'center',
    marginTop: 20,
  },
  text: {
    fontSize: 16,
    color: '#666',
    alignItems: 'center',
  },
  loginText: {
    fontSize: 16,
    color: '#007BFF',
    fontWeight: '600',
  },
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
    textAlign: 'center',
    fontFamily: 'Metropolis',
  },
  orText: {
    textAlign: 'center',
    color: '#222222',
    marginTop: 160,
  },
  forgetContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  down: {
    marginTop: 150,
  },
  forgotPassword: {
    marginTop: 4,
  },
  Arrow: {
    marginTop: 10,
    marginLeft: 4,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 16,
  },
});

export default LoginScreen;
