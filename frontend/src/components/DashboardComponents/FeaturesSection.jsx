import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Rocket, Users } from 'lucide-react';
import FeatureCard from './FeatureCard';
import { ClipboardList, BarChart, Code } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <div className="container mx-auto px-6 py-24">
      <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Why Choose Us?</h2>
      <p className="text-lg text-center text-gray-600 mb-12">
        Practice real-time interviews, receive AI feedback, and track your progress – all in one place.
      </p>
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="grid md:grid-cols-3 gap-12">
        <FeatureCard icon={<Brain className="w-10 h-10 text-white" />} title="Real Time Mock Interviews" description="Face AI-powered interactive interviews" />
        <FeatureCard icon={<Rocket className="w-10 h-10 text-white" />} title="Resume-Based Questions" description="Get job-specific & customized interview questions" />
        <FeatureCard icon={<Users className="w-10 h-10 text-white" />} title="Performance Dashboard" description="Track progress & get AI-driven feedback" />
        <FeatureCard icon={<ClipboardList className="w-10 h-10 text-white" />} title="AI Feedback & Insights" description="Learn where to improve" />
        <FeatureCard icon={<Code className="w-10 h-10 text-white" />} title="Aptitude & Coding Quizzes" description="Sharpen your problem-solving skills" />
        <FeatureCard icon={<BarChart className="w-10 h-10 text-white" />} title="Company-Specific Questions" description="Prepare for Google, Amazon, and more" />
      </motion.div>
    </div>
  );
};

export default FeaturesSection;
