// FeedLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

const FeedLayout = () => {
  return (
    <div className="flex flex-col min-h-screen mx-auto  w-full max-w-7xl ">
      {/* Top Navbar */}
      <Navbar />

      {/* Main content area */}
      <div className="flex flex-1 bg-gray-50">
        {/* Left Sidebar */}
        <div className="hidden md:block w-64 bg-white border-r border-gray-200 p-4 sticky top-0 h-screen">
          <LeftSidebar />
        </div>

        {/* Center Feed */}
        <div className="flex-1 p-6 overflow-y-auto max-h-screen">
          <Outlet />
        </div>

        {/* Right Sidebar */}
        <div className="hidden xl:block w-64 bg-white border-l border-gray-200 p-4 sticky top-0 h-screen">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default FeedLayout;
