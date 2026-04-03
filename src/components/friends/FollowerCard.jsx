import { UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

function FollowerCard({ user, onFollow }) {
  const initial = user.name.charAt(0).toUpperCase();
  const isFollowingBack = user.isFollowing;

  return (
    <div className="flex items-center justify-between rounded-lg bg-white p-2.5 shadow-sm sm:p-3">
      <div className="flex items-center gap-2 sm:gap-3">
        <Link to={`/profile/${user.id}`}>
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="h-9 w-9 rounded-full object-cover sm:h-10 sm:w-10"
            />
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-600 sm:h-10 sm:w-10 sm:text-sm">
              {initial}
            </div>
          )}
        </Link>
        <div className="min-w-0">
          <Link to={`/profile/${user.id}`}>
            <h3 className="truncate text-xs font-semibold text-gray-900 hover:underline sm:text-sm">
              {user.name}
            </h3>
          </Link>
          <p className="truncate text-[10px] text-gray-500 sm:text-xs">
            {user.email}
          </p>
        </div>
      </div>
      <button
        onClick={() => onFollow(user.id)}
        className={`flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1.5 text-[10px] font-medium transition sm:px-3 sm:text-xs ${
          isFollowingBack
            ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        <UserPlus size={12} className="sm:size-[14px]" />
        <span className="hidden sm:inline">
          {isFollowingBack ? "Following" : "Follow Back"}
        </span>
        <span className="sm:hidden">
          {isFollowingBack ? "Following" : "Follow"}
        </span>
      </button>
    </div>
  );
}

export default FollowerCard;
