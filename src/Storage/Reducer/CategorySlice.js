import { createSlice } from '@reduxjs/toolkit';
import { fetchAllCategories, fetchAllSections } from '../../Api/api';

// Initial state for categories and sections
const initialState = {
  categories: [],
  filteredCategories: [],
  sections: [],
  selectedSection: null,
  loading: true,
};

// Create the category slice
const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setFilteredCategories: (state, action) => {
      state.filteredCategories = action.payload;
    },
    setSections: (state, action) => {
      state.sections = action.payload;
    },
    setSelectedSection: (state, action) => {
      state.selectedSection = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const {
  setCategories,
  setFilteredCategories,
  setSections,
  setSelectedSection,
  setLoading,
} = categorySlice.actions;
export const fetchCategoriesAndSections = () => async (dispatch) => {
  dispatch(setLoading(true));
  try {
    // Fetch categories and sections from the API
    const categoryData = await fetchAllCategories();
    const sectionData = await fetchAllSections();

    // Ensure the data is available and correctly structured
    if (!categoryData?.data || !sectionData?.data) {
      throw new Error('No categories or sections data available');
    }

    // console.log('Fetched Categories:', categoryData.data);
    // console.log('Fetched Sections:', sectionData.data);

    // Filter active sections (if section status and ID are correct in the API response)
    const activeSections = sectionData.data.filter((section) => section.status === 1);

    // Filter root categories (top-level categories)
    const rootCategories = categoryData.data.filter(
      (category) => category.status === 1 && category.parent_id === 0
    );

    // Dispatch sections and categories to Redux state
    dispatch(setSections(activeSections));
    dispatch(setCategories(rootCategories));

    // Automatically select the first section and filter categories by section
    if (activeSections.length > 0) {
      const firstSection = activeSections[0];
      dispatch(setSelectedSection(firstSection.name));
      dispatch(
        setFilteredCategories(
          rootCategories.filter((category) => category.section_id === firstSection.id)
        )
      );
    } else {
      // Handle case when no sections are active
      dispatch(setSelectedSection(null));
      dispatch(setFilteredCategories([]));
    }
  } catch (error) {
    console.error('Error fetching categories and sections:', error);
  } finally {
    dispatch(setLoading(false));
  }
};
export default categorySlice.reducer;
