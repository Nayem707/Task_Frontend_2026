function FriendsTabs({
  activeTab,
  onTabChange,
  requestsCount,
  followingCount,
  followersCount,
}) {
  return (
    <div className="mb-6 flex gap-2 border-b border-gray-200">
      <button
        onClick={() => onTabChange("friends")}
        className={`px-4 py-2 text-sm font-semibold transition ${
          activeTab === "friends"
            ? "border-b-2 border-blue-600 text-blue-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        All Friends
      </button>
      <button
        onClick={() => onTabChange("requests")}
        className={`px-4 py-2 text-sm font-semibold transition ${
          activeTab === "requests"
            ? "border-b-2 border-blue-600 text-blue-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Friend Requests
        {requestsCount > 0 && (
          <span className="ml-2 rounded-full bg-red-500 px-2 py-0.5 text-xs text-white">
            {requestsCount}
          </span>
        )}
      </button>
      <button
        onClick={() => onTabChange("following")}
        className={`px-4 py-2 text-sm font-semibold transition ${
          activeTab === "following"
            ? "border-b-2 border-blue-600 text-blue-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Following
        {followingCount > 0 && (
          <span className="ml-2 text-xs text-gray-400">{followingCount}</span>
        )}
      </button>
      <button
        onClick={() => onTabChange("followers")}
        className={`px-4 py-2 text-sm font-semibold transition ${
          activeTab === "followers"
            ? "border-b-2 border-blue-600 text-blue-600"
            : "text-gray-500 hover:text-gray-700"
        }`}
      >
        Followers
        {followersCount > 0 && (
          <span className="ml-2 text-xs text-gray-400">{followersCount}</span>
        )}
      </button>
    </div>
  );
}

export default FriendsTabs;
