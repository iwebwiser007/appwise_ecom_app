/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  SafeAreaView,
  ActivityIndicator,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function MyOrders({navigation}) {
  const [selectedTab, setSelectedTab] = useState('Delivered');
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userId, setUserId] = useState(null);

  // Fetch user ID from AsyncStorage
  const fetchUserId = async () => {
    try {
      const userData = await AsyncStorage.getItem('userId');
      if (userData !== null) {
        console.log('Fetched User Data:', userData);
        setUserId(userData);
      } else {
        console.warn('No user data found in AsyncStorage.');
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  // Fetch orders data
  const fetchOrders = async id => {
    try {
      console.log('Fetching orders for user ID:', id);
      const response = await fetch(
        `http://213.210.21.175:5000/AW0001/api/v1/getallorderforuser?user_id=${id}`,
      );
      console.log('Response Status:', response.status);
      const result = await response.json();
      console.log('API Response:', result);

      if (response.ok && result.data && Array.isArray(result.data)) {
        const orders = result.data.map(order => ({
          id: order.id.toString(),
          orderNumber: `№${order.id}`,
          trackingNumber: order.tracking_number || 'N/A',
          date: order.created_at || 'N/A',
          quantity: order.quantity || 1,
          amount: `${order.grand_total} R`,
          status:
            order.order_status === 'Pending'
              ? 'Processing'
              : order.order_status,
        }));
        setOrdersData(orders);
      } else {
        console.error(
          'Failed to fetch orders:',
          result.message || 'Unknown error',
        );
        Alert.alert('Error', result.message || 'Failed to load orders.');
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      Alert.alert('Error', 'Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  // Initial Data Fetch
  useEffect(() => {
    fetchUserId();
  }, []);

  // Fetch orders when userId is available
  useEffect(() => {
    if (userId) {
      fetchOrders(Number(userId));
    }
  }, [userId]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (loading) {
        setLoading(false);
        Alert.alert('Error', 'Request timed out. Please try again.');
      }
    }, 10000); // 10-second timeout

    return () => clearTimeout(timeout);
  }, [loading]);

  // Render Order Items
  const renderOrderItem = ({item}) =>
    item.status === selectedTab && (
      <View style={styles.orderCard}>
        <Text style={styles.orderNumber}>Order {item.orderNumber}</Text>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.tracking}>
          Tracking number: {item.trackingNumber}
        </Text>
        <Text style={styles.details}>Quantity: {item.quantity}</Text>
        <Text style={styles.details}>Total Amount: {item.amount}</Text>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => navigation.navigate('OrderDetails', {order: item})}>
          <Text style={styles.detailsButtonText}>Details</Text>
        </TouchableOpacity>
        <Text
          style={[
            styles.status,
            item.status === 'Delivered'
              ? styles.delivered
              : item.status === 'Processing'
              ? styles.processing
              : styles.cancelled,
          ]}>
          {item.status}
        </Text>
      </View>
    );

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.upperheader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <Text style={styles.header}>My Orders</Text>

      <View style={styles.tabsContainer}>
        {['Delivered', 'Processing', 'Cancelled'].map(tab => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, selectedTab === tab && styles.activeTab]}
            onPress={() => setSelectedTab(tab)}>
            <Text
              style={[
                styles.tabText,
                selectedTab === tab && styles.activeTabText,
              ]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {ordersData.length === 0 ? (
        <Text style={{textAlign: 'center', marginTop: 20}}>
          No orders found.
        </Text>
      ) : (
        <FlatList
          data={ordersData}
          renderItem={renderOrderItem}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.ordersList}
        />
      )}
    </SafeAreaView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 20,
  },
  upperheader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    marginTop: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    color: '#222222',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  tab: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: '#F9F9F9',
  },
  activeTab: {
    backgroundColor: '#000',
  },
  tabText: {
    fontSize: 16,
    color: '#000',
  },
  activeTabText: {
    color: '#FFF',
  },
  ordersList: {
    paddingBottom: 20,
  },
  orderCard: {
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    alignSelf: 'flex-end',
    color: '#888',
  },
  detailsButton: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 20,
    paddingVertical: 5,
    width: 90,
    paddingHorizontal: 8,
    marginTop: 10,
  },
  detailsButtonText: {
    fontSize: 14,
    color: '#222222',
    textAlign: 'center',
  },
  status: {
    fontSize: 14,
    fontWeight: 'bold',
    alignSelf: 'flex-end',
  },
  delivered: {
    color: 'green',
  },
  processing: {
    color: 'orange',
  },
  cancelled: {
    color: 'red',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
