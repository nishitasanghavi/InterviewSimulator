import Navbar from "../DashboardComponents/Navbar";
import Tabs from "../DashboardComponents/Navigation_Tabs";
import {
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  Download,
  ExternalLink,
  Search,
  Share,
  ChevronUp,
  MessageSquare,
  Eye,
  Settings,
  Bell,
  Sparkles,
  ArrowUpRight,
  PieChart,
  BarChart3,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Upload,
  FileText,
  X,
} from "lucide-react";

export default function ResumeAnalytics({ resumeFile, resetUpload }) {
  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans">
      {/* Header - Fixed at top */}
      {/* Navbar */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg">
        <Navbar />
      </div>
      {/* Navigation Tabs */}
      <div className="bg-white shadow">
        <Tabs />
      </div>
      {/* Main Content Area - Takes remaining height */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar - Analytics with its own scroll */}
        <div className="w-1/2 flex flex-col h-full border-r border-gray-200">
          {/* Analytics Header - Fixed */}
          <div className="flex items-center justify-between p-6 bg-gray-50">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 flex items-center justify-center bg-purple-100 rounded-xl text-[#8A2BE2] text-lg">
                📊
              </span>
              <h1 className="text-2xl font-bold text-gray-800">
                Resume Analytics
              </h1>
            </div>
            <div className="flex gap-2">
              <button
                className="text-sm bg-white border border-gray-200 text-gray-700 hover:border-[#8A2BE2] hover:text-[#8A2BE2] px-3 py-1.5 rounded-lg flex items-center gap-2 transition shadow-sm"
                onClick={resetUpload}
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Upload New</span>
              </button>
              <button className="text-sm bg-gradient-to-r from-[#8A2BE2] to-[#6A5ACD] text-white px-3 py-1.5 rounded-lg flex items-center gap-2 transition shadow-sm hover:opacity-90">
                <Sparkles className="w-4 h-4" />
                <span>AI Improve</span>
              </button>
            </div>
          </div>

          {/* Analytics Content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-6 pt-0">
            {/* Score Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 hover:shadow-md transition">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold mb-1 text-gray-800">
                    Resume Score
                  </h2>
                  <p className="text-gray-500 text-sm">
                    Based on industry standards and best practices
                  </p>
                </div>
                <div className="flex items-center px-3 py-1 bg-green-50 text-green-600 rounded-full text-sm">
                  <TrendingUp className="w-3.5 h-3.5 mr-1" />
                  <span>+2 pts</span>
                </div>
              </div>

              <div className="flex justify-between items-end mb-4">
                <div className="flex items-center">
                  <div className="relative w-32 h-32">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-5xl font-bold text-[#8A2BE2]">
                          94
                        </span>
                        <span className="text-gray-400 text-lg">/100</span>
                      </div>
                    </div>
                    {/* SVG circle progress bar would go here in a real implementation */}
                    <div className="rounded-full border-8 border-purple-100 w-full h-full"></div>
                    <div className="absolute top-0 left-0 rounded-full border-8 border-t-[#8A2BE2] border-r-[#8A2BE2] border-b-[#8A2BE2] border-l-transparent w-full h-full transform rotate-[45deg]"></div>
                  </div>
                  <div className="ml-6">
                    <p className="text-gray-700 font-medium mb-2">
                      Excellent progress!
                    </p>
                    <p className="text-gray-600 text-sm mb-3">
                      Your resume outperforms 92% of other candidates in your
                      field.
                    </p>
                    <button className="text-[#8A2BE2] text-sm font-medium flex items-center hover:underline">
                      See detailed comparison
                      <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-between mb-1 mt-4">
                {["Poor", "Average", "Good", "Great", "Excellent"].map(
                  (label, i) => (
                    <div key={i} className="flex flex-col items-center">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          i <= 3 ? "bg-[#8A2BE2]" : "bg-gray-300"
                        }`}
                      ></div>
                      <span
                        className={`text-xs mt-1 ${
                          i <= 3 ? "text-gray-700 font-medium" : "text-gray-400"
                        }`}
                      >
                        {label}
                      </span>
                    </div>
                  )
                )}
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full">
                <div className="w-[94%] h-2 bg-gradient-to-r from-[#8A2BE2] to-[#6A5ACD] rounded-full"></div>
              </div>
            </div>

            {/* Analytics Grid */}
            <div className="grid grid-cols-2 gap-5 mb-6">
              {/* Strength Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <h2 className="text-lg font-bold text-gray-800">
                      Strengths
                    </h2>
                  </div>
                  <span className="text-green-600 flex items-center text-xs px-2 py-1 bg-green-50 rounded-full">
                    <ChevronUp className="w-3 h-3 mr-1" />
                    Strong
                  </span>
                </div>
                <ul className="space-y-3 mt-4">
                  {[
                    "Quantifiable achievements",
                    "Skills match job description",
                    "Professional formatting",
                    "Contact details complete",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm">
                      <div className="w-5 h-5 rounded-full bg-green-100 flex items-center justify-center text-green-600 text-xs">
                        ✓
                      </div>
                      <span className="text-gray-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Areas to Improve Card */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-amber-500" />
                    <h2 className="text-lg font-bold text-gray-800">
                      Improvements
                    </h2>
                  </div>
                  <button className="text-[#8A2BE2] text-xs font-medium hover:underline bg-purple-50 px-2 py-1 rounded-lg">
                    Fix All
                  </button>
                </div>
                <ul className="space-y-3 mt-4">
                  {[
                    "Add more industry keywords",
                    "Reduce passive language",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-sm">
                      <div className="w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 text-xs">
                        !
                      </div>
                      <span className="text-gray-700 font-medium">{item}</span>
                    </li>
                  ))}
                  <li className="pt-2">
                    <button className="w-full py-2 border border-dashed border-gray-300 rounded-lg text-center text-gray-500 text-sm hover:border-[#8A2BE2] hover:text-[#8A2BE2] transition">
                      + Add custom improvement
                    </button>
                  </li>
                </ul>
              </div>
            </div>

            {/* Insights Section */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                  <PieChart className="w-5 h-5 text-[#8A2BE2]" />
                  Resume Insights
                </h2>
                <div className="flex gap-2">
                  <button className="px-3 py-1 bg-white border border-gray-200 rounded-lg text-sm text-gray-700 hover:border-[#8A2BE2] hover:text-[#8A2BE2] transition">
                    Weekly
                  </button>
                  <button className="px-3 py-1 bg-[#8A2BE2] text-white rounded-lg text-sm">
                    Monthly
                  </button>
                </div>
              </div>
            </div>

            {/* Repetitive verbs */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 mb-6 hover:shadow-md transition">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <BarChart3 className="w-5 h-5 text-[#8A2BE2]" />
                  <h2 className="text-lg font-bold text-gray-800">
                    Word Usage Analysis
                  </h2>
                </div>
                <span className="text-xs px-2.5 py-1 bg-purple-100 text-[#8A2BE2] rounded-full font-medium">
                  Premium
                </span>
              </div>
              <p className="text-gray-600 text-sm mb-4">
                Consider introducing more variety to your action verbs for
                stronger impact.
              </p>
              <div className="space-y-4">
                {[
                  {
                    verb: "Developed",
                    width: "w-1/2",
                    count: 4,
                    alternatives: ["Created", "Built", "Established"],
                  },
                  {
                    verb: "Brought",
                    width: "w-1/3",
                    count: 2,
                    alternatives: ["Delivered", "Introduced", "Implemented"],
                  },
                  {
                    verb: "Focused",
                    width: "w-1/3",
                    count: 2,
                    alternatives: [
                      "Concentrated",
                      "Specialized",
                      "Prioritized",
                    ],
                  },
                  {
                    verb: "Applied",
                    width: "w-1/3",
                    count: 2,
                    alternatives: ["Utilized", "Employed", "Leveraged"],
                  },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex items-center mb-1">
                      <span className="font-medium w-20 text-sm text-gray-700">
                        {item.verb}
                      </span>
                      <div className="flex-1 h-2.5 bg-gray-200 rounded-full mx-2">
                        <div
                          className={`${item.width} h-2.5 bg-gradient-to-r from-[#8A2BE2] to-[#6A5ACD] rounded-full`}
                        ></div>
                      </div>
                      <span className="text-gray-600 w-24 text-right text-xs font-medium">
                        {item.count} times
                      </span>
                    </div>
                    <div className="pl-20 text-xs text-gray-500">
                      Try instead: {item.alternatives.join(", ")}
                    </div>
                  </div>
                ))}
              </div>
              <button className="flex items-center text-[#8A2BE2] mt-4 text-sm font-medium hover:underline">
                View all verbs
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>

            {/* Keywords Match */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition mb-6">
              <div className="flex justify-between items-center mb-3">
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#8A2BE2]" />
                  <h2 className="text-lg font-bold text-gray-800">
                    Keywords Match
                  </h2>
                </div>
                <span className="text-xs px-2.5 py-1 bg-purple-100 text-[#8A2BE2] rounded-full font-medium">
                  Premium
                </span>
              </div>
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-600 text-sm">
                    Your resume matches 85% of the job description keywords.
                  </p>
                  <span className="text-lg font-bold text-[#8A2BE2]">85%</span>
                </div>
                <div className="w-full h-2.5 bg-gray-200 rounded-full">
                  <div className="w-[85%] h-2.5 bg-gradient-to-r from-[#8A2BE2] to-[#6A5ACD] rounded-full"></div>
                </div>
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Matching keywords:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {[
                    "Project Management",
                    "Agile",
                    "Customer Experience",
                    "UI/UX",
                    "Product Strategy",
                    "Design Systems",
                  ].map((keyword, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 bg-green-50 text-green-700 rounded-full text-xs font-medium border border-green-100"
                    >
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <h3 className="text-sm font-medium text-gray-700 mb-2">
                  Missing keywords:
                </h3>
                <div className="flex flex-wrap gap-2">
                  {["SaaS Experience", "Remote Team Management"].map(
                    (keyword, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-red-50 text-red-700 rounded-full text-xs font-medium border border-red-100"
                      >
                        {keyword}
                      </span>
                    )
                  )}
                </div>
              </div>
              <button className="flex items-center text-white text-sm font-medium bg-[#8A2BE2] px-4 py-2 rounded-lg hover:bg-[#7B68EE] transition w-full justify-center mt-2">
                Scan for job match
                <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </button>
            </div>
          </div>
        </div>

        {/* Resume Preview - Right Side with its own scroll */}
        <div className="flex-1 flex flex-col h-full bg-gray-100">
          {/* Resume Preview Header - Fixed */}
          <div className="flex justify-between items-center p-4 bg-gray-100">
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <Eye className="w-5 h-5 text-[#8A2BE2]" />
              Resume Preview
            </h2>
          </div>

          {/* Resume Preview Content - Scrollable */}
          <div className="flex-1 overflow-y-auto p-2 pt-0">
            {/* PDF Preview Container */}
            <iframe
              src={`${URL.createObjectURL(resumeFile)}#view=FitH`}
              title="Resume Preview"
              className="rounded-xl border border-gray-200 w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}