/* eslint-disable react-native/no-inline-styles */
/* eslint-disable no-catch-shadow */
/* eslint-disable no-shadow */
import React, { useState, useEffect } from 'react';
import {
  View,
  FlatList,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const RecommendedItemsList = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [liked, setLiked] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [productRatings, setProductRatings] = useState({});

  // Fetching products from the API using fetch
  useEffect(() => {
    fetch('http://213.210.21.175:5000/AW0001/api/v1/allproduct')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data.data);
        setLiked(new Array(data.data.length).fill(false));
        setLoading(false);

        // Fetch ratings for each product
        data.data.forEach((product) => {
          fetchProductRatings(product.id);
        });
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  // Fetch ratings for a product by its id
  const fetchProductRatings = async (productId) => {
    try {
      const response = await fetch(
        `http://213.210.21.175:5000/AW0001/api/v1/getratingbyid?id=${productId}`
      );
      const result = await response.json();
      if (result && result.statuscode === 200 && result.data) {
        const ratings = result.data.map((r) => r.rating);
        const avgRating = ratings.reduce((a, b) => a + b, 0) / ratings.length || 0;
        setProductRatings((prevRatings) => ({
          ...prevRatings,
          [productId]: avgRating.toFixed(1),
        }));
      }
    } catch (error) {
      console.error('Error fetching product ratings:', error);
    }
  };

  const toggleLike = (index) => {
    const newLiked = [...liked];
    newLiked[index] = !newLiked[index];
    setLiked(newLiked);
  };

  const renderStars = (rating) => {
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
        />
      );
    }
    return stars;
  };

  const renderProduct = ({ item, index }) => {
    const productRating = productRatings[item.id] || 0;
    return (
      <View style={styles.productCard}>
        <TouchableOpacity onPress={() => navigation.navigate('ProductCardScreen', {productId: item.id})}>
        <Image source={{ uri: item.product_image }} style={styles.productImage} />
        {item.product_discount ? (
          <View style={styles.discountBadge}>
            <Text style={styles.discountText}>{item.product_discount}% OFF</Text>
          </View>
        ) : null}
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleLike(index)} style={styles.likeButton}>
          <Icon name="heart" size={20} color={liked[index] ? 'red' : 'grey'} />
        </TouchableOpacity>
        <Text style={styles.brandText}>{item.brand?.name}</Text>
        <Text style={styles.productName}>{item.product_name}</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('RatingScreen', { productId: item.id })}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {renderStars(productRating)}
            <Text style={{ marginLeft: 8 }}>{productRating}</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.priceContainer}>
          <Text style={styles.currentPrice}>${item.product_price}</Text>
          {item.oldPrice && <Text style={styles.oldPrice}>{item.oldPrice}</Text>}
        </View>
      </View>
    );
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={products}
      renderItem={renderProduct}
      keyExtractor={(item) => item.id.toString()}
      style={styles.productList}
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  productCard: {
    flex: 1,
    backgroundColor: '#fff',
    margin: 8,
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginLeft:14,
  },
  productImage: {
    width: 190,
    height: 276,
    resizeMode:'contain',
    borderRadius: 10,
  },
  discountBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'red',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
  },
  discountText: {
    color: '#fff',
    fontSize: 12,
  },
  likeButton: {
    position: 'absolute',
    bottom: 100,
    right: 5,
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 5,
    elevation: 2,
  },
  brandText: {
    fontSize: 12,
    color: '#9b9b9b',
    marginTop: 8,
    paddingHorizontal: 8,
  },
  productName: {
    fontSize: 14,
    fontWeight: 'bold',
    paddingHorizontal: 8,
    paddingTop: 4,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingBottom: 8,
  },
  currentPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  oldPrice: {
    fontSize: 12,
    color: '#888',
    textDecorationLine: 'line-through',
    marginLeft: 8,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
    fontSize: 18,
  },
});

export default RecommendedItemsList;
