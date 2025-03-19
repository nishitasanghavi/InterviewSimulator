import { useState } from "react";
import {
  Bell,
  Calendar,
  Award,
  Briefcase,
  Code,
  BarChart,
  Video,
  FileText,
  User,
  Book,
  MessageSquare,
  CheckCircle,
  Pen,
  Code2,
  Search,
  ChevronRight,
  PieChart,
  Mic,
  Monitor,
  Trophy,
  Settings,
  Activity
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";

export default function InterviewSimulatorDashboard() {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [searchQuery, setSearchQuery] = useState("");

  // Sample data
  const skills = [
    { name: "Data Structures", level: 85 },
    { name: "System Design", level: 70 },
    { name: "Problem Solving", level: 90 },
    { name: "Communication", level: 75 },
    { name: "Leadership", level: 80 }
  ];

  const upcomingInterviews = [
    { title: "AI-Powered Mock Interview", type: "Technical", date: "Mar 23, 2025", time: "11:00 AM" },
    { title: "Behavioral Assessment", type: "HR", date: "Mar 25, 2025", time: "2:30 PM" }
  ];
  
  const recentPerformance = [
    { title: "System Design Interview", score: 78, date: "Mar 18, 2025", company: "Amazon" },
    { title: "Data Structures Quiz", score: 92, date: "Mar 15, 2025", company: "Generic" },
    { title: "Behavioral Assessment", score: 85, date: "Mar 10, 2025", company: "Google" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg">
        <div className="container mx-auto flex justify-between items-center p-4">
          <div className="flex items-center gap-2">
            <div className="bg-white p-2 rounded-md">
              <Video className="w-6 h-6 text-indigo-700" />
            </div>
            <span className="text-xl font-bold">InterviewPro</span>
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
          
          <div className="flex items-center gap-6">
            <button className="relative p-2 hover:bg-gradient-to-br from-indigo-600 to-purple-600 rounded-full transition">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-xs flex items-center justify-center text-white rounded-full">
                3
              </span>
            </button>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white ring-2 ring-white overflow-hidden">
                <img src="https://media.istockphoto.com/id/1448167415/photo/smiling-indian-businessman-in-suit-and-glasses-with-laptop-near-office-building.jpg?s=612x612&w=0&k=20&c=vuUgcc-IlZewhnRm7yNOIuEfAvTnyJdMsPbnvkAnZjc=" alt="Profile" className="object-cover h-full w-full" />
              </div>
              <div className="hidden md:block">
                <p className="text-sm font-medium">Yash Rawat</p>
                <p className="text-xs text-indigo-200">Software Engineer</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow">
        <div className="container mx-auto">
          <div className="flex items-center overflow-x-auto">
            {["Dashboard", "Interviews", "Practice", "Resume", "Community", "Leaderboard"].map((tab) => (
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
      </div>

      <div className="container mx-auto flex flex-col lg:flex-row gap-6 p-6">
        {/* Left Sidebar */}
        <div className="lg:w-1/4 space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <div className="w-20 h-20 mx-auto relative">
              <div className="w-full h-full rounded-full overflow-hidden ring-4 ring-indigo-100">
                <img 
                  src="https://media.istockphoto.com/id/1448167415/photo/smiling-indian-businessman-in-suit-and-glasses-with-laptop-near-office-building.jpg?s=612x612&w=0&k=20&c=vuUgcc-IlZewhnRm7yNOIuEfAvTnyJdMsPbnvkAnZjc=" 
                  alt="Profile" 
                  className="object-cover w-full h-full" 
                />
              </div>
              <span className="absolute bottom-0 right-0 bg-green-500 p-1 rounded-full border-2 border-white">
                <CheckCircle className="w-3 h-3 text-white" />
              </span>
            </div>
            <h2 className="text-xl font-bold mt-2">Yash Rawat</h2>
            <p className="text-gray-600">Software Engineer</p>
            
            <div className="mt-3 bg-indigo-50 rounded-lg p-3">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">Interview Readiness</span>
                <span className="text-indigo-600 font-medium">75%</span>
              </div>
              <Progress value={75} className="h-2 bg-indigo-100" indicatorClassName="bg-gradient-to-br from-indigo-600 to-purple-600" />
            </div>
            
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
            
            <div className="mt-4">
              <Button className="w-full bg-gradient-to-br from-indigo-600 to-purple-600 hover:bg-indigo-700 text-white">
                Schedule Mock Interview
              </Button>
            </div>
          </div>
          
          {/* Skills Assessment */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Skills Assessment
              </h3>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-indigo-600">
                <Activity className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium">{skill.name}</span>
                    <span className="text-gray-500">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2 bg-gray-100" indicatorClassName="bg-gradient-to-br from-indigo-600 to-purple-600" />
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" className="w-full border-indigo-200 text-indigo-600 hover:bg-indigo-50">
                Take Skill Assessment
              </Button>
            </div>
          </div>
          
          {/* Company Preferences */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Company Targets
              </h3>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-indigo-600">
                <Pen className="w-4 h-4" />
              </Button>
            </div>
            <div className="space-y-3">
              {["Google", "Amazon", "Microsoft", "Meta"].map((company, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                      {company[0]}
                    </div>
                    <span className="font-medium">{company}</span>
                  </div>
                  <div className="text-sm font-medium text-indigo-600">
                    {70 + index * 5}% Ready
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <Button variant="outline" className="w-full border-dashed border-gray-300 text-gray-600 hover:border-indigo-300 hover:text-indigo-600">
                Add Company
              </Button>
            </div>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="lg:w-3/4 space-y-6">
          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">AI-Powered Interviews</h3>
                  <p className="text-indigo-100 text-sm mt-1">Practice with our AI interviewer</p>
                </div>
                <div className="p-3 bg-white/20 rounded-lg">
                  <Mic className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="mt-6">
                <Button className="bg-white text-indigo-600 hover:bg-indigo-50 w-full">
                  Start Interview
                </Button>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">Code Challenges</h3>
                  <p className="text-indigo-100 text-sm mt-1">Interactive coding environment</p>
                </div>
                <div className="p-3 bg-white/20 rounded-lg">
                  <Code2 className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="mt-6">
                <Button className="bg-white text-indigo-600 hover:bg-indigo-50 w-full">
                  Solve Problems
                </Button>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-6 rounded-xl shadow-sm">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-lg font-semibold">Resume Analysis</h3>
                  <p className="text-green-100 text-sm mt-1">AI feedback on your resume</p>
                </div>
                <div className="p-3 bg-white/20 rounded-lg">
                  <FileText className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="mt-6">
                <Button className="bg-white text-green-600 hover:bg-green-50 w-full">
                  Upload Resume
                </Button>
              </div>
            </div>
          </div>
          
          {/* Stats and Progress */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Interview Performance
              </h3>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" className="text-gray-600 border-gray-200">
                  This Week
                </Button>
                <Button variant="outline" size="sm" className="text-indigo-600 border-indigo-200 bg-indigo-50">
                  This Month
                </Button>
                <Button variant="outline" size="sm" className="text-gray-600 border-gray-200">
                  All Time
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
              {[
                { title: "Mock Interviews", value: "18", icon: Video, color: "bg-indigo-500", trend: "+4" },
                { title: "Coding Challenges", value: "47", icon: Code, color: "bg-purple-500", trend: "+12" },
                { title: "Avg. Technical Score", value: "83%", icon: BarChart, color: "bg-green-500", trend: "+5%" },
                { title: "Avg. Behavioral Score", value: "78%", icon: MessageSquare, color: "bg-amber-500", trend: "+2%" }
              ].map((stat, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-sm text-gray-500">{stat.title}</p>
                      <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                    <div className={`${stat.color} p-2 rounded-lg`}>
                      <stat.icon className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <div className="mt-3 flex items-center text-sm">
                    <span className="text-green-500 font-medium">{stat.trend}</span>
                    <span className="text-gray-500 ml-1">this month</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium text-gray-700 mb-4">Performance by Category</h4>
                <div className="space-y-3">
                  {[
                    { category: "Data Structures & Algorithms", score: 87 },
                    { category: "System Design", score: 72 },
                    { category: "Behavioral Questions", score: 91 },
                    { category: "Database Knowledge", score: 65 },
                    { category: "Problem Solving", score: 83 }
                  ].map((item, index) => (
                    <div key={index}>
                      <div className="flex justify-between text-sm mb-1">
                        <span>{item.category}</span>
                        <span className="font-medium">{item.score}%</span>
                      </div>
                      <Progress 
                        value={item.score} 
                        className="h-2 bg-gray-200" 
                        indicatorClassName={`${
                          item.score > 80 ? "bg-green-500" : 
                          item.score > 70 ? "bg-indigo-500" : 
                          item.score > 60 ? "bg-amber-500" : "bg-red-500"
                        }`} 
                      />
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg flex flex-col justify-between">
                <h4 className="font-medium text-gray-700 mb-4">Areas to Improve</h4>
                <div className="space-y-3 flex-grow">
                  {[
                    { area: "Database Knowledge", action: "Take SQL practice" },
                    { area: "System Design", action: "Review design patterns" },
                    { area: "Communication Skills", action: "Practice with AI" }
                  ].map((item, index) => (
                    <div key={index} className="flex gap-3 p-2 bg-white rounded border-l-4 border-amber-500">
                      <div className="flex-grow">
                        <p className="font-medium text-gray-800">{item.area}</p>
                        <p className="text-sm text-gray-500">{item.action}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="text-indigo-600">
                        <ChevronRight className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Button variant="outline" className="w-full text-indigo-600 border-indigo-200">
                    View Detailed Report
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Upcoming and Recent Activity */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Upcoming Interviews */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Upcoming Interviews
                </h3>
                <Button variant="ghost" size="sm" className="text-indigo-600 hover:bg-indigo-50">
                  View All
                </Button>
              </div>
              
              <div className="space-y-4">
                {upcomingInterviews.map((interview, index) => (
                  <div key={index} className="flex gap-4 p-3 border border-gray-100 rounded-lg hover:bg-indigo-50 transition">
                    <div className="w-12 h-12 bg-indigo-100 text-indigo-700 flex flex-col items-center justify-center rounded-md">
                      <span className="text-xs font-medium">{interview.date.split(", ")[0].split(" ")[0]}</span>
                      <span className="text-lg font-bold">{interview.date.split(", ")[0].split(" ")[1]}</span>
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <h4 className="font-medium">{interview.title}</h4>
                        <Badge className={interview.type === "Technical" ? "bg-purple-100 text-purple-800" : "bg-green-100 text-green-800"}>
                          {interview.type}
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 mt-1">{interview.date} • {interview.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-4">
                <Button className="w-full bg-gradient-to-br from-indigo-600 to-purple-600 hover:bg-indigo-700 text-white">
                  Schedule New Interview
                </Button>
              </div>
            </div>
            
            {/* Recent Performance */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  Recent Performance
                </h3>
                <Button variant="ghost" size="sm" className="text-indigo-600 hover:bg-indigo-50">
                  View History
                </Button>
              </div>
              
              <div className="space-y-4">
                {recentPerformance.map((item, index) => (
                  <div key={index} className="p-3 border border-gray-100 rounded-lg">
                    <div className="flex justify-between">
                      <div>
                        <h4 className="font-medium">{item.title}</h4>
                        <p className="text-sm text-gray-600">{item.company} • {item.date}</p>
                      </div>
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                        item.score >= 90 ? "bg-green-100 text-green-700" :
                        item.score >= 75 ? "bg-indigo-100 text-indigo-700" :
                        "bg-amber-100 text-amber-700"
                      }`}>
                        {item.score}%
                      </div>
                    </div>
                    <div className="mt-2">
                      <Progress 
                        value={item.score} 
                        className="h-2 bg-gray-100" 
                        indicatorClassName={`${
                          item.score >= 90 ? "bg-green-500" :
                          item.score >= 75 ? "bg-indigo-500" :
                          "bg-amber-500"
                        }`} 
                      />
                    </div>
                    <div className="mt-3 flex justify-end">
                      <Button variant="outline" size="sm" className="text-gray-600 border-gray-200 hover:text-indigo-600 hover:border-indigo-200">
                        Review Feedback
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Featured Resources */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-lg font-semibold text-gray-800">
                Practice Resources
              </h3>
              <Button variant="ghost" size="sm" className="text-indigo-600 hover:bg-indigo-50">
                Browse Library
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { title: "System Design Interview Course", category: "Course", level: "Advanced", icon: Monitor },
                { title: "Google Interview Question Bank", category: "Questions", level: "All Levels", icon: Book },
                { title: "Behavioral Questions Guide", category: "Guide", level: "Intermediate", icon: MessageSquare }
              ].map((resource, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:shadow-md transition">
                  <div className="flex gap-3 items-start">
                    <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
                      <resource.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="font-medium">{resource.title}</h4>
                      <div className="flex gap-2 mt-1">
                        <Badge className="bg-gray-100 text-gray-800">{resource.category}</Badge>
                        <Badge className="bg-indigo-100 text-indigo-800">{resource.level}</Badge>
                      </div>
                    </div>
                  </div>
                  <Button className="w-full mt-4 bg-gray-100 text-gray-700 hover:bg-gray-200">
                    Start Practice
                  </Button>
                </div>
              ))}
            </div>
            
            <div className="mt-6 bg-indigo-50 p-4 rounded-lg border border-indigo-100">
              <div className="flex gap-4 items-center">
                <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg text-white">
                  <Trophy className="w-6 h-6" />
                </div>
                <div className="flex-grow">
                  <h4 className="font-medium text-gray-800">Join the Leaderboard Challenge!</h4>
                  <p className="text-sm text-gray-600 mt-1">Complete 5 mock interviews this week and earn a place on our global leaderboard.</p>
                </div>
                <Button className="bg-gradient-to-br from-indigo-600 to-purple-600 hover:bg-indigo-700 text-white">
                  Join Challenge
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}