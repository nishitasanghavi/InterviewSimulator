import { useState } from "react";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");

  const tabs = ["Dashboard", "Interviews", "Practice", "Resume", "Community", "Leaderboard"];

  return (
    <div className="container mx-auto">
      <div className="flex items-center overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-6 py-4 font-medium transition border-b-2 whitespace-nowrap ${
              activeTab === tab
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-600 hover:text-indigo-600 hover:border-indigo-200"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
