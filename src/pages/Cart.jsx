import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import PriceFormat from '../components/PriceFormat';

const Cart = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const navigate = useNavigate();
  
  // Calculate delivery charge and total
  const deliveryCharge = cartTotal > 500 ? 0 : 40;
  const grandTotal = cartTotal + deliveryCharge;
  
  // Animate checkout success
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);
  
  // Handle the checkout process
  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    setIsCheckingOut(true);
    
    // Simulate checkout process
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckoutSuccess(true);
      
      // Clear cart after successful checkout
      setTimeout(() => {
        clearCart();
        navigate('/');
      }, 3000);
    }, 2000);
  };
  
  return (
    <div className="py-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Shopping Cart</h1>
      
      {checkoutSuccess ? (
        <motion.div
          className="bg-success text-white p-6 rounded-md text-center"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-4">
            <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-2">Order Placed Successfully!</h2>
          <p className="mb-4">Thank you for your purchase. You will be redirected to the home page shortly.</p>
          <button 
            onClick={() => navigate('/')}
            className="bg-white text-success font-medium px-4 py-2 rounded hover:bg-gray-100 transition-colors"
          >
            Continue Shopping
          </button>
        </motion.div>
      ) : cartItems.length === 0 ? (
        <div className="bg-white rounded-md shadow p-8 text-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 mx-auto text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Looks like you haven't added anything to your cart yet.</p>
          <Link 
            to="/"
            className="btn-primary inline-block"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <AnimatePresence>
              {cartItems.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </AnimatePresence>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div 
              className="bg-white rounded-sm p-4 shadow sticky top-20"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-lg font-bold text-gray-800 pb-4 border-b border-gray-200">Order Summary</h2>
              
              <div className="py-4 space-y-3">
                <div className="flex justify-between text-gray-600">
                  <span>Items ({cartItems.length})</span>
                  <span><PriceFormat price={cartTotal} /></span>
                </div>
                
                <div className="flex justify-between text-gray-600">
                  <span>Delivery Charges</span>
                  {deliveryCharge === 0 ? (
                    <span className="text-success">FREE</span>
                  ) : (
                    <span><PriceFormat price={deliveryCharge} /></span>
                  )}
                </div>
                
                {deliveryCharge > 0 && (
                  <div className="text-xs text-success">
                    Add items worth <PriceFormat price={500 - cartTotal} /> more for free delivery
                  </div>
                )}
                
                <div className="pt-3 mt-3 border-t border-gray-200 flex justify-between font-bold">
                  <span>Total Amount</span>
                  <span><PriceFormat price={grandTotal} /></span>
                </div>
              </div>
              
              <div className="pt-4 border-t border-gray-200">
                {deliveryCharge === 0 && (
                  <div className="mb-3 text-sm text-success flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    You're eligible for FREE Delivery
                  </div>
                )}
                
                <button 
                  onClick={handleCheckout}
                  className="w-full btn-primary py-3 flex items-center justify-center relative overflow-hidden"
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Processing...
                    </>
                  ) : (
                    'Place Order'
                  )}
                </button>
              </div>
              
              <div className="mt-4 text-xs text-center text-gray-500">
                Safe and Secure Payments. Easy returns. 100% Authentic products.
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;