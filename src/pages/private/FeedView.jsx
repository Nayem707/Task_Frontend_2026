import CreatePost from "../../components/posts/CreatePost";
import PostList from "../../components/posts/PostList";
import Stories from "../../components/posts/Stories";



const FeedView = () => {
  return (
    <div>
      {/* Stories */}
<Stories/>

      {/* Create Post */}
      <CreatePost />

      {/* Posts */}
      <PostList />
    </div>
  );
};

export default FeedView;
