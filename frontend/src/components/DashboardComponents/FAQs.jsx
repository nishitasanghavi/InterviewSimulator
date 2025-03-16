import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
  {
    question: "How does this interview simulator work?",
    answer:
      "Our AI-powered simulator provides mock interviews, skill assessments, and real-time feedback to help you prepare for job interviews. It analyzes your resume, customizes questions, and offers performance insights.",
  },
  {
    question: "Is this platform free to use?",
    answer:
      "We offer a free version with basic features like quizzes and mock interviews. For advanced AI feedback, detailed reports, and company-specific questions, you can upgrade to a premium plan.",
  },
  {
    question: "What types of interviews can I practice?",
    answer:
      "✔️ Technical Interviews (Coding, System Design)\n✔️ Behavioral Interviews (HR, Situational Questions)\n✔️ Company-Specific Interviews (Google, Amazon, etc.)",
  },
  {
    question: "Can I upload my resume for personalized questions?",
    answer:
      "Yes! Upload your resume, and our AI will generate customized questions based on your skills and experience.",
  },
  {
    question: "Do you provide real-time feedback?",
    answer:
      "Yes! After each mock interview, you receive instant AI feedback on:\n- Answer quality\n- Confidence level\n- Improvement suggestions",
  },
  {
    question: "Can I track my progress over time?",
    answer:
      "Absolutely! Your personalized dashboard shows:\n📊 Quiz & interview scores\n📈 Skill improvement trends\n🎯 Areas to focus on",
  },
  {
    question: "Do you have live coding challenges?",
    answer:
      "Yes! You can solve real-world coding problems in our built-in code editor with AI feedback on efficiency and logic.",
  },
  {
    question: "How do I prepare for company-specific interviews?",
    answer:
      "We offer a database of real interview questions asked at top companies like Google, Amazon, and Microsoft.",
  },
  {
    question: "Is my data and resume secure?",
    answer:
      "Yes! We use industry-standard encryption to keep your data safe & private.",
  },
  {
    question: "How do I get started?",
    answer:
      "Click Sign Up, create your profile, and start practicing right away! 🚀",
  },
];

const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border border-gray-300 rounded-lg mb-2 overflow-hidden">
    <button
      onClick={onClick}
      className="w-full flex justify-between items-center p-4 text-left font-medium text-gray-900 hover:bg-gray-100 transition-colors"
    >
      <span>{question}</span>
      <span className="text-xl">{isOpen ? "—" : "+"}</span>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
          className="p-4 bg-gray-50 text-gray-600 whitespace-pre-line"
        >
          {answer}
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FAQs = () => {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      {/* Heading */}
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gray-900">Frequently Asked Questions</h2>
        <p className="text-lg text-gray-600 mt-2">
          Find answers to common questions about our interview simulator. 
          For further assistance, our support team is always ready to help.
        </p>
      </div>

      {/* FAQ Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {faqs.map((faq, index) => (
          <FAQItem
            key={index}
            question={faq.question}
            answer={faq.answer}
            isOpen={openIndex === index}
            onClick={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
      </div>
    </div>
  );
};

export default FAQs;
