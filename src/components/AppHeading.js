import React, {useContext} from 'react';
import {Text} from 'react-native';
import {useThemeColor, ThemeContext} from '../theme/themeContext';

<Text style={{}} />;

export const AppHeading = ({
  title,
  fontSize = 18,
  color = '',
  fontWeight = '600',
  textAlign,
  style,
  onPress,
  isLineThrough,
}) => {
  const themeColor = useThemeColor();
  const textColor = color ? color : themeColor.text;

  return (
    <Text
      onPress={onPress}
      style={{
        fontSize,
        color: textColor,
        fontWeight,
        textAlign,
        ...style,
        textDecorationLine: isLineThrough ? 'line-through' : 'none',
      }}>
      {title}
    </Text>
  );
};

export const AppText = ({
  title,
  fontSize = 14,
  color,
  fontWeight,
  textAlign,
  style,
}) => {
  const {theme} = useContext(ThemeContext);
  const themeColor = useThemeColor(theme);
  const textColor = color ? color : themeColor.text;
  return (
    <Text
      style={{
        fontSize,
        color: textColor,
        fontWeight,
        textAlign,
        ...style,
      }}>
      {title}
    </Text>
  );
};
