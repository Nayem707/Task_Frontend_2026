import FollowerCard from "./FollowerCard";

function FollowersList({ users, onFollow, loading }) {
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
        <p className="text-gray-500">You don't have any followers yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {users.map((user) => (
        <FollowerCard key={user.id} user={user} onFollow={onFollow} />
      ))}
    </div>
  );
}

export default FollowersList;
