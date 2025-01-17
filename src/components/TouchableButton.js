import { TouchableOpacity } from "react-native";

export const TouchableButton = ({ children, style, onPress,disabled, activeOpacity=.7 }) => {
  return <TouchableOpacity activeOpacity={activeOpacity} style={style} onPress={onPress}>{children}</TouchableOpacity>;
};
