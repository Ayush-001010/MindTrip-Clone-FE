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
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);
  React.useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  return (
    <div
      className={`${
        isDarkPage
          ? "flex min-h-screen bg-[#04080f] text-white"
          : "min-h-screen bg-white text-black"
      }`}
    >
      {/* MOBILE MENU BUTTON */}
      {isDarkPage && (
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="fixed right-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#272c31] text-white shadow-lg lg:hidden"
          aria-label="Open navigation"
        >
          ☰
        </button>
      )}

      {/* MOBILE BACKDROP */}
      {isDarkPage && isSidebarOpen && (
        <button
          type="button"
          onClick={() => setIsSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          aria-label="Close navigation"
        />
      )}

      {/* SIDEBAR */}
      {isDarkPage && (
        <aside
          className={`fixed inset-y-0 left-0 z-50 w-[234px] shrink-0 border-r border-white/10 bg-[#1f2327] transition-transform duration-300 lg:static lg:flex lg:h-screen lg:translate-x-0 ${
            isSidebarOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }`}
        >
          <SideNavBar />
        </aside>
      )}

      {!isDarkPage && <TopNavbar />}

      {/* MAIN APPLICATION AREA */}
      <div className="min-w-0 flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
        </Routes>
      </div>
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
