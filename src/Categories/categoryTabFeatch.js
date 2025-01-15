import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, ActivityIndicator } from 'react-native';
const BASE_URL = 'http://213.210.21.175:5000/AW0001/api/v1/';

const CategoriesTab = ({ onCategorySelect }) => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      const fetchCategory = async () => {
        try {
          const categoryResponse = await fetch(`${BASE_URL}getallcategory`);

          const categoryData = await categoryResponse.json();

          if (categoryData?.data) {

            const categoriesData = categoryData.data.filter(
              category => category.status === 1 && category.parent_id === 0
            ); // Only root categories
            setCategories(categoriesData);
          }
        } catch (error) {
          console.error('Error fetching data:', error);
        } finally {
          setLoading(false);
        }
      };
      fetchCategory();
    }, []);

  // Render categories as tabs
  return (
    <View>
      {loading ? (
        <ActivityIndicator size="small" color="#00B0ff" />
      ) : (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tabs}>
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.tab,
                selectedCategory === category.id && styles.activeTab,
              ]}
              onPress={() => {
                setSelectedCategory(category.id);
                onCategorySelect(category.id); // Trigger the callback on category selection
              }}>
              <Text
                style={[
                  styles.tabText,
                  selectedCategory === category.id && styles.activeTabText,
                ]}>
                {category.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#fff',
  },
  tab: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#f1f1f1',
    borderRadius: 25,
    marginRight: 10,
  },
  activeTab: {
    backgroundColor: '#222222',
  },
  tabText: {
    color: '#888',
    fontSize: 12,
  },
  activeTabText: {
    color: '#fff',
  },
});

export default CategoriesTab;
