import React from 'react';
import {TouchableButton} from '../TouchableButton';
import {View, StyleSheet, ActivityIndicator} from 'react-native';
import {AppHeading} from '../AppHeading';
import {colors} from '../../constant/color';

export const AppButton = ({
  title = 'button',
  backgroundColor = colors.primary,
  textColor = colors.white,
  onPress,
  activity,
  disabled
}) => {
  return (
    <TouchableButton
        disabled={disabled || activity}
      onPress={onPress}
      style={[
        styles.container,
        {
          backgroundColor: disabled ? colors.placeholder : backgroundColor,
        },
      ]}>
      <AppHeading title={title} color={textColor} fontSize={16} />

      {activity && <ActivityIndicator color={colors.white}/>}
    </TouchableButton>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 45,
    borderRadius: 45,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
});
