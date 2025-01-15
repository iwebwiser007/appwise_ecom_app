import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import Icon from 'react-native-vector-icons/Ionicons';

const GridWomenTop = () => {
  const sheetRef = useRef(null);

  const renderContent = () => (
    <View style={styles.sheetContent}>
      <Text style={styles.sheetTitle}>Sort by</Text>
      <TouchableOpacity style={styles.sheetOption}>
        <Text>Price: Low to High</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sheetOption}>
        <Text>Price: High to Low</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.sheetOption}>
        <Text>Best Sellers</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.filterButton}
        onPress={() => sheetRef.current.snapTo(0)}
      >
        <Icon name="filter" size={20} />
        <Text style={styles.filterText}>Sort: Price Low to High</Text>
      </TouchableOpacity>

      <BottomSheet
        ref={sheetRef}
        snapPoints={[250, 0]}
        borderRadius={10}
        renderContent={renderContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#f9f9f9',
    borderRadius: 35,
    justifyContent: 'center',
    margin: 16,
  },
  filterText: {
    marginLeft: 8,
    color: '#888',
  },
  sheetContent: {
    backgroundColor: 'white',
    padding: 20,
    height: 250,
  },
  sheetTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sheetOption: {
    paddingVertical: 10,
  },
});

export default GridWomenTop;
