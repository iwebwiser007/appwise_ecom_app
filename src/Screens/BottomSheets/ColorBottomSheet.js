import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const ColorBottomSheetComponent = ({ visible, onClose, onSelectColor, colors }) => {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalBackground}>
        <View style={styles.bottomSheet}>
          <Text style={styles.title}>Select Color</Text>
          {colors.length > 0 ? (
            colors.map((color, index) => (
              <TouchableOpacity
                key={`${color}-${index}`}
                onPress={() => {
                  onSelectColor(color);
                  onClose();
                }}
                style={styles.sizeOption}>
                <Text style={styles.sizeText}>{color}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noColorsText}>No colors available</Text>
          )}
          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  bottomSheet: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
    color: '#222222',
  },
  sizeOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sizeText: {
    fontSize: 16,
    color: '#222222',
  },
  closeButton: {
    marginTop: 16,
    alignItems: 'center',
    paddingVertical: 10,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'red',
  },
});

export default ColorBottomSheetComponent;
