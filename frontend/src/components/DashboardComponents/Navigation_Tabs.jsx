import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const navigate = useNavigate();

  const tabs = [
    { label: "Dashboard", path: "/dashboard" },
    { label: "Interviews", path: "/interviews" },
    { label: "Practice", path: "/code-challenges" },
    { label: "Resume", path: "/resume" },
    { label: "Community", path: "/community" },
    { label: "Leaderboard", path: "/leaderboard" }
  ];

  const handleTabClick = (tab) => {
    setActiveTab(tab.label);
    navigate(tab.path);
  };

  return (
    <div className="container mx-auto">
      <div className="flex items-center overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.label}
            className={`px-6 py-4 font-medium transition border-b-2 whitespace-nowrap ${
              activeTab === tab.label
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-600 hover:text-indigo-600 hover:border-indigo-200"
            }`}
            onClick={() => handleTabClick(tab)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
