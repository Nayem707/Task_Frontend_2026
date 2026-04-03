import FriendRequestCard from "./FriendRequestCard";

function FriendRequestsList({ requests, onAccept, onDecline }) {
  if (requests.length === 0) {
    return (
      <div className="rounded-lg bg-white p-6 text-center shadow-sm sm:rounded-xl sm:p-8">
        <p className="text-sm text-gray-500">No pending friend requests.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-2 sm:gap-4 md:grid-cols-3 lg:grid-cols-5">
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
