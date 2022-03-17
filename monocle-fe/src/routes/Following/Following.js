// Utils
import { useSelector } from "react-redux";

// Selectors
import { selectUser } from "redux/reducers/authReducer";

// Components
import { Grid, Loading } from "components";
import { PostPanel } from "./components";

// Hooks
import { useDrawerActions } from "contexts";
import { useFollowingPosts } from "hooks";

function Following() {
  const user = useSelector(selectUser);
  const { followingPosts, isLoading } = useFollowingPosts({ userId: user?.id });
  const { setOpen, setDrawer } = useDrawerActions();

  if (isLoading) {
    return <Loading />;
  }

  function openPostDetails(postId) {
    setDrawer({ content: <PostPanel postId={postId} /> });
    setOpen(true);
  }

  return (
    <Grid items={followingPosts} openPostDetails={openPostDetails} explore />
  );
}

export default Following;
