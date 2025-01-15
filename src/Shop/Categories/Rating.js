/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Iconn from 'react-native-vector-icons/Ionicons';
// import ReviewBottomSheet from './ReviewBottomSheet';

const RatingAndReviews = ({ navigation }) => {
  const [reviews, setReviews] = useState([]);
  const [withPhoto, setWithPhoto] = useState(false);
//   const bottomSheetRef = useRef(null);

//   const openBottomSheet = () => {
//     bottomSheetRef.current?.expand();
//   };

  useEffect(() => {
    const mockReviews = [
      {
        id: '1',
        user: 'Helene Moore',
        rating: 4,
        date: 'June 5, 2019',
        text: 'The dress is great! Very classy and comfortable...',
        hasPhoto: true,
        helpfulCount: 15,
        photoUri: 'https://s3-alpha-sig.figma.com/img/01fd/466b/a394c0eba31d6c693fe12b53b1c01c51?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=mhUlSiRZQVCLviy6fll-OF7eShg~ZH5okIa0oylwEl99WLkHRmbLqNYAs3917mfUr6Qy~hV3fFFV0UN9SddTLE0Qeds7vLfMMlf-QJ6E48nW7tVyKjKa4H2TxTUZlfu05cI6o2y~PSk0PIK7ylXXktfJIMbijjYZc4q2K7PeqXrGCwPeA-lCcU8ypChSLOjnVDgEisesAs4aGt~MCNOGs1hRNjVmO7SxpdkV77hfZLPk~MXuxD9OfYSXvumarMMmw0hs8c6ecJOi2V8oZ-aDknvDvZ0jZJQQ81EZmuKIFx1veRIa2l792FC8uw5ITCgWox7cxYVDMBK3GmT~zwXrqQ__',
      },
      {
        id: '2',
        user: 'Kate Doe',
        rating: 5,
        date: 'August 12, 2020',
        text: 'Amazing dress! Perfect fit and comfortable.',
        hasPhoto: false,
        helpfulCount: 8,
      },
    ];
    setReviews(mockReviews);
  }, []);

  const filteredReviews = withPhoto
    ? reviews.filter(review => review.hasPhoto)
    : reviews;

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Iconn name="chevron-back-outline" size={24} color="#000" />
      </TouchableOpacity>

      <Text style={styles.heading}>Rating & Reviews</Text>
      <View style={styles.ratingSummary}>
        <Text style={styles.averageRating}>4.3</Text>
        <Text style={styles.ratingCount}>23 ratings</Text>
        <View style={styles.starsContainer}>
          {[5, 4, 3, 2, 1].map(star => (
            <View key={star} style={styles.starRow}>
              <Text>{'⭐'.repeat(star)}</Text>
              <View style={[styles.ratingBar, { width: star * 16 }]} />
              <Text>{Math.floor(Math.random() * 10)}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.reviewsHeader}>
        <Text style={styles.reviewsCount}>8 reviews</Text>
        <TouchableOpacity
          style={styles.withPhotoFilter}
          onPress={() => setWithPhoto(!withPhoto)}
        >
          <Icon name={withPhoto ? 'check-box' : 'check-box-outline-blank'} size={24} color="#000" />
          <Text style={{ marginLeft: 5 }}>With photo</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={filteredReviews}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.reviewCard}>
            <View style={styles.reviewHeader}>
              <Image
                source={{
                  uri:
                    item.photoUri ||
                    'https://s3-alpha-sig.figma.com/img/ad00/491c/cc0d067e35dd9b263899dcc9d9612853?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=nQwhGP89R70i1bmS5YVJDbrFJ5iKxNUD10OCsXPZ-OZO4KuK7Yq9w-sbaPPPOaOFVkQSsjczrK7cnIwfcnkUe6Vt3fXba6yMc6RxhrrVa-2UfeYPzxXxjUBIByCBffb2ikuVm0~19Hbl8mlRk-FW2GkaYzmL8JbWgRMpbAGxQfs1hVWk6EsU863V55wsMLE4SjNriPrdNlnuWyOnpsNL0nutpggKmN55mK9Ims-pdIL5k3k2pLYzC7CaYflXIc-b01Ls8FET0W3n7vWgsVqajXhuKGsn0sFRvrvPHKklViKwXVrpYWeV0nmwYVs3eM576dpWuWCHP6O4urpdY4ngLA__',
                }}
                style={styles.avatar}
              />
              <View style={styles.reviewInfo}>
                <Text style={styles.userName}>{item.user}</Text>
                <Text>{'⭐'.repeat(item.rating)}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
            </View>
            <Text style={styles.reviewText}>{item.text}</Text>
            {item.hasPhoto && item.photoUri && (
              <Image source={{ uri: item.photoUri }} style={styles.reviewPhoto} />
            )}
            <View style={styles.helpfulContainer}>
              <Text style={styles.helpfulText}>
                Helpful ({item.helpfulCount})
              </Text>
              <Icon name="thumb-up" size={20} color="#888" />
            </View>
          </View>
        )}
      />

      <TouchableOpacity style={styles.writeReviewButton}>
        <Icon name="edit" size={20} color="#fff" />
        <Text style={styles.writeReviewText}>Write a review</Text>
      </TouchableOpacity>
      {/* <ReviewBottomSheet ref={bottomSheetRef} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  backButton: { position: 'absolute', top: 24, left: 16 },
  heading: { fontSize: 20, fontWeight: 'bold', marginTop: 40, marginBottom: 10 },
  ratingSummary: { marginBottom: 20, flexDirection: 'row' },
  averageRating: { fontSize: 48, fontWeight: 'bold' },
  ratingCount: { color: '#888', top: 75, right: 90 },
  starsContainer: { marginTop: 10 },
  starRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 2, right: 60 },
  ratingBar: {
    height: 8,
    backgroundColor: '#00B0FF',
    borderRadius: 4,
    marginHorizontal: 5,
  },
  reviewsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewsCount: { fontSize: 16, fontWeight: 'bold' },
  withPhotoFilter: { flexDirection: 'row', alignItems: 'center' },
  reviewCard: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
  },
  reviewHeader: { flexDirection: 'row', alignItems: 'center' },
  avatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  reviewInfo: { flex: 1 },
  userName: { fontWeight: 'bold' },
  date: { color: '#888', fontSize: 12 },
  reviewText: { marginTop: 10, color: '#333' },
  reviewPhoto: { height: 100, width: 100, borderRadius: 10, marginTop: 10 },
  helpfulContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 10, left: 170, top: 10 },
  helpfulText: { marginRight: 5, color: '#888' },
  writeReviewButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00B0FF',
    borderRadius: 35,
    padding: 10,
    width: 210,
    height: 50,
    left: 130,
    top: 10,
  },
  writeReviewText: { color: '#fff', marginLeft: 5 },
});

export default RatingAndReviews;

