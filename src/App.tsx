import React from "react";
import Home from "./component/Pages/Home/Home";
import TopNavbar from "./component/Common/Navbar/TopNavBar/TopNavbar";
import SideNavBar from "./component/Common/Navbar/SideNavBar/SideNavBar";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import Chat from "./component/Pages/Chat/Chat";
import SignIn from "./Features/Auth/SignIn/SignIn";
import SignUp from "./Features/Auth/SignUp/SignUp";
import Explore from "./component/Pages/Explore/Explore";

const AppContent: React.FC = () => {
  const location = useLocation();

  const isChatLink = location.pathname === "/chat";
  const isExploreLink = location.pathname === "/explore";
  const isDarkPage = isChatLink || isExploreLink;

  if (isDarkPage) {
    return (
      <div className="flex min-h-screen bg-[#1f2327] text-white">
        {/* SIDEBAR */}
        <aside className="flex h-screen w-[234px] shrink-0 flex-col border-r border-white/10 bg-[#1f2327]">
          <SideNavBar />
        </aside>

        {/* MAIN APPLICATION AREA */}
        <div className="min-w-0 flex-1">
          <Routes>
            <Route path="/chat" element={<Chat />} />
            <Route path="/explore" element={<Explore />} />
          </Routes>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <TopNavbar />

      <Routes>
        <Route path="/" element={<Home />} />
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
