import Navbar from "../DashboardComponents/Navbar";
import Tabs from "../DashboardComponents/Navigation_Tabs";
import { Upload, FileText, Sparkles } from "lucide-react";
import { useState } from "react";

export default function ResumeUploadPage({ 
  handleFileUpload, 
  uploading, 
  analyzing, 
  onAnalyzeClick,
  jobDescription,
  setJobDescription 
}) {
  const [showAnalysis, setShowAnalysis] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);

  const handleAnalyzeButtonClick = () => {
    setShowAnalysis(true);
    onAnalyzeClick();
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 font-sans overflow-auto">
      {/* Header */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-md">
        <Navbar />
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <Tabs />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-lg transition-all duration-300 flex flex-col justify-center items-center">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 shadow-inner">
              <FileText className="w-8 h-8 text-[#8A2BE2]" />
            </div>
            <h1 className="text-3xl font-extrabold text-gray-800 mb-2">Upload Your Resume</h1>
            <p className="text-gray-500 text-base">AI-powered insights for your next big move!</p>
          </div>

          {/* Job Description Input */}
          <div className="w-full mb-5">
            <label htmlFor="job-description" className="block text-gray-700 font-semibold mb-2">
              Job Description <span className="text-gray-400">(Optional)</span>
            </label>
            <textarea
              id="job-description"
              rows="3"
              placeholder="Paste the job description here..."
              value={jobDescription}
              onChange={(e) => setJobDescription(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#8A2BE2] resize-none transition"
            />
          </div>

          {/* Resume Upload */}
          {!showAnalysis && (
            <>
              <label
                htmlFor="resume-upload"
                className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-[#8A2BE2] transition-all duration-200 cursor-pointer mb-5 w-full bg-gray-50 hover:bg-gray-100"
              >
                <input
                  type="file"
                  id="resume-upload"
                  className="hidden"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => {
                    handleFileUpload(e);
                    setResumeFile(e.target.files[0]);
                  }}
                  disabled={uploading}
                />
                {uploading ? (
                  <div className="flex flex-col items-center gap-2">
                    <div className="relative w-10 h-10">
                      <div className="absolute inset-0 border-4 border-[#8A2BE2] border-t-transparent rounded-full animate-spin"></div>
                    </div>
                    <span className="text-gray-700 text-sm font-semibold">Uploading...</span>
                  </div>
                ) : (
                  <>
                    <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2 shadow-inner">
                      <Upload className="w-6 h-6 text-[#8A2BE2]" />
                    </div>
                    <p className="text-gray-700 text-base font-medium">Click to Upload</p>
                    <p className="text-gray-400 text-xs mt-1">PDF, DOC, DOCX — Max 5MB</p>
                  </>
                )}
              </label>

              {/* Analyse Button */}
              <button
                className="w-full py-3 bg-gradient-to-r from-[#8A2BE2] to-[#6A5ACD] text-white rounded-xl hover:opacity-95 active:scale-95 transition-all shadow-lg font-bold text-sm disabled:opacity-50"
                onClick={handleAnalyzeButtonClick}
                disabled={uploading || !resumeFile}
              >
                {uploading ? "Please Wait..." : "Analyze Resume"}
              </button>
            </>
          )}

          {/* Analysis Section */}
          {showAnalysis && (
            <div className="text-center py-4 animate-fadeIn">
              {analyzing ? (
                <div className="flex flex-col items-center gap-4">
                  <div className="relative w-16 h-16">
                    <div className="absolute inset-0 border-4 border-[#8A2BE2] border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <div className="text-gray-800 font-semibold text-sm">
                    Analyzing your resume...
                    <p className="text-gray-500 text-xs mt-1">Just a moment — we’re working our magic!</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 text-left text-sm mt-4">
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
                      <span className={`${status === false ? "text-gray-500" : "text-gray-700"}`}>
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <div className="mt-6 pt-4 border-t border-gray-200 text-sm w-full">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-purple-100 flex items-center justify-center text-[#8A2BE2] shadow-inner">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-gray-800 font-bold mb-1">AI-Powered Insights</h3>
                <p className="text-gray-500 text-xs">
                  Get personalized recommendations to upgrade your resume for recruiter preferences.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
