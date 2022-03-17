// Components
import { Box } from "@mui/material";
import { Image, Typography } from "components";

// Utils
import { useSelector } from "react-redux";
import styled from "@emotion/styled";

// Selectors
import { selectUser } from "redux/reducers/authReducer";

// Hooks
import { usePostsCount } from "hooks";

const StyledImage = styled(Image)`
  height: 170px;
  width: 170px;
  aspect-ratio: 1 / 1;
  object-fit: cover;
`;

function ProfileInfoDetails({ value, text }) {
  return (
    <Box>
      <Typography
        sx={{ fontSize: "27px", fontWeight: 800, textAlign: "center" }}
      >
        {value}
      </Typography>
      <Typography sx={{ fontSize: "15px" }}>{text}</Typography>
    </Box>
  );
}

export function ProfileInfo() {
  const user = useSelector(selectUser);
  const { postsCount } = usePostsCount({ userId: user?.id });

  return (
    <Box display="flex" flexDirection="column" alignItems="center" mb={1.25}>
      <StyledImage
        imgProps={{ src: user.profileImage }}
        boxProps={{
          maxWidth: 170,
          margin: "0 auto 16px auto",
          sx: { img: { borderRadius: "50%" } },
        }}
      />
      <Typography variant="h4" sx={{ fontSize: "32px", fontWeight: 800 }}>
        {user.username}
      </Typography>
      <Typography variant="body1" sx={{ fontWeight: 800, fontSize: "17px" }}>
        {`@${user.handle}`}
      </Typography>
      <Box mt={2} display="flex" width="100%" justifyContent="space-evenly">
        <ProfileInfoDetails value={postsCount} text="Posts" />
        <ProfileInfoDetails value="62k" text="Followers" />
        <ProfileInfoDetails value={23} text="Following" />
      </Box>
    </Box>
  );
}
