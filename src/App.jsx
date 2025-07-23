import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import FilterBar from './coreproject/FilterBar';
import Card from './coreproject/Card';
import { fetchProducts } from './store/slices/productsSlice';

function App() {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.all);
  const status = useSelector((state) => state.products.status);

  const { searchQuery, selectedCategory, sortOrder } = useSelector((state) => state.filters);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Apply filters and sorting
  const filtered = products
    .filter((p) => p.title.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((p) => selectedCategory === 'all' || p.category === selectedCategory)
    .sort((a, b) => {
      if (sortOrder === 'lowToHigh') return a.price - b.price;
      if (sortOrder === 'highToLow') return b.price - a.price;
      return 0;
    });

  return (
    <>
    
      <FilterBar />
      <div className="container">
        <div className="row">
          {filtered.map((product) => (
            <div className="col-md-4 mb-4" key={product.id}>
              <Card {...product} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;