// src/pages/Interviews.jsx
import { useState } from 'react';
import Card from '../components/Card.jsx';
import ProgressBar from '../components/ProgressBar.jsx';
import Navbar from '../components/DashboardComponents/Navbar.jsx';
import Tabs from '../components/DashboardComponents/Navigation_Tabs.jsx';
import { 
  ChatIcon, 
  CalendarIcon, 
  FilterIcon,
  ClockIcon,
  BadgeIcon,
  FeedbackIcon,
  TeamIcon
} from '../components/Icons';

function Interviews() {
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [interviewType, setInterviewType] = useState('All Types');
  
  // Sample data for interviews
  const upcomingInterviews = [
    {
      id: 1,
      company: 'Google',
      logo: 'G',
      color: 'bg-blue-500',
      position: 'Senior Frontend Developer',
      type: 'Technical',
      date: '25 Apr, 2025',
      time: '10:00 AM',
      duration: '45 min',
      difficulty: 'Hard'
    },
    {
      id: 2,
      company: 'Amazon',
      logo: 'A',
      color: 'bg-yellow-500',
      position: 'Software Engineer II',
      type: 'System Design',
      date: '28 Apr, 2025',
      time: '2:30 PM',
      duration: '60 min',
      difficulty: 'Medium'
    }
  ];
  
  const pastInterviews = [
    {
      id: 3,
      company: 'Microsoft',
      logo: 'M',
      color: 'bg-blue-500',
      position: 'Frontend Engineer',
      type: 'Technical',
      date: '15 Apr, 2025',
      time: '11:00 AM',
      duration: '60 min',
      score: 85,
      feedback: 'Great problem-solving approach. Could improve on communication.'
    },
    {
      id: 4,
      company: 'Meta',
      logo: 'M',
      color: 'bg-blue-600',
      position: 'React Developer',
      type: 'Behavioral',
      date: '10 Apr, 2025',
      time: '3:00 PM',
      duration: '45 min',
      score: 92,
      feedback: 'Excellent communication skills and cultural fit.'
    },
    {
      id: 5,
      company: 'Apple',
      logo: 'A',
      color: 'bg-gray-800',
      position: 'Frontend Architect',
      type: 'System Design',
      date: '05 Apr, 2025',
      time: '1:00 PM',
      duration: '60 min',
      score: 78,
      feedback: 'Good design principles. Need to consider scalability more.'
    }
  ];
  
  const recommendedInterviews = [
    {
      id: 6,
      title: 'Senior Frontend Developer Interview',
      description: 'Based on your skills and career goals',
      icon: <ChatIcon className="h-6 w-6 text-purple-600" />,
      iconBg: 'bg-purple-100',
      duration: '60 minutes',
      difficulty: 'Medium',
      type: 'Technical'
    },
    {
      id: 7,
      title: 'Behavioral Interview - Leadership Focus',
      description: 'Recommended for senior roles',
      icon: <TeamIcon className="h-6 w-6 text-blue-600" />,
      iconBg: 'bg-blue-100',
      duration: '45 minutes',
      difficulty: 'Medium',
      type: 'Behavioral'
    }
  ];
  
  // Interview type options
  const interviewTypes = ['All Types', 'Technical', 'Behavioral', 'System Design', 'HR'];
  
  // Helper function to get badge color based on type
  const getTypeBadgeColor = (type) => {
    switch(type) {
      case 'Technical': return 'bg-blue-100 text-blue-800';
      case 'Behavioral': return 'bg-green-100 text-green-800';
      case 'System Design': return 'bg-purple-100 text-purple-800';
      case 'HR': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Helper function to get badge color based on difficulty
  const getDifficultyBadgeColor = (difficulty) => {
    switch(difficulty) {
      case 'Hard': return 'bg-red-100 text-red-800';
      case 'Medium': return 'bg-yellow-100 text-yellow-800';
      case 'Easy': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  // Helper function to get badge color based on score
  const getScoreBadgeColor = (score) => {
    if (score > 90) return 'bg-green-100 text-green-800';
    if (score > 75) return 'bg-blue-100 text-blue-800';
    return 'bg-yellow-100 text-yellow-800';
  };
  
  // Helper function to get progress bar color based on score
  const getProgressBarColor = (score) => {
    if (score > 90) return 'bg-green-500';
    if (score > 75) return 'bg-blue-500';
    return 'bg-yellow-500';
  };
  
  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans">
    <div className="bg-gradient-to-br from-indigo-600 to-purple-600 text-white shadow-lg">
        <Navbar />
      </div>
      {/* Navigation Tabs */}
      <div className="bg-white shadow">
        <Tabs />
      </div>
    <div className="space-y-6 w-full mx-auto px-4 py-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">My Interviews</h2>
        <button className="bg-purple-600 text-white px-5 py-2.5 rounded-lg flex items-center gap-2 hover:bg-purple-700 transition-colors shadow-sm hover:shadow">
          <CalendarIcon />
          <span>Schedule New</span>
        </button>
      </div>
      
      {/* Tabs */}
      <div className="flex border-b border-gray-200">
        {['Upcoming', 'Past', 'Recommended'].map((tab) => (
          <button
            key={tab}
            className={`px-6 py-3 text-sm font-medium relative ${
              activeTab === tab
                ? 'text-purple-600'
                : 'text-gray-500 hover:text-gray-700'
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-purple-600" />
            )}
          </button>
        ))}
      </div>
      
      {/* Filters */}
      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center gap-3">
          <div className="text-sm text-gray-500">Filter by:</div>
          <div className="relative">
            <select
              value={interviewType}
              onChange={(e) => setInterviewType(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {interviewTypes.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
            <div className="absolute right-3 top-3 pointer-events-none text-gray-500">
              <FilterIcon />
            </div>
          </div>
        </div>
        
        <div className="relative">
          <input
            type="text"
            placeholder="Search interviews..."
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 w-64"
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      {/* Interview List */}
      {activeTab === 'Upcoming' && (
        <div className="space-y-4">
          {upcomingInterviews.length === 0 ? (
            <Card>
              <div className="text-center py-12">
                <div className="mx-auto w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <CalendarIcon className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No upcoming interviews</h3>
                <p className="text-gray-500 max-w-md mx-auto">Schedule a mock interview to prepare for your next opportunity.</p>
                <button className="mt-6 bg-purple-600 text-white px-5 py-2.5 rounded-lg hover:bg-purple-700 transition-colors shadow-sm hover:shadow">
                  Schedule Interview
                </button>
              </div>
            </Card>
          ) : (
            upcomingInterviews.map((interview) => (
              <Card key={interview.id}>
                <div className="flex justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${interview.color} text-white flex items-center justify-center rounded-lg font-bold text-xl`}>
                      {interview.logo}
                    </div>
                    
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-lg">{interview.company}</h3>
                        <span className={`text-xs px-2 py-0.5 rounded-full ${getDifficultyBadgeColor(interview.difficulty)}`}>
                          {interview.difficulty}
                        </span>
                      </div>
                      <p className="text-gray-500 mb-3">{interview.position}</p>
                      
                      <div className="grid grid-cols-3 gap-6 text-sm text-gray-500">
                        <div className="flex items-center gap-1.5">
                          <CalendarIcon className="h-4 w-4 text-gray-400" />
                          <span>{interview.date}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <ClockIcon className="h-4 w-4 text-gray-400" />
                          <span>{interview.time}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <BadgeIcon className="h-4 w-4 text-gray-400" />
                          <span>{interview.duration}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex flex-col items-end justify-between">
                    <span className={`text-xs px-3 py-1 rounded-full ${getTypeBadgeColor(interview.type)}`}>
                      {interview.type}
                    </span>
                    
                    <div className="flex gap-2 mt-8">
                      <button className="text-gray-500 hover:text-gray-700 px-3 py-1.5 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                        Reschedule
                      </button>
                      <button className="bg-purple-600 text-white px-4 py-1.5 rounded-lg hover:bg-purple-700 transition-colors shadow-sm hover:shadow">
                        Join
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            ))
          )}
        </div>
      )}
      
      {activeTab === 'Past' && (
        <div className="space-y-4">
          {pastInterviews.map((interview) => (
            <Card key={interview.id}>
              <div className="flex justify-between">
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 ${interview.color} text-white flex items-center justify-center rounded-lg font-bold text-xl`}>
                    {interview.logo}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-lg">{interview.company}</h3>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getScoreBadgeColor(interview.score)}`}>
                        Score: {interview.score}%
                      </span>
                    </div>
                    <p className="text-gray-500 mb-2">{interview.position}</p>
                    
                    <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500 mb-4">
                      <div className="flex items-center gap-1.5">
                        <CalendarIcon className="h-4 w-4 text-gray-400" />
                        <span>{interview.date}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <ClockIcon className="h-4 w-4 text-gray-400" />
                        <span>{interview.time}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <BadgeIcon className="h-4 w-4 text-gray-400" />
                        <span>{interview.duration}</span>
                      </div>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${getTypeBadgeColor(interview.type)}`}>
                        {interview.type}
                      </span>
                    </div>
                    
                    <div className="flex items-start gap-1.5 text-sm text-gray-600 mb-4">
                      <FeedbackIcon className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div>
                        <span className="font-medium">Feedback:</span> {interview.feedback}
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-500">Performance</span>
                        <span className="font-medium">{interview.score}%</span>
                      </div>
                      <ProgressBar 
                        percentage={interview.score} 
                        color={getProgressBarColor(interview.score)}
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col items-end justify-between ml-4">
                  <div className="flex flex-col items-end gap-2">
                    <button className="text-purple-600 border border-purple-200 bg-purple-50 px-4 py-2 rounded-lg hover:bg-purple-100 hover:border-purple-300 transition-colors">
                      View Details
                    </button>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors shadow-sm hover:shadow">
                      Retake
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      
      {activeTab === 'Recommended' && (
        <div className="space-y-4">
          {recommendedInterviews.map((interview) => (
            <Card key={interview.id}>
              <div className="flex items-start gap-4">
                <div className={`p-3 ${interview.iconBg} rounded-lg`}>
                  {interview.icon}
                </div>
                
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{interview.title}</h3>
                  <p className="text-gray-500 mb-4">{interview.description}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-2">
                      <ClockIcon className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="text-xs text-gray-500">Duration</div>
                        <div className="font-medium">{interview.duration}</div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-2">
                      <BadgeIcon className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="text-xs text-gray-500">Difficulty</div>
                        <div className="font-medium">{interview.difficulty}</div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg flex items-center gap-2">
                      <ChatIcon className="h-5 w-5 text-gray-400" />
                      <div>
                        <div className="text-xs text-gray-500">Interview Type</div>
                        <div className="font-medium">{interview.type}</div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <button className="bg-white border border-purple-600 text-purple-600 px-4 py-2 rounded-lg hover:bg-purple-50 transition-colors">
                      View Details
                    </button>
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors shadow-sm hover:shadow">
                      Schedule
                    </button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}

export default Interviews;