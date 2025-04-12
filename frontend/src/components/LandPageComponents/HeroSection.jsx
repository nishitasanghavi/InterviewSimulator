import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, MessageCircle } from "lucide-react";
import { Link } from "react-router-dom";

const floatingComments = [
  { text: "AI feedback helped me land my dream job!", name: "Sophia", position: "Software Engineer", company: "Google" },
  { text: "The real-time mock interviews are game-changers!", name: "Liam", position: "Data Scientist", company: "Meta" },
  { text: "Love the company-specific questions for Amazon!", name: "Olivia", position: "Product Manager", company: "Amazon" },
  { text: "Finally a way to practice interviews stress-free!", name: "Noah", position: "UX Designer", company: "Microsoft" },
  { text: "The AI insights really improved my responses!", name: "Emma", position: "Business Analyst", company: "Tesla" }
];

const HeroSection = () => {
  const [activeComments, setActiveComments] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomComment =
        floatingComments[Math.floor(Math.random() * floatingComments.length)];
      setActiveComments((prev) => [
        ...prev.slice(-2), // Keep only last 2 active comments
        { id: Date.now(), ...randomComment }
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col ml-8 md:flex-row items-center justify-between gap-12 relative">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-2xl"
      >
        <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-gray-900 leading-tight">
          Ace Your Interviews with{" "}
          <span className="text-indigo-600">AI-Powered</span> Mock Simulations
        </h1>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Practice real-time interviews, receive AI feedback, and track your progress – all in one place.
        </p>

        {/* Badge */}
        <div className="flex items-center gap-2 bg-indigo-100 text-indigo-700 px-4 py-2 rounded-full text-sm font-medium w-max mb-6">
          <CheckCircle size={18} className="text-indigo-600" />
          Trusted by 10,000+ Job Seekers
        </div>

        {/* Buttons with Routing */}
        <div className="flex gap-4">
          <Link to="/signup" className="inline-block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white px-8 py-3 rounded-full font-semibold shadow-md hover:bg-indigo-700"
            >
              Start Your Free Trial
            </motion.button>
          </Link>

          <Link to="/login" className="inline-block">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-gray-900 px-8 py-3 rounded-full font-semibold flex items-center gap-2 hover:bg-gray-900 hover:text-white transition-all"
            >
              Login
            </motion.button>
          </Link>
        </div>
      </motion.div>

      {/* Video Section */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="flex justify-end w-full md:w-auto"
      >
        <video className="w-[450px] md:w-[550px]" autoPlay loop muted>
          <source src="src/assets/herosection.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </motion.div>

      {/* Floating Comments */}
      <AnimatePresence>
        {activeComments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            transition={{ duration: 0.6 }}  
            className="absolute bg-white shadow-lg text-gray-900 w-100 px-6 py-4 rounded-lg text-lg font-medium flex flex-col gap-2 items-start border border-gray-300"
            style={{
              top: `${Math.random() * 40 + 30}%`,
              left: `${Math.random() * 20 + 42}%`
            }}
          >
            <div className="flex items-center gap-3">
              <MessageCircle size={20} className="text-indigo-600" />
              <span>{comment.text}</span>
            </div>
            <div className="text-sm text-gray-600 font-semibold">
              - {comment.name}, {comment.position} at {comment.company}
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default HeroSection;
