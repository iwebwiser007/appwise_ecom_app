/* eslint-disable no-shadow */
// import React from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   Image,
//   ScrollView,
//   TouchableOpacity,
// } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

// const OrderDetails = ({navigation}) => {
//   const items = [
//     {
//       id: 1,
//       name: 'Pullover',
//       brand: 'Mango',
//       color: 'Gray',
//       size: 'L',
//       units: 1,
//       price: '51$',
//       image: 'https://s3-alpha-sig.figma.com/img/6e2a/6075/d2aebb9b52db31deea621f309362bab4?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=A0zo~uUAeLW8HwwPadyXJPIWbKPDJoiNto0oUvQoJbehvjZa1RdwzcEEm~XBGOSAJwcS0KdX~cXPP4JhpWJ3o2E9qP46XtaVWkbIqNH6U1PjvNvCcEODVMK9dnu0XIvyCNj8HEcwLDUy-Z~Riqo3k9Q75EY1efKvcJy7gDMsiBnEuroasoJO4AHsgyumgrNhShBcnwSZhKvnzwybklSueHyD9eQIHM~bvJRPeeypL2ukZKVPIhQV4ER0P6pbeGPmZTXSSnRH54UPsEG4of-ymWeW7Xt4kKwQEKrHSziRnwL0XIY-3k~947du7IW6VsCFrt~8tA-kztSPtyg26-38Ng__',
//     },
//     {
//       id: 2,
//       name: 'Pullover',
//       brand: 'Mango',
//       color: 'Gray',
//       size: 'L',
//       units: 1,
//       price: '51$',
//       image: 'https://s3-alpha-sig.figma.com/img/6011/aa7a/e269bb70fd8c136d1d0733c8ce6f245a?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=SQBdeahaTLqdvC7WeK8lTVS61vviqGjp2QnLvQsEy9zNAkqXISIAlIfG5NHsMVHBp4DWiuC2mdhWaNlPWUkw0EjzSvSjg7R1DNLJ0vmte8f4Aqr8ND6Tudwf2azjO-vNhiy6nZWJDYsIa6vmoxCYGKvYGLKY54n65LFYnLglen5fkQeiExsoAUgN70iMh6IY~FrNf0ttr1E568bzpbCSkEotF4TEUf4gXtzkOk~2sbEk3SSx~to6t3raW5v6MDcMaOSyWQfcnf4NL5LhHh6JYLJZVg8tiyqeuWi2Yb4mN~08MAr8vB2RRpz3c61TVMyYAH32Ypokqc7GDmhqYgntgQ__',
//     },
//     {
//       id: 3,
//       name: 'Pullover',
//       brand: 'Mango',
//       color: 'Gray',
//       size: 'L',
//       units: 1,
//       price: '51$',
//       image: 'https://s3-alpha-sig.figma.com/img/1821/5f62/e259b4c9081785e2fb7f4b553d1a8023?Expires=1732492800&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=YOGyYRQOJ~S1WdA7FhenfefSbaHDrFaurr-4hHqSR6sFtuJGQ52aiBqLv4rz3oXqOQka9p2zK7Qn09T1SkxyOeDDOKs7D0vcvY~ZTBWS0s1EDThZhvcN7I6~wCTWXoXuJFTQIV3wFkmNg6YEwHzn995TrDL7RfTwUjp~7as6KUpsSZVtg9EvqYAIDvMGsvzAFb7C~hBxtq-yEsPiq9PVho1JDlc7eQVFIcudiUOtZjNDfUlNDXC7YYtJ4L1Rj05mxQ5gkEUk6C7T8emK-hOJ09zlrZCxf-lFl49F6p0VjkY9UGDSHjusEeKdVgzU2uFK2tXaWS2qXrbMSblPQOHtZw__',
//     },
//   ];

//   return (
//     <ScrollView style={styles.container}>
//             <View style={styles.header}>
//                 <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
//                 <Icon name="chevron-back-outline" size={24} color="black" />
//                 </TouchableOpacity>
//                 <Text style={styles.headerTitle}>Order Details</Text>
//                 <TouchableOpacity style={styles.searchButton}>
//                 <Icon name="search-outline" size={24} color="black" />
//                 </TouchableOpacity>
//             </View>
//             <View style={styles.orderHeader}>
//                 <View>
//                     <Text style={styles.orderNumber}>Order №1947034</Text>
//                     <Text style={styles.trackingNumber}>Tracking number: IW3475453455</Text>
//                 </View>
//                 <View style={styles.order}>
//                     <Text style={styles.orderDate}>05-12-2019</Text>
//                     <Text style={styles.orderStatus}>Delivered</Text>
//                 </View>
//             </View>
//         <View>
//         {items.map((item) => (
//           <View key={item.id} style={styles.itemCard}>
//             <Image source={{ uri: item.image }} style={styles.itemImage} />
//             <View style={styles.itemDetails}>
//               <Text style={styles.itemName}>{item.name}</Text>
//               <Text style={styles.itemBrand}>{item.brand}</Text>
//               <Text style={styles.itemSpecs}>
//                 Color: {item.color}   Size: {item.size}
//               </Text>
//               <Text style={styles.itemUnits}>Units: {item.units}</Text>
//             </View>
//             <Text style={styles.itemPrice}>{item.price}</Text>
//           </View>
//         ))}
//       </View>

//       <View style={styles.orderInfo}>
//         <Text style={styles.sectionHeader}>Order Information</Text>
//         <View style={styles.infoRow}>
//           <Text style={styles.infoTitle}>Shipping Address:</Text>
//           <Text style={styles.infoText}>
//             3 Newbridge Court, Chino Hills, CA 91709, United States
//           </Text>
//         </View>
//         <View style={styles.infoRow}>
//           <Text style={styles.infoTitle}>Payment Method:</Text>
//           <Text style={styles.infoText}>**** **** 3947</Text>
//         </View>
//         <View style={styles.infoRow}>
//           <Text style={styles.infoTitle}>Delivery Method:</Text>
//           <Text style={styles.infoText}>FedEx, 3 days, 15$</Text>
//         </View>
//         <View style={styles.infoRow}>
//           <Text style={styles.infoTitle}>Discount:</Text>
//           <Text style={styles.infoText}>10%, promo code</Text>
//         </View>
//         <View style={styles.infoRow}>
//           <Text style={styles.infoTitle}>Total Amount:</Text>
//           <Text style={styles.infoText}>133$</Text>
//         </View>
//       </View>

//       <View style={styles.actions}>
//             <TouchableOpacity style={styles.reorderButton}>
//                 <Text style={styles.buttonText}>Reorder</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.feedbackButton}>
//                 <Text style={styles.feedbackbuttonText}>Leave Feedback</Text>
//             </TouchableOpacity>
//         </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#F9F9F9',
//     paddingHorizontal: 15,
//     paddingVertical: 10,
//   },
//   header: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: 16,
//     marginBottom:12,
//   },
//   headerTitle: {
//     fontSize: 20,
//     textAlign: 'center',
//     fontWeight: 'bold',
//     color: '#222',
//     marginLeft: 70,
//   },
//   backButton: {
//     position: 'absolute',
//     left: 8,
//   },
//   searchButton: {
//     position: 'absolute',
//     right: 8,
//   },
//   orderHeader: {
//     flexDirection: 'row',
//     marginBottom: 20,
//   },
//   orderNumber: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   trackingNumber: {
//     fontSize: 11,
//     color: '#666',
//     marginTop:8,
//   },
//   orderDate: {
//     fontSize: 11,
//     color: '#666',
//   },
//   orderStatus: {
//     fontSize: 11,
//     color: 'green',
//     fontWeight: 'bold',
//     top:8,
//     left:16,
//     marginTop:8,
//   },
//   itemCard: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFF',
//     padding: 10,
//     borderRadius: 8,
//     marginBottom: 10,
//     shadowColor: '#000',
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     shadowOffset: { width: 0, height: 2 },
//   },
//   itemImage: {
//     width: 60,
//     height: 60,
//     borderRadius: 8,
//     marginRight: 10,
//   },
//   itemDetails: {
//     flex: 1,
//   },
//   itemName: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#333',
//   },
//   itemBrand: {
//     fontSize: 12,
//     color: '#888',
//   },
//   itemSpecs: {
//     fontSize: 12,
//     color: '#888',
//   },
//   itemUnits: {
//     fontSize: 12,
//     color: '#888',
//   },
//   itemPrice: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     color: '#333',
//     marginTop:60,
//   },
//   orderInfo: {
//     // backgroundColor: '#FFF',
//     padding: 12,
//     marginBottom: 20,
//   },
//   sectionHeader: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 10,
//   },
//   infoRow: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 5,
//   },
//   infoTitle: {
//     fontSize: 14,
//     color: '#888',
//   },
//   infoText: {
//     fontSize: 14,
//     color: '#333',
//     flex: 1,
//     textAlign: 'right',
//   },
//   actions: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom:24,
//   },
//   reorderButton: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 35,
//     color:'#222222',
//     borderWidth:1,
//   },
//   feedbackButton: {
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     borderRadius: 35,
//     backgroundColor:'#00B0FF',
//   },
//   buttonText: {
//     fontSize: 14,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     color:'#222222',
//   },
//   feedbackbuttonText:{
//     color:'#fff',
//   },
// });

