import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, TextInput, Platform} from 'react-native';
import {colors} from '../constant/color';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {AppText} from './AppHeading';
import {spacer} from '../constant/dimension';
import {TouchableButton} from './TouchableButton';
import { useThemeColor } from '../theme/themeContext';
import { Spacer } from './Spacer';

export const AppInput = ({
  defaultValue = '',
  label = 'label',
  error = '',
  onChangeText,
  keyboardType,
  autoCapitalize
}) => {
  const themeColor = useThemeColor();
  const scale = useSharedValue(0); // Controls the label's animation state
  const [isFocus, setFocus] = useState(false);

  useEffect(() => {
    if (defaultValue) {
      onFocus();
      return;
    }
    if (!isFocus && defaultValue == "") {
      unFocusAnimation();
    }
  }, [defaultValue,error]);

  const onFocus = useCallback(() => {
    setFocus(true);
    scale.value = withTiming(1, {duration: 200}); // Animate up when focused
  }, []);

  const onBlur = useCallback(() => {
    if (defaultValue === '') {
      unFocusAnimation();
    }
  }, []);

  const unFocusAnimation = useCallback(() => {
    scale.value = withTiming(0, {duration: 200}); // Animate back down when unfocused
  }, []);

  const labelStyle = useAnimatedStyle(() => {
    const translateY = interpolate(scale.value, [0, 1], [10, 0]); // Adjust Y position
    const fontSize = interpolate(scale.value, [0, 1], [16, 12]); // Adjust font size
    return {
      transform: [{translateY}],
      fontSize,
    };
  });

  return (
    <View>
      <View
        style={[
          styles.container,
          {
            borderWidth: error ? 1.5 : 0,
            borderColor: colors.red,
            backgroundColor: themeColor.isDark ? themeColor.section : colors.white
          },
        ]}>
        <Animated.Text
          style={[
            styles.label,
            labelStyle,
            {
              color: error ? colors.red : colors.placeholder,
            },
          ]}>
          {label}
        </Animated.Text>
        <TextInput
          style={[styles.input,{
            color: themeColor.isDark ? colors.white : colors.black
          }]}
          onFocus={onFocus}
          onBlur={onBlur}
          defaultValue={defaultValue}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize}
        />
      </View>
      {error ? (
        <View
          style={{
            paddingHorizontal: 20,
            marginTop: 5,
          }}>
          <AppText title={error} color={colors.red} />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    padding: 10,
    paddingHorizontal: 20,
    minHeight: 60,
    justifyContent: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    // Shadow for Android
    elevation: 2,
  },
  label: {
    position: 'absolute',
    left: Platform.OS === 'android' ? 25 : 20,
    top: 18,
  },
  input: {
    marginTop: 15,
    //height: 30,
    width: '100%',
  },
});
