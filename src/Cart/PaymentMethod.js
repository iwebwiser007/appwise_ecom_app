/* eslint-disable no-unused-vars */
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  TextInput,
  Switch,
} from 'react-native';
import PaymentMethodBottomSheet from './PaymentMethodBottomSheet';
import Icon from 'react-native-vector-icons/Ionicons';

const PaymentMethodsScreen = ({navigation}) => {
  const [cards, setCards] = useState([
    {
      id: '1',
      cardType: 'MasterCard',
      lastFour: '3947',
      name: 'Jennyfer Doe',
      expiry: '05/23',
      isDefault: true,
    },
    {
      id: '2',
      cardType: 'Visa',
      lastFour: '4546',
      name: 'Jennyfer Doe',
      expiry: '11/22',
      isDefault: false,
    },
  ]);
  const [isBottomSheetVisible, setBottomSheetVisible] = useState(false);

  const addNewCard = cardDetails => {
    setCards([
      ...cards,
      {id: Date.now().toString(), ...cardDetails, isDefault: false},
    ]);
    setBottomSheetVisible(false);
  };

  const setDefaultCard = id => {
    const updatedCards = cards.map(card =>
      card.id === id ? {...card, isDefault: true} : {...card, isDefault: false},
    );
    setCards(updatedCards);
  };

  const renderCard = ({item}) => (
    <View style={styles.cardContainer}>
      <View
        style={[
          styles.card,
          item.cardType === 'Visa' ? styles.visaCard : styles.masterCard,
        ]}>
        <Text style={styles.cardNumber}>**** **** **** {item.lastFour}</Text>
        <Text style={styles.cardName}>{item.name}</Text>
        <Text style={styles.cardExpiry}>Expiry Date {item.expiry}</Text>
      </View>

      <View style={styles.defaultContainer}>
        <TouchableOpacity
          style={styles.checkContainer}
          onPress={() => setDefaultCard(item.id)}>
          <Icon
            name={item.isDefault ? 'checkbox' : 'square-outline'}
            size={20}
            color={item.isSelected ? '#222222' : '#555'}
          />
          <Text style={styles.checkText}>Use as default payment method</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>Payment methods</Text>
      </View>
      <Text style={styles.subtitle}>Your payment cards</Text>
      <FlatList
        data={cards}
        renderItem={renderCard}
        keyExtractor={item => item.id}
      />
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setBottomSheetVisible(true)}>
        <Icon name="add-circle" size={50} color="black" />
      </TouchableOpacity>
      <PaymentMethodBottomSheet
        isVisible={isBottomSheetVisible}
        onClose={() => setBottomSheetVisible(false)}
        onAddCard={addNewCard}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#F9F9F9', padding: 20},
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
  },
  backButton: {fontSize: 24, color: '#000', marginRight: 10},
  title: {fontSize: 20, fontWeight: 'bold', color: '#000', marginLeft: 30},
  subtitle: {fontSize: 16, color: '#666', marginBottom: 20},
  cardContainer: {marginBottom: 30},
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    elevation: 2,
  },
  masterCard: {backgroundColor: '#333'},
  visaCard: {backgroundColor: '#ccc'},
  cardNumber: {fontSize: 18, fontWeight: 'bold', color: '#fff'},
  cardName: {fontSize: 14, color: '#fff', marginTop: 10},
  cardExpiry: {fontSize: 14, color: '#fff', marginTop: 5},
  defaultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  defaultText: {fontSize: 14, color: '#666', marginLeft: 8},
  checkText:{
    marginLeft:24,
    top:-20,
  },
  addButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#fff',
    borderRadius: 30,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PaymentMethodsScreen;
