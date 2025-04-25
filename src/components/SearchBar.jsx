import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form onSubmit={handleSearch} className="flex w-full">
      <input
        type="text"
        placeholder="Search for products, brands and more"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full px-6 py-2.5 text-sm text-gray-700 bg-white border-0 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all duration-300"
      />
      <button
        type="submit"
        className="px-6 py-2.5 bg-white rounded-r-lg text-primary hover:bg-gray-50 transition-colors duration-300"
        aria-label="Search"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </button>
    </form>
  );
};

export default SearchBar;