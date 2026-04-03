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
  WholeWord,
  Map,
  EarthIcon,
  Globe,
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
            {post.author?.avatarUrl ? (
              <img
                src={post.author.avatarUrl}
                alt=""
                className="h-11 w-11 rounded-full object-cover"
              />
            ) : (
              (post.author?.firstName ?? "U").charAt(0).toUpperCase()
            )}
          </div>

          <div>
            <p className="text-sm font-semibold text-[#112032]">
              {post.author?.firstName
                ? `${post.author.firstName} ${post.author.lastName ?? ""}`.trim()
                : post.author?.name || "Unknown Author"}
            </p>
            <p className="flex gap-1 text-xs text-[#79879d]">
              <span>{formatDateTime(post.createdAt)} ● </span>
              <a href="#" className="hover:underline">
                {post.visibility === "PUBLIC" ? (
                  <span className="flex items-center">
                    <Globe size={12} className="mr-1" />
                    Public
                  </span>
                ) : post.visibility === "PRIVATE" ? (
                  <span className="flex items-center">
                    <Lock size={12} className="mr-1" />
                    Friends
                  </span>
                ) : (
                  <span className="flex items-center">
                    <EyeOff size={12} className="mr-1" />
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

      {/* Images */}
      {imageUrls.length > 0 ? (
        <div
          className={`mb-4 grid gap-1 overflow-hidden bg-[#f4f6fa] ${
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
