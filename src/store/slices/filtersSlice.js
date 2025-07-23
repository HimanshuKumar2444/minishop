import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    searchQuery: '',
    selectedCategory: 'all',
    sortOrder: 'default',
  },
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setSortOrder: (state, action) => {
      state.sortOrder = action.payload;
    },
  },
});

export const {
  setSearchQuery,
  setSelectedCategory,
  setSortOrder,
} = filtersSlice.actions;

export default filtersSlice.reducer;