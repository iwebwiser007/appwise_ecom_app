/* eslint-disable no-catch-shadow */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { View, Text, ActivityIndicator, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import {Arrow } from '../../../src/Assets/svg';
import InputCard from '../../Utility/Modal/Input';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);
  const [error, setError] = useState('');
  const [activity, setActivity] = React.useState(false);
  const [isPasswordVisible, setPasswordVisible] = useState(false);

  const handleFocus = (input) => setFocusedInput(input);
  const handleBlur = () => setFocusedInput(null);

  const handleSignUp = async () => {
    // Reset previous error
    setError('');

    if (!name || !email || !password) {
      setError('Please fill in all the fields');
      return;
    }

    // Check for valid email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return;
    }

    try {
      setActivity(true);
      const response = await fetch('http://213.210.21.175:5000/AW0001/api/v1/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password: password,
        }),
      });

      const rawResponse = await response.text();
      console.log('Raw response:', rawResponse);

      let data;
      try {
        data = JSON.parse(rawResponse);
      } catch (err) {
        console.error('Failed to parse JSON:', err);
        setError('Invalid server response. Please try again.');
        return;
      }

      if (response.ok) {
        console.log('Sign up successful:', data);
        Alert.alert('Success', 'You have successfully signed up!', [
                  { text: 'OK', onPress: () => console.log('OK Pressed') },
                ]);
        setActivity(false);
        navigation.replace('LoginScreen');
      } else {
        console.log('Sign up failed:', data);
        setError(data?.message || 'Sign up failed. Please try again.');
        setActivity(false);
      }
    } catch (error) {
      console.error('Error during sign up:', error);
      setError('An error occurred. Please check your connection or try again later.');
      setActivity(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign up</Text>

      {/* Use InputCard for Name */}

<InputCard
  label="Name"
  value={name}
  setValue={setName}
  inputKey="name"
  focusedInput={focusedInput}
  handleFocus={handleFocus}
  handleBlur={handleBlur}
/>

      {/* Use InputCard for Email */}
      <InputCard
        label="Email"
        value={email}
        setValue={setEmail}
        inputKey="email"
        focusedInput={focusedInput}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
      />

      {/* Use InputCard for Password */}
      <InputCard
        label="Password"
        value={password}
        setValue={setPassword}
        secureTextEntry={!isPasswordVisible}
        inputKey="password"
        focusedInput={focusedInput}
        handleFocus={handleFocus}
        handleBlur={handleBlur}
        isPasswordVisible={isPasswordVisible}
        setPasswordVisible={setPasswordVisible}
      />

      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} style={styles.alreadyContainer}>
        <Text style={styles.alreadyText}>Already have an account?</Text>
        <TouchableOpacity style={styles.arrow}>
          <Arrow />
        </TouchableOpacity>
      </TouchableOpacity>

      {/* Display error message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}

      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
              {

                        activity ?
                          <>
                            <ActivityIndicator
                              color={'#fff'}
                              size="small"
                            />
                          </>
                          :
                          <Text style={styles.signUpButtonText}>SIGN UP</Text>

                      }
            </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
    fontFamily: 'Metropolis',
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
  alreadyContainer: {
    flexDirection: 'row',
    marginLeft: 134,
    justifyContent: 'space-around',
  },
  arrow: {
    marginVertical: 8,
  },
  alreadyText: {
    textAlign: 'right',
    marginVertical: 0,
    color: '#222222',
    fontSize: 14,
    fontFamily: 'Metropolis',
    marginRight: 8,
  },
  signUpButton: {
    backgroundColor: '#00B0FF',
    paddingVertical: 10,
    borderRadius: 35,
    alignItems: 'center',
    marginTop: 20,
    elevation: 4,
  },
  signUpButtonText: {
    color: '#fff',
    fontSize: 14,
    textAlign: 'center',
  },
  down: {
    marginTop: 80,
  },
  orText: {
    textAlign: 'center',
    color: '#222222',
    fontFamily: 'Metropolis',
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
  errorText: {
    color: 'red',
    textAlign: 'left',
    marginVertical: 0,
    fontFamily: 'Metropolis',
  },
});

export default SignUpScreen;
