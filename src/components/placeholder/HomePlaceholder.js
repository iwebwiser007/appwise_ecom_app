import React from 'react';
import {View} from 'react-native';
import {ActivityPlaceholder} from './ActivityPlaceholder';
import {h, spacer} from '../../constant/dimension';
import {colors} from '../../constant/color';
import {Spacer} from '../Spacer';
import {Row} from '../Row';

export const HomePlaceholder = () => {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.white,
      }}>
      <ActivityPlaceholder height={h(55)} />
      <Spacer />
      <View
        style={{
          paddingHorizontal: spacer,
        }}>
        <Row>
          {[1, 1, 1, 1].map((_, i) => {
            return (
              <View
                key={i.toString()}
                style={{
                  width: '40%',
                  gap: 10,
                }}>
                <ActivityPlaceholder height={h(20)} borderRadius={10} />
                <ActivityPlaceholder height={15} width="80%" />
                <ActivityPlaceholder height={15} width="70%" />
                <ActivityPlaceholder height={15} width="60%" />
              </View>
            );
          })}
        </Row>
      </View>
    </View>
  );
};
