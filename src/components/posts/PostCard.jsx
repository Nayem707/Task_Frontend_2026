import { memo, useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const EMPTY_ARRAY = [];
import toast from "react-hot-toast";
import {
  Bookmark,
  EyeOff,
  Trash2,
  MoreVertical,
  MessageSquare,
  Share2,
  ThumbsUp,
  Globe,
  Lock,
  User2,
} from "lucide-react";
import {
  deletePost,
  togglePostLike,
  updatePost,
} from "../../features/posts/postsAPI";
import { patchPostLikeOptimistic } from "../../features/posts/postsSlice";
import { fetchLikesList } from "../../features/likes/likesAPI";
import { formatDateTime } from "../../utils/helpers";
import Modal from "../common/Modal";
import CommentList from "../comments/CommentList";
import LikesList from "../likes/LikesList";

function PostCard({ post }) {
  const dispatch = useDispatch();
  const authUser = useSelector((state) => state.auth.user);
  const isOwner = authUser?.id === post.author?.id;
  const [likesOpen, setLikesOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [visibilityLoading, setVisibilityLoading] = useState(false);
  const dropId = useRef(`drop-${post.id}`);

  // Close this dropdown when another post's dropdown opens
  useEffect(() => {
    const handler = (e) => {
      if (e.detail !== dropId.current) setDropOpen(false);
    };
    window.addEventListener("postdrop:open", handler);
    return () => window.removeEventListener("postdrop:open", handler);
  }, []);

  const toggleDrop = () => {
    setDropOpen((v) => {
      if (!v) window.dispatchEvent(new CustomEvent("postdrop:open", { detail: dropId.current }));
      return !v;
    });
  };
  const key = `post:${post.id}`;
  const likesUsers = useSelector(
    (state) => state.likes.likesByEntity[key] ?? EMPTY_ARRAY
  );
  const likesLoading = useSelector((state) => state.likes.loading);

  const handleToggleVisibility = async () => {
    const newVisibility = post.visibility === "PUBLIC" ? "PRIVATE" : "PUBLIC";
    setVisibilityLoading(true);
    setDropOpen(false);
    try {
      await dispatch(
        updatePost({ postId: post.id, visibility: newVisibility })
      ).unwrap();
      toast.success(
        newVisibility === "PRIVATE"
          ? "Post set to Only Me"
          : "Post set to Public"
      );
    } catch {
      toast.error("Could not change visibility");
    } finally {
      setVisibilityLoading(false);
    }
  };
  const imageUrls =
    post.images?.length > 0
      ? post.images
          .slice()
          .sort((left, right) => left.order - right.order)
          .map((image) => image.url)
      : post.imageUrl
        ? [post.imageUrl]
        : [];
  const visibleImages = imageUrls.slice(0, 4);
  const remainingImages = imageUrls.length - visibleImages.length;

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

  return (
    <article className="app-card mb-4 overflow-hidden pt-3 sm:pt-4">
      {/* Post Header */}
      <div className="mb-2 flex items-start justify-between gap-2 px-3 sm:mb-3 sm:px-6">
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Letter Avatar */}
          <Link
            to={`/profile/${post.author?.id}`}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-300 bg-gray-100 text-base font-semibold text-[#acb2b9] sm:h-11 sm:w-11 sm:text-lg"
          >
            {post.author?.avatarUrl ? (
              <img
                src={post.author.avatarUrl}
                alt=""
                className="h-9 w-9 rounded-full object-cover sm:h-11 sm:w-11"
              />
            ) : (
              <User2 className="h-5 w-5 text-gray-400" />
            )}
          </Link>

          <div>
            <Link
              to={`/profile/${post.author?.id}`}
              className="text-xs font-semibold text-[#112032] hover:underline sm:text-sm"
            >
              {post.author?.firstName
                ? `${post.author.firstName} ${post.author.lastName ?? ""}`.trim()
                : post.author?.name || "Unknown Author"}
            </Link>
            <p className="flex gap-1 text-[10px] text-[#79879d] sm:text-xs">
              <span>{formatDateTime(post.createdAt)} ● </span>
              <a href="#" className="hover:underline">
                {post.visibility === "PUBLIC" ? (
                  <span className="flex items-center">
                    <Globe size={12} className="mr-1" />
                    Public
                  </span>
                ) : (
                  <span className="flex items-center">
                    <Lock size={12} className="mr-1" />
                    Only Me
                  </span>
                )}
              </a>
            </p>
          </div>
        </div>

        {/* 3-dot dropdown */}
        <div className="relative">
          <button
            type="button"
            onClick={() => toggleDrop()}
            className="rounded-lg p-1 hover:bg-[#f3f6fb]"
          >
            <MoreVertical size={18} className="text-[#C4C4C4]" />
          </button>
          {dropOpen && (
            <div className="absolute top-full right-0 z-20 mt-1 w-44 rounded-xl border border-[#e7edf8] bg-white shadow-lg">
              <ul className="py-1">
                {isOwner ? (
                  <>
                    <li>
                      <button
                        type="button"
                        onClick={handleToggleVisibility}
                        disabled={visibilityLoading}
                        className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-[#4c5a71] hover:bg-[#f5f7fb] disabled:opacity-50"
                      >
                        {post.visibility === "PUBLIC" ? (
                          <Lock size={18} className="text-[#1890FF]" />
                        ) : (
                          <Globe size={18} className="text-[#1890FF]" />
                        )}
                        {visibilityLoading
                          ? "Saving..."
                          : post.visibility === "PUBLIC"
                            ? "Set to Only Me"
                            : "Set to Public"}
                      </button>
                    </li>
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
                  </>
                ) : (
                  <>
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
                  </>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="px-3 sm:px-6">
        <p className="mb-2 text-xs font-semibold text-[#112032] sm:mb-3 sm:text-sm">
          {post.content}
        </p>
      </div>

      {/* Images */}
      {imageUrls.length > 0 ? (
        <div
          className={`mb-3 grid gap-1 overflow-hidden bg-[#f4f6fa] sm:mb-4 ${
            imageUrls.length === 1 ? "grid-cols-1" : "grid-cols-2"
          }`}
        >
          {visibleImages.map((src, index) => {
            const isSingle = imageUrls.length === 1;
            const isTripleHero = imageUrls.length === 3 && index === 0;
            const isLastVisibleWithOverflow =
              remainingImages > 0 && index === visibleImages.length - 1;

            return (
              <div
                key={`${post.id}-${src}-${index}`}
                className={[
                  "relative overflow-hidden bg-[#e9edf5]",
                  isSingle ? "max-h-152" : "aspect-square",
                  isTripleHero ? "row-span-2" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <img
                  src={src}
                  alt={`Post image ${index + 1}`}
                  className={`h-full w-full object-cover ${
                    isSingle ? "max-h-152 object-contain" : ""
                  }`}
                  loading="lazy"
                />

                {isLastVisibleWithOverflow ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/45 text-3xl font-semibold text-white">
                    +{remainingImages}
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      ) : null}

      {/* Reaction counts */}
      <div className="mb-3 flex items-center justify-between px-3 sm:mb-4 sm:px-6">
        <div className="flex items-center gap-1">
          {likesUsers.length > 0 && (
            <div className="mt-3 flex -space-x-2 overflow-hidden">
              {likesUsers.slice(0, 5).map((u) =>
                u.avatarUrl ? (
                  <img
                    key={u.id}
                    className="inline-block h-6 w-6 rounded-full object-cover ring-2 ring-white"
                    src={u.avatarUrl}
                    alt={u.name || "User"}
                  />
                ) : (
                  <div
                    key={u.id}
                    className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#d0d9e8] text-[12px] font-semibold text-[#aeb6c4] ring-2 ring-white"
                  >
                    {(u.name || "U").charAt(0).toUpperCase()}
                  </div>
                )
              )}
            </div>
          )}
          <div className="mt-3 text-sm font-medium">
            <button
              type="button"
              onClick={handleOpenLikes}
              className="ml-1 text-xs text-[#738098] hover:text-[#112032]"
            >
              {post.likesCount > 0 ? `${post.likesCount} ` : "0 "}
              Like
            </button>
          </div>
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
      <div className="flex items-center gap-1 border-y border-[#edf1f7] px-1 py-1 sm:gap-2 sm:px-2">
        <button
          type="button"
          onClick={handleToggleLike}
          className={`flex flex-1 items-center justify-center gap-1 rounded-lg py-1.5 text-xs font-medium transition sm:gap-2 sm:py-2 sm:text-sm ${post.likedByMe ? "bg-[#EBF3FF] text-[#377DFF]" : "text-[#4c5a71] hover:bg-[#f3f7ff]"}`}
        >
          <ThumbsUp
            size={18}
            fill={post.likedByMe ? "#377DFF" : "none"}
            className={`sm:size-5 ${post.likedByMe ? "text-[#377DFF]" : "text-[#4c5a71]"}`}
          />
          <span className="hidden sm:inline">Like</span>
        </button>
        <button
          type="button"
          onClick={() => setCommentsOpen((v) => !v)}
          className={`flex flex-1 items-center justify-center gap-1 rounded-lg py-1.5 text-xs font-medium transition sm:gap-2 sm:py-2 sm:text-sm ${
            commentsOpen
              ? "bg-[#EBF3FF] text-[#377DFF]"
              : "text-[#4c5a71] hover:bg-[#f3f7ff]"
          }`}
        >
          <MessageSquare
            size={18}
            className={`sm:size-5 ${commentsOpen ? "text-[#377DFF]" : "text-[#4c5a71]"}`}
          />
          <span className="hidden sm:inline">Comment</span>
        </button>
        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-1 rounded-lg py-1.5 text-xs font-medium text-[#4c5a71] transition hover:bg-[#f3f7ff] sm:gap-2 sm:py-2 sm:text-sm"
        >
          <Share2 size={18} className="text-[#4c5a71] sm:size-5" />
          <span className="hidden sm:inline">Share</span>
        </button>
      </div>

      {/* Comments */}
      {commentsOpen ? (
        <div className="px-3 sm:px-6">
          <CommentList postId={post.id} totalCount={post.commentsCount || 0} />
        </div>
      ) : null}

      <Modal
        maxWidth="2xl"
        title="Liked by"
        open={likesOpen}
        onClose={() => setLikesOpen(false)}
      >
        <LikesList users={likesUsers} loading={likesLoading} />
      </Modal>
    </article>
  );
}

export default memo(PostCard);
