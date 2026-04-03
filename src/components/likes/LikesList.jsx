function LikesList({ users = [], loading = false }) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-8">
        <span className="text-sm text-[#6f7d92]">Loading...</span>
      </div>
    );
  }

  if (!users.length) {
    return (
      <p className="py-4 text-center text-sm text-[#6f7d92]">No likes yet.</p>
    );
  }

  return (
    <ul className="max-h-80 space-y-1 overflow-y-auto pr-1">
      {users.map((user) => (
        <li
          key={user.id}
          className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-[#f5f7fb]"
        >
          {user.avatarUrl ? (
            <img
              src={user.avatarUrl}
              alt={user.name}
              className="h-9 w-9 flex-shrink-0 rounded-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-[#d0d9e8] text-sm font-semibold text-[#4c5a71]">
              {(user.name || "U").charAt(0).toUpperCase()}
            </div>
          )}
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-[#112032]">
              {user.name}
            </p>
            {user.email && (
              <p className="truncate text-xs text-[#7c889d]">{user.email}</p>
            )}
          </div>
        </li>
      ))}
    </ul>
  );
}

export default LikesList;
