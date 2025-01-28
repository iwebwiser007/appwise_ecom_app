/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import InputField from '../../Utility/Modal/Input';

const ChangePasswordBottomSheet = ({ visible, onClose }) => {
  const [email, setEmail] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isCurrentPasswordVisible, setIsCurrentPasswordVisible] = useState(false);
  const [isNewPasswordVisible, setIsNewPasswordVisible] = useState(false);
  const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
  const [focusedInput, setFocusedInput] = useState('');

  const handleSave = async () => {
    if (!email || !currentPassword || !newPassword || !confirmPassword) {
      Alert.alert('Error', 'All fields are required.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New passwords do not match.');
      return;
    }

    try {
      const userId = await AsyncStorage.getItem('userId');
      const token = await AsyncStorage.getItem('token');
      console.log('Token:', token);

      // Check if the token is null or empty
      if (!token) {
        Alert.alert('Error', 'You need to log in first.');
        return;
      }

      const response = await fetch('http://213.210.21.175:5000/AW0001/api/v1/update-password', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          email: email,
          current_password: currentPassword,
          new_password: newPassword,
          confirm_password: confirmPassword,
        }),
      });

      const result = await response.json();
      if (response.ok) {
        Alert.alert('Success', 'Password updated successfully.');
        onClose();
      } else {
        Alert.alert('Error', result.message || 'Failed to update password.');
      }
    } catch (error) {
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };

  const handleFocus = (inputKey) => {
    setFocusedInput(inputKey);
  };

  const handleBlur = () => {
    setFocusedInput('');
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
          <Text style={styles.modalTitle}>Password Change</Text>

          <InputField
            label="Email"
            value={email}
            setValue={setEmail}
            inputKey="email"
            secureTextEntry={false}
            focusedInput={focusedInput}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
          />

          <InputField
            label="Old Password"
            value={currentPassword}
            setValue={setCurrentPassword}
            inputKey="currentPassword"
            secureTextEntry={!isCurrentPasswordVisible}
            focusedInput={focusedInput}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            isPasswordVisible={isCurrentPasswordVisible}
            setPasswordVisible={setIsCurrentPasswordVisible}
          />

          <InputField
            label="New Password"
            value={newPassword}
            setValue={setNewPassword}
            inputKey="newPassword"
            secureTextEntry={!isNewPasswordVisible}
            focusedInput={focusedInput}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            isPasswordVisible={isNewPasswordVisible}
            setPasswordVisible={setIsNewPasswordVisible}
          />
          <InputField
            label="Confrim New Password"
            value={confirmPassword}
            setValue={setConfirmPassword}
            inputKey="confirmPassword"
            secureTextEntry={!isConfirmPasswordVisible}
            focusedInput={focusedInput}
            handleFocus={handleFocus}
            handleBlur={handleBlur}
            isPasswordVisible={isConfirmPasswordVisible}
            setPasswordVisible={setIsConfirmPasswordVisible}
          />

          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
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
    textAlign: 'center',
  },
  input: {
    height: 70,
    width: 300,
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