// export default OrderDetails;










































































import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const OrderDetails = ({ navigation }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = 40;

  useEffect(() => {
    const fetchUserOrderDetails = async (userId) => {
      try {
        const response = await fetch(
          `http://213.210.21.175:5000/AW0001/api/v1/getallorderforuser?user_id=${userId}`
        );
        const data = await response.json();
        setOrders(data.data || []);
      } catch (error) {
        console.error('Error fetching order details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserOrderDetails(userId);
  }, [userId]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {orders.map((order) => (
        <View key={order.id}>
          <View style={styles.orderHeader}>
            <View>
              <Text style={styles.orderNumber}>Order №{order.id}</Text>
              <Text style={styles.trackingNumber}>
                Tracking number: {order.tracking_number || 'N/A'}
              </Text>
            </View>
            <View style={styles.order}>
              <Text style={styles.orderDate}>{order.created_at}</Text>
              <Text style={styles.orderStatus}>{order.order_status}</Text>
            </View>
          </View>

          <View style={styles.orderInfo}>
            <Text style={styles.sectionHeader}>Order Information</Text>
            <View style={styles.infoRow}>
              <Text style={styles.infoTitle}>Shipping Address:</Text>
              <Text style={styles.infoText}>
                {order.address}, {order.city}, {order.state}, {order.country}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoTitle}>Payment Method:</Text>
              <Text style={styles.infoText}>{order.payment_method}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoTitle}>Delivery Method:</Text>
              <Text style={styles.infoText}>{order.delivery_option}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoTitle}>Shipping Charges:</Text>
              <Text style={styles.infoText}>{order.shipping_charges} R</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoTitle}>Total Amount:</Text>
              <Text style={styles.infoText}>{order.grand_total} R</Text>
            </View>
          </View>

          {/* Render order items */}
          {order.items &&
            order.items.map((item) => (
              <View key={item.id} style={styles.itemCard}>
                <Image source={{ uri: item.image }} style={styles.itemImage} />
                <View style={styles.itemDetails}>
                  <Text style={styles.itemName}>{item.name}</Text>
                  <Text style={styles.itemBrand}>{item.brand}</Text>
                  <Text style={styles.itemSpecs}>
                    Color: {item.color} Size: {item.size}
                  </Text>
                  <Text style={styles.itemUnits}>Units: {item.units}</Text>
                </View>
                <Text style={styles.itemPrice}>{item.price}</Text>
              </View>
            ))}
        </View>
      ))}

      <View style={styles.actions}>
        <TouchableOpacity style={styles.reorderButton}>
          <Text style={styles.buttonText}>Reorder</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.feedbackButton}>
          <Text style={styles.feedbackbuttonText}>Leave Feedback</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 15,
    paddingVertical: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom: 12,
  },
  headerTitle: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#222',
    marginLeft: 70,
  },
  backButton: {
    position: 'absolute',
    left: 8,
  },
  searchButton: {
    position: 'absolute',
    right: 8,
  },
  orderHeader: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  orderNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  trackingNumber: {
    fontSize: 11,
    color: '#666',
    marginTop: 8,
  },
  orderDate: {
    fontSize: 11,
    color: '#666',
  },
  orderStatus: {
    fontSize: 11,
    color: 'green',
    fontWeight: 'bold',
    top: 8,
    left: 16,
    marginTop: 8,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
  },
  itemBrand: {
    fontSize: 12,
    color: '#888',
  },
  itemSpecs: {
    fontSize: 12,
    color: '#888',
  },
  itemUnits: {
    fontSize: 12,
    color: '#888',
  },
  itemPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 60,
  },
  orderInfo: {
    padding: 12,
    marginBottom: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  infoTitle: {
    fontSize: 14,
    color: '#888',
  },
  infoText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    textAlign: 'right',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  reorderButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 35,
    color: '#222222',
    borderWidth: 1,
  },
  feedbackButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 35,
    backgroundColor: '#00B0FF',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#222222',
  },
  feedbackbuttonText: {
    color: '#fff',
  },
});

export default OrderDetails;
