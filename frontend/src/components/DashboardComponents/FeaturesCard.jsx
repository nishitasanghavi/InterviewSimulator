import { Mic, Code2, FileText } from "lucide-react";
import { FeatureCard } from "./FeatureCard";
import { useNavigate } from "react-router-dom";

export const FeatureCards = () => {
  const navigate = useNavigate();

  const features = [
    {
      title: "AI-Powered Interviews",
      description: "Practice with our AI interviewer",
      icon: Mic,
      buttonText: "Start Interview",
      buttonColor: "indigo",
      path: "/mock-interview"
    },
    {
      title: "Code Challenges",
      description: "Interactive coding environment",
      icon: Code2,
      buttonText: "Solve Problems",
      buttonColor: "indigo",
      path: "/code-challenges"
    },
    {
      title: "Resume Analysis",
      description: "AI feedback on your resume",
      icon: FileText,
      buttonText: "Upload Resume",
      buttonColor: "indigo",
      path: "/resume"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <FeatureCard
          key={index}
          {...feature}
          onClick={() => navigate(feature.path)}
        />
      ))}
    </div>
  );
};

export default FeatureCards;
