/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchAllCategories } from '../APIServer';

const CategoryDetailPage = ({ route, navigation }) => {
  const { categoryId, categoryName } = route.params || {};
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!categoryId) {
      setLoading(false);
      setSubcategories([]);
      return;
    }

    const loadSubcategories = async () => {
      try {
        const categories = await fetchAllCategories();
        const filteredSubcategories = categories.filter(
          (item) => item.parent_id === categoryId
        );
        setSubcategories(filteredSubcategories);

        if (filteredSubcategories.length === 0) {
          navigation.replace('WomenTops', { categoryId, categoryName });
        }
      } catch (error) {
        console.error('Error loading subcategories:', error);
        navigation.replace('WomenTops');
      } finally {
        setLoading(false);
      }
    };

    loadSubcategories();
  }, [categoryId]);

  return (
    <View style={styles.pageContainer}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Icon name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>
          {categoryName || 'Category Details'}
        </Text>
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <TouchableOpacity
          style={styles.buttonAllItems}
          onPress={() =>
            navigation.navigate('WomenTops', { categoryId, categoryName })
          }
        >
          <Text style={styles.buttonText}>VIEW ALL ITEMS</Text>
        </TouchableOpacity>
        <Text style={styles.chooseCategory}>Choose a Subcategory</Text>
        <View style={styles.subcategoryList}>
          {loading ? (
            <Text style={styles.loaderText}>Loading subcategories...</Text>
          ) : subcategories.length > 0 ? (
            subcategories.map((subcategory, index) => (
              <TouchableOpacity
                key={index}
                style={styles.subcategoryItem}
                onPress={() =>
                  navigation.navigate('WomenTops', { categoryId: subcategory.id })
                }
              >
                <Text style={styles.subcategoryText}>
                  {subcategory.category_name}
                </Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={styles.noSubcategoriesText}>
              No subcategories found.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#f9f9f9',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#222',
    marginLeft:100,
  },
  backButton: {
    position: 'absolute',
    left: 16,
  },
  searchButton: {
    position: 'absolute',
    right: 16,
  },
  buttonAllItems: {
    backgroundColor: '#00B0FF',
    padding: 8,
    margin: 16,
    borderRadius: 35,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chooseCategory: {
    marginLeft: 15,
  },
  subcategoryList: {
    paddingHorizontal: 16,
  },
  subcategoryItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  subcategoryText: {
    fontSize: 16,
    color: '#222',
  },
  loaderText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
  noSubcategoriesText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CategoryDetailPage;
