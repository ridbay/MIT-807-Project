import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import TopBar from './TopBar';
import './DashboardLayout.css';

function DashboardLayout() {
  return (
    <div className="sd-root">
      <Sidebar />
      <div className="sd-main">
        <TopBar />
        <div className="sd-content">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;
