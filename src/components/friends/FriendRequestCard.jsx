import { UserCheck, X } from "lucide-react";
import { Link } from "react-router-dom";

function FriendRequestCard({ request, onAccept, onDecline }) {
  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:shadow-md">
      <Link to={`/profile/${request.id}`}>
        <img
          src={request.avatar}
          alt={request.name}
          className="h-40 w-full object-cover"
        />
      </Link>
      <div className="p-3">
        <Link to={`/profile/${request.id}`}>
          <h3 className="font-semibold text-gray-900 hover:underline">
            {request.name}
          </h3>
        </Link>
        <p className="text-xs text-gray-500">@{request.username}</p>
        <p className="mt-1 text-xs text-gray-500">
          {request.mutualFriends} mutual friends
        </p>
        <div className="mt-3 flex gap-2">
          <button
            onClick={() => onAccept(request.id)}
            className="flex flex-1 items-center justify-center gap-1 rounded-full bg-blue-600 px-3 py-1.5 text-xs font-medium text-white transition hover:bg-blue-700"
          >
            <UserCheck size={14} />
            Confirm
          </button>
          <button
            onClick={() => onDecline(request.id)}
            className="flex items-center justify-center rounded-full bg-gray-100 p-1.5 text-gray-700 transition hover:bg-gray-200"
          >
            <X size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default FriendRequestCard;
