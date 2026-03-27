import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import StudentLogin from "./pages/StudentLogin";
import DashboardLayout from "./components/DashboardLayout";
import StudentDashboard from "./pages/StudentDashboard";
import Results from "./pages/Results";
import CGPACalculator from "./pages/CGPACalculator";
import Certificates from "./pages/Certificates";
import Transcripts from "./pages/Transcripts";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<StudentLogin />} />
      <Route path="/login/admin" element={<AdminLogin />} />

      {/* Student Dashboard Routes */}
      <Route path="/dashboard/student" element={<DashboardLayout />}>
        <Route index element={<StudentDashboard />} />
        <Route path="results" element={<Results />} />
        <Route path="cgpa" element={<CGPACalculator />} />
        <Route path="certificates" element={<Certificates />} />
        <Route path="transcripts" element={<Transcripts />} />
        <Route path="profile" element={<Profile />} />
      </Route>

      {/* Admin Routes */}
      <Route path="/dashboard/admin" element={<DashboardLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="results" element={<div>Admin Results Placeholder</div>} />
        <Route path="cgpa" element={<div>Admin CGPA Placeholder</div>} />
        <Route
          path="certificates"
          element={<div>Admin Certificates Placeholder</div>}
        />
        <Route
          path="transcripts"
          element={<div>Admin Transcripts Placeholder</div>}
        />
        <Route path="profile" element={<div>Admin Profile Placeholder</div>} />
      </Route>

      {/* Catch-all: redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
