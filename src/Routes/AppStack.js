import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import MainTabNavigator from '../Routes/BottomTabNavigator';
import CategoryDetailPage from '../Screens/Shop/CategoryDetailScreen';
import WomenTopsScreen from '../Screens/Shop/WomensTopScreen';
import GridWomenTopScreen from '../Screens/Shop/GridWomenTopScreen';
import FilterScreen from '../Screens/ExtraScreens/FilterScreen';
import BrandSelectionScreen from '../Screens/ExtraScreens/BrandSelection';
import ProductCardScreen from '../Screens/Shop/ProductCardScreen';
import GridWishList from '../Screens/Favorites/GridWishlist';
import CheckoutScreen from '../Screens/Bag/CheckoutScreen';
// import PaymentMethodsScreen from '../Cart/PaymentMethod';
import BagScreen from '../Screens/Bag/BagScreen';
import ShippingAddress from '../Screens/Bag/ShippingAddress';
import AddAddress from '../Screens/Bag/AddAddress';
import SucessOrder from '../Screens/Orders/SuccessScreen';
import MyOrders from '../Screens/Orders/OrderScreen';
import OrderDetailScreen from '../Screens/Orders/OrderDetailsScreen';
import Settings from '../Screens/Profile/Setting';
import RatingAndReviews from '../Screens/Ratings/RatingScreen';
import PayFastPaymentScreen from '../Screens/Payments/PayFastPaymentScreen';
import RecommendedItemsList from '../Screens/Shop/RecommendedItemsList';

const Stack = createStackNavigator();

export default function AppStack() {
  return (
    <Stack.Navigator initialRouteName="MainApp">
      <Stack.Screen
        name="MainApp"
        component={MainTabNavigator}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="CategoryDetail"
        component={CategoryDetailPage}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="WomenTops"
        component={WomenTopsScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GridWomenTops"
        component={GridWomenTopScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="FilterScreen"
        component={FilterScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BrandSelectionScreen"
        component={BrandSelectionScreen}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="ProductCardScreen"
        component={ProductCardScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="RecommendedItemsList"
        component={RecommendedItemsList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="GridWishList"
        component={GridWishList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BagScreen"
        component={BagScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="CheckOutScreen"
        component={CheckoutScreen}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="PayFastPaymentScreen"
        component={PayFastPaymentScreen}
        options={{headerShown: false}}
      />
      {/* <Stack.Screen
        name="PaymentMethod"
        component={PaymentMethodsScreen}
        options={{headerShown: false}}
      /> */}
      <Stack.Screen
        name="ShippingAddress"
        component={ShippingAddress}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddAddress"
        component={AddAddress}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SucessOrder"
        component={SucessOrder}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="MyOrders"
        component={MyOrders}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OrderDetail"
        component={OrderDetailScreen}
        options={{headerShown: false}}
      />
       <Stack.Screen
        name="Settings"
        component={Settings}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Ratings"
        component={RatingAndReviews}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}
