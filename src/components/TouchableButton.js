import { TouchableOpacity } from "react-native";

export const TouchableButton = ({ children, style, onPress,disabled, activeOpacity=.7 }) => {
  return <TouchableOpacity disabled={disabled} activeOpacity={activeOpacity} style={style} onPress={onPress}>{children}</TouchableOpacity>;
};
