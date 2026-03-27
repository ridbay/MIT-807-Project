import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import "./StudentLogin.css";

function Login() {
  const [tab, setTab] = useState("undergraduate");
  const [showPassword, setShowPassword] = useState(false);
  const [matric, setMatric] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  const { setStudentType, setUser } = useAppContext();

  const handleTabChange = (type) => {
    setTab(type);
    setStudentType(type === "undergraduate" ? "ug" : "pg");
  };

  const matricPlaceholder =
    tab === "undergraduate" ? "UG/2023/10234" : "PG/2023/00123";

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock user data
    setUser({
      name: tab === "undergraduate" ? "Alex M. Thompson" : "Dr. Sarah Rodriguez",
      matric: matric || (tab === "undergraduate" ? "UG/2023/10234" : "PG/2023/00123"),
      type: tab === "undergraduate" ? "ug" : "pg"
    });
    navigate("/dashboard/student");
  };

  return (
    <div className="login-root">
      {/* Left ghost illustration */}
      <div
        className="login-illustration login-illustration--left"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 220 260"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            x="30"
            y="130"
            width="160"
            height="130"
            rx="8"
            fill="#c9d3e0"
            opacity="0.4"
          />
          <rect
            x="70"
            y="185"
            width="30"
            height="75"
            rx="4"
            fill="#b8c5d6"
            opacity="0.5"
          />
          <rect
            x="120"
            y="185"
            width="30"
            height="75"
            rx="4"
            fill="#b8c5d6"
            opacity="0.5"
          />
          <path
            d="M20 135 L110 60 L200 135"
            stroke="#b8c5d6"
            strokeWidth="6"
            fill="none"
            opacity="0.5"
          />
        </svg>
      </div>

      {/* Main content */}
      <div className="login-content">
        {/* Logo */}
        <header className="login-header">
          <div className="login-logo">
            <svg
              viewBox="0 0 24 24"
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
            </svg>
          </div>
          <h1 className="login-title">The Digital Dean</h1>
          <p className="login-subtitle">UNIVERSITY RECORDS</p>
        </header>

        {/* Card */}
        <main className="login-card">
          <h2 className="login-card-heading">Welcome Back</h2>
          <p className="login-card-subheading">
            Please enter your credentials to access your secure academic
            dashboard.
          </p>

          {/* Tabs */}
          <div className="login-tabs" role="tablist">
            <button
              id="tab-ug"
              role="tab"
              aria-selected={tab === "undergraduate"}
              className={`login-tab ${tab === "undergraduate" ? "login-tab--active" : ""}`}
              onClick={() => handleTabChange("undergraduate")}
            >
              UNDERGRADUATE
            </button>
            <button
              id="tab-pg"
              role="tab"
              aria-selected={tab === "postgraduate"}
              className={`login-tab ${tab === "postgraduate" ? "login-tab--active" : ""}`}
              onClick={() => handleTabChange("postgraduate")}
            >
              POSTGRADUATE
            </button>
          </div>

          {/* Form */}
          <form className="login-form" onSubmit={handleSubmit} noValidate>
            {/* Matric Number */}
            <div className="login-field">
              <label className="login-label" htmlFor="matric-input">
                MATRIC NUMBER
              </label>
              <div className="login-input-wrapper">
                <span className="login-input-icon" aria-hidden="true">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  id="matric-input"
                  type="text"
                  className="login-input"
                  placeholder={matricPlaceholder}
                  value={matric}
                  onChange={(e) => setMatric(e.target.value)}
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="login-field">
              <div className="login-label-row">
                <label className="login-label" htmlFor="password-input">
                  PASSWORD
                </label>
                <button type="button" className="login-forgot">
                  Forgot?
                </button>
              </div>
              <div className="login-input-wrapper">
                <span className="login-input-icon" aria-hidden="true">
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  id="password-input"
                  type={showPassword ? "text" : "password"}
                  className="login-input"
                  placeholder="••••••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="login-toggle-password"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
                >
                  {showPassword ? (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20C7 20 2.73 16.39 1 12a10.07 10.07 0 0 1 2.06-3.94M9.9 4.24A9.12 9.12 0 0 1 12 4c5 0 9.27 3.61 11 8a10.12 10.12 0 0 1-1.16 2.31M1 1l22 22" />
                    </svg>
                  ) : (
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            {/* Remember me */}
            <label className="login-remember">
              <input
                type="checkbox"
                id="remember-me"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <span>Keep me signed in for 30 days</span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              className="login-submit"
              id="secure-access-btn"
            >
              Secure Access
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4M10 17l5-5-5-5M15 12H3" />
              </svg>
            </button>
          </form>

          {/* Activate account */}
          <div className="login-activate">
            <p>New student or first-time user?</p>
            <button
              className="login-activate-btn"
              id="activate-portal-btn"
              type="button"
            >
              Activate Portal Account
            </button>
          </div>
        </main>

        {/* Footer */}
        <footer className="login-footer">
          <a href="#">Data Privacy</a>
          <span>•</span>
          <a href="#">Security Standards</a>
          <span>•</span>
          <a href="#">Support</a>
        </footer>

        <div className="login-certified">
          <svg
            width="12"
            height="12"
            viewBox="0 0 24 24"
            fill="#2563eb"
            aria-hidden="true"
          >
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
          </svg>
          ACADEMIC RECORDS SECURITY CERTIFIED
        </div>
      </div>

      {/* Right promo card */}
      <div
        className="login-illustration login-illustration--right"
        aria-hidden="true"
      >
        <div className="login-promo-card">
          <div className="login-promo-img-placeholder"></div>
          <div className="login-promo-text">
            <div className="login-promo-divider"></div>
            <h3>Empowering Academic Excellence.</h3>
            <p>
              Your digital gateway to transcripts, verified records, and career
              milestones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
