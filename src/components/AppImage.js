import React, {useCallback, useState} from 'react';
import {Image, View} from 'react-native';
import {colors} from '../constant/color';

export const AppImage = ({style, width, height, url}) => {
  const [data, setData] = useState({
    loading: false,
  });

  const onLoadStart = useCallback(() => {
    setData({...data, loading: true});
  }, [data]);

  const onLoadEnd = useCallback(() => {
    setData({...data, loading: false});
  }, [data]);

  return (
    <>
      <Image
        source={{uri: url}}
        style={{
          width,
          height,
          ...style,
        }}
        onLoadStart={onLoadStart}
        onLoadEnd={onLoadEnd}
      />

      {data.loading && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            top: 0,
            right: 0,
            bottom: 0,
            backgroundColor: colors.activityPlaceholder,
          }}
        />
      )}
    </>
  );
};
