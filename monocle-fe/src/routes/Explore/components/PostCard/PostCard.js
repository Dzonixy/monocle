// Components
import { Box } from "@mui/material";
import { Image, Loading, Typography } from "components";
import { LikeButton } from "./components";

// Utils
import styled from "@emotion/styled";

// Hooks
import { useSelectOwner } from "hooks/api/useUsers/useUsers";

const StyledImage = styled(Image)`
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;

export function PostCard({
  postId,
  image,
  owner: ownerId,
  title,
  description,
  likes,
}) {
  const { owner, isLoading } = useSelectOwner({ ownerId });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <StyledImage
        imgProps={{ src: image }}
        skeletonProps={{
          height: "100%",
          width: "100%",
          sx: { aspectRatio: "1 / 1" },
        }}
      />
      <Box px={5.5} pt={2.5} pb={5}>
        <Typography>{owner?.username}</Typography>
        <Box display="flex" justifyContent="space-between" mb={1.5}>
          <Typography
            variant="h6"
            sx={{ fontWeight: 800, maxWidth: 200, marginTop: 1 }}
          >
            {title}
          </Typography>
          <Box display="flex" alignItems="center" mb="auto">
            {likes.length ? (
              <Typography
                variant="body2"
                sx={{ fontSize: "10px", marginRight: "2px" }}
              >
                {likes.length}
              </Typography>
            ) : null}
            <LikeButton postId={postId} />
          </Box>
        </Box>
        <Typography variant="p" sx={{ fontSize: "15px" }}>
          {description}
        </Typography>
      </Box>
    </>
  );
}
