export const FriendsTab = ({ friends = [] }) => {
  // Ensure friends is always an array
  const friendsList = Array.isArray(friends) ? friends : [];

  if (friendsList.length === 0) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-sm">
        <p className="text-gray-500">No friends yet</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-xl font-bold">Friends</h3>
        <span className="cursor-pointer text-sm text-blue-600 hover:underline">
          See all friends
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {friendsList.map((friend) => (
          <div
            key={friend.id}
            className="flex items-center space-x-3 rounded-lg bg-gray-50 p-2"
          >
            <img
              src={friend.avatarUrl || "/images/profile.png"}
              alt={`${friend.firstName} ${friend.lastName}`}
              className="h-12 w-12 rounded-full object-cover"
            />
            <div>
              <div className="font-semibold">
                {friend.firstName} {friend.lastName}
              </div>
              <div className="text-xs text-gray-500">2 mutual friends</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
