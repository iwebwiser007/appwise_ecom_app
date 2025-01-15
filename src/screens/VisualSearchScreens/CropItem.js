import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const CropItemScreen = () => {
  return (
    <View style={styles.container}>
        <View style={styles.header}>
            <TouchableOpacity>
            <Icon name="chevron-back-outline" size={24} color="black" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>Crop the item</Text>
        </View>

        <View style={styles.imageContainer}>
            {/* Cropping frame style */}
            <View style={styles.cropFrame}>
            {/* Your image goes here */}
            <Image
                source={{ uri: 'https://s3-alpha-sig.figma.com/img/bcf8/942a/42ce541a4d945ecccbf17b75007758a6?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KRdRN8-gfLp4jXnlNYkx6bA~W5nDroj3MI-f2Dg706YIl0STRxW4JmCNS5MdyyDD-1NDPqkQEHoPU4-Qdx2l3HkYTIrfAp8iOij9hVq4DHdKQ4l2nxN0pCv6ZVk~wvZdK71daPtTWdlB9nDrkK80Ybwy7quDG1MX8bSPU467DAvknU6~2tFINLKVx0RJDwtskTVtjDHIJovc7SRmZfWXpFFMFCcx8i~D5s2~tCMzFB7HFL789vCONZNCr1PKxRNeExhgbwvU0C7E0hPN6SxVO~HqBiRj-a9xkwHCtPp5KrY4SoB3uQIp1JqnxvzVoSrYTE2lgIGoQ1Sb3Rdftx37ug__' }}
                style={styles.image}
            />
            </View>
        </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 30,
  },
  imageContainer: {
    flex: 1.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  cropFrame: {
    borderColor: 'white',
    borderWidth: 2,
    width: 300,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  bottomBar: {
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  searchButton: {
    width: 56,
    height: 56,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
});

export default CropItemScreen;
