// Components
import { Favorite } from "@mui/icons-material";
import { Box } from "@mui/material";
import { Image, Loading, PanelWrapper, Typography } from "components";

// Utils
import styled from "@emotion/styled";

// Service
import { useGetPost } from "service/posts";

// Hooks
import { useSelectOwner } from "hooks/api/useUsers/useUsers";

const StyledImage = styled(Image)`
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;

export function PostPanel({ postId }) {
  const { data: post, isLoading } = useGetPost(postId);
  const { owner, isLoading: isOwnerLoading } = useSelectOwner({
    ownerId: post?.owner,
  });

  if (isLoading || isOwnerLoading) {
    return <Loading />;
  }

  return (
    <PanelWrapper explore>
      <StyledImage
        imgProps={{ src: post.image }}
        skeletonProps={{
          height: "100%",
          sx: { aspectRatio: "1 / 1", borderRadius: 2 },
        }}
      />
      <Box
        display="flex"
        mt={2.5}
        mx={5}
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography sx={{ fontSize: 18, fontWeight: 800 }}>
          {owner?.username}
        </Typography>
        {post.likes.length ? (
          <Box display="flex" alignItems="center">
            <Typography sx={{ fontSize: 21, fontWeight: 500, marginRight: 1 }}>
              {post.likes.length}
            </Typography>
            <Favorite sx={{ color: "custom.redMain", fontSize: 40 }} />
          </Box>
        ) : null}
      </Box>
      <Typography
        sx={{ fontSize: 36, fontWeight: 800, marginLeft: 5, marginRight: 5 }}
      >
        {post.title}
      </Typography>
      <Typography
        sx={{ fontSize: 21, fontWeight: 500, marginLeft: 5, marginRight: 5 }}
      >
        {post.description}
      </Typography>
    </PanelWrapper>
  );
}
