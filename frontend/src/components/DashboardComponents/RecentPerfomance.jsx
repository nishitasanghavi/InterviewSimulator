import { Button } from "../../components/ui/button";
import { PerformanceCard } from "./PerformanceCategory";

export const RecentPerformance = ({ performanceItems }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Recent Performance
        </h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-indigo-600 hover:bg-indigo-50"
        >
          View History
        </Button>
      </div>

      <div className="space-y-4">
        {performanceItems.map((item, index) => (
          <PerformanceCard key={index} {...item} />
        ))}
      </div>
    </div>
  );
};