import { Badge } from "../../components/ui/badge";
const InterviewCard = ({ date, title, type, time }) => {
    return (
      <div className="flex gap-4 p-3 border border-gray-100 rounded-lg hover:bg-indigo-50 transition">
        <div className="w-12 h-12 bg-indigo-100 text-indigo-700 flex flex-col items-center justify-center rounded-md">
          <span className="text-xs font-medium">{date.split(", ")[0]}</span>
          <span className="text-lg font-bold">{date.split(", ")[1]}</span>
        </div>
        <div className="flex-grow">
          <div className="flex justify-between">
            <h4 className="font-medium">{title}</h4>
            <Badge
              className={type === "Technical" ? "bg-purple-100 text-purple-800" : "bg-green-100 text-green-800"}
            >
              {type}
            </Badge>
          </div>
          <p className="text-sm text-gray-600 mt-1">{date} • {time}</p>
        </div>
      </div>
    );
  };
  
    export default InterviewCard;