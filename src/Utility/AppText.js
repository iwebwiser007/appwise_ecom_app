/* eslint-disable react-native/no-inline-styles */
import React,{memo} from 'react';
import {Text} from 'react-native';
import {FontSize, colors} from '../Style/Style';
import {Fonts} from '../Assets/Fonts';
import {Helper} from '../Helper/Helper';

/**
 * AppText component is a customizable text component with various styling options.
 * It supports different text decorations, transformations, and can handle onPress events.
 */
const AppTextCard = ({
  title,
  color = colors.black,
  fontSize = FontSize.md,
  numberOfLines,
  fontFamily = Fonts.regular,
  topSpace = 0,
  style,
  lineHeight,
  isLineThrough,
  isUnderline,
  isCapitalize = false,
  fontStyle,
  onPress,
  isUppercase,
  isHasSentenceCase = false,
  fontWeight,
}) => {
  // Function to transform the title to sentence case if needed
  const getTitle = () => {
    if (isHasSentenceCase) {
      return Helper.getSentenceCaseString(title);
    }
    return title;
  };

  return (
    <Text
      onPress={onPress}
      style={{
        fontSize,
        color,
        fontFamily: fontFamily,
        marginTop: topSpace,
        lineHeight: lineHeight,
        textDecorationLine: isLineThrough
          ? 'line-through'
          : isUnderline
            ? 'underline'
            : 'none',
        textTransform: isUppercase
          ? 'uppercase'
          : isCapitalize
            ? 'capitalize'
            : 'none',
        fontStyle: fontStyle,
        fontWeight,
        ...style,
      }}
      allowFontScaling={false}
      numberOfLines={numberOfLines}>
      {getTitle()}
    </Text>
  );
};

export const AppText = memo(AppTextCard);

export const RequiredTextCard = ({style}) => {
  return <AppText title={'*'} style={style} fontSize={FontSize.md} color={colors.red} />;
};

export const RequiredText = memo(RequiredTextCard);
