import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Slider from '@react-native-community/slider';
import Icon from 'react-native-vector-icons/Ionicons';

const FilterScreen = ({navigation, route}) => {
  const [priceRange, setPriceRange] = useState([78, 143]);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrands, setSelectedBrands] = useState([]);

  useEffect(() => {
    if (route.params?.selectedBrands) {
      setSelectedBrands(route.params.selectedBrands);
    }
  }, [route.params?.selectedBrands]);

  const colors = [
    '#000000',
    '#FF3D00',
    '#00B0FF',
    '#FFCDD2',
    '#D7CCC8',
    '#3E2723',
    '#3F51B5',
  ];
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const categories = ['All', 'Women', 'Men', 'Boys', 'Girls'];

  const handleDiscard = () => {
    setPriceRange([78, 143]);
    setSelectedColor(null);
    setSelectedSize(null);
    setSelectedCategory(null);
    setSelectedBrands([]);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Filter</Text>
      </View>
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionTitle}>Price range</Text>
        <View style={styles.card}>
          <View style={styles.sliderContainer}>
            <Text style={styles.priceText}>${priceRange[0]}</Text>
            <Slider
              style={styles.slider}
              minimumValue={50}
              maximumValue={200}
              step={1}
              minimumTrackTintColor="#00B0FF"
              maximumTrackTintColor="#00B0FF"
              value={priceRange[0]}
              onValueChange={value => setPriceRange([value, priceRange[1]])}
            />
            <Text style={styles.priceText}>${priceRange[1]}</Text>
          </View>
        </View>
        <Text style={styles.sectionTitle}>Colors</Text>
        <View style={styles.card}>
          <View style={styles.colorContainer}>
            {colors.map((color, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.colorCircle,
                  {backgroundColor: color},
                  selectedColor === color && styles.selectedColor,
                ]}
                onPress={() => setSelectedColor(color)}
              />
            ))}
          </View>
        </View>
        <Text style={styles.sectionTitle}>Sizes</Text>
        <View style={styles.card}>
          <View style={styles.sizeContainer}>
            {sizes.map((size, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.sizeChip,
                  selectedSize === size && styles.selectedChip,
                ]}
                onPress={() => setSelectedSize(size)}>
                <Text style={styles.sizeText}>{size}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <Text style={styles.sectionTitle}>Category</Text>
        <View style={styles.card}>
          <View style={styles.categoryContainer}>
            {categories.map((category, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.categoryChip,
                  selectedCategory === category && styles.selectedChip,
                ]}
                onPress={() => setSelectedCategory(category)}>
                <Text style={styles.categoryText}>{category}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        <Text style={styles.sectionTitle}>Brand</Text>
        <View style={styles.brandsContain}>
          <Text style={styles.brands}>
            {selectedBrands.map(brand => brand.name).join(', ')}
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('BrandSelectionScreen', {selectedBrands})
            }>
            <Icon
              name="chevron-forward-outline"
              size={24}
              color="black"
              style={styles.brandsIcon}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.discardButton}
            onPress={handleDiscard}>
            <Text style={styles.discardText}>Discard</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.applyButton}
            onPress={() => navigation.goBack()}>
            <Text style={styles.applyText}>Apply</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F6F6',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 35,
    marginTop: 0,
    marginLeft: 0,
    backgroundColor: '#FFF',
  },
  discardButton: {
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 24,
    padding: 10,
    paddingHorizontal: 30,
  },
  discardText:{
    color:'#000',
  },
  applyButton: {
    backgroundColor: '#00B0FF',
    borderRadius: 24,
    padding: 10,
    paddingHorizontal: 30,
  },
  buttonText: {
    color: '#00B0FF',
    fontWeight: 'bold',
  },
  applyText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 90,
    color: '#222222',
  },
  content: {
    // padding: 20,
    marginTop: 25,
  },
  card: {
    backgroundColor: '#FFF',
    // borderRadius: 10,
    padding: 15,
    paddingHorizontal: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#222222',
    marginLeft: 15,
  },
  sliderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 14,
    color: '#000',
  },
  slider: {
    flex: 1,
    marginHorizontal: 10,
  },
  colorContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginHorizontal: 5,
  },
  selectedColor: {
    borderWidth: 2,
    borderColor: '#FF3D00',
  },
  sizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sizeChip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 16,
    margin: 4,
    borderWidth: 1,
  },
  selectedChip: {
    backgroundColor: '#00B0FF',
    borderWidth: 0,
  },
  sizeText: {
    // color: '#000',
    color: '#222222',
  },
  categoryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 0,
    marginBottom: 0,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
    borderWidth: 1,
    // color:'#9B9B9B',
    margin: 5,
    color: '#222222',
  },
  categoryText: {
    color: '#222222',
  },
  brandsContain: {
    flexDirection: 'row',
  },
  brandsIcon: {
    left: 310,
    bottom: 30,
  },
  brands: {
    color: '#222222',
  },
});

export default FilterScreen;
