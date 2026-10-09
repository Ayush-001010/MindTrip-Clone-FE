import React, { useEffect, createContext, useContext, useState } from "react";
import Home from "./component/Pages/Home/Home";
import TopNavbar from "./component/Common/Navbar/TopNavBar/TopNavbar";
import SideNavBar from "./component/Common/Navbar/SideNavBar/SideNavBar";
import { HashRouter, Route, Routes, useLocation } from "react-router-dom";
import type { IFavouritesActivity } from "./Interface/DataInterface/IFavouritesActivity";
import type { IFavouritesHotel } from "./Interface/DataInterface/IFavouritesHotel";
import SignIn from "./Features/Auth/SignIn/SignIn";
import SignUp from "./Features/Auth/SignUp/SignUp";
import Explore from "./component/Pages/Explore/Explore";
import ProtectedRoute from "./Features/Auth/ProtectedRoute/ProtectedRoute";
import AuthCallback from "./Features/Auth/AuthCallback/AuthCallback";
import Invite from "./component/Pages/Invite/Invite";
import Blog from "./component/Pages/Blog/Blog";
import Inspiration from "./component/Pages/Inspiration/Inspiration";
import useFavorites from "./customHookWithUI/useFavorites";
import Chat from "./component/Pages/Chat/Chat";
import type { IFavouritesBlog } from "./Interface/DataInterface/IFavouritesBlog";


export interface IAppContext {
  favoritesConfig: {
    openFavorites: boolean;
    uiType: "create-collection" | "show-collection-for-add-purpose" | undefined;
  };
  changeFavoritesConfig: (config: { openFavorites: boolean; uiType: "create-collection" | "show-collection-for-add-purpose" | undefined , data?: IFavouritesActivity | IFavouritesHotel | IFavouritesBlog, mode?: "activity" | "hotel" | "blog" }) => void;
  data?: IFavouritesActivity | IFavouritesHotel | IFavouritesBlog;
  mode?: "activity" | "hotel" | "blog";
}

const AppContext = createContext<IAppContext>(
  {
    favoritesConfig: {
      openFavorites: false,
      uiType: undefined
    },
    changeFavoritesConfig: () => { }
  }
);

export const useGetAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}

const AppContent: React.FC = () => {
  const location = useLocation();

  const isChatLink = location.pathname.includes("/chat");
  const isExploreLink = location.pathname.includes("/explore");
  const isBlogLink = location.pathname.includes("/blog");
  const isInspirationLink = location.pathname.includes("/inspiration");
  const { favoritesConfig, data: favoritesData, mode: favoritesMode } = useGetAppContext();
  const isDarkPage = isChatLink || isExploreLink || isBlogLink || isInspirationLink;
  const faviorites = useFavorites(favoritesConfig.openFavorites, favoritesConfig.uiType ?? "show-collection-for-add-purpose", favoritesData, favoritesMode);

  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);
  return (
    <div
      className={
        isDarkPage
          ? "flex h-screen w-full min-w-0 overflow-hidden bg-[#04080f] text-white"
          : "min-h-screen w-full overflow-x-hidden bg-[#f7fbfa] text-black"
      }
    >
      {faviorites}
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
      {isDarkPage && <aside className="flex h-screen shrink-0 flex-col border-r border-white/10 bg-[#1f2327]">
        <SideNavBar />
      </aside>}
      {!isDarkPage && <TopNavbar />}

      {/* MAIN APPLICATION AREA */}
      <div className={`min-w-0 flex-1 ${isDarkPage ? "h-screen overflow-y-auto" : ""}`}>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/chat/:tripId" element={<Chat />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/auth/signin" element={<SignIn />} />
          <Route path="/auth/signup" element={< SignUp />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/invite/:inviteId" element={<Invite />} />
          <Route path="/blog/create" element={<Blog key="blog-create" />} />
          <Route path="/inspiration" element={<Inspiration />} />
          <Route path="/inspiration/blog/:blogId" element={<Blog key="blog-preview" />} />
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
  const [favoritesConfig, setFavoritesConfig] = useState<{ openFavorites: boolean; uiType: "create-collection" | "show-collection-for-add-purpose" | undefined , data?: IFavouritesActivity | IFavouritesHotel | IFavouritesBlog, mode?: "activity" | "hotel" | "blog" }>({ openFavorites: false, uiType: undefined });

  return (
    <HashRouter>
      <AppContext.Provider value={{
        favoritesConfig,
        changeFavoritesConfig: setFavoritesConfig,
        data: favoritesConfig.data,
        mode: favoritesConfig.mode,
      }}>
        <AppContent />
      </AppContext.Provider>
    </HashRouter>
  );
};

export default App;