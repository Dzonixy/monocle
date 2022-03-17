// Components
import { Box } from "@mui/material";
import { Typography } from "components";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { ChevronRight } from "@mui/icons-material";

// Constants
import { LOGIN_TITLE } from "constants/index";

export function LoginLayout({
  buttonAction,
  buttonDisabled,
  loginEnabled,
  children,
}) {
  function handleClick() {
    if (loginEnabled) {
      buttonAction();
    }
  }

  return (
    <Box
      my={5}
      px={5}
      height="100%"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="space-between"
      maxWidth={600}
      alignSelf="center"
      overflow="auto"
      width="100%"
      sx={{
        ".wallet-adapter-button-trigger": {
          maxHeight: 60,
          width: "100%",
          borderRadius: 2,
          backgroundColor: "custom.black",
          textTransform: "none",
          fontWeight: 800,
          fontSize: "21px",
          justifyContent: "center",
          marginTop: 5,
          "&:hover": { backgroundColor: "custom.black" },
        },
        ".wallet-adapter-dropdown-list": {
          display: "none",
        },
        ".wallet-adapter-dropdown": {
          width: "100%",
        },
      }}
    >
      <Typography
        variant="h3"
        sx={{ fontSize: 42, textAlign: "center", fontWeight: 800 }}
      >
        {LOGIN_TITLE}
      </Typography>
      {children}
      <WalletMultiButton
        startIcon={null}
        onClick={handleClick}
        endIcon={<ChevronRight />}
        disabled={buttonDisabled}
      />
    </Box>
  );
}
