import React, { useMemo, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, FlatList } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';

const PromoCodeBottomSheet = () => {
  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['25%', '50%', '90%'], []);

  const promoCodes = [
    { id: '1', discount: '10%', title: 'Personal offer', code: 'mypromocode2020', daysRemaining: '6 days', color: '#FF3D00' },
    { id: '2', discount: '15%', title: 'Summer Sale', code: 'summer2020', daysRemaining: '23 days', color: '#FF6D00', image: 'https://path/to/image.jpg' },
    { id: '3', discount: '22%', title: 'Personal offer', code: 'mypromocode2020', daysRemaining: '6 days', color: '#000000' },
  ];

  const renderPromoCode = ({ item }) => (
    <View style={styles.promoCodeCard}>
      <View style={[styles.discountContainer, { backgroundColor: item.color }]}>
        <Text style={styles.discountText}>{item.discount}</Text>
      </View>
      {item.image && <Image source={{ uri: item.image }} style={styles.promoImage} />}
      <View style={styles.promoDetails}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.code}>{item.code}</Text>
        <Text style={styles.remaining}>{item.daysRemaining} remaining</Text>
      </View>
      <TouchableOpacity style={styles.applyButton}>
        <Text style={styles.applyText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <BottomSheet ref={bottomSheetRef} snapPoints={snapPoints}>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Enter your promo code" style={styles.input} />
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>→</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.sectionTitle}>Your Promo Codes</Text>
        <FlatList
          data={promoCodes}
          renderItem={renderPromoCode}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.promoCodesList}
        />
      </View>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: 'white',
    flex: 1,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  submitButton: {
    backgroundColor: '#000',
    borderRadius: 25,
    padding: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  promoCodesList: {
    paddingBottom: 20,
  },
  promoCodeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  discountContainer: {
    width: 50,
    height: 50,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  discountText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  promoImage: {
    width: 40,
    height: 40,
    borderRadius: 8,
    marginRight: 16,
  },
  promoDetails: {
    flex: 1,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  code: {
    fontSize: 12,
    color: '#666',
  },
  remaining: {
    fontSize: 12,
    color: '#999',
  },
  applyButton: {
    backgroundColor: '#FF3D00',
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  applyText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PromoCodeBottomSheet;
