import React, { useState, useMemo, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, ScrollView } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import * as ImagePicker from 'react-native-image-picker';

const ReviewBottomSheet = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [photo, setPhoto] = useState(null);

  const bottomSheetRef = useRef(null);
  const snapPoints = useMemo(() => ['50%', '75%'], []);

  const handleChoosePhoto = () => {
    ImagePicker.launchImageLibrary(
      { mediaType: 'photo', maxHeight: 200, maxWidth: 200 },
      (response) => {
        if (response.didCancel || response.error) {
          console.log('User cancelled image picker');
        } else {
          setPhoto(response.assets[0].uri);
        }
      }
    );
  };

  const handleRating = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleSubmitReview = () => {
    console.log('Rating:', rating);
    console.log('Review:', review);
    console.log('Photo URI:', photo);
  };

  return (
    <BottomSheet ref={bottomSheetRef} index={0} snapPoints={snapPoints}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>What is your rate?</Text>
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => handleRating(star)}>
              <Text style={star <= rating ? styles.filledStar : styles.emptyStar}>★</Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text style={styles.subTitle}>Please share your opinion about the product</Text>
        <TextInput
          style={styles.textInput}
          placeholder="Your review"
          multiline
          value={review}
          onChangeText={setReview}
        />
        <TouchableOpacity style={styles.photoButton} onPress={handleChoosePhoto}>
          {photo ? (
            <Image source={{ uri: photo }} style={styles.photo} />
          ) : (
            <Text style={styles.photoText}>Add your photos</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmitReview}>
          <Text style={styles.submitText}>SEND REVIEW</Text>
        </TouchableOpacity>
      </ScrollView>
    </BottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  filledStar: {
    fontSize: 30,
    color: '#FFD700',
  },
  emptyStar: {
    fontSize: 30,
    color: '#C0C0C0',
  },
  subTitle: {
    fontSize: 16,
    color: '#888',
    marginTop: 10,
  },
  textInput: {
    width: '100%',
    height: 100,
    backgroundColor: '#F9F9F9',
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    marginVertical: 15,
  },
  photoButton: {
    width: 100,
    height: 100,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 20,
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 10,
  },
  photoText: {
    color: '#888',
    textAlign: 'center',
  },
  submitButton: {
    backgroundColor: '#FF3D00',
    width: '100%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  submitText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ReviewBottomSheet;
