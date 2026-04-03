import FollowerCard from "./FollowerCard";

function FollowersList({ users, onFollow, loading }) {
  if (loading) {
    return (
      <div className="rounded-lg bg-white p-6 text-center shadow-sm sm:rounded-xl sm:p-8">
        <p className="text-sm text-gray-500">Loading...</p>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="rounded-lg bg-white p-6 text-center shadow-sm sm:rounded-xl sm:p-8">
        <p className="text-sm text-gray-500">
          You don't have any followers yet.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2 sm:space-y-2">
      {users.map((user) => (
        <FollowerCard key={user.id} user={user} onFollow={onFollow} />
      ))}
    </div>
  );
}

export default FollowersList;
