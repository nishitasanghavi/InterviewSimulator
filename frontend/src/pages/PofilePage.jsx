import { useState } from "react";
import {
  Bell,
  FileText,
  Upload,
  Search,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <div>
        {/* Full-width Navbar */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-4 flex justify-between items-center w-full shadow-md">
          <div className="flex space-x-6">
            {["Dashboard", "Projects", "POCs", "Diagrams", "Podcasts", "Blogs"].map((tab) => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-md transition ${
                  activeTab === tab ? "bg-white text-indigo-600 font-semibold shadow-md" : "hover:bg-indigo-700"
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <button className="relative">
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-xs flex items-center justify-center text-white rounded-full">
                1
              </span>
            </button>
            <div className="w-10 h-10 rounded-full bg-white overflow-hidden">
              <img src="https://media.istockphoto.com/id/1355110818/photo/studio-shot-of-a-handsome-and-happy-young-man-posing-against-a-grey-background.jpg?s=612x612&w=0&k=20&c=T39jUOOjC8H-Op0cfd-uiNXk1a2XBn1sXkQbKIWwY7E=" alt="Profile" className="object-cover" />
            </div>
          </div>
        </div>
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-[250px] bg-white shadow-md flex flex-col">
       
        {/* Candidate Experience */}
        <div className="p-6 border-b">
          <h3 className="text-lg font-medium text-indigo-700 mb-3">
            Candidate Experience
          </h3>
          <div className="space-y-4">
            {[
              { role: "Software Engineer", company: "Geek", duration: "8 yrs" },
              { role: "Software Engineer", company: "Infive", duration: "2 yrs" },
              { role: "Backend Developer", company: "Internship", duration: "7 mos" },
            ].map((job, index) => (
              <div key={index} className="flex gap-3 items-center">
                <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600 text-lg font-bold">
                  {job.company[0]}
                </div>
                <div>
                  <div className="text-sm font-semibold">{job.role}</div>
                  <div className="text-xs text-gray-500">{job.company}</div>
                  <div className="text-xs text-gray-400">{job.duration}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="p-6 border-b">
          <h3 className="text-lg font-medium text-indigo-700 mb-3">
            Social Links
          </h3>
          <div className="grid grid-cols-4 gap-2">
            {["in", "Y", "G", "M", "Y", "S", "G"].map((icon, index) => (
              <div
                key={index}
                className="w-10 h-10 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-lg"
              >
                {icon}
              </div>
            ))}
          </div>
        </div>

        {/* Smart Match */}
        <div className="p-6">
          <h3 className="text-lg font-medium text-indigo-700 mb-3">Smart Match</h3>
          <div className="flex justify-center">
            <div className="w-24 h-24 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full flex items-center justify-center text-white text-2xl font-bold shadow-lg">
              90%
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">

        {/* Profile Section */}
        <div className="p-6 bg-gray-50">
  <div className="bg-white rounded-lg shadow p-6 flex items-center">
    <div className="w-24 h-24 rounded-full overflow-hidden mr-6">
      <img
        src="https://media.istockphoto.com/id/1355110818/photo/studio-shot-of-a-handsome-and-happy-young-man-posing-against-a-grey-background.jpg?s=612x612&w=0&k=20&c=T39jUOOjC8H-Op0cfd-uiNXk1a2XBn1sXkQbKIWwY7E="
        alt="Profile"
        className="object-cover"
      />
    </div>
    <div>
      <Badge className="bg-gradient-to-br from-green-600 to-blue-600 text-white">Available</Badge>
      <h2 className="text-2xl font-bold mt-1">Yash Rawat</h2>
      <p className="text-gray-600">Cloud Developer at AWS</p>
      <p className="text-gray-500 mt-1">Experience: 3+ years</p>
      <p className="text-gray-500">Skills: AWS, Kubernetes, Docker, Terraform, Python</p>
      <p className="text-gray-500">Location: Bangalore, India</p>
      <div className="flex space-x-3 mt-3">
        <a href="https://linkedin.com/in/yashrawat" className="text-blue-600 hover:underline">LinkedIn</a>
        <a href="https://github.com/yashrawat" className="text-gray-700 hover:underline">GitHub</a>
        <a href="mailto:yashrawat@example.com" className="text-red-600 hover:underline">Email</a>
      </div>
    </div>
  </div>
</div>


        {/* Resume Section */}
        <div className="p-6 grid grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Resume Upload</h3>
            <div className="border-2 border-dashed border-gray-300 p-6 rounded-lg text-center">
              <Upload className="w-8 h-8 text-indigo-600 mx-auto" />
              <p className="mt-2 text-gray-600">Drag and drop files here</p>
              <p className="text-sm text-gray-400">Supported: PDF, DOCX</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-xl font-semibold mb-4">Resume Files</h3>
            <div className="space-y-4">
              {[2022, 2021, 2020].map((year) => (
                <div key={year} className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm">
                  <div className="flex gap-4 items-center">
                    <FileText className="w-6 h-6 text-indigo-600" />
                    <span className="font-medium">Resume {year}</span>
                  </div>
                  <Button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded">
                    Download
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
  );
}
