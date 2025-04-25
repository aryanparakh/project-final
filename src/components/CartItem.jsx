import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { motion } from 'framer-motion';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const [showConfirmRemove, setShowConfirmRemove] = useState(false);

  const handleQuantityChange = (newQuantity) => {
    updateQuantity(item.id, newQuantity);
  };

  const confirmRemove = () => {
    setShowConfirmRemove(true);
  };

  const handleRemove = () => {
    removeFromCart(item.id);
    setShowConfirmRemove(false);
  };

  const cancelRemove = () => {
    setShowConfirmRemove(false);
  };

  return (
    <motion.div 
      className="bg-white rounded-sm p-4 mb-3 shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col sm:flex-row">
        {/* Product Image */}
        <div className="sm:w-1/4 lg:w-1/6 flex-shrink-0 mb-3 sm:mb-0">
          <Link to={`/product/${item.id}`}>
            <img 
              src={item.image} 
              alt={item.title} 
              className="w-full max-h-36 object-contain"
            />
          </Link>
        </div>
        
        {/* Product Details */}
        <div className="sm:pl-4 flex-1">
          <div className="flex flex-col sm:flex-row justify-between h-full">
            <div className="flex-1">
              {/* Title & Brand */}
              <Link to={`/product/${item.id}`} className="text-gray-800 font-medium hover:text-primary">
                {item.title}
              </Link>
              <p className="text-gray-500 text-sm">{item.brand}</p>
              
              {/* Price Info */}
              <div className="flex items-center mt-2">
                <span className="text-gray-800 font-semibold">₹{item.price.toLocaleString()}</span>
                {item.discount > 0 && (
                  <>
                    <span className="text-gray-500 text-sm line-through ml-2">
                      ₹{item.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-green-600 text-sm ml-2">{item.discount}% off</span>
                  </>
                )}
              </div>
              
              {/* Delivery Info */}
              {item.freeDelivery && (
                <p className="text-sm text-success-dark mt-1">Free Delivery</p>
              )}
            </div>
            
            {/* Quantity Controls */}
            <div className="flex flex-row sm:flex-col justify-between items-end mt-4 sm:mt-0">
              <div className="flex items-center border border-gray-300 rounded">
                <button 
                  onClick={() => handleQuantityChange(item.quantity - 1)}
                  className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                  disabled={item.quantity <= 1}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="px-3 py-1 text-gray-800">{item.quantity}</span>
                <button 
                  onClick={() => handleQuantityChange(item.quantity + 1)}
                  className="px-2 py-1 text-gray-600 hover:bg-gray-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
              
              {/* Remove button */}
              {showConfirmRemove ? (
                <div className="mt-3 flex flex-col items-end">
                  <p className="text-xs text-gray-700 mb-1">Remove item?</p>
                  <div className="flex space-x-2">
                    <button 
                      onClick={handleRemove}
                      className="text-xs px-2 py-1 bg-error text-white rounded"
                    >
                      Yes
                    </button>
                    <button 
                      onClick={cancelRemove}
                      className="text-xs px-2 py-1 bg-gray-200 text-gray-700 rounded"
                    >
                      No
                    </button>
                  </div>
                </div>
              ) : (
                <button 
                  onClick={confirmRemove}
                  className="mt-3 text-sm text-error hover:text-error-dark"
                >
                  Remove
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default CartItem;