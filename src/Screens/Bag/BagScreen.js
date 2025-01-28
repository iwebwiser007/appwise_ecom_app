/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Image,
  Modal,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {fetchCartItems, removeItemFromCart} from '../../Api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFocusEffect} from '@react-navigation/native';
import SearchComponent from '../../Utility/Modal/SearchBar';

const MemoizedCartItem = React.memo(
  ({item, quantity, updateQuantity, handleMenuOpen}) => {
    const product = item.productDetails || {};
    return (
      <View style={styles.itemContainer}>
        <Image
          source={{
            uri:
              product.product_image || 'https://example.com/default-image.png',
          }}
          style={styles.image}
        />
        <View style={styles.itemDetails}>
          <Text style={styles.itemName}>{product.product_name}</Text>
          <Text style={styles.itemDescription}>
            Color: {item.color || 'N/A'} Size: {item.size || 'N/A'}
          </Text>
          <View style={styles.itemMore}>
            <TouchableOpacity onPress={() => handleMenuOpen(item.id)}>
              <Icon name="ellipsis-vertical" size={16} color="#222222" />
            </TouchableOpacity>
          </View>
          <View style={styles.quantityContainer}>
            <TouchableOpacity
              onPress={() => updateQuantity(item.id, 'decrement')}>
              <Icon name="remove-outline" size={16} color="#9B9B9B" />
            </TouchableOpacity>
            <Text style={styles.quantity}>{quantity[item.id]}</Text>
            <TouchableOpacity
              onPress={() => updateQuantity(item.id, 'increment')}>
              <Icon name="add-outline" size={16} color="black" />
            </TouchableOpacity>
          </View>
        </View>
        <Text style={styles.itemPrice}>R {product.product_price || 0}</Text>
      </View>
    );
  },
);

