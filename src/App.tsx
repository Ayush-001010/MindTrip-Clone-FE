import React, { useEffect } from "react";
import Blogs from "./component/Pages/Blogs/Blogs";
import Home from "./component/Pages/Home/Home";
import TopNavbar from "./component/Common/Navbar/TopNavBar/TopNavbar";
import SideNavBar from "./component/Common/Navbar/SideNavBar/SideNavBar";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import Chat from "./component/Pages/Chat/Chat";
import SignIn from "./Features/Auth/SignIn/SignIn";
import SignUp from "./Features/Auth/SignUp/SignUp";
import Explore from "./component/Pages/Explore/Explore";
import ProtectedRoute from "./Features/Auth/ProtectedRoute/ProtectedRoute";
import AuthCallback from "./Features/Auth/AuthCallback/AuthCallback";
import { useDispatch } from "react-redux";
import { setUserDetailsData } from "./Redux/Slices/UserDetails/UserDetails";
import Blog from "./component/Pages/Blogs/Blog/Blog";

const AppContent: React.FC = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const isChatLink = location.pathname.includes("/chat");
  const isExploreLink = location.pathname.includes("/explore");
  const isBlogLink = location.pathname.includes("/blog");
  const isDarkPage = isChatLink || isExploreLink || isBlogLink;

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    const getItem = localStorage.getItem("userDetails");
    if (getItem) {
      const userDetails = JSON.parse(getItem);
      dispatch(setUserDetailsData(userDetails));
    }
  }, []);

  return (
    <div
      className={
        isDarkPage
          ? "flex min-h-screen w-full min-w-0 overflow-x-hidden bg-[#04080f] text-white"
          : "min-h-screen w-full overflow-x-hidden bg-[#f7fbfa] text-black"
      }
    >
      {/* MOBILE MENU BUTTON */}
      {isDarkPage && (
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="fixed right-4 top-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#272c31] text-white shadow-lg md:hidden"
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
          className="fixed inset-0 z-40 bg-black/60 md:hidden"
          aria-label="Close navigation"
        />
      )}

      {/* SIDEBAR */}
      {isDarkPage && <aside className="flex shrink-0 flex-col border-r border-white/10 bg-[#1f2327]">
        <SideNavBar />
      </aside>}
      {!isDarkPage && <TopNavbar />}

      {/* MAIN APPLICATION AREA */}
      <div className="min-w-0 flex-1">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/chat/:tripId" element={<Chat />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={<SignUp />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/blogs" element={<Blogs/>} />
          <Route path="/blog/create" element={<Blog />} />

          {/* Protected routes */}
          <Route element={<ProtectedRoute />}>
            <Route path="/chat" element={<Chat />} />
            <Route path="/explore" element={<Explore />} />
          </Route>
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