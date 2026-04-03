import { Image as ImageIcon, Video } from "lucide-react";
import PostCard from "../../posts/PostCard";
import CreatePost from "../../posts/CreatePost";

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
      {currentUser?.id === user?.id && <CreatePost />}

      {/* Posts Feed */}
      {posts.map((post) => (
        <PostCard key={post.id} post={post} user={user} />
      ))}
    </div>
  );
};
