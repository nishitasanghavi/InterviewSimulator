import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="flex justify-between items-center mb-8 px-6 py-4">
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="text-3xl font-bold text-indigo-600"
      >
        AI Mock Interview
      </motion.div>

      {/* Buttons */}
      <div className="flex gap-4 items-center">
        {/* Login Button */}
        <Link to="/login" className="inline-block">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="text-indigo-600 font-semibold"
          >
            Login
          </motion.button>
        </Link>

        {/* Signup Button (Start Free Trial) */}
        <Link to="/signup" className="inline-block">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 shadow-lg hover:bg-indigo-700"
          >
            Start Your Free Trial <ArrowRight size={20} />
          </motion.button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
