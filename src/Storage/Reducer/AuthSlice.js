import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchUserProfile = createAsyncThunk(
  'auth/fetchUserProfile',
  async (userId) => {
    const response = await fetch(`http://213.210.21.175:5000/AW0001/api/v1/users/${userId}`);
    return response.json();
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, status: 'idle' },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload;
      });
  },
});

export default authSlice.reducer;
