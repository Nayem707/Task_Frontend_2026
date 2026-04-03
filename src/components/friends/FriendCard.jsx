import { UserMinus, MoreHorizontal } from "lucide-react";
import { Link } from "react-router-dom";

function FriendCard({ friend, onRemove }) {
  return (
    <div className="overflow-hidden rounded-lg bg-white shadow-sm transition hover:shadow-md sm:rounded-xl">
      <Link to={`/profile/${friend.id}`}>
        <img
          src={friend.avatar}
          alt={friend.name}
          className="h-32 w-full object-cover sm:h-40"
        />
      </Link>
      <div className="p-2.5 sm:p-3">
        <Link to={`/profile/${friend.id}`}>
          <h3 className="text-sm font-semibold text-gray-900 hover:underline">
            {friend.name}
          </h3>
        </Link>
        <p className="text-[10px] text-gray-500 sm:text-xs">
          @{friend.username}
        </p>
        <p className="mt-0.5 text-[10px] text-gray-500 sm:mt-1 sm:text-xs">
          {friend.mutualFriends} mutual friends
        </p>
        <div className="mt-2 flex gap-1.5 sm:mt-3 sm:gap-2">
          <button
            onClick={() => onRemove(friend.id)}
            className="flex flex-1 items-center justify-center gap-1 rounded-full bg-gray-100 px-2.5 py-1.5 text-[10px] font-medium text-gray-700 transition hover:bg-gray-200 sm:px-3 sm:text-xs"
          >
            <UserMinus size={12} className="sm:size-[14px]" />
            Remove
          </button>
          <button className="flex items-center justify-center rounded-full bg-gray-100 p-1.5 text-gray-700 transition hover:bg-gray-200">
            <MoreHorizontal size={14} className="sm:size-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FriendCard;
