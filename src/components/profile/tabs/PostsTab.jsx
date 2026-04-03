import {
  MoreHorizontal,
  Heart,
  MessageCircle,
  Share2,
  Image as ImageIcon,
  Video,
} from "lucide-react";

export const PostsTab = ({ posts, user, loading }) => {
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
            src={user.avatarUrl || "/images/profile.png"}
            alt="profile"
            className="h-10 w-10 rounded-full object-cover"
          />
          <div className="flex-1 cursor-pointer rounded-full bg-gray-100 px-4 py-2 text-gray-500 transition hover:bg-gray-200">
            What's on your mind, {user.firstName}?
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
        <div
          key={post.id}
          className="overflow-hidden rounded-xl bg-white shadow-sm"
        >
          <div className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <img
                  src={
                    post.author?.avatarUrl ||
                    post.author?.profilePicture ||
                    "/images/profile.png"
                  }
                  alt="avatar"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">
                    {post.author?.firstName} {post.author?.lastName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {post.createdAt
                      ? new Date(post.createdAt).toLocaleDateString()
                      : post.time}
                  </div>
                </div>
              </div>
              <MoreHorizontal
                className="cursor-pointer text-gray-500"
                size={18}
              />
            </div>
            <p className="mt-3 text-gray-800">{post.content}</p>
          </div>
          {(post.images?.length > 0 || post.imageUrl) && (
            <img
              src={post.images?.[0] || post.imageUrl}
              alt="post"
              className="h-96 w-full object-cover"
            />
          )}
          <div className="flex justify-around border-t border-gray-100 p-3">
            <div className="flex cursor-pointer items-center space-x-2 rounded-lg px-4 py-1 text-gray-600 hover:bg-gray-100">
              <Heart
                className="text-red-500"
                size={18}
                fill={post.isLiked ? "currentColor" : "none"}
              />
              <span>{post.likesCount || 0}</span>
            </div>
            <div className="flex cursor-pointer items-center space-x-2 rounded-lg px-4 py-1 text-gray-600 hover:bg-gray-100">
              <MessageCircle size={18} />
              <span>{post.commentsCount || 0}</span>
            </div>
            <div className="flex cursor-pointer items-center space-x-2 rounded-lg px-4 py-1 text-gray-600 hover:bg-gray-100">
              <Share2 size={18} />
              <span>Share</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
