import { useState } from "react";
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

  // Handle file upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file && (file.type === "application/pdf" || file.type.includes("document"))) {
      setUploading(true);
      
      // Simulate upload process
      setTimeout(() => {
        setUploadedResume(file);
        setUploading(false);
        
        // Simulate analysis process
        setAnalyzing(true);
        setTimeout(() => {
          setAnalyzing(false);
        }, 2000);
      }, 1500);
    } else {
      alert("Please upload a PDF or document file");
    }
  };

  // Reset upload
  const resetUpload = () => {
    setUploadedResume(null);
  };

  // If no resume uploaded yet, show upload screen
  if (!uploadedResume || analyzing) {
    return <ResumeUploadPage
      handleFileUpload={handleFileUpload} 
      uploading={uploading} 
      analyzing={analyzing}
    />;
  }

  // If resume is uploaded and analyzed, show analytics
  return <ResumeAnalytics resumeFile={uploadedResume} resetUpload={resetUpload} />;
}


