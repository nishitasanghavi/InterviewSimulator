import { Button } from "../../components/ui/button";

export const FeatureCard = ({
  title,
  description,
  icon: Icon,
  buttonText,
  buttonColor = "indigo",
}) => {
  return (
    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-semibold">{title}</h3>
          <p className="text-indigo-100 text-sm mt-1">{description}</p>
        </div>
        <div className="p-3 bg-white/20 rounded-lg">
          {Icon && <Icon className="w-5 h-5 text-white" />}
        </div>
      </div>
      <div className="mt-6">
        <Button
          className={`bg-white w-full ${
            buttonColor === "indigo"
              ? "text-indigo-600 hover:bg-indigo-50"
              : buttonColor === "blue"
              ? "text-blue-600 hover:bg-blue-50"
              : buttonColor === "red"
              ? "text-red-600 hover:bg-red-50"
              : ""
          }`}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};
