import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ChangePasswordBottomSheet from '../BottomSheets/ChangePasswordBottomSheet';


const Settings = ({navigation}) => {
  const [sales, setSales] = useState(true);
  const [newArrivals, setNewArrivals] = useState(false);
  const [deliveryStatus, setDeliveryStatus] = useState(false);
  const [password, setPassword] = useState('***************');
  const [isModalVisible, setIsModalVisible] = useState(false);


  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
            <View style={styles.header}>
                <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Icon name="chevron-back-outline" size={24} color="black" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.searchButton}>
                <Icon name="search-outline" size={24} color="black" />
                </TouchableOpacity>
            </View>
        </View>
        <Text style={styles.headerTitle}>Settings</Text>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Full name"
          placeholderTextColor="#C4C4C4"
          value="John Doe"
        />
      </View>
      <View style={styles.section}>
        <View style={styles.row}>
          <Text style={styles.sectionTitle}>Password</Text>
          <TouchableOpacity onPress={() => setIsModalVisible(true)}>
            <Text style={styles.changeText}>Change</Text>
          </TouchableOpacity>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#C4C4C4"
          secureTextEntry
          value={password}
          editable={false}
        />
      </View>

      {/* Bottom Sheet */}
      <ChangePasswordBottomSheet
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSave={() => console.log('Password saved:', password)}
        onPasswordChange={(newPassword) => setPassword(newPassword)}
      />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Notifications</Text>
        <View style={styles.notificationRow}>
          <Text style={styles.notificationText}>Sales</Text>
          <Switch
            value={sales}
            onValueChange={(value) => setSales(value)}
            thumbColor={sales ? '#4CAF50' : '#f4f3f4'}
            trackColor={{ false: '#bcbec2', true: '#bcbec2' }}
          />
        </View>
        <View style={styles.notificationRow}>
          <Text style={styles.notificationText}>New arrivals</Text>
          <Switch
            value={newArrivals}
            onValueChange={(value) => setNewArrivals(value)}
            thumbColor={newArrivals ? '#4CAF50' : '#f4f3f4'}
            trackColor={{ false: '#bcbec2', true: '#bcbec2' }}
          />
        </View>
        <View style={styles.notificationRow}>
          <Text style={styles.notificationText}>Delivery status changes</Text>
          <Switch
            value={deliveryStatus}
            onValueChange={(value) => setDeliveryStatus(value)}
            thumbColor={deliveryStatus ? '#4CAF50' : '#f4f3f4'}
            trackColor={{ false: '#bcbec2', true: '#bcbec2' }}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F9F9F9',
    paddingHorizontal: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    marginBottom:8,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
    marginTop:-16,
  },
  backButton: {
    position: 'absolute',
    left: -10,
    fontWeight: 'bold',
  },
  searchButton: {
    position: 'absolute',
    left:280,
    fontWeight: 'bold',
  },
  section: {
    marginTop: 20,
    backgroundColor: '#FFF',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  input: {
    height: 50,
    backgroundColor: '#F4F4F4',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    fontSize: 14,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  changeText: {
    fontSize: 14,
    color: '#9B9B9B',
  },
  notificationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 5,
  },
  notificationText: {
    fontSize: 14,
    color: '#333',
  },
});

export default Settings;
