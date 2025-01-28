import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
// import MainCategory from '../Screens/Shop/CategoryScreen';
import HomeScreen from '../Screens/Home/HomeScreen';
import ProfileScreen from '../Screens/Profile/Profile';
import CategoryDetailPage from '../Screens/Shop/CategoryDetailScreen';
import WomenTopsScreen from '../Screens/Shop/WomensTopScreen';
import GridWomenTops from '../Screens/Shop/GridWomenTopScreen';
import GridWishList from '../Screens/Favorites/GridWishlist';
import Wishlist from '../Screens/Favorites/Wishlist';
import BagScreen from '../Screens/Bag/BagScreen';
import MyOrders from '../Screens/Orders/OrderScreen';
import OrderDetails from '../Screens/Orders/OrderDetailsScreen';
import MainCategory from '../Screens/Shop/CategoryScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const createStack = (screens) => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {screens.map(({ name, component }, index) => (
        <Stack.Screen key={index} name={name} component={component} />
      ))}
    </Stack.Navigator>
  );
};

const HomeStackNavigator = () =>
  createStack([
    { name: 'HomeScreen', component: HomeScreen },
  ]);

const ShopStackNavigator = () =>
  createStack([
    { name: 'MainCategory', component: MainCategory },
    { name: 'CategoryDetail', component: CategoryDetailPage },
    { name: 'WomenTops', component: WomenTopsScreen },
    { name: 'GridWomenTops', component: GridWomenTops },
  ]);

const WishlistStackNavigator = () =>
  createStack([
    { name: 'Wishlist', component: Wishlist },
    { name: 'GridWishList', component: GridWishList },
  ]);

const ProfileStackNavigator = () =>
  createStack([
    { name: 'ProfileScreen', component: ProfileScreen },
    { name: 'MyOrders', component: MyOrders },
    { name: 'OrderDetails', component: OrderDetails },
  ]);
  const BagStackNavigator = () =>
    createStack([
      { name: 'MyBag', component: BagScreen },
      { name: 'MyOrders', component: MyOrders },
      { name: 'OrderDetails', component: OrderDetails },
    ]);

const getTabBarIcon = (routeName, color, size) => {
  const icons = {
    Home: 'home',
    Shop: 'cart-outline',
    Bag: 'shopping',
    Favorites: 'heart-outline',
    Profile: 'account-outline',
  };
  const iconName = icons[routeName] || 'circle';
  return <Icon name={iconName} size={size} color={color} />;
};

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => getTabBarIcon(route.name, color, size),
        tabBarActiveTintColor: '#00B0FF',
        tabBarInactiveTintColor: '#9B9B9B',
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Shop" component={ShopStackNavigator} />
      <Tab.Screen name="Bag" component={BagStackNavigator} />
      <Tab.Screen name="Favorites" component={WishlistStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileStackNavigator} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;
