# University Academic Records Portal (MIT817)

A premium, high-fidelity web application designed for students and university administrators to manage academic lifecycles with precision and security. Built with a modern, role-aware architecture and a professional glassmorphic aesthetic.

## 🚀 Key Features

### 🎓 Dynamic Student Portal
- **Role-Aware Architecture**: Tailored experiences for **Undergraduate (UG)** and **Postgraduate (PG)** students.
- **UG Academic Records**: Semester-based grade tracking, level-specific course management (100-500L), and standard 5.0 CGPA calculations.
- **PG Academic Records**: Programme-based tracking (PGD, MSc, MIT, PhD), flexible coursework modules, and dedicated **Graduate Research Tracking**.
- **CGPA Projector**: Role-specific grading scales (Standard UG vs Distinction/Merit PG) for accurate academic planning.
- **Digital Credentials**: Blockchain-verified academic certificates and transcripts.

### 🛡️ Institutional Administrator Dashboard
- **Administrative Control**: Manage academic records, review transcript requests, and monitor registry metrics.
- **Data Integrity**: Automated verification of student records and credential issuance.

### 🔍 Secure Verification System
- **ID-Based Authentication**: A public-facing interface for employers and verifiers to authenticate documents using unique institutional IDs (e.g., `VER-102-390-AF`).
- **Blockchain Simulation**: Cryptographic hashing to ensure record immutability and protection against forgery.

### 🏠 Landing Page
- **Unified Entry**: A premium entry point with distinct authentication paths for students and institutional staff.
- **Feature Showcase**: High-impact messaging and modular highlights of the portal's capabilities.

## 🛠️ Technology Stack

- **Frontend**: React.js (Vite)
- **Styling**: Vanilla CSS (Modular) with CSS Variables for theme consistency.
- **Routing**: React Router DOM (Nested, Role-Aware Routes).
- **Icons/Graphics**: Custom SVG iconography and high-integrity academic branding.

## 📂 Project Structure

```text
src/
├── components/          # Reusable UI components (Sidebar, TopBar, DashboardLayout)
├── context/             # App-level state management
├── pages/               # Feature-specific page components
│   ├── AdminDashboard/  # Registry-level overview
│   ├── StudentDashboard/# Academic home for students
│   ├── Results/         # Grade management
│   ├── CGPACalculator/  # Interactive performance tool
│   ├── ...              # Other core pages
├── App.jsx              # Main routing and layout configuration
└── main.jsx             # Entry point
```

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/ridbay/MIT-807-Project.git
   ```
2. Navigate to the project directory:
   ```bash
   cd mit817
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Building for Production
To create an optimized production build:
```bash
npm run build
```

## 📝 License
This project was created as part of the MIT817 academic course. All rights reserved.
