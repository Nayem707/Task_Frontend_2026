import { Image as ImageIcon, Video } from "lucide-react";
import PostCard from "../../posts/PostCard";

export const PostsTab = ({ posts, user, currentUser, loading }) => {
  if (loading && !posts.length) {
    return (
      <div className="space-y-4">
        {[1, 2].map((i) => (
          <div
            key={i}
            className="animate-pulse rounded-xl bg-white p-4 shadow-sm"
          >
            <div className="h-4 w-1/2 rounded bg-gray-200"></div>
            <div className="mt-3 h-3 w-full rounded bg-gray-200"></div>
            <div className="mt-2 h-64 w-full rounded bg-gray-200"></div>
          </div>
        ))}
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="rounded-xl bg-white p-8 text-center shadow-sm">
        <p className="text-gray-500">No posts yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Create Post Box - Only show if it's own profile */}
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="flex items-center space-x-3">
          <img
            src={(currentUser ?? user)?.avatarUrl || "/images/profile.png"}
            alt="profile"
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="flex-1 cursor-pointer rounded-full bg-gray-100 px-4 py-2 text-gray-500 transition hover:bg-gray-200">
            What's on your mind, {(currentUser ?? user)?.firstName}?
          </div>
          <div className="flex space-x-2 text-gray-500">
            <div className="cursor-pointer rounded-full p-2 hover:bg-gray-100">
              <Video size={20} className="text-red-500" />
            </div>
            <div className="cursor-pointer rounded-full p-2 hover:bg-gray-100">
              <ImageIcon size={20} className="text-green-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Posts Feed */}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} user={user} />
      ))}
    </div>
  );
};
