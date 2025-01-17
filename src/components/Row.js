import React from 'react';
import {View} from 'react-native';
import {spacer} from '../constant/dimension';

export const Row = ({children, gap = spacer, spaceBetween=false}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: gap,
        justifyContent: spaceBetween ? "space-between" : "flex-start"
      }}>
      {children}
    </View>
  );
};
