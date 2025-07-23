import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  setSearchQuery,
  setSelectedCategory,
  setSortOrder,
} from '../store/slices/filtersSlice';

function FilterBar() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const [categories, setCategories] = useState([]);

  const selectedCategory = useSelector((state) => state.filters.selectedCategory);
  const sortOrder = useSelector((state) => state.filters.sortOrder);

  // Debounced search input
  useEffect(() => {
    const timeout = setTimeout(() => {
      dispatch(setSearchQuery(inputValue));
    }, 300); // 300ms debounce

    return () => clearTimeout(timeout);
  }, [inputValue, dispatch]);

  // Fetch product categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('https://fakestoreapi.com/products/categories');
        const data = await res.json();
        setCategories(['all', ...data]);
      } catch (err) {
        console.error('Failed to fetch categories', err);
      }
    }

    fetchCategories();
  }, []);

  return (
    <div className="container my-4">
      <div className="row g-3">
        {/* Search */}
        <div className="col-md-4">
          <input
            type="text"
            placeholder="Search by title..."
            className="form-control"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
        </div>

        {/* Category Filter */}
        <div className="col-md-4">
          <select
            className="form-select"
            value={selectedCategory}
            onChange={(e) => dispatch(setSelectedCategory(e.target.value))}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat.toUpperCase()}
              </option>
            ))}
          </select>
        </div>

        {/* Sort by Price */}
        <div className="col-md-4">
          <select
            className="form-select"
            value={sortOrder}
            onChange={(e) => dispatch(setSortOrder(e.target.value))}
          >
            <option value="default">Sort: Default</option>
            <option value="lowToHigh">Price: Low to High</option>
            <option value="highToLow">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default FilterBar;