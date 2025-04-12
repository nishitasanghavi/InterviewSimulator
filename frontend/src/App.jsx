import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import SignupPage from './pages/SignUpPage';
import LoginPage from './pages/LogInPage';
import CandidateDashboard from './pages/PofilePage';
import Dashboard from './pages/Dashboard';
import ResumeAnalytics from './pages/Resume';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/profile" element={<CandidateDashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/resume" element={<ResumeAnalytics />} />
      </Routes>
    </Router>
  );
}

export default App;