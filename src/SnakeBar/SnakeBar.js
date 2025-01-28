// SuccessMessage.js
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const SuccessMessage = ({visible, message, onClose}) => {
  if (!visible) {return null;}

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '80%',
    left: '10%',
    right: '10%',
    backgroundColor: '#00B0FF',
    padding: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SuccessMessage;
