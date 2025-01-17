import React from 'react';
import {View} from 'react-native';
import {spacer} from '../constant/dimension';

export const Row = ({children, gap = spacer}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: gap,
      }}>
      {children}
    </View>
  );
};
