/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const DeliverCharges = ({ setDeliveryCost, deliveryId, productId }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [charge, setCharge] = useState(null);

  const fetchDeliveryCost = async () => {
    try {
      const url = `http://213.210.21.175:5000/AW0001/api/v1/calculateRate?company_Id=1&delivery_Id=${deliveryId}&product_Id=${productId}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      const extractedCharge = data.data?.rates?.[0]?.base_rate?.charge || 0;

      setCharge(extractedCharge);
      setDeliveryCost(extractedCharge); // Update delivery cost in the parent component
    } catch (error) {
      console.error('Error fetching delivery cost:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (deliveryId && productId) {
      fetchDeliveryCost();
    }
  }, [deliveryId, productId]);

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#00B0FF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.summaryRow}>
        <Text style={styles.text}>Delivery Charge:</Text>
        <Text style={styles.price}>R{charge.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
  },
  text: {
    textAlign: 'left',
  },
  price: {
    fontWeight: 'bold',
    textAlign: 'right',
    marginLeft: 150,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    marginTop: 8,
  },
});

export default DeliverCharges;
