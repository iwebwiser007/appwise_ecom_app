import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

const SortByBottomSheetComponent = ({ visible, onClose, onSelectSortBy }) => {
  const SortBy = ['Popular', 'Newest', 'Customer Review', 'Price: Low to high', 'Price: High to low'];

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalBackground}>
        <View style={styles.bottomSheet}>
          <Text style={styles.title}>Sort By</Text>
          {SortBy.map(sortBy => (
            <TouchableOpacity
              key={sortBy}
              onPress={() => {
                onSelectSortBy(sortBy);
                onClose();
              }}
              style={styles.sizeOption}>
              <Text style={styles.sizeText}>{sortBy}</Text>
            </TouchableOpacity>
          ))}
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
    textAlign:'center',
  },
  sizeOption: {
    paddingVertical: 12,
    borderBottomWidth: 0,
    borderBottomColor: '#eee',
  },
  sizeText: {
    fontSize: 16,
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

export default SortByBottomSheetComponent;
