import React from 'react';
import {View} from 'react-native';
import { colors } from '../constant/color';

export const MaskCard = () => {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.1)',
        flex: 1
      }}/>
  );
};
