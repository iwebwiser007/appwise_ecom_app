import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Switch,
} from 'react-native';

const PaymentMethodBottomSheet = ({isVisible, onClose, onAddCard}) => {
  const [cardNumber, setCardNumber] = useState('');
  const [name, setName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [ccv, setCcv] = useState('');
  const [isDefault, setIsDefault] = useState(false);

  const handleAddCard = () => {
    onAddCard({
      cardType: 'Custom',
      lastFour: cardNumber.slice(-4),
      name,
      expiry,
      isDefault,
    });
    setCardNumber('');
    setName('');
    setExpiry('');
    setCcv('');
    setIsDefault(false);
  };

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.bottomSheet}>
          <Text style={styles.sheetTitle}>Add New Card</Text>
          <View style={styles.inputCard}>
            <Text style={styles.inputLabel}>Name on card</Text>
            <TextInput
              style={styles.input}
              placeholder="Card Holder Name"
              value={name}
              onChangeText={setName}
            />
          </View>
          <View style={styles.inputCard}>
                <Text style={styles.inputLabel}>Card number</Text>
                <TextInput
                style={styles.input}
                placeholder="**** **** **** 3947"
                keyboardType="numeric"
                value={cardNumber}
                onChangeText={setCardNumber}
                />
          </View>
          <View style={styles.inputCard}>
            <Text style={styles.inputLabel}>Expire Date</Text>
            <TextInput
              style={styles.input}
              placeholder="MM/YY"
              value={expiry}
              keyboardType="numeric"
              onChangeText={setExpiry}
            />
          </View>
          <View style={styles.inputCard}>
            <Text style={styles.inputLabel}>CVV</Text>
            <TextInput
              style={styles.input}
              placeholder="***"
              keyboardType="numeric"
              value={ccv}
              onChangeText={setCcv}
            />
          </View>
          <View style={styles.defaultContainer}>
            <Switch value={isDefault} onValueChange={setIsDefault} />
            <Text style={styles.defaultText}>
              Set as default payment method
            </Text>
          </View>
          <TouchableOpacity style={styles.addButton} onPress={handleAddCard}>
            <Text style={styles.addButtonText}>ADD CARD</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Text style={styles.cancelButtonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  inputCard: {
    backgroundColor: '#F9F9F9',
    borderRadius: 4,
    padding: 8,
    marginBottom: 10,
  },
  inputLabel: {
    fontSize: 12,
    color: '#888',
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
  },
  defaultContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  defaultText: {
    marginLeft: 10,
  },
  addButton: {
    backgroundColor: '#00B0FF',
    paddingVertical: 12,
    borderRadius: 35,
    alignItems: 'center',
    marginTop: 10,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#00B0ff',
    fontWeight: 'bold',
    fontSize: 12,
  },
});

export default PaymentMethodBottomSheet;
