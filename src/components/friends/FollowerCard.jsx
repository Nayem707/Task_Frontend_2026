import { UserPlus, Check } from "lucide-react";
import { Link } from "react-router-dom";

function FollowerCard({ user, onFollow }) {
  const initial = user.name.charAt(0).toUpperCase();
  const isFollowingBack = user.isFollowing;

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md">
      <div className="relative h-20 bg-gradient-to-r from-purple-400 to-pink-400">
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
          onClick={() => onFollow(user.id)}
          className={`mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg py-1.5 text-xs font-medium transition ${
            isFollowingBack
              ? "border border-gray-200 text-gray-500 hover:bg-gray-50"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {isFollowingBack ? (
            <>
              <Check size={13} /> Following
            </>
          ) : (
            <>
              <UserPlus size={13} /> Follow Back
            </>
          )}
        </button>
      </div>
    </div>
  );
}

export default FollowerCard;
