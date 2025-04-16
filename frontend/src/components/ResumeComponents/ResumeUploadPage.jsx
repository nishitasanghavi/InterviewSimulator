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

  export default function ResumeUploadPage({ handleFileUpload, uploading, analyzing }) {
    return (
      <div className="flex flex-col h-screen bg-gray-50 font-sans">
        {/* Header */}
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md">
          <Navbar />
        </div>
  
        {/* Navigation Tabs */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <Tabs />
        </div>
  
        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md transition-all duration-300">
            <div className="text-center mb-5">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                <FileText className="w-6 h-6 text-[#8A2BE2]" />
              </div>
              <h1 className="text-xl font-bold text-gray-800 mb-1">Upload Your Resume</h1>
              <p className="text-gray-500 text-xs">
                Get AI-driven insights to enhance your chances.
              </p>
            </div>
  
            {analyzing ? (
              <div className="text-center py-6 animate-fadeIn">
                <div className="flex flex-col items-center gap-3">
                  <div className="relative w-14 h-14">
                    <div className="absolute inset-0 border-4 border-[#8A2BE2] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <div className="text-gray-800 font-semibold text-sm">
                    Analyzing Resume...
                    <p className="text-gray-500 text-xs mt-1">Sit tight, this won't take long!</p>
                  </div>
                </div>
  
                <div className="mt-6 space-y-3 text-left text-sm">
                  {[
                    ["Checking formatting", true],
                    ["Scanning for keywords", true],
                    ["Analyzing work experience", "loading"],
                    ["Evaluating skill match", false]
                  ].map(([label, status], index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div className={`w-5 h-5 rounded-full flex items-center justify-center ${
                        status === true ? "bg-green-100 text-green-600" :
                        status === "loading" ? "bg-purple-100 text-[#8A2BE2]" :
                        "bg-gray-100 text-gray-400"
                      }`}>
                        {status === true && "✓"}
                        {status === "loading" && <div className="w-2.5 h-2.5 bg-[#8A2BE2] rounded-full animate-pulse"></div>}
                        {status === false && "⋯"}
                      </div>
                      <span className={`${
                        status === false ? "text-gray-500" : "text-gray-700"
                      }`}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                <label
                  htmlFor="resume-upload"
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-[#8A2BE2] transition cursor-pointer mb-4 block"
                >
                  <input
                    type="file"
                    id="resume-upload"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    disabled={uploading}
                  />
                  {uploading ? (
                    <div className="flex flex-col items-center gap-3">
                      <div className="relative w-10 h-10">
                        <div className="absolute inset-0 border-4 border-[#8A2BE2] border-t-transparent rounded-full animate-spin"></div>
                      </div>
                      <span className="text-gray-700 text-sm font-semibold">Uploading...</span>
                    </div>
                  ) : (
                    <>
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2 shadow-inner">
                        <Upload className="w-5 h-5 text-[#8A2BE2]" />
                      </div>
                      <p className="text-gray-700 text-sm font-medium">Drag & Drop Here</p>
                      <p className="text-gray-400 text-xs mt-1">PDF, DOC, DOCX — Max 5MB</p>
                    </>
                  )}
                </label>
  
                <div className="flex items-center justify-center text-gray-400 mb-4 text-xs">
                  <div className="w-full h-px bg-gray-200"></div>
                  <span className="px-2 bg-white">or</span>
                  <div className="w-full h-px bg-gray-200"></div>
                </div>
  
                <button
                  className="w-full py-2.5 bg-gradient-to-r from-[#8A2BE2] to-[#6A5ACD] text-white rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition shadow font-semibold text-sm disabled:opacity-50"
                  onClick={() => document.getElementById('resume-upload').click()}
                  disabled={uploading}
                >
                  {uploading ? "Processing..." : (
                    <>
                      <FileText className="w-4 h-4" />
                      Browse Files
                    </>
                  )}
                </button>
              </>
            )}
  
            <div className="mt-5 pt-4 border-t border-gray-200 text-sm">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-[#8A2BE2] shadow-inner">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-gray-800 font-semibold mb-1">AI-Powered Analysis</h3>
                  <p className="text-gray-500 text-xs">
                    Get smart recommendations to fine-tune your resume for real-world recruiter expectations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  