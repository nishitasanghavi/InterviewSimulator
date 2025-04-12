import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-white">
      <TestimonialsSection />
    </main>
  );
}

function TestimonialsSection() {
  return (
    <section className="relative w-full max-w-6xl mx-auto py-24 px-6">
      <div className="relative h-[500px] md:h-[600px]">
        {/* Top row */}
        <ProfileImage left="-15%" top="20%" name="Alice Johnson" role="Software Engineer" company="Google" testimonial="This platform gave me the confidence I needed! The AI feedback helped me refine my answers, and I aced my real interview." />
        <ProfileImage left="5%" top="5%" name="Michael Smith" role="Data Analyst" company="Amazon" testimonial="The resume-based questions were a game changer. I was asked almost the same questions in my actual interview!" />
        <ProfileImage left="25%" top="8%" name="Sophia Lee" role="UX Designer" company="Meta" testimonial="Practicing company-specific questions for Google really helped! I felt super prepared when I went in." />
        <ProfileImage left="43%" top="2%" name="David Kim" role="AI Researcher" company="OpenAI" testimonial="The AI-driven feedback pinpointed my weak spots, and I improved dramatically in just a few days!" />
        <ProfileImage left="61%" top="8%" name="Emma Brown" role="Full Stack Developer" company="Netflix" testimonial="The coding quizzes were so helpful! They sharpened my problem-solving skills before my tech interview." />
        <ProfileImage left="81%" top="2%" name="James Wilson" role="Product Manager" company="Tesla" testimonial="I love the performance dashboard! It helped me track my progress and stay motivated throughout my prep." />
        <ProfileImage left="99%" top="20%" name="Olivia Martinez" role="Cybersecurity Analyst" company="Microsoft" testimonial="I landed my dream job thanks to this platform! The real-time mock interviews made me feel like I was in an actual interview." />

        {/* Middle row */}
        <ProfileImage left="2%" top="45%" name="Daniel White" role="Backend Developer" company="IBM" testimonial="The AI insights were mind-blowing! I realized small tweaks in my responses made a big difference." />
        <ProfileImage left="-15%" top="57%" name="Ava Thompson" role="HR Specialist" company="LinkedIn" testimonial="I was struggling with behavioral questions, but this platform helped me structure my answers perfectly." />
        <ProfileImage left="83%" top="45%" name="Ethan Anderson" role="Cloud Engineer" company="AWS" testimonial="The best part? It’s all in one place—mock interviews, coding practice, and company-specific questions. A must-have for job seekers!" />

        {/* Center content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center mt-90 z-10 px-6">
          <span className="text-sm font-medium text-gray-600 mb-2">Testimonials</span>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Trusted by professionals
            <br />
            <span className="text-indigo-600">preparing for their dream jobs</span>
          </h2>
          <p className="text-gray-600 max-w-lg mx-auto mt-4 mb-8">
            See how AI-powered mock interviews helped job seekers like you succeed.
          </p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-transform"
          >
            Read Success Stories
            <ArrowRight size={16} />
          </motion.button>
        </div>
      </div>
    </section>
  );
}

function ProfileImage({ left, top, bottom, name, role, company, testimonial }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <motion.div
      className="absolute w-40 h-50 md:w-40 md:h-50 rounded-xl overflow-hidden shadow-lg border border-gray-200 bg-white cursor-pointer"
      style={{ left, top, bottom }}
      onMouseEnter={() => setIsFlipped(true)}
      onMouseLeave={() => setIsFlipped(false)}
      animate={{ rotateY: isFlipped ? 180 : 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <div className="relative w-full h-full">
        {/* Front Side (Profile Image) */}
        <motion.div
          className="absolute w-full h-full backface-hidden"
          animate={{ opacity: isFlipped ? 0 : 1 }}
        >
          <img
            src={`https://randomuser.me/api/portraits/${Math.random() > 0.5 ? "men" : "women"}/${Math.floor(
              Math.random() * 100
            )}.jpg`}
            alt={name}
            className="object-cover w-full h-full"
          />
        </motion.div>

        {/* Back Side (Testimonial) */}
        <motion.div
          className="absolute w-full h-full flex flex-col items-center justify-center bg-indigo-600 text-white text-center p-4 rounded-xl"
          animate={{ opacity: isFlipped ? 1 : 0 }}
          style={{ transform: "rotateY(180deg)" }} // Fix mirrored text
        >
          <p className="text-lg font-bold">{name}</p>
          <p className="text-sm italic">{role} at {company}</p>
          <p className="text-xs mt-2">{testimonial}</p>
        </motion.div>
      </div>
    </motion.div>
  );
}
