import FriendCard from "./FriendCard";

function FriendsList({ friends, onRemoveFriend }) {
  if (friends.length === 0) {
    return (
      <div className="rounded-lg bg-white p-6 text-center shadow-sm sm:rounded-xl sm:p-8">
        <p className="text-sm text-gray-500">No friends found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
      {friends.map((friend) => (
        <FriendCard key={friend.id} friend={friend} onRemove={onRemoveFriend} />
      ))}
    </div>
  );
}

export default FriendsList;
