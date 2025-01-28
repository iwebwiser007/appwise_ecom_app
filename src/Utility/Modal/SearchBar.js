import React, { useState } from 'react';
import { View, TextInput, FlatList, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BASE_URL from '../../Api/baseUrl';

const SearchComponent = ({ products, onProductSelect, onClose, navigation }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  const handleSearch = async (text) => {
    setSearchTerm(text);

    if (text.trim() === '') {
      setFilteredProducts([]);
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/allproduct`);
      const result = await response.json();

      if (response.ok && result.data) {
        const filtered = result.data.filter((product) =>
          product.product_name.toLowerCase().includes(text.toLowerCase())
        );
        setFilteredProducts(filtered);
      } else {
        console.error('Error fetching products:', result.message);
      }
    } catch (error) {
      console.error('Error during product search:', error);
    }
  };

  const handleProductSelect = (product) => {
    navigation.navigate('ProductCardScreen', { product });
    onClose();
  };
  return (
    <View style={styles.searchContainer}>
      {/* Search Input */}
      <TextInput
        style={styles.searchInput}
        placeholder="Search for products..."
        value={searchTerm}
        onChangeText={handleSearch}
      />
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeText}>X</Text>
      </TouchableOpacity>

      {/* Search Results */}
      <FlatList
        data={filteredProducts}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleProductSelect(item)}>
            <Text style={styles.productName}>{item.product_name}</Text>
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          searchTerm ? <Text style={styles.noResultsText}>No results found.</Text> : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'white',
    padding: 16,
    zIndex: 10,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 24,
    right: 24,
    alignContent:'right',
  },
  closeText: {
    fontSize: 18,
    color: '#555',
  },
  productName: {
    fontSize: 16,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  noResultsText: {
    marginTop: 16,
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});

export default SearchComponent;
