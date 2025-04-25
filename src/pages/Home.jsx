import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import ProductCard from '../components/ProductCard';
import CategoryNav from '../components/CategoryNav';
import products from '../data/products';

const banners = [
  "https://images.pexels.com/photos/1546901/pexels-photo-1546901.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/3985062/pexels-photo-3985062.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
  "https://images.pexels.com/photos/2536965/pexels-photo-2536965.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
];

const Home = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  // Auto-rotate banners
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  // Get random featured products (different product types)
  const featuredProducts = [...products]
    .sort(() => 0.5 - Math.random())
    .slice(0, 4);
  
  // Get top rated products
  const topRatedProducts = [...products]
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 4);

  return (
    <div>
      {/* Categories Navigation */}
      <CategoryNav />
      
      {/* Banner Carousel */}
      <div className="relative mb-6 overflow-hidden rounded-md">
        {banners.map((banner, index) => (
          <motion.div
            key={index}
            className="w-full aspect-[21/9] md:aspect-[21/7]"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: currentBanner === index ? 1 : 0,
              zIndex: currentBanner === index ? 10 : 0
            }}
            transition={{ duration: 0.5 }}
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0
            }}
          >
            <img 
              src={banner}
              alt={`Banner ${index + 1}`}
              className="w-full h-full object-cover rounded-md"
            />
          </motion.div>
        ))}
        
        {/* Banner navigation dots */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                currentBanner === index ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      </div>
      
      {/* Featured Products Section */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Featured Products</h2>
          <a href="#" className="text-primary text-sm font-medium">
            View All
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
      
      {/* Mid banner */}
      <div className="mb-8 rounded-md overflow-hidden shadow-md">
        <img 
          src="https://images.pexels.com/photos/4968391/pexels-photo-4968391.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Special offer"
          className="w-full h-auto object-cover"
        />
      </div>
      
      {/* Top Rated Products */}
      <section className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-gray-800">Top Rated Products</h2>
          <a href="#" className="text-primary text-sm font-medium">
            View All
          </a>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {topRatedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;