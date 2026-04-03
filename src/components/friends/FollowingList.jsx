import FollowingCard from "./FollowingCard";

function FollowingList({ users, onUnfollow, loading }) {
  if (loading) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-sm">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-sm">
        <p className="text-gray-500">You are not following anyone yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {users.map((user) => (
        <FollowingCard key={user.id} user={user} onUnfollow={onUnfollow} />
      ))}
    </div>
  );
}

export default FollowingList;
