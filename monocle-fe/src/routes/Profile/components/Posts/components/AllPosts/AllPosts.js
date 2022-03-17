// Components
import { Grid, Loading } from "components";
import { PostPanel } from "./components";

// Hooks
import { useDrawerActions } from "contexts";
import { useUserPosts } from "hooks";

// Utils
import { useSelector } from "react-redux";

// Selectors
import { selectUser } from "redux/reducers/authReducer";

export function AllPosts() {
  const { setDrawer, setOpen } = useDrawerActions();
  const user = useSelector(selectUser);
  const { userPosts, isLoading } = useUserPosts({ userId: user?.id });

  if (isLoading) {
    return <Loading />;
  }

  function openPostDetails(postId) {
    setDrawer({ content: <PostPanel postId={postId} /> });
    setOpen(true);
  }

  return <Grid items={userPosts} openPostDetails={openPostDetails} profile />;
}
