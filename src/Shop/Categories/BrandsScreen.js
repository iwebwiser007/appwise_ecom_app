import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const BrandSelectionScreen = ({navigation}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrands, setSelectedBrands] = useState([]);

  const brands = [
    {id: '1', name: 'adidas'},
    {id: '2', name: 'adidas Originals'},
    {id: '3', name: 'Blend'},
    {id: '4', name: 'Boutique Moschino'},
    {id: '5', name: 'Champion'},
    {id: '6', name: 'Diesel'},
    {id: '7', name: 'Jack & Jones'},
    {id: '8', name: 'Naf Naf'},
    {id: '9', name: 'Red Valentino'},
    {id: '10', name: 's.Oliver'},
  ];

  const filteredBrands = brands.filter(brand =>
    brand.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleSelection = brandId => {
    setSelectedBrands(prevSelected =>
      prevSelected.includes(brandId)
        ? prevSelected.filter(id => id !== brandId)
        : [...prevSelected, brandId]
    );
  };

  const renderBrandItem = ({item}) => (
    <TouchableOpacity
      style={styles.brandItem}
      onPress={() => toggleSelection(item.id)}>
      <Text
        style={[
          styles.brandName,
          selectedBrands.includes(item.id) && styles.selectedBrand,
        ]}>
        {item.name}
      </Text>
      <Icon
        name={selectedBrands.includes(item.id) ? 'checkbox' : 'square-outline'}
        size={24}
        color={selectedBrands.includes(item.id) ? '#00B0FF' : '#808080'}
      />
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="chevron-back-outline" size={24} color="black" onPress={() => navigation.goBack()} />
        <Text style={styles.headerTitle}>Brands</Text>
      </View>
      <View style={styles.searchContainer}>
        <Icon name="search" size={20} color="#808080" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredBrands}
        renderItem={renderBrandItem}
        keyExtractor={item => item.id}
      />
      <View style={styles.footer}>
        <TouchableOpacity style={styles.discardButton}>
          <Text style={styles.discardText}>Discard</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.applyButton}
          onPress={() => navigation.navigate('FilterScreen', {selectedBrands})}>
          <Text style={styles.applyText}>Apply</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color:'#222222',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEDED',
    borderRadius: 24,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 45,
  },
  brandItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#E0E0E0',
  },
  brandName: {
    fontSize: 16,
    color: '#000',
  },
  selectedBrand: {
    color: '#00B0FF',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  discardButton: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  discardText: {
    color: '#000',
    fontWeight: 'bold',
  },
  applyButton: {
    backgroundColor: '#00B0FF',
    borderRadius: 24,
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
  applyText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default BrandSelectionScreen;
































