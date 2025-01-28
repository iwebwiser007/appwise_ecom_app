import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = ({navigation, route}) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addressCount, setAddressCount] = useState(0);
  const orderCount = route.params?.orderCount || 0;

  useEffect(() => {
    const fetchUserData = async () => {
      const userId = await AsyncStorage.getItem('userId');
      if (!userId) {
        console.log('No user ID found');
        setLoading(false);
        return;
      }
      try {
        const response = await fetch(
          `http://213.210.21.175:5000/AW0001/api/v1/users/${userId}`,
        );
        const result = await response.json();
        if (result.status) {
          setUserData(result.data.user);
        } else {
          console.log('Failed to fetch user data', result);
        }
      } catch (error) {
        console.log('Error fetching user data', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchAddressCount = async () => {
      try {
        const storedAddresses = await AsyncStorage.getItem('userAddresses');
        if (storedAddresses) {
          const addresses = JSON.parse(storedAddresses);
          setAddressCount(addresses.length);
        } else {
          setAddressCount(0);
        }
      } catch (error) {
        console.error('Error fetching address count:', error);
      }
    };

    fetchUserData();
    fetchAddressCount();

    const focusListener = navigation.addListener('focus', fetchAddressCount);
    return focusListener;
  }, [navigation]);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <Icon
            name="search-outline"
            size={24}
            color="black"
            style={styles.searchIcon}
          />
        </View>
        <Text style={styles.headerText}>My profile</Text>
        <View style={styles.profileContainer}>
          <Image
            source={require('../../Assets/imgs/profile.jpg')}
            style={styles.profileImage}
          />
          <View>
            <Text style={styles.profileName}>
              {userData?.name || 'User Name'}
            </Text>
            <Text style={styles.profileEmail}>
              {userData?.email || 'user@email.com'}
            </Text>
          </View>
        </View>

        <View style={styles.optionList}>
        <TouchableOpacity
            style={styles.optionItem}
            onPress={() => navigation.navigate('MyOrders')}>
            <View>
              <Text style={styles.optionTitle}>My orders</Text>
              <Text style={styles.optionSubtitle}>
                Already have {orderCount} order{orderCount !== 1 ? 's' : ''}
              </Text>
            </View>
            <Icon name="chevron-forward-outline" size={20} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => navigation.navigate('ShippingAddress')}>
            <View>
              <Text style={styles.optionTitle}>Shipping addresses</Text>
              <Text style={styles.optionSubtitle}>
                {addressCount} address{addressCount !== 1 ? 'es' : ''}
              </Text>
            </View>
            <Icon name="chevron-forward-outline" size={20} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionItem}>
            <View>
              <Text style={styles.optionTitle}>Payment methods</Text>
              <Text style={styles.optionSubtitle}>Pay with PayFast</Text>
            </View>
            <Icon name="chevron-forward-outline" size={20} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.optionItem}>
            <View>
              <Text style={styles.optionTitle}>Promocodes</Text>
              <Text style={styles.optionSubtitle}>
                You have special promocodes
              </Text>
            </View>
            <Icon name="chevron-forward-outline" size={20} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => navigation.navigate('Ratings')}>
            <View>
              <Text style={styles.optionTitle}>My reviews</Text>
              <Text style={styles.optionSubtitle}>Reviews for 4 items</Text>
            </View>
            <Icon name="chevron-forward-outline" size={20} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.optionItem}
            onPress={() => navigation.navigate('Settings')}>
            <View>
              <Text style={styles.optionTitle}>Settings</Text>
              <Text style={styles.optionSubtitle}>Notifications, password</Text>
            </View>
            <Icon name="chevron-forward-outline" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    alignItems: 'flex-end',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 16,
  },
  searchIcon: {
    padding: 8,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 32,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  profileEmail: {
    fontSize: 12,
    color: '#666',
  },
  optionList: {
    borderTopWidth: 0.25,
    borderTopColor: '#E0E0E0',
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 15,
    borderBottomWidth: 0.25,
    borderBottomColor: '#E0E0E0',
  },
  optionTitle: {
    fontSize: 14,
    color: '#000',
  },
  optionSubtitle: {
    fontSize: 10,
    color: '#999',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ProfileScreen;
