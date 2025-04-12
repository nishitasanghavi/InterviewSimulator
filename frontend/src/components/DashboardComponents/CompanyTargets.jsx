import { Pen } from "lucide-react";
import { Button } from "../../components/ui/button";
const CompanyTargets = () => {
  const companies = ["Google", "Amazon", "Microsoft", "Meta"];

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Company Targets</h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-gray-500 hover:text-indigo-600"
        >
          <Pen className="w-4 h-4" />
        </Button>
      </div>

      <div className="space-y-3">
        {companies.map((company, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                {company[0]}
              </div>
              <span className="font-medium">{company}</span>
            </div>
            <div className="text-sm font-medium text-indigo-600">
              {70 + index * 5}% Ready
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-center">
        <Button
          variant="outline"
          className="w-full border-dashed border-gray-300 text-gray-600 hover:border-indigo-300 hover:text-indigo-600"
        >
          Add Company
        </Button>
      </div>
    </div>
  );
};

export default CompanyTargets;
