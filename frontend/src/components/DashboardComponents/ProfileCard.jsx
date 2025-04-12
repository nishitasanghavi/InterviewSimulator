import { CheckCircle } from "lucide-react";
import { useState } from "react";

const ProfileCard = () => {
  const [readiness, setReadiness] = useState(75);

  return (
    <div className="max-w-sm mx-auto">
      {/* Profile Image */}
      <div className="w-20 h-20 mx-auto relative">
        <div className="w-full h-full rounded-full overflow-hidden ring-4 ring-indigo-100">
          <img
            src="https://media.istockphoto.com/id/1448167415/photo/smiling-indian-businessman-in-suit-and-glasses-with-laptop-near-office-building.jpg?s=612x612&w=0&k=20&c=vuUgcc-IlZewhnRm7yNOIuEfAvTnyJdMsPbnvkAnZjc="
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>
        {/* Online Status Badge */}
        <span className="absolute bottom-0 right-0 bg-green-500 p-1 rounded-full border-2 border-white">
          <CheckCircle className="w-3 h-3 text-white" />
        </span>
      </div>

      {/* User Details */}
      <h2 className="text-xl font-bold mt-2">Yash Rawat</h2>
      <p className="text-gray-600">Software Engineer</p>

      {/* Interview Readiness Progress */}
      <div className="mt-3 bg-indigo-50 rounded-lg p-3">
        <div className="flex justify-between text-sm mb-1">
          <span className="font-medium text-gray-700">Interview Readiness</span>
          <span className="text-indigo-600 font-medium">{readiness}%</span>
        </div>
        <div className="w-full h-2 bg-indigo-100 rounded-full">
          <div
            className="h-2 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600"
            style={{ width: `${readiness}%` }}
          ></div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-3 gap-2 mt-4 text-center">
        <div className="bg-gray-50 p-2 rounded-lg">
          <div className="text-xl font-bold text-indigo-600">24</div>
          <div className="text-xs text-gray-600">Practices</div>
        </div>
        <div className="bg-gray-50 p-2 rounded-lg">
          <div className="text-xl font-bold text-indigo-600">8</div>
          <div className="text-xs text-gray-600">Interviews</div>
        </div>
        <div className="bg-gray-50 p-2 rounded-lg">
          <div className="text-xl font-bold text-indigo-600">82%</div>
          <div className="text-xs text-gray-600">Avg. Score</div>
        </div>
      </div>

      {/* Schedule Mock Interview Button */}
      <div className="mt-4">
        <button className="w-full bg-gradient-to-br from-indigo-600 to-purple-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition">
          Schedule Mock Interview
        </button>
      </div>
    </div>
  );
};

export default ProfileCard;
