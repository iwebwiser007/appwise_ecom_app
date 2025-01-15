/* eslint-disable no-unused-vars */
import React, {useEffect, useState, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  Image,
  Animated,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

const {width} = Dimensions.get('window');

const HomeScreen = ({navigation}) => {
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newArrivals, setNewArrivals] = useState([]);
  const [hotDeals, setHotDeals] = useState([]);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestSellerProducts, setBestSeller] = useState([]);
  const [products, setProducts] = useState([]);
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef(null);
  const currentIndex = useRef(0);

  // Fetch banners from API
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(
          'http://213.210.21.175:5000/AW0001/api/v1/getallbanner',
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const {data} = await response.json();
        const validBanners = data.filter(
          banner =>
            banner.image && banner.image !== 'null' && banner.status === '1',
        );
        setBanners(validBanners);
      } catch (error) {
        console.error('Error fetching banners:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  // Fetch New Products from API
  useEffect(() => {
    const fetchProductCard = async () => {
      try {
        const response = await fetch(
          'http://213.210.21.175:5000/AW0001/api/v1/allproduct',
        );
        const result = await response.json();
        if (result.data) {
          const formattedProducts = result.data
            .filter(item => item.product_image && item.product_image !== 'null')
            .map(item => ({
              id: item.id,
              title: item.product_name || 'Untitled Product',
              image: item.product_image,
            }));
          setProducts(formattedProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductCard();
  }, []);

  // Fetch Discounted Products from API
  useEffect(() => {
    const fetchHotDeals = async () => {
      try {
        const response = await fetch(
          'http://213.210.21.175:5000/AW0001/api/v1/allproduct',
        );
        const result = await response.json();
        if (result.data) {
          const formattedProducts = result.data
            .filter(
              item =>
                item.product_image &&
                item.product_image !== 'null' &&
                item.product_discount &&
                Number(item.product_discount) > 10,
            )
            .map(item => ({
              id: item.id,
              title: item.product_name || 'Untitled Product',
              image: item.product_image,
              discountedPrice: item.product_discount,
            }));
          setProducts(formattedProducts);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchHotDeals();
  }, []);


  // Fetch products from the API and filter data
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          'http://213.210.21.175:5000/AW0001/api/v1/allproduct',
        );
        const result = await response.json();

        if (result.data) {
          const newProducts = result.data.filter(
            item =>
              item.product_image &&
              item.product_image !== 'null' &&
              item.product_discount === 0,
          );

          const deals = result.data.filter(
            item =>
              item.product_image &&
              item.product_image !== 'null' &&
              item.product_discount &&
              Number(item.product_discount) > 0,
          );

          const featured = result.data.filter(
            item =>
              item.product_image &&
              item.product_image !== 'null' &&
              item.is_featured === true,
          );
          const bestseller = result.data.filter(
            item =>
              item.product_image &&
              item.product_image !== 'null' &&
              item.is_bestseller === true,
          );

          setNewArrivals(
            newProducts.map(item => ({
              id: item.id,
              title: item.product_name || 'Untitled Product',
              image: item.product_image,
            })),
          );

          setHotDeals(
            deals.map(item => ({
              id: item.id,
              title: item.product_name || 'Untitled Product',
              image: item.product_image,
              discountedPrice: item.product_discount,
            })),
          );
          setBestSeller(
            bestseller.map(item => ({
              id: item.id,
              title: item.product_name || 'Untitled Product',
              image: item.product_image,
            })),
          );

          setFeaturedProducts(
            featured.map(item => ({
              id: item.id,
              title: item.product_name || 'Untitled Product',
              image: item.product_image,
            })),
          );
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);


  // Auto-scroll banners every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      if (flatListRef.current && banners.length > 0) {
        currentIndex.current = (currentIndex.current + 1) % banners.length;
        flatListRef.current.scrollToIndex({
          index: currentIndex.current,
          animated: true,
        });
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [banners]);

  const renderBanner = ({item}) => (
    <View style={styles.bannerContainer}>
      <Image source={{uri: item.image}} style={styles.bannerImage} />
      <View style={styles.bannerOverlay}>
        <Text style={styles.bannerText}>{item.title || 'Untitled Banner'}</Text>
        <TouchableOpacity
          style={styles.checkButton}
          onPress={() => navigation.navigate('FashionSale', {id: item.id})}>
          <Text style={styles.checkButtonText}>Check</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderProduct = ({item}) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductCardScreen', {id: item.id})}>
      <View style={styles.productImageContainer}>
        <Image source={{uri: item.image}} style={styles.productImage} />
        <View style={styles.newBadge}>
          <Text style={styles.newBadgeText}>New</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderHotDeal = ({item}) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductCardScreen', {id: item.id})}>
      <View style={styles.productImageContainer}>
        <Image source={{uri: item.image}} style={styles.productImage} />
        <View style={styles.newBadge}>
          <Text style={styles.newBadgeText}>Hot Deal</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderFeatured = ({item}) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductCardScreen', {id: item.id})}>
      <View style={styles.productImageContainer}>
        <Image source={{uri: item.image}} style={styles.productImage} />
        <View style={styles.newBadge}>
          <Text style={styles.newBadgeText}>Featured</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderBestSeller = ({item}) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('ProductCardScreen', {id: item.id})}>
      <View style={styles.productImageContainer}>
        <Image source={{uri: item.image}} style={styles.productImage} />
        <View style={styles.newBadge}>
          <Text style={styles.newBadgeText}>Best Seller</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }


  return (
    <ScrollView showsVerticalScrollIndicator={false} style={styles.container}>
      <View>
        {banners.length > 0 ? (
          <FlatList
            data={banners}
            renderItem={renderBanner}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            ref={flatListRef}
            onScroll={Animated.event(
              [{nativeEvent: {contentOffset: {x: scrollX}}}],
              {useNativeDriver: false},
            )}
          />
        ) : (
          <Text style={styles.loadingText}>Loading banners...</Text>
        )}
      </View>

      <View style={styles.newSection}>
        <Text style={styles.newTitle}>New</Text>
        <Text
          style={styles.viewAll}
          onPress={() => navigation.navigate('Shop')}>
          View all
        </Text>
      </View>

      <Text style={styles.subtitle}>You’ve never seen it before!</Text>

      <FlatList
        data={newArrivals}
        renderItem={renderProduct}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.productList}
      />
      <View style={styles.newSection}>
        <Text style={styles.hotDealTitle}>Hot Deals</Text>
        <Text
          style={styles.viewAll}
          onPress={() => navigation.navigate('Shop')}>
          View all
        </Text>
      </View>

      <FlatList
        data={hotDeals}
        renderItem={renderHotDeal}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.productList}
      />
      <View style={styles.newSection}>
        <Text style={styles.hotDealTitle}>Featured Products</Text>
        <Text
          style={styles.viewAll}
          onPress={() => navigation.navigate('Shop')}>
          View all
        </Text>
      </View>
      <Text style={styles.subtitle}>You’ve never seen it before!</Text>

      <FlatList
        data={featuredProducts}
        renderItem={renderFeatured}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.productList}
      />
      <View style={styles.newSection}>
        <Text style={styles.hotDealTitle}>Best Seller</Text>
        <Text
          style={styles.viewAll}
          onPress={() => navigation.navigate('Shop')}>
          View all
        </Text>
      </View>
      <FlatList
        data={bestSellerProducts}
        renderItem={renderBestSeller}
        keyExtractor={item => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.productList}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  bannerContainer: {
    width: 376,
    height: 476,
    // position: 'relative',
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    // resizeMode: 'cover',
    resizeMode:'contain',
  },
  bannerOverlay: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: 'column',
  },
  bannerText: {
    color: '#555',
    fontSize: 42,
    fontFamily: 'Metropolis',
    fontWeight: 'bold',
    flex: 1,
  },
  checkButton: {
    backgroundColor: '#00B0ff',
    // paddingVertical: 8,
    // paddingHorizontal: 16,
    height: 36,
    width: 160,
    borderRadius: 35,
    // marginLeft: 0,
    alignItems: 'left',
  },
  checkButtonText: {
    color: '#fff',
    fontSize: 14,
    fontFamily: 'Metropolis',
    textAlign: 'center',
    top: 8,
  },
  loadingText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#888',
  },
  newSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
  },
  newTitle: {
    fontSize: 24,
    fontFamily: 'Metropolis',
    fontWeight: 'bold',
    color: '#222222',
  },
  hotDealTitle: {
    fontSize: 24,
    fontFamily: 'Metropolis',
    fontWeight: 'bold',
    color: '#222222',
  },
  viewAll: {
    fontSize: 11,
    fontFamily: 'Metropolis',
    color: '#222222',
    marginTop: 8,
  },
  subtitle: {
    fontSize: 11,
    fontFamily: 'Metropolis',
    color: '#555',
    paddingHorizontal: 15,
    marginBottom: 10,
    marginTop: -16,
  },
  productList: {
    paddingHorizontal: 15,
  },
  productCard: {
    justifyContent: 'space-between',
    marginRight: 15,
    flex: 1,
    margin: 10,
  },
  productImage: {
    width: 150,
    height: 218,
    resizeMode: 'contain',
    borderRadius: 24,
  },
  productTitle: {
    marginTop: 4,
    fontSize: 14,
    fontFamily: 'Metropolis',
    color: '#333',
    textAlign: 'center',
  },
  productImageContainer: {
    position: 'relative',
    width: 150,
    height: 218,
    borderRadius: 4,
    overflow: 'hidden',
  },
  newBadge: {
    position: 'absolute',
    backgroundColor: '#3b3c36',
    paddingHorizontal: 8,
    top: 0,
    paddingVertical: 4,
    borderRadius: 20,
  },
  newBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Metropolis',
    fontWeight: 'bold',
  },
  hotDealBadge: {
    position: 'absolute',
    backgroundColor: '#3b3c36',
    paddingHorizontal: 8,
    top: 0,
    paddingVertical: 4,
    borderRadius: 20,
  },
  hotDealBadgeText: {
    color: '#fff',
    fontSize: 12,
    fontFamily: 'Metropolis',
    fontWeight: 'bold',
  },
  discountedPrice: {
    marginTop: 8,
    fontSize: 14,
    fontFamily: 'Metropolis',
    fontWeight: 'bold',
    color: '#FF5722', // Highlight discounted price
    textAlign: 'center',
  },
});

export default HomeScreen;

