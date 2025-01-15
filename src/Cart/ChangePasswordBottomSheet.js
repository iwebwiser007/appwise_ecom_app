import React from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

const ChangePasswordBottomSheet = ({ visible, onClose, onSave, onPasswordChange }) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Password Change</Text>
          <TextInput
            style={styles.input}
            placeholder="Old Password"
            placeholderTextColor="#C4C4C4"
            secureTextEntry
          />
          <TextInput
            style={styles.input}
            placeholder="New Password"
            placeholderTextColor="#C4C4C4"
            secureTextEntry
            onChangeText={onPasswordChange}
          />

          <TextInput
            style={styles.input}
            placeholder="Repeat New Password"
            placeholderTextColor="#C4C4C4"
            secureTextEntry
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => {
              onSave();
              onClose();
            }}
          >
            <Text style={styles.saveButtonText}>SAVE PASSWORD</Text>
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
    padding: 35,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    textAlign:'center',
  },
  input: {
    height: 70,
    width:300,
    backgroundColor: '#FFF',
    borderRadius: 4,
    paddingHorizontal: 12,
    marginBottom: 28,
    fontSize: 14,
    color: '#333',
  },
  saveButton: {
    backgroundColor: '#00B0FF',
    padding: 12,
    borderRadius: 35,
    alignItems: 'center',
    marginTop: 0,
  },
  saveButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default ChangePasswordBottomSheet;
