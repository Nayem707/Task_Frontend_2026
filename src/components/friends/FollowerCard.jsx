import { UserPlus } from "lucide-react";

function FollowerCard({ user, onFollow }) {
  const initial = user.name.charAt(0).toUpperCase();
  const isFollowingBack = user.isFollowing;

  return (
    <div className="flex items-center justify-between rounded-lg bg-white p-3 shadow-sm">
      <div className="flex items-center gap-3">
        {user.avatarUrl ? (
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-sm font-semibold text-gray-600">
            {initial}
          </div>
        )}
        <div>
          <h3 className="text-sm font-semibold text-gray-900">{user.name}</h3>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
      </div>
      <button
        onClick={() => onFollow(user.id)}
        className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition ${
          isFollowingBack
            ? "bg-gray-100 text-gray-700 hover:bg-gray-200"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        <UserPlus size={14} />
        {isFollowingBack ? "Following" : "Follow Back"}
      </button>
    </div>
  );
}

export default FollowerCard;
