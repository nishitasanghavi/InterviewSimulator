import { Button } from "../../components/ui/button";
import { Video, Code, BarChart, MessageSquare } from "lucide-react";
import { StatCard } from "./StatCard";
import { Progress } from "../../components/ui/progress";
import { ChevronRight } from "lucide-react";

export const InterviewPerformance = () => {
  const stats = [
    {
      title: "Mock Interviews",
      value: "18",
      icon: Video,
      color: "bg-indigo-500",
      trend: "+4",
    },
    {
      title: "Coding Challenges",
      value: "47",
      icon: Code,
      color: "bg-purple-500",
      trend: "+12",
    },
    {
      title: "Avg. Technical Score",
      value: "83%",
      icon: BarChart,
      color: "bg-green-500",
      trend: "+5%",
    },
    {
      title: "Avg. Behavioral Score",
      value: "78%",
      icon: MessageSquare,
      color: "bg-amber-500",
      trend: "+2%",
    },
  ];

  const performanceCategories = [
    { category: "Data Structures & Algorithms", score: 87 },
    { category: "System Design", score: 72 },
    { category: "Behavioral Questions", score: 91 },
    { category: "Database Knowledge", score: 65 },
    { category: "Problem Solving", score: 83 },
  ];

  const areasToImprove = [
    { area: "Database Knowledge", action: "Take SQL practice" },
    { area: "System Design", action: "Review design patterns" },
    { area: "Communication Skills", action: "Practice with AI" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Interview Performance
        </h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="text-gray-600 border-gray-200"
          >
            This Week
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-indigo-600 border-indigo-200 bg-indigo-50"
          >
            This Month
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="text-gray-600 border-gray-200"
          >
            All Time
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-gray-50 p-4 rounded-lg">
          <h4 className="font-medium text-gray-700 mb-4">
            Performance by Category
          </h4>
          <div className="space-y-3">
            {performanceCategories.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between text-sm mb-1">
                  <span>{item.category}</span>
                  <span className="font-medium">{item.score}%</span>
                </div>
                <Progress
                  value={item.score}
                  className="h-2 bg-gray-200"
                  indicatorClassName={`${
                    item.score > 80
                      ? "bg-green-500"
                      : item.score > 70
                      ? "bg-indigo-500"
                      : item.score > 60
                      ? "bg-amber-500"
                      : "bg-red-500"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg flex flex-col justify-between">
          <h4 className="font-medium text-gray-700 mb-4">
            Areas to Improve
          </h4>
          <div className="space-y-3 flex-grow">
            {areasToImprove.map((item, index) => (
              <div
                key={index}
                className="flex gap-3 p-2 bg-white rounded border-l-4 border-amber-500"
              >
                <div className="flex-grow">
                  <p className="font-medium text-gray-800">{item.area}</p>
                  <p className="text-sm text-gray-500">{item.action}</p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-indigo-600"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-4">
            <Button
              variant="outline"
              className="w-full text-indigo-600 border-indigo-200"
            >
              View Detailed Report
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};