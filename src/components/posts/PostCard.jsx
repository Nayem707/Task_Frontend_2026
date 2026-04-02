import { memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
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
  const key = `post:${post.id}`;
  const likesUsers = useSelector(
    (state) => state.likes.likesByEntity[key] || [],
  );

  const handleToggleLike = async () => {
    const optimistic = !post.likedByMe;
    dispatch(patchPostLikeOptimistic({ postId: post.id, liked: optimistic }));
    try {
      await dispatch(togglePostLike(post.id)).unwrap();
    } catch {
      dispatch(
        patchPostLikeOptimistic({ postId: post.id, liked: !optimistic }),
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
    <article className="app-card mb-4 overflow-hidden py-6">
      {/* Post Header */}
      <div className="mb-3 flex items-start justify-between gap-2 px-6">
        <div className="flex items-center gap-3">
          <img
            src={post.author?.avatarUrl || "/images/post_img.png"}
            alt={post.author?.name || "Author"}
            className="h-11 w-11 rounded-full object-cover shrink-0"
            loading="lazy"
          />
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
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="4"
              height="17"
              fill="none"
              viewBox="0 0 4 17"
            >
              <circle cx="2" cy="2" r="2" fill="#C4C4C4" />
              <circle cx="2" cy="8" r="2" fill="#C4C4C4" />
              <circle cx="2" cy="15" r="2" fill="#C4C4C4" />
            </svg>
          </button>
          {dropOpen && (
            <div className="absolute right-0 top-full z-20 mt-1 w-44 rounded-xl border border-[#e7edf8] bg-white shadow-lg">
              <ul className="py-1">
                <li>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-[#4c5a71] hover:bg-[#f5f7fb]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="#1890FF"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.2"
                        d="M14.25 15.75L9 12l-5.25 3.75v-12a1.5 1.5 0 011.5-1.5h7.5a1.5 1.5 0 011.5 1.5v12z"
                      />
                    </svg>
                    Save Post
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="flex w-full items-center gap-2.5 px-4 py-2 text-sm text-[#4c5a71] hover:bg-[#f5f7fb]"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      fill="none"
                      viewBox="0 0 18 18"
                    >
                      <path
                        stroke="#1890FF"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="1.2"
                        d="M14.25 2.25H3.75a1.5 1.5 0 00-1.5 1.5v10.5a1.5 1.5 0 001.5 1.5h10.5a1.5 1.5 0 001.5-1.5V3.75a1.5 1.5 0 00-1.5-1.5zM6.75 6.75l4.5 4.5M11.25 6.75l-4.5 4.5"
                      />
                    </svg>
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
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="18"
                        height="18"
                        fill="none"
                        viewBox="0 0 18 18"
                      >
                        <path
                          stroke="#EF4444"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.2"
                          d="M2.25 4.5h13.5M6 4.5V3a1.5 1.5 0 011.5-1.5h3A1.5 1.5 0 0112 3v1.5m2.25 0V15a1.5 1.5 0 01-1.5 1.5h-7.5a1.5 1.5 0 01-1.5-1.5V4.5h10.5z"
                        />
                      </svg>
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
            className="w-full max-h-110 object-cover"
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
            {post.likesCount > 0
              ? `${post.likesCount > 9 ? "9+" : post.likesCount}`
              : ""}
          </button>
        </div>
        <div className="flex items-center gap-4 text-xs text-[#738098]">
          <span>
            <span className="font-semibold text-[#112032]">
              {post.commentsCount || 12}
            </span>{" "}
            Comment
          </span>
          <span>
            <span className="font-semibold text-[#112032]">122</span> Share
          </span>
        </div>
      </div>

      {/* Reaction Buttons */}
      <div className="flex items-center border-y border-[#edf1f7] px-2 py-1">
        <button
          type="button"
          onClick={handleToggleLike}
          className={`flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium transition hover:bg-[#f3f7ff] ${post.likedByMe ? "text-[#377DFF]" : "text-[#4c5a71]"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="19"
            height="19"
            fill="none"
            viewBox="0 0 19 19"
          >
            <path
              fill="#FFCC4D"
              d="M9.5 19a9.5 9.5 0 100-19 9.5 9.5 0 000 19z"
            />
            <path
              fill="#664500"
              d="M9.5 11.083c-1.912 0-3.181-.222-4.75-.527-.358-.07-1.056 0-1.056 1.055 0 2.111 2.425 4.75 5.806 4.75 3.38 0 5.805-2.639 5.805-4.75 0-1.055-.697-1.125-1.055-1.055-1.57.305-2.838.527-4.75.527z"
            />
            <path
              fill="#fff"
              d="M4.75 11.611s1.583.528 4.75.528 4.75-.528 4.75-.528-1.056 2.111-4.75 2.111-4.75-2.11-4.75-2.11z"
            />
            <path
              fill="#664500"
              d="M6.333 8.972c.729 0 1.32-.827 1.32-1.847s-.591-1.847-1.32-1.847c-.729 0-1.32.827-1.32 1.847s.591 1.847 1.32 1.847zM12.667 8.972c.729 0 1.32-.827 1.32-1.847s-.591-1.847-1.32-1.847c-.729 0-1.32.827-1.32 1.847s.591 1.847 1.32 1.847z"
            />
          </svg>
          Haha
        </button>
        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium text-[#4c5a71] transition hover:bg-[#f3f7ff]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="21"
            height="21"
            fill="none"
            viewBox="0 0 21 21"
          >
            <path
              stroke="#000"
              d="M1 10.5c0-.464 0-.696.009-.893A9 9 0 019.607 1.01C9.804 1 10.036 1 10.5 1v0c.464 0 .696 0 .893.009a9 9 0 018.598 8.598c.009.197.009.429.009.893v6.046c0 1.36 0 2.041-.317 2.535a2 2 0 01-.602.602c-.494.317-1.174.317-2.535.317H10.5c-.464 0-.696 0-.893-.009a9 9 0 01-8.598-8.598C1 11.196 1 10.964 1 10.5v0z"
            />
            <path
              stroke="#000"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.938 9.313h7.125M10.5 14.063h3.563"
            />
          </svg>
          Comment
        </button>
        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium text-[#4c5a71] transition hover:bg-[#f3f7ff]"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="21"
            fill="none"
            viewBox="0 0 24 21"
          >
            <path
              stroke="#000"
              strokeLinejoin="round"
              d="M23 10.5L12.917 1v5.429C3.267 6.429 1 13.258 1 20c2.785-3.52 5.248-5.429 11.917-5.429V20L23 10.5z"
            />
          </svg>
          Share
        </button>
      </div>

      {/* Comments */}
      <div className="px-6">
        <CommentList postId={post.id} />
      </div>

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
