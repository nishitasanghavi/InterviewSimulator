import React from "react";

const MockInterviewPage = () => {
  return (
    <div className="bg-white text-black p-6 font-sans">
      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between bg-[#C9D7E4] p-10 rounded-lg">
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold text-[#2F4D6F]">
            Ace Your Interviews with <br />
            <span className="text-[#E2511A]">AI-Powered Mock Simulations</span>
          </h1>
          <p className="text-lg text-gray-700 mt-4">
            Practice real-time interviews, receive AI feedback, and track your
            progress – all in one place.
          </p>
          <div className="mt-6 flex gap-4">
            <button className="bg-[#2F4D6F] text-white px-4 py-2 rounded-lg shadow-md">
              Start Your Free Trial
            </button>
            <button className="border border-gray-700 px-4 py-2 rounded-lg shadow-md">
              Login
            </button>
          </div>
        </div>
        <div className="md:w-1/2 flex justify-center mt-6 md:mt-0">
          <img
            src="/mock-interview-illustration.png"
            alt="AI Interview Bot"
            className="w-80 h-auto"
          />
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-center mt-12">
        <h2 className="text-2xl font-bold text-[#2F4D6F]">Why Choose Us?</h2>
        <p className="text-gray-700 mt-2">
          Practice real-time interviews, receive AI feedback, and track your progress – all in one place.
        </p>
      </div>

      {/* Features */}
      <div className="grid md:grid-cols-3 gap-8 mt-8">
        <div className="text-center p-4 shadow-lg rounded-lg bg-[#98B1C5] text-white">
          <img src="/real-time-interview.png" alt="Mock Interviews" className="w-16 mx-auto" />
          <h3 className="text-lg font-bold mt-4">Real-Time Mock Interviews</h3>
          <p className="text-sm mt-2">Face AI-powered interactive interviews</p>
        </div>

        <div className="text-center p-4 shadow-lg rounded-lg bg-[#98B1C5] text-white">
          <img src="/resume-based.png" alt="Resume Questions" className="w-16 mx-auto" />
          <h3 className="text-lg font-bold mt-4">Resume-Based Questions</h3>
          <p className="text-sm mt-2">Get job-specific & customized interview questions</p>
        </div>

        <div className="text-center p-4 shadow-lg rounded-lg bg-[#98B1C5] text-white">
          <img src="/performance-dashboard.png" alt="Performance Dashboard" className="w-16 mx-auto" />
          <h3 className="text-lg font-bold mt-4">Performance Dashboard</h3>
          <p className="text-sm mt-2">Track progress & get AI-driven feedback</p>
        </div>
      </div>
    </div>
  );
};

export default MockInterviewPage;
