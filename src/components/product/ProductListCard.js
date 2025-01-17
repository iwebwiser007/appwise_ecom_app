import React from 'react';
import {View, Image, StyleSheet, Text} from 'react-native';
import {spacer, w} from '../../constant/dimension';
import {ProductListRatingCard} from '../rating/ProductListRatingCard';
import {AppHeading, AppText} from '../AppHeading';
import {colors} from '../../constant/color';
import {Row} from '../Row';
import {Helper} from '../../helper/Helper';
import {ProductBadge} from './ProductBadge';

export const ProductListCard = () => {
  const imgWidth = w(40);
  return (
    <View style={styles.container}>
      <View>
        <Image
          style={{
            width: imgWidth,
            height: imgWidth * 2 * 0.6,
          }}
          source={require('../../assets/images/product.png')}
        />
        <View
          style={{
            position: 'absolute',
            left: 10,
            top: 10,
          }}>
          <ProductBadge />
        </View>
      </View>
      <View
        style={{
          padding: 10,
          gap: 5,
        }}>
        <ProductListRatingCard />
        <AppText title={'Dorothy'} color={colors.placeholder} />
        <AppHeading title={'Evening Dress'} fontSize={16} />
        <Row gap={5}>
          <AppHeading
            isLineThrough
            title={Helper.getPrice(99)}
            fontSize={16}
            color={colors.placeholder}
          />
          <AppHeading title={Helper.getPrice(99)} fontSize={16} />
        </Row>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: spacer,
  },
});
