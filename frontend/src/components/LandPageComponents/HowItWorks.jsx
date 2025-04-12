import React from "react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-white">
      <HowItWorksSection />
    </main>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      number: 1,
      title: "Sign Up & Personalize",
      description:
        "Create an account, upload your resume, and let our AI tailor your interview experience.",
      image: "/assets/signup.jpg",
    },
    {
      number: 2,
      title: "Practice & Assess",
      description:
        "Take a quick quiz to evaluate your skills or jump into an AI-powered mock interview with real-time feedback.",
      image: "/assets/quiz.jpg",
    },
    {
      number: 3,
      title: "Improve & Get Insights",
      description:
        "Solve coding challenges, practice whiteboarding, and get detailed AI feedback on your responses and performance.",
      image: "/assets/coding.jpg",
    },
    {
      number: 4,
      title: "Track Progress & Prepare for Success",
      description:
        "Monitor your performance dashboard, get company-specific interview questions, and refine your skills with peer & AI feedback.",
      image: "/assets/progress.jpg",
    },
  ];

  return (
    <section className="w-full max-w-7xl mx-auto py-16 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="text-4xl font-bold text-gray-900 mb-2">How It Works</h2>
        <p className="text-lg text-gray-600">
          Get ready to ace your next interview—Start practicing today!
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {steps.map((step, index) => (
          <motion.div
            key={step.number}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ delay: index * 0.2, duration: 0.6, ease: "easeOut" }}
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(0, 0, 0, 0.1)" }}
            className="bg-white rounded-lg border border-gray-100 shadow-sm p-8 flex justify-between items-center transition-all"
          >
            <div className="max-w-[60%]">
              <p className="text-purple-600 font-medium mb-2">Step {step.number}</p>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{step.title}</h3>
              <p className="text-gray-500">{step.description}</p>
            </div>
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
              className="w-32 h-32"
            >
              <img
                src={step.image}
                alt={`Step ${step.number}: ${step.title}`}
                className="w-full h-full object-contain"
              />
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
