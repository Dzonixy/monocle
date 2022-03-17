// Components
import { Box } from "@mui/material";
import { Typography } from "components/Typography";
import { Logout, UserAvatar } from "./components";

// Constants
import { LOGIN_TITLE } from "constants";

export function Header() {
  return (
    <Box
      mt={3.5}
      mb={2.5}
      mx={2.5}
      display="flex"
      justifyContent="space-between"
      alignItems="center"
    >
      <Logout />
      <Typography variant="h4" sx={{ fontWeight: 800 }}>
        {LOGIN_TITLE}
      </Typography>
      <UserAvatar />
    </Box>
  );
}
