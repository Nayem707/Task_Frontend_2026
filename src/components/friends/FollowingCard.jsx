import { UserMinus } from "lucide-react";
import { Link } from "react-router-dom";

function FollowingCard({ user, onUnfollow }) {
  const initial = user.name.charAt(0).toUpperCase();

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md">
      <div className="relative h-20 bg-gradient-to-r from-blue-200 to-indigo-300">
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="h-14 w-14 rounded-full border-4 border-white object-cover shadow"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-full border-4 border-white bg-gray-200 text-xl font-bold text-gray-500 shadow">
              {initial}
            </div>
          )}
        </div>
      </div>
      <div className="px-3 pt-8 pb-4 text-center">
        <Link to={`/profile/${user.id}`}>
          <h3 className="truncate text-sm font-semibold text-gray-900 hover:underline">
            {user.name}
          </h3>
        </Link>
        <p className="mt-0.5 truncate text-xs text-gray-400">
          {user.bio || user.email || ""}
        </p>
        <button
          onClick={() => onUnfollow(user.id)}
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-gray-200 py-1.5 text-xs font-medium text-gray-600 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600"
        >
          <UserMinus size={13} />
          Unfollow
        </button>
      </div>
    </div>
  );
}

export default FollowingCard;
