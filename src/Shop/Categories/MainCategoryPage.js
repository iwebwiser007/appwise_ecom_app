import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { fetchAllCategories, fetchAllSections } from '../../APIServer';

const MainCategoryPage = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [sections, setSections] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const categoryData = await fetchAllCategories();
        const sectionData = await fetchAllSections();

        if (categoryData && sectionData) {
          const activeSections = sectionData.filter(section => section.status === 1);
          const rootCategories = categoryData.filter(
            category => category.status === 1 && category.parent_id === 0
          );

          setSections(activeSections);
          setCategories(rootCategories);

          if (activeSections.length > 0) {
            setSelectedSection(activeSections[0].name);
            setFilteredCategories(
              rootCategories.filter(category => category.section_id === activeSections[0].id)
            );
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSectionChange = section => {
    setSelectedSection(section.name);
    setFilteredCategories(categories.filter(category => category.section_id === section.id));
  };

  return (
    <View style={styles.pageContainer}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Icon name="chevron-back-outline" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Categories</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Icon name="search-outline" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* Sections */}
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
        {sections.map(section => (
          <TouchableOpacity
            key={section.id}
            onPress={() => handleSectionChange(section)}
            style={styles.sectionButton}
          >
            <Text
              style={[
                styles.sectionText,
                selectedSection === section.name && styles.activeSectionText,
              ]}
            >
              {section.name}
            </Text>
            {selectedSection === section.name && <View style={styles.activeSectionLine} />}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Categories */}
      <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.saleBanner}>
          <Text style={styles.saleText}>SUMMER SALES</Text>
          <Text style={styles.saleSubText}>Up to 50% off</Text>
        </TouchableOpacity>
        {loading ? (
          <Text>Loading...</Text>
        ) : filteredCategories.length ? (
          filteredCategories.map(category => (
            <TouchableOpacity
              key={category.id}
              onPress={() =>
                navigation.navigate('CategoryDetail', {
                  categoryId: category.id,
                  categoryName: category.category_name,
                })
              }
            >
              <View style={styles.card}>
                <Text style={styles.cardTitle}>{category.category_name}</Text>
                <Image source={{ uri: category.category_image }} style={styles.cardImage} />
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <Text>No categories available for this section.</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    backgroundColor: '#fff',
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
    marginLeft: 100,
    fontWeight: 'bold',
    color: '#222222',
  },
  backButton: {
    position: 'absolute',
    left: 16,
    color: '#222222',
  },
  searchButton: {
    position: 'absolute',
    right: 16,
    color: '#222222',
  },
  horizontalScroll: {
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  sectionButton: {
    alignItems: 'center',
    paddingHorizontal: 16,
    marginHorizontal: 8,
  },
  sectionText: {
    fontSize: 16,
    color: '#555',
  },
  activeSectionText: {
    color: '#222',
  },
  activeSectionLine: {
    marginTop: 4,
    width: '100%',
    height: 3,
    backgroundColor: '#00B0FF',
    borderRadius: 2,
  },
  container: {
    padding: 16,
    marginTop:0,
  },
  saleBanner: {
    backgroundColor: '#00B0FF',
    height: 90,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
    marginTop:-10,
  },
  saleText: {
    color: 'white',
    fontSize: 24,
    textAlign:'center',
    marginTop:20,
  },
  saleSubText: {
    color: 'white',
    fontSize: 14,
  },
  card: {
    backgroundColor: '#f9f9f9',
    height: 100,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginBottom: 16,
  },
  cardImage: {
    width: 191,
    height: 100,
    marginLeft: 40,
    alignContent: 'right',
    resizeMode: 'contain',
  },
  cardTitle: {
    width: '40%',
    fontSize: 16,
    fontWeight: '600',
    color: '#222222',
    marginLeft: 10,
  },
});

export default MainCategoryPage;
