import { UserMinus, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";

function FriendCard({ friend, onRemove }) {
  const initial = friend.name?.charAt(0).toUpperCase() || "U";

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md">
      <div className="relative h-20 bg-gradient-to-r from-green-200 to-teal-100">
        <div className="absolute -bottom-6 left-1/2 -translate-x-1/2">
          {friend.avatarUrl ? (
            <img
              src={friend.avatarUrl}
              alt={friend.name}
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
        <Link to={`/profile/${friend.id}`}>
          <h3 className="truncate text-sm font-semibold text-gray-900 hover:underline">
            {friend.name}
          </h3>
        </Link>
        <p className="mt-0.5 truncate text-xs text-gray-400">
          {friend.bio || friend.email || ""}
        </p>
        <button
          onClick={() => onRemove(friend.id)}
          className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg border border-gray-200 py-1.5 text-xs font-medium text-gray-600 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600"
        >
          <UserPlus size={13} />
          Follow Back
        </button>
      </div>
    </div>
  );
}

export default FriendCard;
