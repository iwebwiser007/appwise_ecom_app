import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';


const TakePhotoScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Icon name="chevron-back-outline" size={24} color="black" />
          </TouchableOpacity>
        <Text style={styles.headerTitle}>Search by taking a photo</Text>
      </View>

      <Image
        source={{ uri: 'https://s3-alpha-sig.figma.com/img/bcf8/942a/42ce541a4d945ecccbf17b75007758a6?Expires=1730073600&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=KRdRN8-gfLp4jXnlNYkx6bA~W5nDroj3MI-f2Dg706YIl0STRxW4JmCNS5MdyyDD-1NDPqkQEHoPU4-Qdx2l3HkYTIrfAp8iOij9hVq4DHdKQ4l2nxN0pCv6ZVk~wvZdK71daPtTWdlB9nDrkK80Ybwy7quDG1MX8bSPU467DAvknU6~2tFINLKVx0RJDwtskTVtjDHIJovc7SRmZfWXpFFMFCcx8i~D5s2~tCMzFB7HFL789vCONZNCr1PKxRNeExhgbwvU0C7E0hPN6SxVO~HqBiRj-a9xkwHCtPp5KrY4SoB3uQIp1JqnxvzVoSrYTE2lgIGoQ1Sb3Rdftx37ug__' }}
        style={styles.mainImage}
      />

      <View style={styles.bottomBar}>
        <TouchableOpacity>
          <Icon name="flash" size={24} color="black" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.cameraButton}>
          <Icon name="camera" size={32} color="white" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Icon name="refresh" size={24} color="black" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
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
    marginLeft: 20,
  },
  mainImage: {
    width: 378,
    height: 618,
    alignSelf: 'center',
    marginVertical: 10,
  },
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 40,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#FFFFFF',
  },
  cameraButton: {
    width: 70,
    height: 70,
    backgroundColor: '#FF3B30',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
  },
});

export default TakePhotoScreen;
