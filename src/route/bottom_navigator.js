import {Platform, View} from 'react-native';
import * as Screen from '../screen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icons} from '../assets/icons';
import {colors} from '../constant/color';
import {Helper} from '../helper/Helper';
import {useCallback, useEffect, useState} from 'react';
import { getShadow } from '../constant/dimension';
import { AppText } from '../components/AppHeading';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { TouchableButton } from '../components/TouchableButton';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <AppBottomBar {...props} />}
      screenOptions={{headerShown: false}}>
      <Tab.Screen component={Screen.Home} name="Home" />
      <Tab.Screen component={Screen.Shop} name="Shop" />
      <Tab.Screen component={Screen.Cart} name="Bag" />
      <Tab.Screen component={Screen.Wishlist} name="Favorites" />
      <Tab.Screen component={Screen.Profile} name="Profile" />
    </Tab.Navigator>
  );
};

const activeColor = colors.primary;
const inActiveColor = colors.placeholder;

const getTabIcon = (index, activeIndex) => {
  const isActive = index === activeIndex;
  if (index === 0) {
    return <Icons.HomeIcon color={isActive ? activeColor : inActiveColor} />;
  }
  if (index === 1) {
    return <Icons.CartIcon color={isActive ? activeColor : inActiveColor} />;
  }
  if (index === 2) {
    return <Icons.BagIcon color={isActive ? activeColor : inActiveColor} />;
  }
  if (index === 3) {
    return <Icons.HeartIcon color={isActive ? activeColor : inActiveColor} />;
  }
  if (index === 4) {
    return <Icons.ProfileIcon color={isActive ? activeColor : inActiveColor} />;
  }
  return null;
};



const AppBottomBar = props => {
   const insets = useSafeAreaInsets();
  const tabs = Array.isArray(props?.state?.routeNames)
    ? [...props?.state?.routeNames]
    : [];
  const activeIndex = props?.state?.index;

  const onTabPress = useCallback((item)=>{
    props?.navigation?.navigate(item);
  },[props]);

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        ...getShadow(4),
        backgroundColor: colors.white,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        paddingBottom: Platform.OS === "ios" ? insets.bottom : 10,
        paddingVertical: 10
      }}>
      {tabs.map((_, index) => {
        return (
          <TabButton
            key={String(index)}
            index={index}
            activeIndex={activeIndex}
            title={_}
            onPress={()=>onTabPress(_)}
          />
        );
      })}
    </View>
  );
};

const TabButton = ({index, activeIndex, title, onPress}) => {
  return (
    <TouchableButton onPress={onPress}
      style={{
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      {getTabIcon(index, activeIndex)}
      <AppText title={title} color={index === activeIndex ? activeColor : inActiveColor} />
    </TouchableButton>
  );
};
