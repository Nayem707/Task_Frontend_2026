function FriendsTabs({
  activeTab,
  onTabChange,
  requestsCount,
  followingCount,
  followersCount,
}) {
  return (
    <div className="scrollbar-hide mb-4 flex gap-1 overflow-x-auto border-b border-gray-200 sm:mb-6 sm:gap-2">
      <button
        onClick={() => onTabChange("friends")}
        className={`shrink-0 px-3 py-2 text-xs font-semibold transition sm:px-4 sm:text-sm ${
          activeTab === "friends"
            ? "border-b-2 border-blue-600 text-blue-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        All Friends
      </button>
      <button
        onClick={() => onTabChange("requests")}
        className={`shrink-0 px-3 py-2 text-xs font-semibold transition sm:px-4 sm:text-sm ${
          activeTab === "requests"
            ? "border-b-2 border-blue-600 text-blue-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        <span className="hidden sm:inline">Friend </span>Requests
        {requestsCount > 0 && (
          <span className="ml-1 rounded-full bg-red-500 px-1.5 py-0.5 text-[10px] text-white sm:ml-2 sm:px-2 sm:text-xs">
            {requestsCount}
          </span>
        )}
      </button>
      <button
        onClick={() => onTabChange("following")}
        className={`shrink-0 px-3 py-2 text-xs font-semibold transition sm:px-4 sm:text-sm ${
          activeTab === "following"
            ? "border-b-2 border-blue-600 text-blue-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Following
        {followingCount > 0 && (
          <span className="ml-1 text-[10px] text-gray-400 sm:ml-2 sm:text-xs">
            {followingCount}
          </span>
        )}
      </button>
      <button
        onClick={() => onTabChange("followers")}
        className={`shrink-0 px-3 py-2 text-xs font-semibold transition sm:px-4 sm:text-sm ${
          activeTab === "followers"
            ? "border-b-2 border-blue-600 text-blue-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Followers
        {followersCount > 0 && (
          <span className="ml-1 text-[10px] text-gray-400 sm:ml-2 sm:text-xs">
            {followersCount}
          </span>
        )}
      </button>
    </div>
  );
}

export default FriendsTabs;
