/* eslint-disable no-catch-shadow */
/* eslint-disable no-shadow */
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FacebookLogo, GoogleIcon, Arrow } from '../../../components/svg';

const SignUpScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [focusedInput, setFocusedInput] = useState(null);
  const [error, setError] = useState(''); // State for error messages

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
        navigation.replace('LoginScreen');
      } else {
        console.log('Sign up failed:', data);
        setError(data?.message || 'Sign up failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during sign up:', error);
      setError('An error occurred. Please check your connection or try again later.');
    }
  };

  const renderInput = (label, value, setValue, inputKey, secureTextEntry = false) => (
    <View style={[styles.card, focusedInput === inputKey || value ? styles.focusedCard : {}]}>
      <Text style={[styles.label, focusedInput === inputKey || value ? styles.activeLabel : {}]}>
        {label}
      </Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        onFocus={() => handleFocus(inputKey)}
        onBlur={handleBlur}
        secureTextEntry={secureTextEntry}
      />
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="chevron-back-outline" size={24} color="black" />
      </TouchableOpacity> */}
      <Text style={styles.header}>Sign up</Text>

      {renderInput('Name', name, setName, 'name')}
      {renderInput('Email', email, setEmail, 'email')}
      {renderInput('Password', password, setPassword, 'password', true)}

      <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')} style={styles.alreadyContainer}>
        <Text style={styles.alreadyText}>Already have an account?</Text>
        <TouchableOpacity style={styles.arrow}>
          <Arrow />
        </TouchableOpacity>
      </TouchableOpacity>
      {/* Display error message */}
      {error ? <Text style={styles.errorText}>{error}</Text> : null}
      <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
        <Text style={styles.signUpButtonText}>SIGN UP</Text>
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
    padding: 20,
    backgroundColor: '#F9F9F9',
    fontFamily: 'Metropolis',
  },
  backButton: {
    marginBottom: 0,
    fontWeight: 'bold',
    fontSize: 40,
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
    marginBottom: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  focusedCard: {
    borderColor: '#00B0FF',
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
    paddingTop: 15,
    paddingBottom: 0,
    marginLeft: 12,
  },
  alreadyContainer: {
    flexDirection: 'row',
    marginLeft: 134,
    justifyContent: 'space-around',
  },
  arrow:{
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
