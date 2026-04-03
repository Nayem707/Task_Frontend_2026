// FeedLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";
import BottomNav from "./BottomNav";

const FeedLayout = () => {
  return (
    <div className="flex flex-col">
      {/* Top Navbar */}
      <Navbar />

      {/* Main content area */}
      <div className="mx-auto flex w-full max-w-[1320px] flex-1">
        {/* Left Sidebar */}
        <div className="scrollbar-hide sticky top-16 hidden max-h-[calc(100vh-5rem)] self-start overflow-y-auto pt-4 md:block">
          <LeftSidebar />
        </div>

        {/* Center Feed */}
        <div className="flex-1 overflow-y-auto p-2 pb-20 sm:p-4 sm:pb-4">
          <Outlet />
        </div>

        {/* Right Sidebar */}
        <div className="scrollbar-hide sticky top-16 hidden max-h-[calc(100vh-5rem)] self-start overflow-y-auto pt-4 xl:block">
          <RightSidebar />
        </div>
      </div>

      {/* Bottom Navigation - Mobile Only */}
      <BottomNav />
    </div>
  );
};

export default FeedLayout;
