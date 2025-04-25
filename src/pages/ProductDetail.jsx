import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useCart } from '../context/CartContext';
import PriceFormat from '../components/PriceFormat';
import products from '../data/products';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addedToCart, setAddedToCart] = useState(false);

  // Fetch product details
  useEffect(() => {
    // Simulate API call
    setLoading(true);
    const foundProduct = products.find(p => p.id === parseInt(id));
    
    setTimeout(() => {
      setProduct(foundProduct);
      setLoading(false);
      
      // If product not found, redirect to home
      if (!foundProduct) {
        navigate('/');
      }
    }, 500);
  }, [id, navigate]);

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
      setAddedToCart(true);
      
      // Reset "Added to Cart" message after 3 seconds
      setTimeout(() => {
        setAddedToCart(false);
      }, 3000);
    }
  };

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Product Not Found</h2>
        <p className="text-gray-600 mb-6">The product you're looking for doesn't exist or has been removed.</p>
        <button 
          onClick={() => navigate('/')}
          className="btn-primary"
        >
          Go to Homepage
        </button>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="bg-white shadow-md rounded-sm p-4 md:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <motion.div 
            className="flex items-center justify-center bg-white rounded-md p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <img 
              src={product.image} 
              alt={product.title} 
              className="max-w-full max-h-96 object-contain"
            />
          </motion.div>
          
          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="mb-2 text-sm text-gray-500">{product.brand}</div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">{product.title}</h1>
            
            {/* Rating */}
            <div className="flex items-center mb-4">
              <span className="bg-green-600 text-white text-sm px-2 py-0.5 rounded flex items-center">
                {product.rating}
                <svg className="w-4 h-4 ml-0.5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                </svg>
              </span>
              <span className="text-sm text-gray-500 ml-2">{product.reviews} ratings</span>
              
              {product.assured && (
                <span className="ml-3 text-sm text-primary font-semibold flex items-center">
                  Assured
                  <svg className="w-5 h-5 ml-0.5 text-primary-light" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                </span>
              )}
            </div>
            
            {/* Price */}
            <div className="mb-4">
              <div className="flex items-center">
                <span className="text-3xl font-bold text-gray-800">
                  <PriceFormat price={product.price} />
                </span>
                {product.discount > 0 && (
                  <>
                    <span className="text-gray-500 line-through ml-2">
                      <PriceFormat price={product.originalPrice} />
                    </span>
                    <span className="text-green-600 ml-2">{product.discount}% off</span>
                  </>
                )}
              </div>
              {product.freeDelivery && (
                <p className="text-success-dark text-sm mt-1">Free Delivery</p>
              )}
            </div>
            
            {/* Highlights */}
            <div className="mb-6">
              <h3 className="text-gray-700 font-bold mb-2">Highlights</h3>
              <ul className="list-disc pl-5 space-y-1">
                {product.highlights.map((highlight, index) => (
                  <li key={index} className="text-gray-600">{highlight}</li>
                ))}
              </ul>
            </div>
            
            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-gray-700 font-bold mb-2">Quantity</h3>
              <div className="flex items-center border border-gray-300 rounded-md w-32">
                <button 
                  onClick={decreaseQuantity}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 focus:outline-none"
                  disabled={quantity <= 1}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="flex-1 text-center py-1">{quantity}</span>
                <button 
                  onClick={increaseQuantity}
                  className="px-3 py-1 text-gray-600 hover:bg-gray-100 focus:outline-none"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
              <motion.button
                onClick={handleAddToCart}
                className={`btn-secondary py-3 px-6 flex-1 flex items-center justify-center sm:max-w-[200px] ${addedToCart ? 'bg-success text-white' : ''}`}
                whileTap={{ scale: 0.95 }}
                disabled={addedToCart}
              >
                {addedToCart ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Added to Cart
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    Add to Cart
                  </>
                )}
              </motion.button>
              <motion.button
                className="btn-primary py-3 px-6 flex-1 flex items-center justify-center sm:max-w-[200px]"
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  addToCart(product, quantity);
                  navigate('/cart');
                }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                Buy Now
              </motion.button>
            </div>
          </motion.div>
        </div>
        
        {/* Description */}
        <div className="mt-8">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Description</h2>
          <p className="text-gray-600">{product.description}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;