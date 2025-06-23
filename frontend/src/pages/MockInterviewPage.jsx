import { useState, useEffect, useRef } from "react";
import {
  Mic,
  Pause,
  ArrowRight,
  User,
  MessageSquare,
  BarChart3,
  Clock,
  Star,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

const MockInterviewPage = () => {
  const [interviewState, setInterviewState] = useState("setup"); // setup, ongoing, completed
  const [resume, setResume] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [interviewHistory, setInterviewHistory] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [questionCount, setQuestionCount] = useState(0);
  const [error, setError] = useState("");
  const [resumeFile, setResumeFile] = useState(null);
  const [jdFile, setJdFile] = useState(null);
  
  // Backend API configuration
  const API_BASE_URL = "http://localhost:5000";

  const speechRecognitionRef = useRef(null);
  const chatContainerRef = useRef(null);

  // Initialize speech recognition
  useEffect(() => {
    if ("SpeechRecognition" in window || "webkitSpeechRecognition" in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      speechRecognitionRef.current = new SpeechRecognition();
      speechRecognitionRef.current.continuous = true;
      speechRecognitionRef.current.interimResults = true;

      speechRecognitionRef.current.onresult = (event) => {
        const transcript = Array.from(event.results)
          .map((result) => result[0])
          .map((result) => result.transcript)
          .join("");

        setUserInput(transcript);
      };

      speechRecognitionRef.current.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };
    } else {
      console.warn("Speech recognition not supported in this browser");
    }

    return () => {
      if (speechRecognitionRef.current) {
        speechRecognitionRef.current.stop();
      }
    };
  }, []);

  // Auto-scroll chat to bottom
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [interviewHistory]);

  const toggleListening = () => {
    if (isListening) {
      speechRecognitionRef.current.stop();
    } else {
      speechRecognitionRef.current.start();
    }
    setIsListening(!isListening);
  };

  const speakText = (text) => {
    if ("speechSynthesis" in window) {
      // Stop any ongoing speech
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;

      // Try to get a professional sounding voice
      const voices = window.speechSynthesis.getVoices();
      const preferredVoice =
        voices.find(
          (voice) =>
            voice.name.includes("Google") &&
            voice.name.includes("US") &&
            !voice.name.includes("Female")
        ) || voices.find((voice) => !voice.name.includes("Female"));

      if (preferredVoice) {
        utterance.voice = preferredVoice;
      }

      window.speechSynthesis.speak(utterance);
    }
  };

  const startInterview = async () => {
    if (!resumeFile || !jdFile) {
      setError("Please upload both resume and job description files.");
      return;
    }
  
    setIsLoading(true);
    setError("");
  
    const formData = new FormData();
    formData.append("resume", resumeFile);
    formData.append("job_description", jdFile);
  
    try {
      const response = await fetch(`${API_BASE_URL}/interview/start`, {
        method: "POST",
        body: formData, // IMPORTANT: no headers manually set here
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.error || "Failed to start interview");
      }
  
      setSessionId(data.session_id);
      setQuestionCount(data.question_count || 0);
      setInterviewState("ongoing");
  
      const initialHistory = [
        { role: "candidate", content: "Hello, I'm ready for the interview." },
        { role: "interviewer", content: data.interviewer_response },
      ];
  
      setInterviewHistory(initialHistory);
      speakText(data.interviewer_response);
    } catch (error) {
      console.error("Error starting interview:", error);
      setError(error.message || "Failed to start interview. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  

  const handleUserSubmit = async (e) => {
    e.preventDefault();

    if (!userInput.trim()) return;

    // Stop listening if active
    if (isListening) {
      speechRecognitionRef.current.stop();
      setIsListening(false);
    }

    const userMessage = userInput.trim();
    setUserInput("");

    // Check for exit commands
    const exitCommands = ["exit", "quit", "end", "stop", "bye", "goodbye"];
    if (exitCommands.includes(userMessage.toLowerCase())) {
      endInterview();
      return;
    }

    // Add user message to history immediately
    setInterviewHistory((prev) => [
      ...prev,
      { role: "candidate", content: userMessage },
    ]);

    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/interview/respond`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: sessionId,
          response: userMessage,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to get response");
      }

      if (data.session_ended) {
        endInterview();
        return;
      }

      // Add interviewer response to history
      setInterviewHistory((prev) => [
        ...prev,
        { role: "interviewer", content: data.interviewer_response },
      ]);
      setQuestionCount(data.question_count);

      // Read out the response
      speakText(data.interviewer_response);
    } catch (error) {
      console.error("Error sending response:", error);
      setError(error.message || "Failed to send response. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const endInterview = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/interview/end`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          session_id: sessionId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to end interview");
      }

      setFeedback(data);
      setInterviewState("completed");
    } catch (error) {
      console.error("Error ending interview:", error);
      setError(error.message || "Failed to end interview. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetInterview = () => {
    setInterviewState("setup");
    setInterviewHistory([]);
    setFeedback(null);
    setUserInput("");
    setSessionId("");
    setQuestionCount(0);
    setError("");
    // Don't reset resume and job description to allow for quick retry
  };

  const ErrorAlert = ({ message }) => (
    <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
      <div className="flex items-center">
        <AlertCircle className="h-5 w-5 text-red-500 mr-2" />
        <p className="text-red-700">{message}</p>
      </div>
    </div>
  );
  const handleResumeUpload = (e) => {
    const file = e.target.files[0];
    if (file) setResumeFile(file);
  };
  
  const handleJDUpload = (e) => {
    const file = e.target.files[0];
    if (file) setJdFile(file);
  };
  
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-purple-100 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center">
                <MessageSquare className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">
                  AI Mock Interview
                </h1>
                <p className="text-sm text-gray-600">
                  Practice and improve your interview skills
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>Ready to practice</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Alert */}
        {error && <ErrorAlert message={error} />}

        {interviewState === "setup" && (
          <div className="max-w-4xl mx-auto">
            {/* Hero Section */}
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <User className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                AI-Powered Interview Practice
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Get personalized feedback and improve your interview skills with
                our advanced AI interviewer
              </p>
            </div>

            {/* Setup Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Resume Upload */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mr-4">
                    <User className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Your Resume
                    </h3>
                    <p className="text-gray-600">
                      Upload your background document
                    </p>
                  </div>
                </div>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleResumeUpload(e)}
                  className="w-full p-4 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm"
                />
              </div>

              {/* Job Description Upload */}
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mr-4">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      Job Description
                    </h3>
                    <p className="text-gray-600">
                      Upload the role info you're applying for
                    </p>
                  </div>
                </div>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={(e) => handleJDUpload(e)}
                  className="w-full p-4 border border-gray-200 rounded-xl bg-white/50 backdrop-blur-sm"
                />
              </div>
            </div>

            {/* Start Button */}
            <div className="text-center">
  <button
    onClick={startInterview}
    disabled={isLoading || !resumeFile || !jdFile}
    className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 disabled:opacity-50 disabled:transform-none disabled:hover:shadow-lg"
  >
    {isLoading ? (
      <>
        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
        Starting Interview...
      </>
    ) : (
      <>
        <MessageSquare className="w-5 h-5 mr-3" />
        Start Interview
      </>
    )}
  </button>
</div>

          </div>
        )}

        {interviewState === "ongoing" && (
          <div className="max-w-5xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
              {/* Interview Header */}
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-8 py-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mr-4">
                      <MessageSquare className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">
                        Live Interview
                      </h2>
                      <p className="text-purple-100">
                        Question {questionCount}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={endInterview}
                    disabled={isLoading}
                    className="px-6 py-2 bg-white/20 backdrop-blur-sm text-white rounded-xl hover:bg-white/30 transition-colors disabled:opacity-50"
                  >
                    End Interview
                  </button>
                </div>
              </div>

              {/* Chat Area */}
              <div
                ref={chatContainerRef}
                className="h-96 overflow-y-auto p-8 space-y-6"
              >
                {interviewHistory.map((message, index) => (
                  <div
                    key={index}
                    className={`flex ${
                      message.role === "candidate"
                        ? "justify-end"
                        : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-3xl rounded-2xl px-6 py-4 ${
                        message.role === "interviewer"
                          ? "bg-gradient-to-r from-gray-100 to-gray-50 text-gray-800"
                          : "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                      }`}
                    >
                      <div className="flex items-center mb-2">
                        <div
                          className={`w-6 h-6 rounded-full mr-2 flex items-center justify-center text-xs font-semibold ${
                            message.role === "interviewer"
                              ? "bg-gray-300 text-gray-700"
                              : "bg-white/20 text-white"
                          }`}
                        >
                          {message.role === "interviewer" ? "AI" : "You"}
                        </div>
                      </div>
                      <p className="text-sm leading-relaxed">
                        {message.content}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-gradient-to-r from-gray-100 to-gray-50 rounded-2xl px-6 py-4">
                      <div className="flex items-center mb-2">
                        <div className="w-6 h-6 rounded-full bg-gray-300 text-gray-700 mr-2 flex items-center justify-center text-xs font-semibold">
                          AI
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.4s" }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Input Area */}
              <div className="border-t border-gray-100 px-8 py-6 bg-gray-50/50">
                <div className="flex items-end space-x-4">
                  <button
                    onClick={toggleListening}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center transition-all ${
                      isListening
                        ? "bg-red-500 text-white shadow-lg scale-110"
                        : "bg-white text-gray-400 hover:text-gray-600 border border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    {isListening ? <Pause size={20} /> : <Mic size={20} />}
                  </button>

                  <form
                    onSubmit={handleUserSubmit}
                    className="flex-1 flex space-x-4"
                  >
                    <input
                      type="text"
                      className="flex-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent bg-white"
                      placeholder="Type your response..."
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      disabled={isLoading}
                    />

                    <button
                      type="submit"
                      disabled={!userInput.trim() || isLoading}
                      className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-xl flex items-center justify-center hover:shadow-lg transform hover:scale-105 transition-all disabled:opacity-50 disabled:transform-none"
                    >
                      <ArrowRight size={20} />
                    </button>
                  </form>
                </div>

                <p className="text-xs text-gray-500 mt-3 text-center">
                  Speak naturally or type your responses • Say "exit" to finish
                  the interview
                </p>
              </div>
            </div>
          </div>
        )}

        {interviewState === "completed" && feedback && (
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Star className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-4">
                Interview Complete!
              </h2>
              <p className="text-xl text-gray-600">
                Here's your personalized feedback and performance analysis
              </p>
            </div>

            {/* Overall Score Card */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl border border-white/20 p-8 mb-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-6">
                  <span className="text-4xl font-bold text-white">
                    {feedback.overall_score || feedback.overallScore}/10
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Overall Performance
                </h3>
                <p className="text-gray-600">
                  Great job! Here's how you performed across different areas.
                </p>
              </div>
            </div>

            {/* Performance Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">
                    Technical Skills
                  </h4>
                  <span className="text-2xl font-bold text-blue-600">
                    {feedback.technical_score || feedback.technicalScore}/10
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-blue-600 h-3 rounded-full transition-all duration-1000"
                    style={{
                      width: `${
                        ((feedback.technical_score || feedback.technicalScore) /
                          10) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Communication</h4>
                  <span className="text-2xl font-bold text-purple-600">
                    {feedback.communication_score ||
                      feedback.communicationScore}
                    /10
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-purple-500 to-purple-600 h-3 rounded-full transition-all duration-1000"
                    style={{
                      width: `${
                        ((feedback.communication_score ||
                          feedback.communicationScore) /
                          10) *
                        100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="font-semibold text-gray-900">Position Fit</h4>
                  <span className="text-2xl font-bold text-green-600">
                    {feedback.fit_score || feedback.fitScore}/10
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-3">
                  <div
                    className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-1000"
                    style={{
                      width: `${
                        ((feedback.fit_score || feedback.fitScore) / 10) * 100
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            {/* Feedback Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-4">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Your Strengths
                  </h3>
                </div>
                <ul className="space-y-3">
                  {feedback.strengths.map((strength, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{strength}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-orange-600 rounded-xl flex items-center justify-center mr-4">
                    <BarChart3 className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Areas to Improve
                  </h3>
                </div>
                <ul className="space-y-3">
                  {feedback.improvements.map((improvement, index) => (
                    <li key={index} className="flex items-start">
                      <div className="w-2 h-2 bg-amber-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span className="text-gray-700">{improvement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Detailed Feedback */}
            {feedback.detailed_feedback || feedback.detailedFeedback ? (
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8 mb-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  Detailed Analysis
                </h3>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                  {feedback.detailed_feedback || feedback.detailedFeedback}
                </p>
              </div>
            ) : null}

            {/* Action Button */}
            <div className="text-center">
              <button
                onClick={resetInterview}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
              >
                <MessageSquare className="w-5 h-5 mr-3" />
                Start New Interview
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MockInterviewPage;
