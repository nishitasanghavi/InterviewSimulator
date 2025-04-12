import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";

export const ResourceCard = ({ title, category, level, icon: Icon }) => {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:border-indigo-300 hover:shadow-md transition">
      <div className="flex gap-3 items-start">
        <div className="p-2 bg-indigo-100 rounded-lg text-indigo-600">
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <h4 className="font-medium">{title}</h4>
          <div className="flex gap-2 mt-1">
            <Badge className="bg-gray-100 text-gray-800">
              {category}
            </Badge>
            <Badge className="bg-indigo-100 text-indigo-800">
              {level}
            </Badge>
          </div>
        </div>
      </div>
      <Button className="w-full mt-4 bg-gray-100 text-gray-700 hover:bg-gray-200">
        Start Practice
      </Button>
    </div>
  );
};