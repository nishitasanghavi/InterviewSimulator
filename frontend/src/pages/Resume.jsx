import { useState } from "react";
import axios from "axios";
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
import ResumeUploadPage from "../components/ResumeComponents/ResumeUploadPage";
import ResumeAnalytics from "../components/ResumeComponents/ResumeAnalytics";

export default function ResumeAnalyticsFlow() {
  const [uploadedResume, setUploadedResume] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [jobDescription, setJobDescription] = useState("");
  const [response, setresponse] = useState("");

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "application/pdf" || file.type.includes("document"))) {
      setUploading(true);
      
      // Simulate upload process
      setTimeout(() => {
        setUploadedResume(file);
        setUploading(false);
      }, 1500);
    } else {
      alert("Please upload a PDF or document file");
    }
  };

  // Handle analyze button click
  const handleAnalyzeClick = async () => {
    setAnalyzing(true);
    
    try {
      // Create form data for API call
      const formData = new FormData();
      formData.append('resume', uploadedResume);
      formData.append('job_description', jobDescription);
      
      // Make API call to Flask backend
      const temp = await axios.post('http://127.0.0.1:5000/score', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      setresponse(temp.data);
      console.log("API response:", temp.data);
      
      // After successful API call, show analytics
      setAnalyzing(false);
      setShowAnalytics(true);
    } catch (error) {
      console.error("Error analyzing resume:", error);
      setAnalyzing(false);
      alert("There was an error analyzing your resume. Please try again.");
    }
  };

  // Reset upload
  const resetUpload = () => {
    setUploadedResume(null);
    setShowAnalytics(false);
    setJobDescription("");
  };

  // If showing analytics page
  if (showAnalytics) {
    return <ResumeAnalytics resumeFile={uploadedResume} resetUpload={resetUpload} response = {response} />;
  }

  // Otherwise show upload page
  return (
    <ResumeUploadPage
      handleFileUpload={handleFileUpload}
      uploading={uploading}
      analyzing={analyzing}
      onAnalyzeClick={handleAnalyzeClick}
      jobDescription={jobDescription}
      setJobDescription={setJobDescription}
    />
  );
}