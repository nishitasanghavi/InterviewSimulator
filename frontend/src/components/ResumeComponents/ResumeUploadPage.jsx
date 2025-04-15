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
        <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg">
          <Navbar />
        </div>
        
        {/* Navigation Tabs */}
        <div className="bg-white shadow">
          <Tabs />
        </div>
        
        {/* Main Content */}
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="w-8 h-8 text-[#8A2BE2]" />
              </div>
              <h1 className="text-2xl font-bold text-gray-800 mb-2">Upload Your Resume</h1>
              <p className="text-gray-600">
                Upload your resume to get detailed insights and analytics to improve your job prospects
              </p>
            </div>
            
            {analyzing ? (
              <div className="text-center py-12">
                <div className="flex flex-col items-center justify-center gap-4">
                  <div className="relative w-20 h-20">
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-[#8A2BE2] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <div className="text-gray-800 font-medium">
                    <h3 className="text-xl mb-2">Analyzing Your Resume</h3>
                    <p className="text-gray-600">Please wait while we scan and evaluate your resume</p>
                  </div>
                </div>
                
                <div className="mt-8">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600">✓</div>
                      <span className="text-gray-700">Checking formatting</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center text-green-600">✓</div>
                      <span className="text-gray-700">Scanning for keywords</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-purple-100 rounded-full flex items-center justify-center text-[#8A2BE2]">
                        <div className="w-3 h-3 bg-[#8A2BE2] rounded-full animate-pulse"></div>
                      </div>
                      <span className="text-gray-700">Analyzing work experience</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 bg-gray-100 rounded-full flex items-center justify-center text-gray-400">⋯</div>
                      <span className="text-gray-500">Evaluating skill match</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 mb-6 text-center hover:border-[#8A2BE2] transition cursor-pointer">
                  <input
                    type="file"
                    id="resume-upload"
                    className="hidden"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    disabled={uploading}
                  />
                  <label htmlFor="resume-upload" className="cursor-pointer">
                    {uploading ? (
                      <div className="flex flex-col items-center justify-center gap-4">
                        <div className="relative w-12 h-12">
                          <div className="absolute top-0 left-0 w-full h-full border-4 border-[#8A2BE2] border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <span className="text-gray-700 font-medium">Uploading resume...</span>
                      </div>
                    ) : (
                      <>
                        <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center mx-auto mb-4">
                          <Upload className="w-6 h-6 text-[#8A2BE2]" />
                        </div>
                        <p className="text-gray-700 font-medium mb-2">
                          Drag and drop your resume here
                        </p>
                        <p className="text-gray-500 text-sm">
                          Supports PDF, DOC, or DOCX up to 5MB
                        </p>
                      </>
                    )}
                  </label>
                </div>
                
                <div className="flex items-center justify-center text-gray-500 mb-6">
                  <div className="w-full h-px bg-gray-200"></div>
                  <span className="px-4 text-sm bg-white">or</span>
                  <div className="w-full h-px bg-gray-200"></div>
                </div>
                
                <div>
                  <button
                    className="w-full py-3 px-6 bg-gradient-to-r from-[#8A2BE2] to-[#6A5ACD] text-white rounded-lg flex items-center justify-center gap-2 hover:opacity-90 transition shadow-md font-medium disabled:opacity-50"
                    onClick={() => document.getElementById('resume-upload').click()}
                    disabled={uploading}
                  >
                    {uploading ? (
                      <>Processing...</>
                    ) : (
                      <>
                        <FileText className="w-5 h-5" />
                        Browse Files
                      </>
                    )}
                  </button>
                </div>
              </>
            )}
            
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full flex items-center justify-center bg-purple-100 text-[#8A2BE2] flex-shrink-0">
                  <Sparkles className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-gray-800 font-medium mb-1">AI-Powered Analysis</h3>
                  <p className="text-gray-600 text-sm">
                    Our AI analyzes your resume against industry standards and provides tailored recommendations to help your application stand out.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }