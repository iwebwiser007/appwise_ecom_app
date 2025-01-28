import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { GoogleIcon, FacebookLogo } from '../../../src/Assets/svg';

const SocialLoginButton = ({ platform, onPress }) => {
  const icon = platform === 'google' ? <GoogleIcon /> : <FacebookLogo />;
  return (
    <TouchableOpacity style={styles.socialButton} onPress={onPress}>
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  socialButton: {
    width: 92,
    height: 64,
    borderRadius: 25,
    backgroundColor: '#FFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
});

export default SocialLoginButton;
