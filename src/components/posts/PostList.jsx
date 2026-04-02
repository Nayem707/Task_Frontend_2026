import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts } from "../../features/posts/postsAPI";
import PostCard from "./PostCard";
import Skeleton from "../common/Skeleton";

function PostList() {
  const dispatch = useDispatch();
  const { items, loading, nextCursor, hasMore } = useSelector(
    (state) => state.posts,
  );

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const loadMore = useCallback(() => {
    if (!hasMore || loading || !nextCursor) return;
    dispatch(fetchPosts(nextCursor));
  }, [dispatch, hasMore, loading, nextCursor]);

  useEffect(() => {
    const onScroll = (e) => {
      const el = e.target;
      const nearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 200;
      if (nearBottom) {
        loadMore();
      }
    };

    const feedEl = document.getElementById("feed-scroll");
    feedEl?.addEventListener("scroll", onScroll);
    return () => feedEl?.removeEventListener("scroll", onScroll);
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
