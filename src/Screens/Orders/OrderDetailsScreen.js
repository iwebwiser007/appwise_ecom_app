/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {fetchProductDetailsById} from '../../Api/api';

const OrderDetails = ({navigation, route}) => {
  const {orderId} = route.params;
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [productImages, setProductImages] = useState({});

  // Fetch order details
  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(
        `http://213.210.21.175:5000/AW0001/api/v1/getorderbyid?order_id=${orderId}`,
      );
      const result = await response.json();
      if (response.ok && result.statuscode === 200) {
        setOrderDetails(result.data);
        fetchProductImages(result.data.products);
      } else {
        throw new Error(result.message || 'Failed to fetch order details');
      }
    } catch (error) {
      console.error('Error fetching order details:', error);
      setOrderDetails(null);
    } finally {
      setLoading(false);
    }
  };
  const fetchProductImages = async products => {
    const images = {};
    if (Array.isArray(products)) {
      for (const product of products) {
        try {
          const productDetails = await fetchProductDetailsById(
            product.product_id,
          );
          images[product.product_id] = productDetails?.product_image || null;
        } catch (error) {
          console.error(
            `Error fetching image for product ${product.product_id}:`,
            error,
          );
        }
      }
    } else {
      console.warn('Products is not an array or is undefined.');
    }
    setProductImages(images);
  };
  useEffect(() => {
    fetchOrderDetails();
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#00B0FF" />
      </View>
    );
  }

  if (!orderDetails) {
    return (
      <View style={styles.error}>
        <Text style={styles.errorText}>Failed to load order details.</Text>
      </View>
    );
  }

  const {
    id,
    name,
    products,
    address,
    city,
    state,
    country,
    pincode,
    mobile,
    delivery_option,
    shipping_charges,
    payment_method,
    grand_total,
    order_status,
    tracking_number,
    created_at,
  } = orderDetails;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
      </View>

      <View style={styles.orderHeader}>
        <View  style={styles.orderRow}>
          <Text style={styles.orderNumber}>Order #{orderId}</Text>
          <Text style={styles.trackingNumber}>
            Tracking number: {tracking_number || 'N/A'}
          </Text>
        </View>
        <View  style={styles.orderRow1}>
        <Text style={styles.orderDate}>{created_at}</Text>
          <Text style={styles.orderStatus}>{order_status || 'Pending'}</Text>
        </View>
      </View>

      <View>
        {products.map(product => (
          <View key={product.id} style={styles.itemCard}>
            <Image source={{uri: product.image_url}} style={styles.itemImage} />
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>
                {product.product_name || 'Product Name'}
              </Text>
              <Text style={styles.itemSpecs}>
                Color: {product.product_color || 'N/A'} Size:{' '}
                {product.product_size || 'N/A'}
              </Text>
              <Text style={styles.itemUnits}>Qty: {product.product_qty}</Text>
            </View>
            <Text style={styles.itemPrice}>
              Price: {product.product_price || 'N/A'}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.orderInfo}>
        <Text style={styles.sectionHeader}>Order Information</Text>
        <View style={styles.infoRow}>
          <Text style={styles.infoTitle}>Shipping Address:</Text>
          <Text style={styles.infoText}>
            {address}, {city}, {state}, {country} - {pincode}
          </Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoTitle}>Phone:</Text>
          <Text style={styles.infoText}>{mobile}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoTitle}>Payment Method:</Text>
          <Text style={styles.infoText}>{payment_method || 'N/A'}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoTitle}>Shipping Charges:</Text>
          <Text style={styles.infoText}>{shipping_charges || 0}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoTitle}>Total Amount:</Text>
          <Text style={styles.infoText}>{grand_total || 'N/A'}</Text>
        </View>
      </View>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.reorderButton}>
          <Text style={styles.buttonText}>Reorder</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#222',
    marginLeft: 70,
  },
  backButton: {
    position: 'absolute',
    left: 8,
  },
  searchButton: {
    position: 'absolute',
    right: 8,
  },
  orderHeader: {
    // flexDirection: 'row',
    marginBottom: 20,
  },
  orderRow:{
    marginBottom:8,
    flexDirection:'row',
  },
  orderRow1:{
    flexDirection:'row',
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  trackingNumber: {
    fontSize: 11,
    color: '#666',
    marginLeft: 80,
    marginTop: 0,
  },
  orderDate: {
    fontSize: 11,
    color: '#666',
  },
  orderStatus: {
    fontSize: 11,
    color: 'green',
    fontWeight: 'bold',
    left: 16,
    marginLeft:200,
    textAlign:'right',
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: {width: 0, height: 2},
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  itemBrand: {
    fontSize: 12,
    color: '#888',
  },
  itemSpecs: {
    fontSize: 12,
    color: '#888',
  },
  itemUnits: {
    fontSize: 12,
    color: '#888',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 60,
  },
  orderInfo: {
    padding: 12,
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  infoTitle: {
    fontSize: 14,
    color: '#888',
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  reorderButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 35,
    borderWidth: 1,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#222222',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: 'red',
  },
});

export default OrderDetails;
