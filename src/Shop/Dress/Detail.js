import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Swipeable} from 'react-native-gesture-handler';

const UserList = ({navigation}) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [duplicates, setDuplicates] = useState([]);
  const [page, setPage] = useState(1);

  //Featching users
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const storedUsers = JSON.parse(await AsyncStorage.getItem('users')) || [];
      setUsers(storedUsers);
      setFilteredUsers(storedUsers.slice(0, 10));
    } catch (error) {
      Alert.alert('Error', 'Failed to load users.');
    }
  };
  //Searching Logic
  const handleSearch = text => {
    setSearch(text);

    if (text.trim() === '') {
      setFilteredUsers(users.slice(0, page * 10));
      return;
    }

    const lowerCaseText = text.toLowerCase();

    const results = users.filter(
      user =>
        user.name.toLowerCase().includes(lowerCaseText) ||
        user.mobile.includes(text) ||
        user.email.toLowerCase().includes(lowerCaseText),
    );

    const remainingUsers = users.filter(user => !results.includes(user));

    setFilteredUsers([...results, ...remainingUsers].slice(0, page * 10));
  };
  //Delete User
  const deleteUser = async id => {
    try {
      const updatedUsers = users.filter(user => user.id !== id);
      setUsers(updatedUsers);
      setFilteredUsers(updatedUsers.slice(0, page * 10));
      await AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
      Alert.alert('Success', 'User deleted successfully!');
    } catch (error) {
      Alert.alert('Error', 'Failed to delete user.');
    }
  };
  //Edit User
  const handleUserEdit = updatedUser => {
    const updatedUsers = users.map(user =>
      user.id === updatedUser.id ? updatedUser : user,
    );
    setUsers(updatedUsers);
    setFilteredUsers(updatedUsers.slice(0, page * 10));
    AsyncStorage.setItem('users', JSON.stringify(updatedUsers));
    Alert.alert('Success', 'User updated successfully!');
  };
  //Find Duplicate Entries
  const findDuplicates = () => {
    const emailCount = {};
    const duplicateEntries = [];

    users.forEach(user => {
      emailCount[user.email] = (emailCount[user.email] || 0) + 1;
      if (emailCount[user.email] > 1) {
        duplicateEntries.push(user);
      }
    });

    setDuplicates(duplicateEntries);
    if (duplicateEntries.length === 0) {
      Alert.alert('No Duplicates', 'No duplicate entries found.');
    } else {
      Alert.alert(
        'Duplicates Found',
        `${duplicateEntries.length} duplicate(s) found.`,
      );
    }
  };
  //Render User
  const renderUser = ({item}) => {
    const isDuplicate = duplicates.some(dup => dup.id === item.id);
    //Text Highlight
    const highlightText = (text, query) => {
      const regex = new RegExp(`(${query})`, 'gi');
      const words = text.split(regex);
      return (
        <Text>
          {words.map((word, index) => (
            <Text
              key={index}
              style={
                word.toLowerCase() === query.toLowerCase()
                  ? styles.highlight
                  : null
              }>
              {word}
            </Text>
          ))}
        </Text>
      );
    };
    //Slide logic
    const renderRightActions = () => (
      <View style={styles.actionButtons}>
        <TouchableOpacity
          style={styles.editButton}
          onPress={() =>
            navigation.navigate('EditUser', {
              user: item,
              onSave: handleUserEdit,
            })
          }>
          <Text style={styles.actionText}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.deleteButton}
          onPress={() => deleteUser(item.id)}>
          <Text style={styles.actionText}>Delete</Text>
        </TouchableOpacity>
      </View>
    );

    return (
      <Swipeable renderRightActions={renderRightActions}>
        <View style={[styles.userItem, isDuplicate && styles.duplicateItem]}>
          <Text>{highlightText(item.name, search)}</Text>
          <Text>{highlightText(item.mobile, search)}</Text>
          <Text>{highlightText(item.email, search)}</Text>
        </View>
      </Swipeable>
    );
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={search}
        onChangeText={handleSearch}
      />
      <TouchableOpacity style={styles.duplicateButton} onPress={findDuplicates}>
        <Text style={styles.buttonText}>Find Duplicates</Text>
      </TouchableOpacity>
      <FlatList
        data={filteredUsers}
        keyExtractor={item => item.id.toString()}
        renderItem={renderUser}
        onEndReached={() => {
          if (page * 10 < users.length) {
            setPage(prevPage => prevPage + 1);
            setFilteredUsers(users.slice(0, (page + 1) * 10));
          }
        }}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchInput: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    borderRadius: 5,
  },
  duplicateButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  userItem: {
    padding: 15,
    borderBottomWidth: 1,
    backgroundColor: '#fff',
  },
  duplicateItem: {
    backgroundColor: '#FFCDD2',
  },
  highlight: {backgroundColor: 'yellow'},
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  deleteButton: {
    backgroundColor: '#F44336',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    height: '100%',
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});















export default UserList;
