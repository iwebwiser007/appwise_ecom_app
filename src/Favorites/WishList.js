/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/no-unstable-nested-components */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  fetchUserWishlist,
  fetchAllProducts,
  fetchProductRatingsById,
  removeFromWishlist,
  addItemToCart,
} from '../APIServer';
import {useFocusEffect} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import Ionicons from 'react-native-vector-icons/Ionicons';

import SortByBottomSheetComponent from '../Shop/Categories/SortByBottomSheet';

const Wishlist = ({navigation, route}) => {
  const [wishlist, setWishlist] = useState([]);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [selectedSortBy, setSelectedSortBy] = useState('Sort By');
  const [userId, setUserId] = useState(null);
  // const [averageRatings, setAverageRating] = useState(0);

  useEffect(() => {
    const getUserId = async () => {
      try {
        const id = await AsyncStorage.getItem('userId');
        if (id) {
          setUserId(id);
        }
      } catch (error) {
        console.error('Error fetching user ID from storage:', error);
      }
    };
    getUserId();
  }, []);

  // Fetch wishlist data from the API
  const fetchWishlist = async () => {
    if (!userId) {
      return;
    }
    try {
      const wishlistItems = await fetchUserWishlist(userId);
      const allProducts = await fetchAllProducts();
      const mergedWishlist = await Promise.all(
        wishlistItems.map(async item => {
          const product = allProducts.find(
            prod => prod.id === parseInt(item.product_id, 10),
          );
          const ratings = await fetchProductRatingsById(item.product_id);
          const averageRating =
            ratings.length > 0
              ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length
              : 0;

          return {...item, ...product, averageRating};
        }),
      );

      setWishlist(mergedWishlist);
    } catch (error) {
      console.log('Error fetching wishlist:', error);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchWishlist();
    }, [userId]),
  );

  useEffect(() => {
    if (route.params?.updatedWishlist) {
      setWishlist(route.params.updatedWishlist);
    }
  }, [route.params]);
  const deleteWishlist = async productId => {
    if (!userId) {
      return;
    }
    try {
      await removeFromWishlist(userId, productId);
      setWishlist(prevWishlist =>
        prevWishlist.filter(item => item.product_id !== productId),
      );
    } catch (error) {
      console.error('Error removing item from wishlist:', error);
    }
  };
  const addItemToCartHandler = async product => {
    if (!userId) {
      return;
    }
    try {
      const size = product.product_size || 'N/A';
      const color = product.product_color || 'Black';
      const quantity = 1;

      const result = await addItemToCart(
        userId,
        product.product_id,
        size,
        color,
        quantity,
      );
      if (result && result.statuscode === 200) {
        console.log('Item added to cart:', result);
      }
    } catch (error) {
      console.log('Error adding item to cart:', error);
    }
  };

  useEffect(() => {
    const fetchWishlistFromStorage = async () => {
      const savedWishlist = await AsyncStorage.getItem('wishlist');
      setWishlist(savedWishlist ? JSON.parse(savedWishlist) : []);
    };
    fetchWishlistFromStorage();
  }, []);
  const renderStars = rating => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Icon
          key={i}
          name={
            i <= Math.floor(rating)
              ? 'star'
              : i - rating <= 0.5
              ? 'star-half'
              : 'star-outline'
          }
          size={16}
          color="#FFD700"
        />,
      );
    }
    return stars;
  };
  const renderWishlistItem = ({item}) => (
    <View style={styles.card}>
      <Image
        source={{uri: item.product_image || 'https://via.placeholder.com/150'}}
        style={styles.productImage}
      />
      <View style={styles.productDetails}>
        <Text style={styles.productBrand}>
          {item.brand?.name || 'Unknown Brand'}
        </Text>
        <Text style={styles.productName}>
          {item.product_name || `Product ID: ${item.product_id}`}
        </Text>
        <Text style={styles.productInfo}>
          Color: {item.product_color || 'N/A'} Size:{' '}
          {item.product_weight || 'N/A'}
        </Text>
        <View style={styles.productPriceRating}>
        <Text style={styles.productPrice}>
          R {item.product_price ? item.product_price : 'N/A'}
        </Text>
        <View style={styles.ratingContainer}>
          {renderStars(item.averageRating)}
          {/* <Text style={styles.ratingText}>{item.averageRating.toFixed(1)}</Text> */}
        </View>
        </View>
      </View>
      <TouchableOpacity
        style={styles.addToCartIcon}
        onPress={() => addItemToCartHandler(item)}>
        <Iconn name="shopping" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.closeIcon}
        onPress={() => deleteWishlist(item.product_id)}>
        <AntDesign name="close" size={16} color="black" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.searchButton}>
        <Icon name="search-outline" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Favorites</Text>
      <View style={styles.scrollbar}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabs}>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Summer</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>T-Shirts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Sleeveless</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>High Neck</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      <View style={styles.filterSortContainer}>
        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => navigation.navigate('FilterScreen')}>
          <Icon name="filter-outline" size={18} color="black" />
          <Text>Filters</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => setBottomSheetVisible(true)}>
          <Text>{selectedSortBy}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.sortButton}
          onPress={() => navigation.navigate('GridWishList')}>
          <Icon name="list-sharp" size={20} color="black" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={wishlist}
        renderItem={renderWishlistItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.wishlistContainer}
        ListEmptyComponent={() => (
          <View style={{alignItems: 'center', marginTop: 20}}>
            <Text>No items in the wishlist</Text>
          </View>
        )}
      />
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
    backgroundColor: '#fff',
  },
  searchButton: {
    position: 'absolute',
    right: 16,
    top: 4,
    padding: 4,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    padding: 20,
    color: '#222222',
  },
  tabs: {
    flexDirection: 'row',
    paddingVertical: 0,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
    marginBottom: 8,
    marginTop: 8,
  },
  tab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#222222',
    borderRadius: 20,
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
    backgroundColor: '#f9f9f9',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortButton: {},
  wishlistContainer: {
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
  },
  productImage: {
    width: 90,
    height: 130,
    borderRadius: 5,
    resizeMode: 'contain',
  },
  productDetails: {
    flex: 1,
    paddingHorizontal: 15,
    color: '#222222',
  },
  productName: {
    fontSize: 16,
    fontWeight: '600',
  },
  productBrand: {
    fontSize: 14,
    color: '#222222',
  },
  productInfo: {
    fontSize: 14,
    color: '#222222',
  },
  productPriceRating:{
    flexDirection:'row',
  },
  productPrice: {
    fontSize: 16,
    color: '#000',
    fontWeight: 'bold',
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'right',
    marginTop: 5,
    marginLeft:10,
  },
  ratingText: {
    fontSize: 14,
    marginLeft: 5,
    color: '#222222',
  },
  closeIcon: {
    padding: 10,
    position: 'absolute',
    top: 10,
    right: 10,
  },
  addToCartIcon: {
    padding: 10,
    position: 'absolute',
    bottom: 4,
    right: 10,
    backgroundColor: '#00B0FF',
    borderRadius: 25,
  },
});

export default Wishlist;
