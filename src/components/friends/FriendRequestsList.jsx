import FriendRequestCard from "./FriendRequestCard";

function FriendRequestsList({ requests, onAccept, onDecline }) {
  if (requests.length === 0) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-sm">
        <p className="text-gray-500">No pending friend requests.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {requests.map((request) => (
        <FriendRequestCard
          key={request.id}
          request={request}
          onAccept={onAccept}
          onDecline={onDecline}
        />
      ))}
    </div>
  );
}

export default FriendRequestsList;
