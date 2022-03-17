// Components
import { Box } from "@mui/material";
import { Grid, Typography, Input, Loading } from "components";
import { PostPanel } from "./components";

// Hooks
import { useDrawerActions } from "contexts";
import { useOnSalePosts } from "hooks";

function Marketplace() {
  const { setDrawer, setOpen } = useDrawerActions();
  const { onSalePosts, isLoading } = useOnSalePosts();

  if (isLoading) {
    return <Loading />;
  }

  function openPostDetails(postId) {
    setDrawer({ content: <PostPanel postId={postId} /> });
    setOpen(true);
  }

  return (
    <Box>
      <Input
        placeholder="Search"
        sx={{
          paddingLeft: 5,
          paddingRight: 5,
          marginBottom: 5,
          marginTop: 2.5,
          "& .MuiOutlinedInput-notchedOutline": {
            borderRadius: 4,
            borderColor: ({ palette }) => palette.custom.black,
            borderWidth: 2,
          },
        }}
      />
      <Typography
        sx={{ fontSize: 24, fontWeight: 800, marginLeft: 4, marginBottom: 2 }}
      >
        Latest Posts
      </Typography>
      <Grid items={onSalePosts} openPostDetails={openPostDetails} market />
    </Box>
  );
}

export default Marketplace;
