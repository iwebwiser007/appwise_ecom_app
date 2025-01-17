import React from 'react';
import {View, Image, FlatList} from 'react-native';
import {h, w} from '../../constant/dimension';
import {AppImage} from '../../components/AppImage';
import {colors} from '../../constant/color';
import {AppHeading} from '../../components/AppHeading';
import {Mask} from 'react-native-svg';
import { MaskCard } from '../../components/Mask';

const imageUrl =
  'https://media.istockphoto.com/id/1310454968/photo/two-women-window-shopping-for-dress.jpg?s=612x612&w=0&k=20&c=9pq_1CzxdHplpUi489Qg5IoMskZSIWM8R2T36uQN600=';

export const Banner = ({list = []}) => {
  return (
    <View>
      <FlatList
        data={list}
        keyExtractor={(_, i) => i.toString()}
        pagingEnabled
        horizontal
        renderItem={({item}) => {
          return <BannerCard url={item?.image}  title={item?.title}/>;
        }}
      />
    </View>
  );
};

const BannerCard = ({url, title = 'Fashion Sale'}) => {
  return (
    <View>
      <AppImage
        width={w(100)}
        height={h(70)}
        url={url}
        backgroundColor={colors.activityPlaceholder}
      />
      <MaskCard />
      <View
        style={{
          position: 'absolute',
          bottom: 70,
          left: 20,
          width: "80%"
        }}>
        <AppHeading title={title} fontSize={50} color={colors.white} />
      </View>
    </View>
  );
};
