import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity } from 'react-native';


export default function SucessOrder({navigation}) {
  return (
    <ImageBackground
      source={require('../../Assets/imgs/SuccessImg.jpg')}
      style={styles.backgroundImage}
    >
      <View style={styles.overlay}>
        <Text style={styles.titleText}>Sucess!</Text>
        <Text style={styles.subtitleText}>Your order will be delivered soon.
        Thank you for choosing our app!</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MainApp')}>
          <Text style={styles.buttonText}>Continue Shopping</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}


const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover',
    height: 812,
    width:'100%',
    justifyContent: 'center',
  },
  overlay: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
  },
  titleText: {
    fontSize: 28,
    color: '#222222',
    fontWeight: 'bold',
    marginBottom: 30,
    top:80,
  },
  subtitleText: {
    fontSize: 14,
    color: '#222222',
    marginBottom: 30,
    top:60,
    marginRight:10,
    marginLeft:10,
  },
  button: {
    backgroundColor: '#00B0FF',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 35,
    top:40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
