/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import {
  Text,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import { AppWiseLogo } from '../../Assets/svg';

const SplashScreen = ({ navigation }) => {
  const circleScale = new Animated.Value(0);
  const circleTranslateX = new Animated.Value(0);
  const circleTranslateY = new Animated.Value(0);
  const logoTranslateY = new Animated.Value(0);
  const logoTranslateX = new Animated.Value(0);
  const fadeInText = new Animated.Value(0);
  const backgroundColor = new Animated.Value(0);

  useEffect(() => {
    // Animation sequence
    Animated.sequence([
      Animated.parallel([
        Animated.timing(circleScale, {
          toValue: 1.5,
          duration: 1000,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(backgroundColor, {
          toValue: 1,
          duration: 800,
          easing: Easing.out(Easing.exp),
          useNativeDriver: false,
        }),
      ]),
      Animated.sequence([
        Animated.timing(circleTranslateY, {
          toValue: -30,
          duration: 300,
          easing: Easing.out(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(circleTranslateY, {
          toValue: 0,
          duration: 300,
          easing: Easing.in(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(circleTranslateY, {
          toValue: -15,
          duration: 200,
          easing: Easing.out(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(circleTranslateY, {
          toValue: 0,
          duration: 200,
          easing: Easing.in(Easing.sin),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(circleTranslateX, {
          toValue: -16,
          duration: 1500,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(circleTranslateY, {
          toValue: -170,
          duration: 1000,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(logoTranslateY, {
          toValue: -120,
          duration: 1000,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
        Animated.timing(logoTranslateX, {
          toValue: 0,
          duration: 1000,
          easing: Easing.out(Easing.exp),
          useNativeDriver: true,
        }),
      ]),
      Animated.timing(fadeInText, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setTimeout(() => {
        navigation.replace('LoginScreen');
      }, 500);
    });
  }, [backgroundColor, circleScale, circleTranslateX, circleTranslateY, fadeInText, logoTranslateX, logoTranslateY, navigation]);

  const interpolatedBackgroundColor = backgroundColor.interpolate({
    inputRange: [0, 1],
    outputRange: ['#FFFFFF', '#00B0FF'],
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: interpolatedBackgroundColor,
        },
      ]}
    >
      <Animated.View
        style={[
          styles.animatedCircle,
          {
            transform: [
              { scale: circleScale },
              { translateX: circleTranslateX },
              { translateY: circleTranslateY },
            ],
          },
        ]}
      />
      <Animated.View
        style={[
          styles.logoContainer,
          { transform: [{ translateY: logoTranslateY }] },
        ]}
      >
        <AppWiseLogo width={100} />
      </Animated.View>
      <Animated.View style={[styles.textContainer, { opacity: fadeInText }]}>
        <Text style={styles.welcomeText}>Welcome to AppWise</Text>
        <Text style={styles.descriptionText}>
          Everything you Love, In one place
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace('MainTabNavigator')}
        >
          <Text style={styles.buttonText}>Let's Get Started</Text>
        </TouchableOpacity>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  animatedCircle: {
    position: 'absolute',
    width: 300,
    height: 300,
    borderRadius: 150,
    backgroundColor: '#FFFFFF',
  },
  logoContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
    bottom: 100,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  descriptionText: {
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#FFFFFF',
    borderRadius: 35,
    paddingHorizontal: 30,
    paddingVertical: 10,
  },
  buttonText: {
    color: '#00B0FF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SplashScreen;
