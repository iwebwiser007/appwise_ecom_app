import React, { useEffect, useCallback } from 'react';
import { View, StyleSheet, Alert } from 'react-native';
import { Icons } from '../../assets/icons';
import Animated, {
  interpolate,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { AppHeading, AppText } from '../../components/AppHeading';
import { colors } from '../../constant/color';
import { AppButton } from '../../components/button/AppButton';
import { Spacer } from '../../components/Spacer';
import { setAppStatus, startApp } from '../../store/action';
import { appStatusTypes } from '../../constant/type';

const Splash = () => {
  const translateY = useSharedValue(0); // For vertical mask animation
  const scaleSize = useSharedValue(0); // For expanding the mask circle

  useEffect(() => {
    startTransformation();
  }, []);

  const startTransformation = useCallback(()=>{
    scaleSize.value = withSpring(1, { duration: 1200 },()=>{
      translateY.value = withSpring(1, { duration: 800 });
    });
    setTimeout(()=>{
      startApp();
    },2200);
  },[]);

  // Style for the expanding mask animation
  const rStyle2 = useAnimatedStyle(() => {
    const rWidth = interpolate(scaleSize.value, [0, 1], [0,250], 'clamp');
    const interpolatedTranslateY = interpolate(translateY.value, [0, 1], [0,-250], 'clamp');
    return {
      width: rWidth,
      height: rWidth,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: rWidth / 2,
      transform: [{translateY: interpolatedTranslateY}]
    };
  });

  // Style for the top mask animation
  const topMask = useAnimatedStyle(() => {
    const interpolatedTranslateY = interpolate(
      translateY.value,
      [0, 1],
      [-500, -50]
    );

    return {
      width: 600,
      height: 800,
      backgroundColor: 'white',
      position: 'absolute',
      top: -400,
      borderRadius: 500,
      transform: [
        { translateX: -50 },
        { translateY: interpolatedTranslateY },
      ],
    };
  });
  // Style for the top opacity animation
  const opacityStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      translateY.value,
      [0, 1],
      [0,1]
    );

    return {
      opacity
    };
  });

  const onStart=useCallback(()=>{
    setAppStatus(appStatusTypes.auth);
  },[])

  return (
    <View style={styles.container}>
      {/* Top Mask */}
      <Animated.View style={topMask} />

      {/* Expanding Mask */}
      <Animated.View style={rStyle2}>
        <Icons.LogoIcon />
      </Animated.View>

      <Animated.View style={[opacityStyle,{
        alignItems: 'center',
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        paddingBottom: 20,
        paddingHorizontal: 20,
        zIndex: 1
      }]}>
        <AppText
          title={"Welcome to appwise"}
          color={colors.white}
          fontSize={20}
        />
        <Spacer/>
        <AppHeading
          title={"Everything you Love, In \none place"}
          color={colors.white}
          fontSize={28}
          textAlign={"center"}
        />
        <Spacer/>
        <Spacer/>
        <AppButton
          backgroundColor={colors.white}
          textColor={colors.primary}
          title='Let’s get Started'
          onPress={onStart}
        />
      </Animated.View>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00B0FF',
  },
});
