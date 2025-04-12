import { useState } from "react";
import { Activity } from "lucide-react";

const SkillsAssessment = () => {
  const [skills, setSkills] = useState([
    { name: "JavaScript", level: 85 },
    { name: "React", level: 78 },
    { name: "Node.js", level: 72 },
    { name: "Python", level: 88 },
    { name: "Data Structures", level: 80 },
  ]);

  return (
    <div className="bg-white">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Skills Assessment</h3>
        <button className="text-gray-500 hover:text-indigo-600 p-1 rounded">
          <Activity className="w-4 h-4" />
        </button>
      </div>

      {/* Skills Progress Bars */}
      <div className="space-y-4">
        {skills.map((skill, index) => (
          <div key={index}>
            <div className="flex justify-between text-sm mb-1">
              <span className="font-medium">{skill.name}</span>
              <span className="text-gray-500">{skill.level}%</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full">
              <div
                className="h-2 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600"
                style={{ width: `${skill.level}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* Skill Assessment Button */}
      <div className="mt-4 text-center">
        <button className="w-full border border-indigo-200 text-indigo-600 hover:bg-indigo-50 py-2 rounded-lg font-medium transition">
          Take Skill Assessment
        </button>
      </div>
    </div>
  );
};

export default SkillsAssessment;
