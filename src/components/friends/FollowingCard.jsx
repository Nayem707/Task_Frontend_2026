import { UserMinus, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

function FollowingCard({ user, onUnfollow }) {
  const initial = user.name.charAt(0).toUpperCase();

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
        onClick={() => onUnfollow(user.id)}
        className="flex shrink-0 items-center gap-1 rounded-full bg-gray-100 px-2.5 py-1.5 text-[10px] font-medium text-gray-700 transition hover:bg-gray-200 sm:px-3 sm:text-xs"
      >
        <UserMinus size={12} className="sm:size-[14px]" />
        Unfollow
      </button>
    </div>
  );
}

export default FollowingCard;
