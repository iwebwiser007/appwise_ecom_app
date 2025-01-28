import { createSlice } from '@reduxjs/toolkit';
import { fetchAllCategories } from '../../Api/api';

const initialState = {
  categories: [],
  subcategories: [],
  loading: false,
  error: null,
};

const categoryDetailSlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload;
    },
    setSubcategories: (state, action) => {
      state.subcategories = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCategories, setSubcategories, setLoading, setError } =
  categoryDetailSlice.actions;

// Thunk to fetch categories and subcategories
export const fetchCategoriesAndSubcategories = (categoryId) => async (dispatch) => {
    dispatch(setLoading(true));
    try {
      const categories = await fetchAllCategories();
      console.log('Fetched Categories:', categories);

      const filteredSubcategories = categories.filter(
        (item) => item.parent_id === categoryId
      );
      console.log('Filtered Subcategories:', filteredSubcategories);
      dispatch(setCategories(categories));
      dispatch(setSubcategories(filteredSubcategories));
    } catch (error) {
      dispatch(setError(error.message));
    } finally {
      dispatch(setLoading(false));
    }
  };

export default categoryDetailSlice.reducer;
