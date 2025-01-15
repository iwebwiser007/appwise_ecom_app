/* eslint-disable no-unused-vars */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconn from 'react-native-vector-icons/Ionicons';
import SortByBottomSheetComponent from './SortByBottomSheet';

const GridWomenTops = ({navigation}) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedItems, setLikedItems] = useState([]);
  const [wishlist, setWishlist] = useState([]);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);
  const [selectedSortBy, setSelectedSortBy] = useState('Sort By');

  // Fetch products from API
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
        const formattedProducts = data.data.map(item => ({
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
            rating: ratings[product.id] || 0, // Use the fetched rating or default to 0
          })),
        );
      } else {
        console.error('Unexpected data format:', data);
      }
    } catch (error) {
      console.error('Error fetching ratings:', error.message || error);
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchRatings();
  }, []);

  const addToWishlist = async productId => {
    // Check if product is already in wishlist
    if (wishlist.some(product => product.id === productId)) {
      console.log('Product already in wishlist');
      return;
    }

    // Optimistically add to the wishlist (immediate UI update)
    const product = products.find(prod => prod.id === productId);
    if (product) {
      setWishlist(prevWishlist => [
        ...prevWishlist,
        {
          ...product,
          product_id: product.id,
          product_name: product.name,
          product_image: product.imageUrl,
          product_price: product.price,
        },
      ]);
    }

    try {
      // Add to Wishlist
      const response = await fetch(
        'http://213.210.21.175:5000/AW0001/api/v1/addwishlist',
        {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({user_id: 1, product_id: productId}),
        },
      );

      const data = await response.json();

      if (response.ok && data.status) {
        console.log('Product added to wishlist successfully:', data);
      } else {
        console.error('Failed to add product to wishlist:', data.message);
        setWishlist(prevWishlist =>
          prevWishlist.filter(item => item.id !== productId),
        );
      }
    } catch (error) {
      console.error('Error adding product to wishlist:', error.message);
      setWishlist(prevWishlist =>
        prevWishlist.filter(item => item.id !== productId),
      );
    }
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
    <TouchableOpacity
      style={styles.productContainer}
      onPress={() =>
        navigation.navigate('ProductCardScreen', {productId: item.id})
      }>
      <Image source={{uri: item.imageUrl}} style={styles.productImage} />
      <View style={styles.ratingContainer}>{renderStars(item.rating)}</View>
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>Rs {item.price}</Text>
    </TouchableOpacity>
  );
  // Render individual product card
  // const renderProduct = ({item}) => (
  //   <View style={styles.card}>
  //     <View style={styles.imageContainer}>
  //       <Image source={{uri: item.imageUrl}} style={styles.productImage} />
  //       <TouchableOpacity
  //         style={styles.likeButton}
  //         onPress={() => addToWishlist(item.id)}>
  //         <Icon
  //           name="favorite"
  //           size={20}
  //           color={likedItems.includes(item.id) ? 'red' : '#ccc'}
  //         />
  //       </TouchableOpacity>
  //     </View>
  //     <TouchableOpacity
  //       onPress={() => navigation.navigate('ProductCardScreen')}>
  //       <View style={styles.textContainer}>
  //         <Text style={styles.name}>{item.name}</Text>
  //         <Text style={styles.price}>${item.price}</Text>
  //         <View style={styles.ratingContainer}>{renderStars(item.rating)}</View>
  //       </View>
  //     </TouchableOpacity>
  //   </View>
  // );

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#000" />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <View style={styles.upperTab}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Iconn name="chevron-back-outline" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Women's Tops</Text>
          <TouchableOpacity>
            <Icon name="search" size={24} color="black" />
          </TouchableOpacity>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.tabs}>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>T-shirts</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Crop tops</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>Sleeveless</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.tab}>
            <Text style={styles.tabText}>HighNeck</Text>
          </TouchableOpacity>
        </ScrollView>
        <View style={styles.filterSortContainer}>
          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => navigation.navigate('FilterScreen')}>
            <Iconn name="filter-outline" size={18} />
            <Text>Filters</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sortButton}
            onPress={() => setBottomSheetVisible(true)}>
            <Text>{selectedSortBy}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.sortButton}
            onPress={() => navigation.navigate('WomenTopsScreen')}>
            <Iconn name="grid-sharp" size={18} />
          </TouchableOpacity>
        </View>
      </View>
      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={item => item.id.toString()}
        renderItem={renderProduct}
        columnWrapperStyle={styles.row}
        contentContainerStyle={styles.listContainer}
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
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  productContainer: {
    flex: 1,
    marginHorizontal: 8,
    marginBottom: 16,
    alignItems: 'left',
    borderRadius: 24,
  },
  productImage: {
    width: 164,
    height: 236,
    borderRadius: 24,
    resizeMode: 'contain',
  },
  productName: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
    textAlign: 'left',
  },
  filterSortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    margin: 8,
    marginBottom: 12,
    borderRadius: 20,
    backgroundColor: '#f9f9f9',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#222222',
    marginTop: 4,
    textAlign: 'left',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginTop: 4,
    justifyContent: 'left',
  },
  row: {
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  listContainer: {
    paddingHorizontal: 8,
  },
  imageContainer: {
    position: 'relative',
  },
  likeButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 3,
  },
  textContainer: {
    padding: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  price: {
    fontSize: 14,
    color: '#555',
    marginVertical: 4,
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
  upperTab: {
    backgroundColor: '#fff',
  },
});

export default GridWomenTops;
