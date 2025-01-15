// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

// const ForgotPasswordScreen = ({navigation}) => {
//   const [email, setEmail] = useState('');
//   const [isValid, setIsValid] = useState(true);
//   const [focusedInput, setFocusedInput] = useState(null);

//   const handleEmailChange = (text) => {
//     setEmail(text);
//     setIsValid(/\S+@\S+\.\S+/.test(text));
//   };

//   const handleFocus = (input) => setFocusedInput(input);
//   const handleBlur = () => setFocusedInput(null);

//   return (
//     <View style={styles.container}>
//       <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//         <Icon name="chevron-back-outline" size={24} color="black" />
//       </TouchableOpacity>
//       <Text style={styles.header}>Forgot password</Text>

//       <Text style={styles.instructions}>
//         Please enter your email address. You will receive a link to create a new password via email.
//       </Text>

//       <View style={[styles.card, focusedInput === 'email' || email ? styles.focusedCard : {}]}>
//         <Text style={[styles.label, focusedInput === 'email' || email ? styles.activeLabel : {}]}>
//           Email
//         </Text>
//         <TextInput
//           style={[styles.input, !isValid && styles.inputError]}
//           value={email}
//           onChangeText={handleEmailChange}
//           onFocus={() => handleFocus('email')}
//           onBlur={handleBlur}
//           keyboardType="email-address"
//         />
//       </View>

//       {!isValid && <Text style={styles.errorText}>Not a valid email address. Should be your@email.com</Text>}

//       <TouchableOpacity style={styles.sendButton}>
//         <Text style={styles.sendButtonText}>SEND</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: '#F9F9F9',
//   },
//   backButton: {
//     fontSize: 24,
//     color: '#333',
//   },
//   header: {
//     fontSize: 32,
//     fontWeight: 'bold',
//     marginVertical: 20,
//   },
//   instructions: {
//     fontSize: 16,
//     color: '#6D6D6D',
//     marginBottom: 20,
//   },
//   card: {
//     height: 70,
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     justifyContent: 'center',
//     paddingHorizontal: 10,
//     marginBottom: 20,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 5,
//     shadowOffset: { width: 0, height: 2 },
//     elevation: 2,
//   },
//   focusedCard: {
//     borderColor: '#00B0FF',
//     elevation: 5,
//   },
//   label: {
//     position: 'absolute',
//     top: 22,
//     left: 15,
//     fontSize: 16,
//     color: '#aaa',
//   },
//   activeLabel: {
//     top: 5,
//     fontSize: 12,
//     color: '#00B0FF',
//   },
//   input: {
//     height: 40,
//     fontSize: 16,
//     paddingTop: 15,
//     paddingBottom: 0,
//   },
//   inputError: {
//     borderColor: '#00B0FF',
//   },
//   errorText: {
//     color: '#00B0FF',
//     fontSize: 12,
//     marginTop: 5,
//   },
//   sendButton: {
//     backgroundColor: '#00B0FF',
//     paddingVertical: 15,
//     borderRadius: 10,
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   sendButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// });

// export default ForgotPasswordScreen;



















import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

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
      //API endpoint
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

      <View style={[styles.card, focusedInput === 'email' || email ? styles.focusedCard : {}]}>
        <Text style={[styles.label, focusedInput === 'email' || email ? styles.activeLabel : {}]}>
          Email
        </Text>
        <TextInput
          style={[styles.input, !isValid && styles.inputError]}
          value={email}
          onChangeText={handleEmailChange}
          onFocus={() => handleFocus('email')}
          onBlur={handleBlur}
          keyboardType="email-address"
        />
      </View>

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
    color:'#222222',
  },
  instructions: {
    fontSize: 14,
    color: '#6D6D6D',
    marginBottom: 30,
    marginTop:40,
  },
  card: {
    height: 64,
    width:320,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    justifyContent: 'center',
    paddingHorizontal: 10,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
  },
  focusedCard: {
    borderColor: '#00B0FF',
    elevation: 5,
  },
  label: {
    position: 'absolute',
    top: 4,
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
  },
  inputError: {
    borderColor: '#00B0FF',
  },
  errorText: {
    color: 'red',
    fontSize: 10,
    marginTop: 12,
    marginBottom:12,
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
    // fontWeight: 'bold',
  },
});

export default ForgotPasswordScreen;
