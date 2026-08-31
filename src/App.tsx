import React from 'react';
import Home from './component/Pages/Home/Home';
import TopNavbar from './component/Common/Navbar/TopNavbar';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(252,230,214,0.75),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(216,234,230,0.7),_transparent_28%),linear-gradient(180deg,_#fffaf4_0%,_#f8f5ef_52%,_#f1f6f2_100%)] text-slate-800">
      <div>
        <TopNavbar />
        <Home />
      </div>
    </div>
  );
};

export default App;
