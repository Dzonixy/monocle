// Utils
import { useSelector } from "react-redux";

// Selectors
import { selectUser } from "redux/reducers/authReducer";

// Components
import { FavoriteBorder, Favorite } from "@mui/icons-material";
import { IconButton } from "@mui/material";

// Hooks
import { usePost, useSelectIsFollowedPost } from "hooks";

export function LikeButton({ postId }) {
  const user = useSelector(selectUser);
  const { followPost } = usePost();
  const { isFollowed } = useSelectIsFollowedPost({ postId, userId: user?.id });

  async function handleLike() {
    await followPost({ postId, userId: user.id });
  }

  return (
    <IconButton
      onClick={handleLike}
      sx={{
        color: "custom.black",
        "path:first-of-type": {
          ...(isFollowed && { color: "custom.redMain", opacity: 1 }),
        },
        "> svg": {
          fontSize: "40px",
        },
      }}
    >
      {!isFollowed ? <FavoriteBorder /> : <Favorite />}
    </IconButton>
  );
}
