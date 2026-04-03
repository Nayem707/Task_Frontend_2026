import { UserMinus, UserPlus } from "lucide-react";

function FollowingCard({ user, onUnfollow }) {
  const initial = user.name.charAt(0).toUpperCase();

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
        onClick={() => onUnfollow(user.id)}
        className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-200"
      >
        <UserMinus size={14} />
        Unfollow
      </button>
    </div>
  );
}

export default FollowingCard;
