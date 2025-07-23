import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import filtersReducer from './slices/filtersSlice';
import favouritesReducer from './slices/favouritesSlice'; // optional

const store = configureStore({
  reducer: {
    products: productsReducer,
    filters: filtersReducer,
    favourites: favouritesReducer, // optional
  },
});

export default store;