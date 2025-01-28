import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../../Style/InputStyle';

const InputField = ({
  label,
  value,
  setValue,
  inputKey,
  secureTextEntry = false,
  focusedInput,
  handleFocus,
  handleBlur,
  isPasswordVisible,
  setPasswordVisible,
}) => (
  <View
    style={[
      styles.card,
      focusedInput === inputKey || value ? styles.focusedCard : {},
    ]}>
    {label && (
      <Text
        style={[
          styles.label,
          focusedInput === inputKey || value ? styles.activeLabel : {},
        ]}>
        {label}
      </Text>
    )}
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={setValue}
        onFocus={() => handleFocus(inputKey)}
        onBlur={handleBlur}
        secureTextEntry={secureTextEntry}
        keyboardType={inputKey === 'email' ? 'email-address' : 'default'}
        // placeholder={label}
        placeholderTextColor="#888"
      />
      {inputKey === 'password' && (
        <TouchableOpacity
          style={styles.eyeButton}
          onPress={() => setPasswordVisible(!isPasswordVisible)}>
          <Icon
            name={isPasswordVisible ? 'eye-off' : 'eye'}
            size={24}
            color="#222222"
          />
        </TouchableOpacity>
      )}
    </View>
  </View>
);

export default InputField;
