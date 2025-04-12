import { useState } from "react";
import {
  Code,
  BarChart,
  Video,
  FileText,
  User,
  Book,
  MessageSquare,
  Code2,
  ChevronRight,
  Mic,
  Monitor,
  Trophy,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Progress } from "../components/ui/progress";
import Navbar from "../components/DashboardComponents/Navbar";
import Tabs from "../components/DashboardComponents/Navigation_Tabs";
import ProfileCard from "../components/DashboardComponents/ProfileCard";
import SkillsAssessment from "../components/DashboardComponents/SkillsAssessment";
import CompanyTargets from "../components/DashboardComponents/CompanyTargets";
import { FeatureCards } from "../components/DashboardComponents/FeaturesCard";
import { InterviewPerformance } from "../components/DashboardComponents/InterviewPeformance";
import { UpcomingInterviews } from "../components/DashboardComponents/UpcomingInterviews";
import { RecentPerformance } from "../components/DashboardComponents/RecentPerfomance";
import { PracticeResources } from "../components/DashboardComponents/PracticeResources";
export default function InterviewSimulatorDashboard() {

  // Sample data
  const skills = [
    { name: "Data Structures", level: 85 },
    { name: "System Design", level: 70 },
    { name: "Problem Solving", level: 90 },
    { name: "Communication", level: 75 },
    { name: "Leadership", level: 80 },
  ];

  const upcomingInterviews = [
    {
      title: "AI-Powered Mock Interview",
      type: "Technical",
      date: "Mar 23, 2025",
      time: "11:00 AM",
    },
    {
      title: "Behavioral Assessment",
      type: "HR",
      date: "Mar 25, 2025",
      time: "2:30 PM",
    },
  ];

  const recentPerformance = [
    {
      title: "System Design Interview",
      score: 78,
      date: "Mar 18, 2025",
      company: "Amazon",
    },
    {
      title: "Data Structures Quiz",
      score: 92,
      date: "Mar 15, 2025",
      company: "Generic",
    },
    {
      title: "Behavioral Assessment",
      score: 85,
      date: "Mar 10, 2025",
      company: "Google",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg">
        <Navbar />
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white shadow">
        <Tabs />
      </div>

      <div className="container mx-auto flex flex-col lg:flex-row gap-6 p-6">
        {/* Left Sidebar */}
        <div className="lg:w-1/4 space-y-6">
          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-sm p-6 text-center">
            <ProfileCard />
          </div>

          {/* Skills Assessment */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <SkillsAssessment />
          </div>

          {/* Company Preferences */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <CompanyTargets />
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4 space-y-6">
      {/* Feature Cards */}
      <FeatureCards />
      
      {/* Stats and Progress */}
      <InterviewPerformance />
      
      {/* Upcoming and Recent Activity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <UpcomingInterviews interviews={upcomingInterviews} />
        <RecentPerformance performanceItems={recentPerformance} />
      </div>
      
      {/* Featured Resources */}
      <PracticeResources />
    </div>
      </div>
    </div>
  );
}
