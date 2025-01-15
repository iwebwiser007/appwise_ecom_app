import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const VisualSearchScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Icon name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Visual Search</Text>
      </View>
      <ImageBackground
        source={{ uri: 'https://s3-alpha-sig.figma.com/img/c4e1/9412/e90dbf2c7a014a3c3958c678b2e1193f?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qOXFmisc4MsDPA7taPCh5r8YlhoavpbjYGG59WuWxYE2is13xi2BhVcDtGOKgLxehMMZyMk0R7XkWlxCj-zMlkpO7U-pSlZOGwxADPFjgPCUNXrL1UDaisOf4ebK3bTrJt-22Bw9bYPM-fA3scW8TeiIii61C6ZfVZpA9jIfXc1nZLAi3IfYJsLRMcc1toFwgLPhTrBWRWfxMZ4uDKBre-eEFUkWxs0qUtgiw2d03rQ-kxEJf~2E2EhSX7nAkY7-zHAQqhajItLcnjjuT3~E-eBvHHkPQoIxDKp7o1MF2TL6w5dKHnlZuPURfUVQdtk907-LYYtQtoF5qre0aktdqw__' }}
        style={styles.imageBackground}
      >
        <View style={styles.overlay}>
          <Text style={styles.title}>
            Search for an outfit by
            taking a photo or uploading an image
          </Text>

          <TouchableOpacity style={styles.takePhotoButton}>
            <Text style={styles.takePhotoText}>TAKE A PHOTO</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.uploadImageButton}>
            <Text style={styles.uploadImageText}>UPLOAD AN IMAGE</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backButton: {
    marginBottom: 0,
    fontWeight: 'bold',
    fontSize: 40,
  },
  backButtonText: {
    fontSize: 24,
    color: '#333',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 10,
    height: 90,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 60,
  },
  imageBackground: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    // paddingHorizontal: 30,
    padding: 10,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 18,
    width:329,
    height: 87,
    textAlign: 'left',
    left:16,
    marginBottom: 20,
  },
  takePhotoButton: {
    backgroundColor: '#DB3022',
    borderRadius: 30,
    paddingVertical: 12,
    paddingHorizontal: 70,
    marginBottom: 30,
  },
  takePhotoText: {
    color: '#FFFFFF',
    fontSize: 16,
    // fontWeight: 'bold',
  },
  uploadImageButton: {
    borderWidth: 2,
    borderColor: '#FFFFFF',
    borderRadius: 40,
    paddingVertical: 12,
    marginBottom: 30,
    paddingHorizontal:60,
  },
  uploadImageText: {
    color: '#FFFFFF',
    fontSize: 16,
    textAlign:'center',
    // fontWeight: 'bold',
  },
});

export default VisualSearchScreen;
