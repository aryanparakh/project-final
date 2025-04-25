import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import products from '../data/products';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [priceRange, setPriceRange] = useState([0, 200000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortBy, setSortBy] = useState('relevance');
  
  // Available brands from products
  const brands = [...new Set(products.map(product => product.brand))];
  
  // Filter and search products
  useEffect(() => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      let results = [...products];
      
      // Filter by search query
      if (query) {
        results = results.filter(product => 
          product.title.toLowerCase().includes(query.toLowerCase()) ||
          product.brand.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase())
        );
      }
      
      // Filter by selected brands
      if (selectedBrands.length > 0) {
        results = results.filter(product => selectedBrands.includes(product.brand));
      }
      
      // Filter by price range
      results = results.filter(product => 
        product.price >= priceRange[0] && product.price <= priceRange[1]
      );
      
      // Sort products
      switch (sortBy) {
        case 'price_low':
          results.sort((a, b) => a.price - b.price);
          break;
        case 'price_high':
          results.sort((a, b) => b.price - a.price);
          break;
        case 'rating':
          results.sort((a, b) => b.rating - a.rating);
          break;
        case 'discount':
          results.sort((a, b) => b.discount - a.discount);
          break;
        default:
          // Default is relevance, keep original order
          break;
      }
      
      setFilteredProducts(results);
      setLoading(false);
    }, 500);
  }, [query, selectedBrands, priceRange, sortBy]);
  
  const handleBrandChange = (brand) => {
    setSelectedBrands(prev => {
      if (prev.includes(brand)) {
        return prev.filter(b => b !== brand);
      } else {
        return [...prev, brand];
      }
    });
  };
  
  const handlePriceChange = (min, max) => {
    setPriceRange([min, max]);
  };
  
  const clearAllFilters = () => {
    setSelectedBrands([]);
    setPriceRange([0, 200000]);
    setSortBy('relevance');
  };
  
  return (
    <div className="py-6">
      <h1 className="text-xl font-bold text-gray-800 mb-6">
        {loading ? 'Searching...' : `Search Results for "${query}" (${filteredProducts.length} products)`}
      </h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Filters Sidebar */}
        <div className="bg-white rounded-sm p-4 shadow h-fit">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-bold text-gray-800">Filters</h2>
            <button 
              onClick={clearAllFilters}
              className="text-sm text-primary hover:text-primary-dark"
            >
              Clear All
            </button>
          </div>
          
          {/* Price Range Filter */}
          <div className="mb-6 pb-4 border-b border-gray-200">
            <h3 className="font-semibold text-gray-700 mb-3">Price Range</h3>
            <div className="space-y-2">
              <button 
                onClick={() => handlePriceChange(0, 1000)}
                className={`block w-full text-left px-3 py-2 rounded ${priceRange[0] === 0 && priceRange[1] === 1000 ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
              >
                Under ₹1,000
              </button>
              <button 
                onClick={() => handlePriceChange(1000, 5000)}
                className={`block w-full text-left px-3 py-2 rounded ${priceRange[0] === 1000 && priceRange[1] === 5000 ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
              >
                ₹1,000 - ₹5,000
              </button>
              <button 
                onClick={() => handlePriceChange(5000, 10000)}
                className={`block w-full text-left px-3 py-2 rounded ${priceRange[0] === 5000 && priceRange[1] === 10000 ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
              >
                ₹5,000 - ₹10,000
              </button>
              <button 
                onClick={() => handlePriceChange(10000, 20000)}
                className={`block w-full text-left px-3 py-2 rounded ${priceRange[0] === 10000 && priceRange[1] === 20000 ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
              >
                ₹10,000 - ₹20,000
              </button>
              <button 
                onClick={() => handlePriceChange(20000, 200000)}
                className={`block w-full text-left px-3 py-2 rounded ${priceRange[0] === 20000 && priceRange[1] === 200000 ? 'bg-primary text-white' : 'hover:bg-gray-100'}`}
              >
                Above ₹20,000
              </button>
            </div>
          </div>
          
          {/* Brand Filter */}
          <div className="mb-6">
            <h3 className="font-semibold text-gray-700 mb-3">Brand</h3>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {brands.map(brand => (
                <label key={brand} className="flex items-center cursor-pointer">
                  <input 
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                    className="w-4 h-4 text-primary rounded border-gray-300 focus:ring-primary"
                  />
                  <span className="ml-2 text-gray-700">{brand}</span>
                </label>
              ))}
            </div>
          </div>
        </div>
        
        {/* Product Listing */}
        <div className="lg:col-span-3">
          {/* Sort Options */}
          <div className="bg-white rounded-sm p-3 mb-4 shadow flex flex-wrap items-center justify-between">
            <div className="font-medium text-gray-700">Sort By</div>
            <div className="flex flex-wrap gap-2 mt-2 sm:mt-0">
              <button 
                onClick={() => setSortBy('relevance')}
                className={`px-3 py-1.5 text-sm rounded ${sortBy === 'relevance' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                Relevance
              </button>
              <button 
                onClick={() => setSortBy('price_low')}
                className={`px-3 py-1.5 text-sm rounded ${sortBy === 'price_low' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                Price: Low to High
              </button>
              <button 
                onClick={() => setSortBy('price_high')}
                className={`px-3 py-1.5 text-sm rounded ${sortBy === 'price_high' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                Price: High to Low
              </button>
              <button 
                onClick={() => setSortBy('rating')}
                className={`px-3 py-1.5 text-sm rounded ${sortBy === 'rating' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                Top Rated
              </button>
              <button 
                onClick={() => setSortBy('discount')}
                className={`px-3 py-1.5 text-sm rounded ${sortBy === 'discount' ? 'bg-primary text-white' : 'bg-gray-100 hover:bg-gray-200'}`}
              >
                Discount
              </button>
            </div>
          </div>
          
          {/* Products Grid */}
          {loading ? (
            <div className="min-h-[60vh] flex items-center justify-center">
              <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="bg-white rounded-sm p-8 text-center shadow">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-xl font-bold text-gray-800 mb-2">No Products Found</h2>
              <p className="text-gray-600 mb-4">
                We couldn't find any products matching your criteria. 
                Try adjusting your filters or search for something else.
              </p>
              <button 
                onClick={clearAllFilters}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <motion.div 
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResults;