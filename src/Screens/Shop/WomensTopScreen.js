/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SortByBottomSheetComponent from '../BottomSheets/SortByBottomSheet';
import SuccessMessage from '../../SnakeBar/SnakeBar';
import SearchComponent from '../../Utility/Modal/SearchBar';

const WomenTopsScreen = ({route, navigation}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [selectedSortBy, setSelectedSortBy] = useState('Sort By');
  const {categoryId, categoryName} = route.params || {};
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
    const [isSearchVisible, setIsSearchVisible] = useState(false); // State for showing/hiding search

  // Fetch logged-in user ID from AsyncStorage
  const getUserId = async () => {
    try {
      const id = await AsyncStorage.getItem('userId');
      if (id) {
        setUserId(id);
      }
    } catch (error) {
      console.error('Error fetching user ID:', error);
    }
  };

  // Fetch products from the API
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'http://213.210.21.175:5000/AW0001/api/v1/allproduct',
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data && Array.isArray(data.data)) {
        const filteredProducts = data.data.filter(
          item => item.category_id === categoryId,
        );

        const formattedProducts = filteredProducts.map(item => ({
          id: item.id,
          name: item.product_name || 'Unnamed Product',
          imageUrl: item.product_image,
          rating: item.rating || 0,
          price: item.product_price || 0,
        }));

        setProducts(formattedProducts);
      } else {
        console.error('Unexpected data format:', data);
        setProducts([]);
      }
    } catch (error) {
      console.error('Error fetching products:', error.message || error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserId();
    if (categoryId) {
      fetchProducts();
    }
  }, [categoryId]);

  // Fetch ratings
  const fetchRatings = async () => {
    try {
      const response = await fetch(
        'http://213.210.21.175:5000/AW0001/api/v1/getrating',
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data && Array.isArray(data.data)) {
        const ratings = data.data.reduce((acc, item) => {
          acc[item.product_id] = item.rating;
          return acc;
        }, {});

        // Update products with real ratings
        setProducts(prevProducts =>
          prevProducts.map(product => ({
            ...product,
            rating: ratings[product.id] || 0,
          })),
        );
      } else {
        console.error('Unexpected data format:', data);
      }
    } catch (error) {
      console.error('Error fetching ratings:', error.message || error);
    }
  };

  const loadWishlist = async () => {
    try {
      const savedWishlist = await AsyncStorage.getItem(`wishlist_${userId}`);
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error('Error loading wishlist:', error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchRatings();
    loadWishlist();
  }, []);

  const toggleWishlist = async productId => {
    if (!userId) {return;}
    const isAlreadyInWishlist = wishlist.some(
      product => product.id === productId,
    );
    if (isAlreadyInWishlist) {
      // Remove from wishlist logic remains unchanged
      const updatedWishlist = wishlist.filter(
        product => product.id !== productId,
      );
      setWishlist(updatedWishlist);
      await AsyncStorage.setItem(`wishlist_${userId}`, JSON.stringify(updatedWishlist));
      try {
        await AsyncStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
        navigation.navigate('Wishlist', {refresh: true});
      } catch (error) {
        console.error('Error saving wishlist:', error);
      }
    } else {
      // Add to wishlist and make a POST API call
      const product = products.find(prod => prod.id === productId);
      if (product) {
        const updatedWishlist = [
          ...wishlist,
          {
            ...product,
            product_id: product.id,
            product_name: product.name,
            product_image: product.imageUrl,
            product_price: product.price,
          },
        ];
        setWishlist(updatedWishlist);
        await AsyncStorage.setItem(`wishlist_${userId}`, JSON.stringify(updatedWishlist));
        try {
          console.log('Request payload:', {
            user_id: userId,
            product_id: productId,
          });

          const response = await fetch(
            'http://213.210.21.175:5000/AW0001/api/v1/addwishlist',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user_id: userId,
                product_id: productId,
              }),
            },
          );

          if (!response.ok) {
            const errorDetails = await response.text();
            console.error(
              `HTTP Error: ${response.status}, Response Text: ${errorDetails}`,
            );
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log('Wishlist updated successfully:', data);
          setSuccessMessage('Product added to wishlist!');
            setShowSuccessMessage(true);

            setTimeout(() => {
              setShowSuccessMessage(false);
            }, 3000);
        } catch (error) {
          console.error('Error updating wishlist:', error);
        }
      }
    }
  };

  const handleProductSelect = (product) => {
    // Navigate to product details or handle selection
    console.log('Selected Product:', product);
    setIsSearchVisible(false); // Close the search
  };

  const renderStars = rating => (
    <View style={{flexDirection: 'row'}}>
      {[...Array(5)].map((_, i) => (
        <Icon
          key={i}
          name={i < rating ? 'star' : 'star-outline'}
          size={16}
          color="#FFD700"
        />
      ))}
    </View>
  );

  const renderProduct = ({item}) => (
    <View style={styles.card}>
      <View style={styles.cardContent}>
        <Image source={{uri: item.imageUrl}} style={styles.image} />
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('ProductCardScreen', {productId: item.id})
          }>
          <View style={styles.textContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>Rs {item.price}</Text>
            <View style={styles.ratingContainer}>
              {renderStars(item.rating)}
            </View>
          </View>
        </TouchableOpacity>

        <View style={styles.likeButtonContainer}>
          <TouchableOpacity onPress={() => toggleWishlist(item.id)}>
            <Icon
              name="heart"
              size={24}
              color={
                wishlist.some(product => product.id === item.id)
                  ? 'red'
                  : 'gray'
              }
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.upperTab}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-back-outline" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.searchButton} onPress={() => setIsSearchVisible(true)} >
            <Icon name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>
        {isSearchVisible && (
        <SearchComponent
          onProductSelect={handleProductSelect}
          onClose={() => setIsSearchVisible(false)}
        />
      )}
        <Text style={styles.headerTitle}>{categoryName || 'Category'}</Text>
        <View style={styles.filterSortContainer}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => navigation.navigate('FilterScreen')}>
            <Icon name="filter-outline" size={18} />
            <Text>Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sortButton}
            onPress={() => setBottomSheetVisible(true)}>
            <Text>{selectedSortBy}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sortButton}
            onPress={() => navigation.navigate('GridWomenTops')}>
            <Icon name="grid-sharp" size={18} />
          </TouchableOpacity>
        </View>
      </View>
      {/* SuccessMessage Popup */}
      <SuccessMessage
        visible={showSuccessMessage}
        message={successMessage}
        onClose={() => setShowSuccessMessage(false)}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#00B0ff" />
      ) : products.length > 0 ? (
        <FlatList
          data={products}
          renderItem={renderProduct}
          keyExtractor={item => item.id.toString()}
          contentContainerStyle={styles.list}
        />
      ) : (
        <Text style={styles.noProductsText}>No products found.</Text>
      )}
      <SortByBottomSheetComponent
        visible={isBottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        onSelectSortBy={SortBy => setSelectedSortBy(SortBy)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 10,
  },
  list: {
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    height: 120,
    borderRadius: 10,
    elevation: 1,
    padding: 10,
    marginBottom: 15,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Added to ensure space between elements
  },

  likeButtonContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    width: 40,
  },

  likeButton: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  // cardContent: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  // },
  image: {
    height: 110,
    width: 120,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  price: {
    color: '#888',
    marginTop: 5,
  },
  ratingContainer: {
    marginVertical: 5,
  },
  // likeButton: {
  //   marginLeft: 10,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  // },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    marginTop: -8,
    marginBottom:8,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#222222',
    backgroundColor: '#fff',
  },
  tabs: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#222222',
    borderRadius: 25,
    marginRight: 10,
  },
  tabText: {
    color: '#fff',
    fontSize: 12,
  },
  filterSortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    margin: 8,
    marginTop:8,
    marginBottom: 12,
    borderRadius: 20,
    backgroundColor: '#f9f9f9',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  upperTab: {
    backgroundColor: '#fff',
  },
  noProductsText: {
    textAlign: 'center',
    fontSize: 28,
    top: 180,
  },
});

export default WomenTopsScreen;
