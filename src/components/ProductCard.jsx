import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { id, title, price, originalPrice, discount, image, brand, rating, assured } = product;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <motion.div
      className="card group"
      whileHover={{ y: -5 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Link to={`/product/${id}`} className="block h-full">
        <div className="flex flex-col h-full">
          {/* Image container */}
          <div className="relative mb-3 pt-[100%]">
            <img 
              src={image} 
              alt={title} 
              className="absolute top-0 left-0 w-full h-full object-contain p-4"
            />
          </div>
          
          {/* Product info */}
          <div className="flex-1 flex flex-col">
            {/* Brand */}
            <div className="text-gray-500 text-sm">{brand}</div>
            
            {/* Title */}
            <h3 className="text-gray-800 font-medium mb-1 line-clamp-2 group-hover:text-primary transition-colors">
              {title}
            </h3>
            
            {/* Rating */}
            <div className="flex items-center mb-2">
              <span className="bg-green-600 text-white text-xs px-1.5 py-0.5 rounded flex items-center">
                {rating}
                <svg className="w-3 h-3 ml-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </span>
              
              {assured && (
                <span className="ml-2 text-xs text-primary font-semibold flex items-center">
                  Assured
                  <svg className="w-4 h-4 ml-0.5 text-primary-light" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                </span>
              )}
            </div>
            
            {/* Price */}
            <div className="mt-auto">
              <div className="flex items-center">
                <span className="text-gray-800 font-semibold">₹{price.toLocaleString()}</span>
                {discount > 0 && (
                  <>
                    <span className="text-gray-500 text-sm line-through ml-2">₹{originalPrice.toLocaleString()}</span>
                    <span className="text-green-600 text-sm ml-2">{discount}% off</span>
                  </>
                )}
              </div>
              
              {/* Add to cart button */}
              <button 
                onClick={handleAddToCart}
                className="mt-3 w-full btn-secondary text-sm py-1.5 transition-transform active:scale-95"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;