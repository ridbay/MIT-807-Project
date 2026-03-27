import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import StudentLogin from "./pages/StudentLogin";
import StudentDashboard from "./pages/StudentDashboard";
import DashboardLayout from "./components/DashboardLayout";
import Results from "./pages/Results";
import Certificates from "./pages/Certificates";
import Transcripts from "./pages/Transcripts";
import Profile from "./pages/Profile";
import Research from "./pages/Research";
import Verification from "./pages/Verification";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import CGPACalculator from "./pages/CGPACalculator";
import StudentRegistry from "./pages/admin/StudentRegistry";
import ResultManager from "./pages/admin/ResultManager";
import TranscriptApps from "./pages/admin/TranscriptApps";
import Issuance from "./pages/admin/Issuance";
import VerificationLogs from "./pages/admin/VerificationLogs";
import AcademicRules from "./pages/admin/AcademicRules";
import "./App.css";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login/student" element={<StudentLogin />} />
        <Route path="/login/admin" element={<AdminLogin />} />
        
        {/* Student Dashboard Routes */}
        <Route path="/dashboard/student" element={<DashboardLayout />}>
          <Route index element={<Navigate to="main" replace />} />
          <Route path="main" element={<StudentDashboard />} />
          <Route path="results" element={<Results />} />
          <Route path="cgpa" element={<CGPACalculator />} />
          <Route path="certificates" element={<Certificates />} />
          <Route path="transcripts" element={<Transcripts />} />
          <Route path="profile" element={<Profile />} />
          <Route path="research" element={<Research />} />
          <Route path="verify" element={<Verification />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/dashboard/admin" element={<DashboardLayout isAdmin />}>
          <Route index element={<Navigate to="main" replace />} />
          <Route path="main" element={<AdminDashboard />} />
          <Route path="registry" element={<StudentRegistry />} />
          <Route path="results" element={<ResultManager />} />
          <Route path="transcripts" element={<TranscriptApps />} />
          <Route path="certificates" element={<Issuance />} />
          <Route path="verification" element={<VerificationLogs />} />
          <Route path="curriculum" element={<AcademicRules />} />
          <Route path="verify" element={<Verification />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
