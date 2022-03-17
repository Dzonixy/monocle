// Utils
import { Loading } from "components";

// Service
import { useGetPosts } from "service/posts";

// Components
import { PostCard } from "./components/PostCard";

function Explore() {
  const { data, isLoading } = useGetPosts();

  if (isLoading) {
    return <Loading />;
  }

  return data.map((post) => <PostCard key={post.postId} {...post} />);
}

export default Explore;
