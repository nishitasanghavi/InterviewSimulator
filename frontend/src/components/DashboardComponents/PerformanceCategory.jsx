import { Button } from "../../components/ui/button";
import { Progress } from "../../components/ui/progress";

export const PerformanceCard = ({ title, company, date, score }) => {
  return (
    <div className="p-3 border border-gray-100 rounded-lg">
      <div className="flex justify-between">
        <div>
          <h4 className="font-medium">{title}</h4>
          <p className="text-sm text-gray-600">
            {company} • {date}
          </p>
        </div>
        <div
          className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
            score >= 90
              ? "bg-green-100 text-green-700"
              : score >= 75
              ? "bg-indigo-100 text-indigo-700"
              : "bg-amber-100 text-amber-700"
          }`}
        >
          {score}%
        </div>
      </div>
      <div className="mt-2">
        <Progress
          value={score}
          className="h-2 bg-gray-100"
          indicatorClassName={`${
            score >= 90
              ? "bg-green-500"
              : score >= 75
              ? "bg-indigo-500"
              : "bg-amber-500"
          }`}
        />
      </div>
      <div className="mt-3 flex justify-end">
        <Button
          variant="outline"
          size="sm"
          className="text-gray-600 border-gray-200 hover:text-indigo-600 hover:border-indigo-200"
        >
          Review Feedback
        </Button>
      </div>
    </div>
  );
};
export default PerformanceCard;