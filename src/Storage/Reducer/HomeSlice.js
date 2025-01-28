// src/store/homeSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Async Thunks
export const fetchBanners = createAsyncThunk('home/fetchBanners', async () => {
  const response = await fetch('http://213.210.21.175:5000/AW0001/api/v1/getallbanner');
  const { data } = await response.json();
  return data.filter(banner => banner.image && banner.image !== 'null' && banner.status === '1');
});

export const fetchProducts = createAsyncThunk('home/fetchProducts', async () => {
  const response = await fetch('http://213.210.21.175:5000/AW0001/api/v1/allproduct');
  const { data } = await response.json();

  return {
    newArrivals: data.filter(item => item.product_image && item.product_image !== 'null' && item.product_discount === 0),
    hotDeals: data.filter(item => item.product_image && item.product_image !== 'null' && Number(item.product_discount) > 0),
    featuredProducts: data.filter(item => item.product_image && item.product_image !== 'null' && item.is_featured === true),
    bestSellerProducts: data.filter(item => item.product_image && item.product_image !== 'null' && item.is_bestseller === true),
  };
});

// Adding Slice
const homeSlice = createSlice({
  name: 'home',
  initialState: {
    banners: [],
    newArrivals: [],
    hotDeals: [],
    featuredProducts: [],
    bestSellerProducts: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBanners.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBanners.fulfilled, (state, action) => {
        state.banners = action.payload;
        state.loading = false;
      })
      .addCase(fetchBanners.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(fetchProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.newArrivals = action.payload.newArrivals;
        state.hotDeals = action.payload.hotDeals;
        state.featuredProducts = action.payload.featuredProducts;
        state.bestSellerProducts = action.payload.bestSellerProducts;
        state.loading = false;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default homeSlice.reducer;
