import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
  Bookmark,
  EyeOff,
  Trash2,
  MoreVertical,
  MessageSquare,
  Share2,
  Smile,
} from "lucide-react";
import { deletePost, togglePostLike } from "../../features/posts/postsAPI";
import { patchPostLikeOptimistic } from "../../features/posts/postsSlice";
import { fetchLikesList } from "../../features/likes/likesAPI";
import { formatDateTime } from "../../utils/helpers";
import Modal from "../common/Modal";
import CommentList from "../comments/CommentList";
import LikesList from "../likes/LikesList";

function PostCard({ post }) {
  const dispatch = useDispatch();
  const [likesOpen, setLikesOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const key = `post:${post.id}`;
  const likesUsers = useSelector(
    (state) => state.likes.likesByEntity[key] || []
  );

  const handleToggleLike = async () => {
    const optimistic = !post.likedByMe;
    dispatch(patchPostLikeOptimistic({ postId: post.id, liked: optimistic }));
    try {
      await dispatch(togglePostLike(post.id)).unwrap();
    } catch {
      dispatch(
        patchPostLikeOptimistic({ postId: post.id, liked: !optimistic })
      );
      toast.error("Could not update like");
    }
  };

  const handleOpenLikes = async () => {
    setLikesOpen(true);
    dispatch(fetchLikesList({ entityType: "post", entityId: post.id }));
  };

  const handleDelete = async () => {
    setDropOpen(false);
    try {
      await dispatch(deletePost(post.id)).unwrap();
      toast.success("Post deleted");
    } catch {
      toast.error("Could not delete post");
    }
  };

  const reactImages = [
    "/images/react_img1.png",
    "/images/react_img2.png",
    "/images/react_img3.png",
    "/images/react_img4.png",
    "/images/react_img5.png",
  ];

  return (
    <article className="app-card mb-4 overflow-hidden pt-4">
      {/* Post Header */}
      <div className="mb-3 flex items-start justify-between gap-2 px-6">
        <div className="flex items-center gap-3">
          {/* Letter Avatar */}
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gray-200 text-lg font-semibold text-[#acb2b9]">
            {post.author?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div>
            <p className="text-sm font-semibold text-[#112032]">
              {post.author?.name || "Unknown Author"}
            </p>
            <p className="text-xs text-[#79879d]">
              {formatDateTime(post.createdAt)} .{" "}
              <a href="#" className="hover:underline">
                {post.visibility || "Public"}
              </a>
            </p>
          </div>
        </div>

        {/* 3-dot dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setDropOpen((v) => !v)}
            className="rounded-lg p-1 hover:bg-[#f3f6fb]"
          >
            <MoreVertical size={18} className="text-[#C4C4C4]" />
          </button>
          {dropOpen && (
            <div className="absolute top-full right-0 z-20 mt-1 w-44 rounded-xl border border-[#e7edf8] bg-white shadow-lg">
              <ul className="py-1">
                <li>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-[#4c5a71] hover:bg-[#f5f7fb]"
                  >
                    <Bookmark size={18} className="text-[#1890FF]" />
                    Save Post
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-[#4c5a71] hover:bg-[#f5f7fb]"
                  >
                    <EyeOff size={18} className="text-[#1890FF]" />
                    Hide
                  </button>
                </li>
                {post.isOwner ? (
                  <li>
                    <button
                      type="button"
                      onClick={handleDelete}
                      className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-red-500 hover:bg-[#fff5f5]"
                    >
                      <Trash2 size={18} className="text-red-500" />
                      Delete Post
                    </button>
                  </li>
                ) : null}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-6">
        <p className="mb-3 text-sm font-semibold text-[#112032]">
          {post.content}
        </p>
      </div>

      {/* Image */}
      {post.imageUrl ? (
        <div className="mb-4">
          <img
            src={post.imageUrl}
            alt="Post"
            className="max-h-110 w-full object-contain"
            loading="lazy"
          />
        </div>
      ) : null}

      {/* Reaction counts */}
      <div className="mb-4 flex items-center justify-between px-6">
        <div className="flex items-center gap-1">
          <div className="flex -space-x-1">
            {reactImages.slice(0, 5).map((src, i) => (
              <img
                key={i}
                src={src}
                alt=""
                className="h-6 w-6 rounded-full border-2 border-white object-cover"
                loading="lazy"
              />
            ))}
          </div>
          <button
            type="button"
            onClick={handleOpenLikes}
            className="ml-1 text-xs text-[#738098] hover:text-[#112032]"
          >
            Like{" "}
            {post.likesCount > 0
              ? `${post.likesCount > 9 ? "9+" : post.likesCount}`
              : ""}
          </button>
        </div>
        <div className="flex items-center gap-4 text-xs text-[#738098]">
          <span>
            <span className="font-semibold text-[#112032]">
              {post.commentsCount ?? 0}
            </span>{" "}
            Comment
          </span>
          <span>
            <span className="font-semibold text-[#112032]">{0}</span> Share
          </span>
        </div>
      </div>

      {/* Reaction Buttons */}
      <div className="flex items-center border-y border-[#edf1f7] px-2 py-1">
        <button
          type="button"
          onClick={handleToggleLike}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition ${post.likedByMe ? "bg-[#EBF3FF] text-[#377DFF]" : "text-[#4c5a71] hover:bg-[#f3f7ff]"}`}
        >
          <Smile
            size={20}
            className={post.likedByMe ? "text-[#377DFF]" : "text-[#FFCC4D]"}
          />
          Haha
        </button>
        <button
          type="button"
          onClick={() => setCommentsOpen((v) => !v)}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition ${
            commentsOpen
              ? "bg-[#EBF3FF] text-[#377DFF]"
              : "text-[#4c5a71] hover:bg-[#f3f7ff]"
          }`}
        >
          <MessageSquare
            size={20}
            className={commentsOpen ? "text-[#377DFF]" : "text-[#4c5a71]"}
          />
          Comment
        </button>
        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium text-[#4c5a71] transition hover:bg-[#f3f7ff]"
        >
          <Share2 size={20} className="text-[#4c5a71]" />
          Share
        </button>
      </div>

      {/* Comments */}
      {commentsOpen ? (
        <div className="px-6">
          <CommentList postId={post.id} totalCount={post.commentsCount || 0} />
        </div>
      ) : null}

      <Modal
        title="Liked by"
        open={likesOpen}
        onClose={() => setLikesOpen(false)}
      >
        <LikesList users={likesUsers} />
      </Modal>
    </article>
  );
}

export default memo(PostCard);
