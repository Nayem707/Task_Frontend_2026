function LikesList({ users = [] }) {
  if (!users.length) {
    return <p className="text-sm text-[#6f7d92]">No likes yet.</p>;
  }

  return (
    <ul className="space-y-2">
      {users.map((user) => (
        <li
          key={user.id || user.email}
          className="flex items-center gap-3 rounded-lg border border-[#edf1f7] p-2"
        >
          <img
            src={user.avatarUrl || "/images/Avatar.png"}
            alt={user.name || "User avatar"}
            className="h-8 w-8 rounded-full object-cover"
            loading="lazy"
          />
          <div>
            <p className="text-sm font-medium text-[#112032]">
              {user.name || "Anonymous User"}
            </p>
            <p className="text-xs text-[#7c889d]">{user.email || "No email"}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default LikesList;
