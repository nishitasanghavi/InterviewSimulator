import React from 'react';
import { motion } from 'framer-motion';

const FeatureCard = ({ icon, title, description }) => {
  return (
    <motion.div whileHover={{ scale: 1.05 }} className="bg-white p-8 rounded-xl border border-gray-200 shadow-lg transition-transform hover:shadow-2xl">
      <div className="bg-gradient-to-br from-indigo-500 to-purple-500 w-16 h-16 rounded-lg flex items-center justify-center mb-4 shadow-md">
        {icon}
      </div>
      <h3 className="text-2xl font-semibold mb-3 text-gray-900">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </motion.div>
  );
};

export default FeatureCard;