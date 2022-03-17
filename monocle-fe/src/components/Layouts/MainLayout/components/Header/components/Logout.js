// Components
import { IconButton } from "@mui/material";
import { Close } from "@mui/icons-material";

// Hooks
import { useAuthentication } from "hooks";

export function Logout() {
  const { handleLogout } = useAuthentication();

  return (
    <IconButton onClick={handleLogout} sx={{ color: "custom.black" }}>
      <Close />
    </IconButton>
  );
}
