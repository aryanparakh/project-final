import { useState } from 'react';
import { motion } from 'framer-motion';

const categories = [
  { id: 'electronics', name: 'Electronics', icon: 'M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z' },
  { id: 'mobiles', name: 'Mobiles', icon: 'M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z' },
  { id: 'fashion', name: 'Fashion', icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z' },
  { id: 'appliances', name: 'Appliances', icon: 'M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2' },
  { id: 'groceries', name: 'Groceries', icon: 'M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z' },
  { id: 'toys', name: 'Toys', icon: 'M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z' },
  { id: 'beauty', name: 'Beauty', icon: 'M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01' },
  { id: 'sports', name: 'Sports', icon: 'M8 9l4-4 4 4m0 6l-4 4-4-4' },
];

const CategoryNav = () => {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <div className="bg-white shadow-md py-3 mb-5">
      <div className="container-custom">
        <div className="flex justify-between overflow-x-auto hide-scrollbar">
          {categories.map((category) => (
            <motion.div
              key={category.id}
              className="flex flex-col items-center px-4 py-2 rounded-md cursor-pointer min-w-[80px]"
              whileHover={{ y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
              onClick={() => setActiveCategory(category.id === activeCategory ? null : category.id)}
            >
              <div className={`p-2 rounded-full mb-1 ${activeCategory === category.id ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600'}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={1.5}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d={category.icon} />
                </svg>
              </div>
              <span className="text-xs font-medium text-center">{category.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryNav;