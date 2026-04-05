import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchFollowing, toggleFollow } from "../../../features/users/usersAPI";
import { UserMinus } from "lucide-react";
import { Link } from "react-router-dom";

const RightSidebar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);
  const followingUsers = useSelector((state) => state.users.following);
  const loadingFollowing = useSelector((state) => state.users.followingLoading);
  const unfollowLoadingId = useSelector((state) => state.users.followLoadingId);
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (user?.id) {
      dispatch(fetchFollowing(user.id));
    }
  }, [dispatch, user?.id]);

  const handleUnfollow = (userId) => {
    dispatch(toggleFollow(userId));
  };

  const filteredFollowing = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return followingUsers;

    return followingUsers.filter((item) => {
      const subtitle = item.bio || item.email || "";
      return (
        item.name.toLowerCase().includes(normalized) ||
        subtitle.toLowerCase().includes(normalized)
      );
    });
  }, [followingUsers, query]);

  return (
    <div className="space-y-4">
      {/* You Might Like */}
      <section className="app-card px-6 py-6">
        <div className="mb-6 flex items-center justify-between">
          <h4 className="text-sm font-semibold text-[#112032]">
            You Might Like
          </h4>
          <a href="#" className="text-xs font-medium text-[#377DFF]">
            See All
          </a>
        </div>
        <hr className="mb-5 border-[#edf1f7]" />
        <div className="mb-4 flex items-center gap-3">
          <img
            src="/images/Avatar.png"
            alt="Radovan SkillArena"
            className="h-11 w-11 shrink-0 rounded-full object-cover"
            loading="lazy"
          />
          <div>
            <h4 className="text-sm font-semibold text-[#112032]">
              Radovan SkillArena
            </h4>
            <p className="text-xs text-[#738098]">
              Founder &amp; CEO at Trophy
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="flex-1 rounded-lg border border-[#e7edf8] py-2 text-xs font-medium text-[#738098] hover:bg-[#f5f7fb]"
          >
            Ignore
          </button>
          <button
            type="button"
            className="flex-1 rounded-lg bg-[#377DFF] py-2 text-xs font-medium text-white hover:bg-[#2569e6]"
          >
            Follow
          </button>
        </div>
      </section>

      {/* Following */}
      <section className="app-card px-6 py-6">
        <div className="mb-5 flex items-center justify-between">
          <h4 className="text-sm font-semibold text-[#112032]">Following</h4>
          <a href="#" className="text-xs font-medium text-[#377DFF]">
            See All
          </a>
        </div>
        {/* Search */}
        <div className="relative mb-4">
          <svg
            className="absolute top-1/2 left-3 -translate-y-1/2 text-[#888]"
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="15"
            fill="none"
            viewBox="0 0 17 17"
          >
            <circle cx="7" cy="7" r="6" stroke="#666" />
            <path stroke="#666" strokeLinecap="round" d="M16 16l-3-3" />
          </svg>
          <input
            type="search"
            placeholder="input search text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-lg border border-[#e7edf8] bg-[#f5f7fb] py-2 pr-3 pl-9 text-xs text-[#112032] outline-none placeholder:text-[#a0aab8] focus:border-[#377DFF]"
          />
        </div>
        {/* Following list */}
        {loadingFollowing ? (
          <p className="text-xs text-[#738098]">Loading following users...</p>
        ) : filteredFollowing.length === 0 ? (
          <p className="text-xs text-[#738098]">No following users found.</p>
        ) : (
          <ul className="space-y-4">
            {filteredFollowing.map((person) => (
              <li
                key={person.id}
                className="flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-2">
                  <div className="relative h-12 w-12 shrink-0">
                    {person.avatarUrl ? (
                      <img
                        src={person.avatarUrl}
                        alt={person.name}
                        className="h-12 w-12 rounded-full object-cover"
                        loading="lazy"
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-200 text-lg font-semibold text-[#acb2b9]">
                        {person.name?.charAt(0).toUpperCase() || "U"}
                      </div>
                    )}
                    <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-white bg-green-500" />
                  </div>

                  <div className="max-w-[100px] min-w-0">
                    <Link
                      to={`/profile/${person.id}`}
                      className="truncate text-sm font-semibold text-[#112032] hover:underline"
                    >
                      {person.name}
                    </Link>

                    <p className="truncate text-xs text-[#738098]">
                      {person.bio || person.email}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => handleUnfollow(person.id)}
                  disabled={unfollowLoadingId === person.id}
                  className="flex items-center gap-1 rounded-xl border border-gray-300 bg-white px-2 py-1 text-xs font-medium text-gray-700 transition hover:border-red-300 hover:bg-red-50 hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {unfollowLoadingId === person.id ? (
                    <div className="h-2 w-2 animate-spin rounded-full border border-red-600 border-t-transparent" />
                  ) : (
                    <UserMinus size={12} />
                  )}
                  <span>
                    {unfollowLoadingId === person.id
                      ? "Unfollowing"
                      : "Unfollow"}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
};

export default RightSidebar;
