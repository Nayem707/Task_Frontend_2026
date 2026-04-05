import FollowingCard from "./FollowingCard";

function FollowingList({ users, onUnfollow, loading }) {
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
          You are not following anyone yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-4 lg:grid-cols-5">
      {users.map((user) => (
        <FollowingCard key={user.id} user={user} onUnfollow={onUnfollow} />
      ))}
    </div>
  );
}

export default FollowingList;
