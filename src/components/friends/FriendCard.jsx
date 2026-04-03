import { UserMinus, MoreHorizontal } from "lucide-react";

function FriendCard({ friend, onRemove }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md">
      <img
        src={friend.avatar}
        alt={friend.name}
        className="h-40 w-full object-cover"
      />
      <div className="p-3">
        <h3 className="font-semibold text-gray-900">{friend.name}</h3>
        <p className="text-xs text-gray-500">@{friend.username}</p>
        <p className="mt-1 text-xs text-gray-500">
          {friend.mutualFriends} mutual friends
        </p>
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => onRemove(friend.id)}
            className="flex flex-1 items-center justify-center gap-1 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-200"
          >
            <UserMinus size={14} />
            Remove
          </button>
          <button className="flex items-center justify-center rounded-full bg-gray-100 p-1.5 text-gray-700 transition hover:bg-gray-200">
            <MoreHorizontal size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FriendCard;
