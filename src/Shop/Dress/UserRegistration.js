import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';

const UserRegistration = ({navigation}) => {
  const [user, setUser] = useState({id: '', name: '', mobile: '', email: ''});

  const validateForm = () => {
    const {id, name, mobile, email} = user;
    if (!id || !name || !mobile || !email) {
      Alert.alert('Validation Error', 'All fields are required.');
      return false;
    }
    if (!/^\d+$/.test(mobile)) {
      Alert.alert('Validation Error', 'Mobile number must be numeric.');
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      Alert.alert('Validation Error', 'Invalid email format.');
      return false;
    }
    return true;
  };

  const forSaveUser = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      const storedUsers = JSON.parse(await AsyncStorage.getItem('users')) || [];
      storedUsers.push(user);
      await AsyncStorage.setItem('users', JSON.stringify(storedUsers));
      Alert.alert('Success', 'User registered successfully!');
      navigation.navigate('UserList');
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      setUser({id: '', name: '', mobile: '', email: ''});
    }, [])
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="ID"
        value={user.id}
        onChangeText={text => setUser({...user, id: text})}
      />
      <TextInput
        style={styles.input}
        placeholder="Name"
        value={user.name}
        onChangeText={text => setUser({...user, name: text})}
      />
      <TextInput
        style={styles.input}
        placeholder="Mobile"
        value={user.mobile}
        keyboardType="numeric"
        onChangeText={text => setUser({...user, mobile: text})}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={user.email}
        keyboardType="email-address"
        onChangeText={text => setUser({...user, email: text})}
      />
      <View style={styles.button}>
        <Button style={styles.buttonOne} title="ADD TO LIST" onPress={forSaveUser} />
        <Button style={styles.buttonTwo}title="SEE LIST" onPress={() => navigation.navigate('UserList')} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
  },
  button:{
    flexDirection:'column',
    justifyContent:'space-between',
  },
  buttonOne:{
padding:10,
  },
  buttonTwo:{
    marginTop:10,
  },
});

export default UserRegistration;