const BagScreen = ({navigation}) => {
  const [cartItems, setCartItems] = useState([]);
  const [quantity, setQuantity] = useState({});
  const [promoCode, setPromoCode] = useState('');
  const [showMenu, setShowMenu] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isSearchVisible, setIsSearchVisible] = useState(false); // State for showing/hiding search

  // Fetch cart items from the API
  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          throw new Error('User ID is missing');
        }
        const items = await fetchCartItems(userId);
        setCartItems(items);
      } catch (error) {
        console.error(error.message);
      }
    };
    fetchUserCart();
  }, []);

  const fetchCartItemsData = async () => {
    try {
      const userId = await AsyncStorage.getItem('userId');
      const items = await fetchCartItems(userId);
      setCartItems(items);
    } catch (error) {
      console.error('Error fetching cart items:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchCartItemsData();
    }, []),
  );

  useEffect(() => {
    const loadCartItems = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (!userId) {
          throw new Error('User ID not found');
        }
        const items = await fetchCartItems(userId);
        setCartItems(items);
        const initialQuantities = items.reduce((acc, item) => {
          acc[item.id] = 1;
          return acc;
        }, {});
        setQuantity(initialQuantities);
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadCartItems();
  }, []);

  useEffect(() => {
    console.log('Cart Items:', cartItems);
  }, [cartItems]);

  const updateQuantity = (id, type) => {
    setQuantity(prevQuantity => {
      const updatedQuantity = {
        ...prevQuantity,
        [id]:
          type === 'increment'
            ? (prevQuantity[id] || 1) + 1
            : Math.max(1, (prevQuantity[id] || 1) - 1),
      };
      return updatedQuantity;
    });
  };
  const handleMenuOpen = itemId => {
    setSelectedItem(itemId);
    setShowMenu(true);
  };

  const handleAddToWishlist = () => {
    console.log(`Item ${selectedItem} Add to Wishlist`);
    setShowMenu(false); // Close the menu
  };
  const handleRemoveFromCart = async (itemId) => {
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      console.log('User ID is missing');
      return;
    }

    try {
      console.log('Attempting to remove item ID:', itemId);
      const itemToRemove = cartItems.find(item => item.id === itemId);
      if (!itemToRemove) {
        console.log(`Item with ID ${itemId} not found in cart`);
        return;
      }

      const productId = itemToRemove.productDetails.id;
      const result = await removeItemFromCart(userId, productId);
      if (result.statuscode === 200) {

        setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
        console.log('Item removed from cart:', productId);
      } else {
        console.log('Failed to remove item:', result.message || 'Unknown error');
      }
    } catch (error) {
      console.log('Error removing item from cart:', error.message);
      if (error.message === 'Item not found in cart') {
        const updatedCart = await fetchCartItems(userId);
        setCartItems(updatedCart);
      }
    }
  };

  function isCyclic(obj) {
    const seenObjects = new WeakSet();
    function detect(value) {
      if (value && typeof value === 'object') {
        if (seenObjects.has(value)) {
          return true;
        }
        seenObjects.add(value);
        for (const key in value) {
          if (detect(value[key])) {
            return true;
          }
        }
      }
      return false;
    }
    return detect(obj);
  }

  useEffect(() => {
    if (isCyclic(cartItems)) {
      console.error('Cyclic structure detected in cartItems:', cartItems);
    }
  }, [cartItems]);
  if (isLoading) {
    return <ActivityIndicator size="large" color="#00B0FF" />;
  }
  const handleProductSelect = (product) => {
    // Navigate to product details or handle selection
    console.log('Selected Product:', product);
    setIsSearchVisible(false); // Close the search
  };
  const renderItem = ({item}) => (
    <MemoizedCartItem
      item={item}
      quantity={quantity}
      updateQuantity={updateQuantity}
      handleMenuOpen={handleMenuOpen}
    />
  );
  const totalPrice = cartItems.reduce(
    (sum, item) =>
      sum +
      (item.productDetails?.product_price || 0) * (quantity[item.id] || 1),
    0,
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={{textAlign: 'center', marginTop: 50}}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.searchButton} onPress={() => setIsSearchVisible(true)}>
        <Icon name="search-outline" size={24} color="black" />
      </TouchableOpacity>
      {isSearchVisible && (
        <SearchComponent
          onProductSelect={handleProductSelect}
          onClose={() => setIsSearchVisible(false)}
        />
      )}
      <Text style={styles.header}>My Bag</Text>
      <FlatList
        data={cartItems}
        keyExtractor={item => item.id.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
      <View style={styles.promoCodeContainer}>
        <TextInput
          style={styles.promoInput}
          placeholder="Enter your promo code"
          value={promoCode}
          onChangeText={setPromoCode}
        />
        <TouchableOpacity style={styles.promoButton}>
          <Icon name="arrow-forward-circle" size={28} color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.total}>
        <Text style={styles.totalAmount}>Total amount:</Text>
        <Text style={styles.totalPrice}>
          R {totalPrice.toLocaleString('en-IN')}
        </Text>
      </View>
      <TouchableOpacity
        style={styles.checkoutButton}
        onPress={() =>{
          const productId = cartItems[0].productDetails?.id;
          navigation.navigate('CheckOutScreen', {totalAmount: totalPrice,  productId: productId });
        }
        }>
        <Text style={styles.checkoutText}>CHECK OUT</Text>
      </TouchableOpacity>

      {showMenu && (
        <Modal
          animationType="pop-up"
          transparent={true}
          visible={showMenu}
          onRequestClose={() => setShowMenu(false)}>
          <View style={styles.menuContainer}>
            <View style={styles.menu}>
              <TouchableOpacity
                onPress={handleAddToWishlist}
                style={styles.menuOption}>
                <Text style={styles.menuOptionText}>Add to Wishlist</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  handleRemoveFromCart(selectedItem);
                  setShowMenu(false);
                }}
                style={styles.menuOption}>
                <Text style={styles.menuOptionText}>Remove from Cart</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setShowMenu(false)}
                style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F9F9F9'},
  searchButton: {
    position: 'absolute',
    right: 16,
    top: 4,
    padding: 4,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 24,
    marginTop: 44,
    color: '#222222',
  },
  list: {paddingHorizontal: 16},
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 12,
    position: 'relative',
  },
  itemMore: {
    position: 'relative',
    right: -196,
    top: -60,
    zIndex: 10,
  },
  image: {
    width: 80,
    height: 120,
    borderRadius: 10,
    marginRight: 10,
    resizeMode: 'contain',
  },
  itemDetails: {flex: 1},
  itemName: {fontSize: 16, fontWeight: 'bold', color: '#222222'},
  itemDescription: {fontSize: 11, color: 'gray'},
  quantityContainer: {flexDirection: 'row', alignItems: 'center', marginTop: 5},
  quantity: {marginHorizontal: 10, fontSize: 16},
  itemPrice: {fontSize: 14, fontWeight: 'bold', top: 36, color: '#222222'},
  promoCodeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    paddingHorizontal: 16,
  },
  promoInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    marginRight: 10,
  },
  promoButton: {
    padding: 10,
  },
  total: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  totalAmount: {
    fontSize: 14,
    fontFamily: 'Metropolis',
    fontWeight: 'bold',
    textAlign: 'left',
    marginVertical: 10,
    marginLeft: -40,
  },
  totalPrice: {
    marginTop: 8,
    fontSize: 18,
    marginLeft: 60,
    textAlign: 'right',
    alignItems: 'flex-end',
    fontFamily: 'Metropolis',
  },
  checkoutButton: {
    backgroundColor: '#00B0FF',
    borderRadius: 35,
    padding: 10,
    alignItems: 'center',
    marginHorizontal: 16,
    marginBottom:'8',
  },
  checkoutText: {color: 'white', fontSize: 16, textAlign:'center'},

  // Modal Styles
  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menu: {
    backgroundColor: 'white',
    borderRadius: 10,
    width: 250,
    paddingVertical: 16,
    paddingHorizontal: 12,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 8,
  },
  menuOption: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  menuOptionText: {
    fontSize: 16,
    color: '#222222',
  },
  closeButton: {
    marginTop: 16,
    paddingVertical: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: '#00B0FF',
  },
});

export default BagScreen;

