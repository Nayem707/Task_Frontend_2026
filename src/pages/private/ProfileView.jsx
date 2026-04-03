import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  fetchUserProfile,
  fetchUserPosts,
  fetchFollowers,
  fetchFollowing,
} from "../../features/profile/profileAPI";
import { ProfileHeader } from "../../components/profile/common/ProfileHeader";
import { ProfileInfo } from "../../components/profile/common/ProfileInfo";
import { TabNavigation } from "../../components/profile/common/TabNavigation";
import {
  IntroCard,
  PhotosPreview,
  FriendsPreview,
} from "../../components/profile/common/SidebarCards";
import { PostsTab } from "../../components/profile/tabs/PostsTab";
import { AboutTab } from "../../components/profile/tabs/AboutTab";
import { FriendsTab } from "../../components/profile/tabs/FriendsTab";
import { PhotosTab } from "../../components/profile/tabs/PhotosTab";

const ProfileView = () => {
  const dispatch = useDispatch();
  const { userId } = useParams();
  const [activeTab, setActiveTab] = useState("posts");

  const currentUser = useSelector((state) => state.auth.user);
  const {
    user,
    posts = [],
    followers = [],
    loading,
    error,
  } = useSelector((state) => state.profile);

  // Use userId from route params or current user's ID
  const profileUserId = userId || currentUser?.id;

  useEffect(() => {
    if (!profileUserId) return;

    // Fetch all profile data
    dispatch(fetchUserProfile(profileUserId));
    dispatch(fetchUserPosts({ userId: profileUserId }));
    dispatch(fetchFollowers(profileUserId));
    dispatch(fetchFollowing(profileUserId));
  }, [profileUserId, dispatch]);

  if (loading && !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="mb-4 inline-flex h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error && !user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="rounded-lg bg-white p-6 text-center shadow-sm">
          <p className="mb-2 font-semibold text-red-600">
            Failed to load profile
          </p>
          <p className="text-sm text-gray-600">
            {error?.message || "An error occurred"}
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <p className="text-gray-600">Profile not found</p>
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "posts":
        return (
          <PostsTab
            posts={posts}
            user={user}
            currentUser={currentUser}
            loading={loading}
          />
        );
      case "about":
        return <AboutTab user={user} />;
      case "friends":
        return <FriendsTab friends={followers} />;
      case "photos":
        return <PhotosTab photos={user.photos || []} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="mx-auto max-w-7xl px-2 sm:px-4">
        {/* Header with Cover and Profile */}
        <ProfileHeader user={user} />
        <ProfileInfo user={user} currentUserId={currentUser?.id} />

        {/* Tabs Navigation */}
        <div className="mt-4 sm:mt-6">
          <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>

        {/* Two Column Layout */}
        <div className="mt-4 flex flex-col gap-4 sm:mt-6 sm:gap-6 lg:flex-row">
          {/* Left Sidebar */}
          <div className="space-y-4 sm:space-y-6 lg:w-5/12">
            <IntroCard user={user} />
            <PhotosPreview photos={user?.photos || []} />
            <FriendsPreview
              friends={Array.isArray(followers) ? followers.slice(0, 3) : []}
            />
          </div>

          {/* Right Column (Tab Content) */}
          <div className="lg:w-7/12">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
