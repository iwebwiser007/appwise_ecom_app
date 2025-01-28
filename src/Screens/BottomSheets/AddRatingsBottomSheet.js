/* eslint-disable react-native/no-inline-styles */
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReviewBottomSheet = ({ visible, onClose, productId }) => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [image, setImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pickImage = async () => {
    const options = {
      mediaType: 'photo',
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.error('Image Picker Error: ', response.errorMessage);
      } else {
        setImage(response.assets[0].uri);
      }
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const userId = await AsyncStorage.getItem('userId');
    if (!userId) {
      Alert.alert('Error', 'User is not logged in.');
      setIsSubmitting(false);
      return;
    }

    const formData = new FormData();
    formData.append('userId', userId);
    formData.append('product_id', productId);
    formData.append('review', review);
    formData.append('rating', rating);
    formData.append('status', 'approved');
    if (image) {
      formData.append('images', {
        uri: image,
        type: 'image/jpeg',
        name: 'review-image.jpg',
      });
    }

    try {
      const response = await fetch('http://213.210.21.175:5000/AW0001/api/v1/addrating', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Review submitted successfully!');
        setRating(0);
        setReview('');
        setImage(null);
        onClose();
      } else {
        Alert.alert('Error', result.message || 'Failed to submit review.');
      }
    } catch (error) {
      console.log('this error comes',error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>What is your rate?</Text>
          <View style={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((star) => (
              <TouchableOpacity key={star} onPress={() => setRating(star)}>
                <Text
                  style={{
                    fontSize: 32,
                    color: star <= rating ? '#FFD700' : '#DDD',
                  }}
                >
                  ★
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.textReview}> Please share your opinion about the product </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Your Review"
            value={review}
            onChangeText={setReview}
            multiline
          />
          <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
            {image ? (
              <Image source={{ uri: image }} style={styles.imagePreview} />
            ) : (
              <Text style={styles.imagePickerText}>Add your photos</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.submitButton, isSubmitting && { opacity: 0.6 }]}
            onPress={handleSubmit}
            disabled={isSubmitting}
          >
            <Text style={styles.submitButtonText}>SEND REVIEW</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#F4F4F4',
    // padding: 85,
    height:'80%',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    marginTop:20,
    color: '#333',
    textAlign: 'center',
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop:-10,
  },
  textInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 4,
    padding: 12,
    marginBottom: 16,
    marginRight:10,
    marginLeft:10,
    marginTop:20,
    height: 150,
    textAlignVertical: 'top',
    backgroundColor: '#FFF',
    color: '#333',
  },
  imagePicker: {
    alignItems: 'center',
    marginBottom: 16,
  },
  imagePickerText: {
    color: '#00B0FF',
    fontWeight: 'bold',
  },
  imagePreview: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  submitButton: {
    backgroundColor: '#00B0FF',
    borderRadius: 35,
    padding: 12,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  textReview:{
    fontFamily:'Metropolis',
    fontSize:18,
    textAlign:'center',
    color:'#222222',
  },
});

export default ReviewBottomSheet;
