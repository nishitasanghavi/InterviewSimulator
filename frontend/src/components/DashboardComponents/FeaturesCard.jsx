// FeatureCards.jsx
import { Mic, Code2, FileText } from "lucide-react";
import { FeatureCard } from "./FeatureCard";

export const FeatureCards = () => {
  const features = [
    {
      title: "AI-Powered Interviews",
      description: "Practice with our AI interviewer",
      icon: Mic,
      buttonText: "Start Interview",
      buttonColor: "indigo"
    },
    {
      title: "Code Challenges",
      description: "Interactive coding environment",
      icon: Code2,
      buttonText: "Solve Problems",
      buttonColor: "indigo"
    },
    {
      title: "Resume Analysis",
      description: "AI feedback on your resume",
      icon: FileText,
      buttonText: "Upload Resume",
      buttonColor: "green"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {features.map((feature, index) => (
        <FeatureCard key={index} {...feature} />
      ))}
    </div>
  );
};

export default FeatureCards;