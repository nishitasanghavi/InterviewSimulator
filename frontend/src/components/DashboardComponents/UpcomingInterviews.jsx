import { Button } from "../../components/ui/button";
import { UpcomingInterviewCard } from "./UpcomingInterviewCard";

export const UpcomingInterviews = ({ interviews }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Upcoming Interviews
        </h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-indigo-600 hover:bg-indigo-50"
        >
          View All
        </Button>
      </div>

      <div className="space-y-4">
        {interviews.map((interview, index) => (
          <UpcomingInterviewCard key={index} {...interview} />
        ))}
      </div>

      <div className="mt-4">
        <Button className="w-full bg-gradient-to-br from-indigo-600 to-purple-600 hover:bg-indigo-700 text-white">
          Schedule New Interview
        </Button>
      </div>
    </div>
  );
};
export default UpcomingInterviews;