import React from 'react';
import {View} from 'react-native';
import {Icons} from '../../assets/icons';
import { colors } from '../../constant/color';
import { AppText } from '../AppHeading';

export const ProductListRatingCard = ({rating = 1}) => {
  const size = 12;
  return (
    <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5
    }}>
      {Array(5)
        .fill(1)
        .map((item, index) => {
            const isActive = index < rating;
          return (
            <View key={index.toString()}>
              <Icons.StarIcon size={16} color={isActive ? colors.rating : "#E3E2DF" }/>
            </View>
          );
        })}
        <AppText
            title={"(10)"}
            color={colors.placeholder}
        />
    </View>
  );
};
