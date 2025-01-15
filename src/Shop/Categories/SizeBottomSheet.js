// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Modal } from 'react-native';

// const BottomSheetComponent = ({ visible, onClose, onSelectSize }) => {
//   const sizes = ['XS', 'S', 'M', 'L', 'XL'];

//   return (
//     <Modal visible={visible} animationType="slide" transparent>
//       <View style={styles.modalBackground}>
//         <View style={styles.bottomSheet}>
//           <Text style={styles.title}>Select Size</Text>
//           {sizes.map(size => (
//             <TouchableOpacity
//               key={size}
//               onPress={() => {
//                 onSelectSize(size);
//                 onClose();
//               }}
//               style={styles.sizeOption}>
//               <Text style={styles.sizeText}>{size}</Text>
//             </TouchableOpacity>
//           ))}
//           <TouchableOpacity onPress={onClose} style={styles.closeButton}>
//             <Text style={styles.closeButtonText}>Close</Text>
//           </TouchableOpacity>
//         </View>
//       </View>
//     </Modal>
//   );
// };

// const styles = StyleSheet.create({
//   modalBackground: {
//     flex: 1,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     justifyContent: 'flex-end',
//   },
//   bottomSheet: {
//     backgroundColor: 'white',
//     padding: 16,
//     borderTopLeftRadius: 16,
//     borderTopRightRadius: 16,
//   },
//   title: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   sizeOption: {
//     paddingVertical: 12,
//     borderBottomWidth: 1,
//     borderBottomColor: '#eee',
//   },
//   sizeText: {
//     fontSize: 16,
//   },
//   closeButton: {
//     marginTop: 16,
//     alignItems: 'center',
//     paddingVertical: 10,
//   },
//   closeButtonText: {
//     fontSize: 16,
//     color: 'red',
//   },
// });

// export default BottomSheetComponent;
































import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, ActivityIndicator } from 'react-native';
import { fetchProductSizeFromProduct } from '../../APIServer';

const BottomSheetComponent = ({ visible, onClose, onSelectSize, productId }) => {
  const [sizes, setSizes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSizes = async () => {
      if (visible) {
        setLoading(true);
        try {
          const fetchedSizes = await fetchProductSizeFromProduct(productId);
          setSizes(fetchedSizes);
        } catch (error) {
          console.error('Error fetching sizes:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    loadSizes();
  }, [visible, productId]);

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalBackground}>
        <View style={styles.bottomSheet}>
          <Text style={styles.title}>Select Size</Text>
          {loading ? (
            <ActivityIndicator size="large" color="#00B0FF" />
          ) : sizes.length > 0 ? (
            sizes.map(size => (
              <TouchableOpacity
                key={size}
                onPress={() => {
                  onSelectSize(size);
                  onClose();
                }}
                style={styles.sizeOption}>
                <Text style={styles.sizeText}>{size}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text>No sizes available</Text>
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
  },
  sizeOption: {
    paddingVertical: 12,
    borderBottomWidth: 1,
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

export default BottomSheetComponent;
