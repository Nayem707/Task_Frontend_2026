import FriendCard from "./FriendCard";

function FriendsList({ friends, onRemoveFriend }) {
  if (friends.length === 0) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-sm">
        <p className="text-gray-500">No friends found.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
      {friends.map((friend) => (
        <FriendCard key={friend.id} friend={friend} onRemove={onRemoveFriend} />
      ))}
    </div>
  );
}

export default FriendsList;
