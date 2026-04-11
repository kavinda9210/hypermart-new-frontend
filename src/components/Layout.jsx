import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const Layout = ({
  children,
  onBackToMain,
  showFullscreen = false,
  onToggleFullscreen,
  showMainPanelButton = true,
  showPosButton = true,
  showLogo,
}) => {
  const navigate = useNavigate();
  const handleBackToMain = onBackToMain || (() => navigate('/dashboard'));

  return (
    <div className="dashbord-page min-h-screen bg-white flex flex-col overflow-x-hidden">
      <Header
        onBackToMain={handleBackToMain}
        showFullscreen={showFullscreen}
        onToggleFullscreen={onToggleFullscreen}
        showMainPanelButton={showMainPanelButton}
        showPosButton={showPosButton}
        showLogo={showLogo}
      />
      <div className="flex-1 min-h-0">
        {children}
      </div>
      <Footer />
    </div>
  );
};

export default Layout;
