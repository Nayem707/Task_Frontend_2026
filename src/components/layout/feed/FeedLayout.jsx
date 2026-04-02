// FeedLayout.jsx
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import LeftSidebar from "./LeftSidebar";
import RightSidebar from "./RightSidebar";

const FeedLayout = () => {
  return (
    <div className="flex flex-col ">
      {/* Top Navbar */}
      <Navbar />

      {/* Main content area */}
      <div className="flex flex-1 mx-auto max-w-[1320px] w-full">
        {/* Left Sidebar */}
        <div className="hidden md:block pt-4 ">
          <LeftSidebar />
        </div>

        {/* Center Feed */}
        <div className="flex-1 p-4 overflow-y-auto">
          <Outlet />
        </div>

        {/* Right Sidebar */}
        <div className="hidden xl:block pt-4 overflow-y-auto">
          <RightSidebar />
        </div>
      </div>
    </div>
  );
};

export default FeedLayout;
