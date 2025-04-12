import { useState } from "react";
import { Video, Search, Bell } from "lucide-react";

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="container mx-auto flex justify-between items-center p-4">
      {/* Logo Section */}
      <div className="flex items-center gap-2">
        <div className="bg-white p-2 rounded-md">
          <Video className="w-6 h-6 text-indigo-700" />
        </div>
        <span className="text-xl font-bold">AI Mock Interview</span>
      </div>

      {/* Search Bar */}
      <div className="max-w-md w-full relative hidden md:block">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search for companies, questions..."
          className="w-full py-2 pl-10 pr-4 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600/50 text-white placeholder-indigo-200 focus:outline-none focus:ring-2 focus:ring-white"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Notification & Profile Section */}
      <div className="flex items-center gap-6">
        {/* Notification Bell */}
        <button className="relative p-2 hover:bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full transition">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-xs flex items-center justify-center text-white rounded-full">
            3
          </span>
        </button>

        {/* Profile Section */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white ring-2 ring-white overflow-hidden">
            <img
              src="https://media.istockphoto.com/id/1448167415/photo/smiling-indian-businessman-in-suit-and-glasses-with-laptop-near-office-building.jpg?s=612x612&w=0&k=20&c=vuUgcc-IlZewhnRm7yNOIuEfAvTnyJdMsPbnvkAnZjc="
              alt="Profile"
              className="object-cover h-full w-full"
            />
          </div>
          <div className="hidden md:block">
            <p className="text-sm font-medium">Yash Rawat</p>
            <p className="text-xs text-indigo-200">Software Engineer</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
