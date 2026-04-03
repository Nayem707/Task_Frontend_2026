import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchMyFeed } from "../../features/posts/postsAPI";
import PostCard from "./PostCard";
import Skeleton from "../common/Skeleton";

function PostList() {
  const dispatch = useDispatch();
  const {
    items,
    loading,
    hasMore,
    currentPage = 1,
  } = useSelector((state) => state.posts);

  useEffect(() => {
    dispatch(fetchMyFeed({ page: 1 }));
  }, [dispatch]);

  const loadMore = useCallback(() => {
    if (!hasMore || loading) return;
    dispatch(fetchMyFeed({ page: currentPage + 1 }));
  }, [dispatch, hasMore, loading, currentPage]);

  useEffect(() => {
    const onScroll = () => {
      const nearBottom =
        window.innerHeight + window.scrollY >= document.body.scrollHeight - 200;
      if (nearBottom) loadMore();
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [loadMore]);

  return (
    <section className="space-y-4">
      {items.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}

      {loading ? (
        <div className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-40 w-full" />
        </div>
      ) : null}

      {!loading && !items.length ? (
        <div className="app-card p-6 text-center text-sm text-[#728198]">
          No posts found yet.
        </div>
      ) : null}
    </section>
  );
}

export default PostList;
