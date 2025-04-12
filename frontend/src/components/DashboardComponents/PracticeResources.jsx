import { Button } from "../../components/ui/button";
import { Monitor, Book, MessageSquare, Trophy } from "lucide-react";
import { ResourceCard } from "./ResourceCard";

export const PracticeResources = () => {
  const resources = [
    {
      title: "System Design Interview Course",
      category: "Course",
      level: "Advanced",
      icon: Monitor,
    },
    {
      title: "Google Interview Question Bank",
      category: "Questions",
      level: "All Levels",
      icon: Book,
    },
    {
      title: "Behavioral Questions Guide",
      category: "Guide",
      level: "Intermediate",
      icon: MessageSquare,
    },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">
          Practice Resources
        </h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-indigo-600 hover:bg-indigo-50"
        >
          Browse Library
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {resources.map((resource, index) => (
          <ResourceCard key={index} {...resource} />
        ))}
      </div>

      <div className="mt-6 bg-indigo-50 p-4 rounded-lg border border-indigo-100">
        <div className="flex gap-4 items-center">
          <div className="p-3 bg-gradient-to-br from-indigo-600 to-purple-600 rounded-lg text-white">
            <Trophy className="w-6 h-6" />
          </div>
          <div className="flex-grow">
            <h4 className="font-medium text-gray-800">
              Join the Leaderboard Challenge!
            </h4>
            <p className="text-sm text-gray-600 mt-1">
              Complete 5 mock interviews this week and earn a place on our
              global leaderboard.
            </p>
          </div>
          <Button className="bg-gradient-to-br from-indigo-600 to-purple-600 hover:bg-indigo-700 text-white">
            Join Challenge
          </Button>
        </div>
      </div>
    </div>
  );
};