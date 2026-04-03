import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  Users,
  UserPlus,
  MoreHorizontal,
  MapPin,
  Briefcase,
  Globe,
  UserCheck,
} from "lucide-react";
import { toggleFollow } from "../../../features/profile/profileAPI";

export const ProfileInfo = ({ user, currentUserId }) => {
  const dispatch = useDispatch();
  const [isFollowing, setIsFollowing] = useState(user?.isFollowing || false);
  const [followLoading, setFollowLoading] = useState(false);

  useEffect(() => {
    setIsFollowing(Boolean(user?.isFollowing));
  }, [user?.isFollowing]);

  const isOwnProfile = user?.id === currentUserId;

  const handleFollowClick = async () => {
    setFollowLoading(true);
    try {
      await dispatch(toggleFollow(user.id)).unwrap();
      setIsFollowing(!isFollowing);
    } catch (error) {
      console.error("Failed to toggle follow:", error);
    } finally {
      setFollowLoading(false);
    }
  };

  return (
    <div className="rounded-b-xl bg-white px-4 pb-4 shadow-sm md:px-6">
      <div className="flex flex-col items-start justify-between gap-4 pt-16 md:flex-row md:items-end">
        {/* User Details */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
            {user.firstName} {user.lastName}
          </h1>
          <div className="mt-1 flex items-center gap-2 text-gray-600">
            <Users size={14} />
            <span className="text-sm">{user.followers || 0} followers</span>
          </div>

          {/* Mutual Friends (if available) */}
          {user.mutualFriends && user.mutualFriends.length > 0 && (
            <div className="mt-2 flex flex-wrap items-center gap-2">
              {user.mutualFriends.slice(0, 3).map((friend) => (
                <img
                  key={friend.id}
                  src={friend.avatarUrl}
                  alt={friend.firstName}
                  title={`${friend.firstName} ${friend.lastName}`}
                  className="h-6 w-6 rounded-full border border-white"
                />
              ))}
              <span className="text-sm text-gray-500">
                {user.mutualFriends.length} mutual friends
              </span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-2">
          {isOwnProfile ? (
            <button className="flex items-center gap-2 rounded-full bg-gray-200 px-5 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-300">
              <MoreHorizontal size={14} /> Edit profile
            </button>
          ) : (
            <>
              <button
                onClick={handleFollowClick}
                disabled={followLoading}
                className={`flex items-center gap-2 rounded-full px-5 py-2 text-sm font-semibold transition ${
                  isFollowing
                    ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
              >
                {isFollowing ? (
                  <>
                    <UserCheck size={14} /> Following
                  </>
                ) : (
                  <>
                    <UserPlus size={14} /> Follow
                  </>
                )}
              </button>
              <button className="flex items-center gap-2 rounded-full bg-gray-200 px-5 py-2 text-sm font-semibold text-gray-800 transition hover:bg-gray-300">
                <MoreHorizontal size={14} />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Bio & Location Row */}
      <div className="mt-4 flex flex-wrap gap-4 text-sm text-gray-700">
        {user.location && (
          <span className="flex items-center gap-1">
            <MapPin size={14} /> {user.location}
          </span>
        )}
        {user.workplace && (
          <span className="flex items-center gap-1">
            <Briefcase size={14} /> {user.workplace}
          </span>
        )}
        {user.website && (
          <span className="flex items-center gap-1">
            <Globe size={14} /> {user.website}
          </span>
        )}
      </div>
      {user.bio && <p className="mt-2 text-sm text-gray-700">{user.bio}</p>}
    </div>
  );
};
