import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import LoginScreen from './src/screens/Authorization/LoginScreen';
import SignUpScreen from './src/screens/Authorization/SignUpScreen';
import ForgotPasswordScreen from './src/screens/Authorization/ForgetPasswordScreen';
import MainTabNavigator from './src/Navigation/MainTabNavigator';
import CategoryDetailPage from './src/Categories/CategoryDetailPage';
import FashionSaleScreen from './src/HomeTab/FashionSaleScreen';
import WomenTopsScreen from './src/Shop/Categories/WomenTopsScreen';
import GridWomenTopScreen from './src/Shop/Categories/GridWomenTopsScreen';
import FilterScreen from './src/Shop/Categories/Filters';
import BrandSelectionScreen from './src/Shop/Categories/BrandsScreen';
import ProductCardScreen from './src/Shop/Categories/ProductCardScreen';
import GridWishList from './src/Favorites/GridWishList';
import CheckoutScreen from './src/Cart/CheckOutScreen';
import PaymentMethodsScreen from './src/Cart/PaymentMethod';
import BagScreen from './src/Cart/MyBag';
import ShippingAddress from './src/Cart/ShippingAddress';
import AddAddress from './src/Cart/AddAddress';
import SucessOrder from './src/Cart/SucessOrder';
import MyOrders from './src/Cart/MyOrders';
import OrderDetailScreen from './src/Cart/OrderDetails';
import Settings from './src/Cart/settingProfile';
import RatingAndReviews from './src/Shop/Categories/Rating';
import SplashScreen from './src/screens/Authorization/SplashScreens';
import UpdatePasswordScreen from './src/screens/Authorization/UpdatePasswordScreen';
import PayFastPaymentScreen from './payFast/PayFastPaymentScreen';

const Stack = createStackNavigator();

function AuthStackNavigator() {
  return (
    <Stack.Navigator initialRouteName="SplashScreen">
      <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SignUpScreen"
        component={SignUpScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="UpdatePasswordScreen"
        component={UpdatePasswordScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthStack">
        <Stack.Screen
          name="AuthStack"
          component={AuthStackNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MainApp"
          component={MainTabNavigator}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="FashionSale"
          component={FashionSaleScreen}
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
          name="WomenTopsScreen"
          component={WomenTopsScreen}
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
          name="GridWishList"
          component={GridWishList}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="MyBag"
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
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="PaymentMethod"
          component={PaymentMethodsScreen}
          options={{headerShown: false}}
        />
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
    </NavigationContainer>
  );
}






















// ShoppingApp://login?token=


// import React from 'react';
// import {createStackNavigator} from '@react-navigation/stack';
// import {NavigationContainer} from '@react-navigation/native';
// import UserRegistration from './src/Shop/Dress/UserRegistration';
// import UserList from './src/Shop/Dress/Detail';

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="input">
//         <Stack.Screen
//           name="UserRegistration"
//           component={UserRegistration}
//           options={{headerShown: false}}
//         />
//         <Stack.Screen
//           name="UserList"
//           component={UserList}
//           options={{headerShown: false}}
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
