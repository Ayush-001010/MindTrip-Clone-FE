import React from 'react';
import Home from './component/Pages/Home/Home';
import TopNavbar from './component/Common/Navbar/TopNavBar/TopNavbar';
import SideNavBar from './component/Common/Navbar/SideNavBar/SideNavBar';
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import Chat from './component/Pages/Chat/Chat';
import SignIn from './Features/Auth/SignIn/SignIn';
import SignUp from './Features/Auth/SignUp/SignUp';

const AppContent: React.FC = () => {
  const location = useLocation();
  const isChatLink = location.pathname === '/chat';

  return (
    <div className={`min-h-screen ${isChatLink ? "bg-[#212529] flex" : " bg-[radial-gradient(circle_at_top_left,_rgba(252,230,214,0.75),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(216,234,230,0.7),_transparent_28%),linear-gradient(180deg,_#fffaf4_0%,_#f8f5ef_52%,_#f1f6f2_100%)] text-slate-800"}`}>
      {!isChatLink && <TopNavbar />}
      {isChatLink && <SideNavBar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/auth/signin" element={<SignIn />} />
        <Route path="/auth/signup" element={<SignUp />} />

      </Routes>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <AppContent />
    </HashRouter>
  );
};

export default App;
