// Components
import { Box } from "@mui/material";
import { BackButton } from "components";

// Hooks
import { useDrawerActions } from "contexts";

export function PanelWrapper({ children, explore }) {
  const { setOpen } = useDrawerActions();

  return (
    <Box p={explore ? "40px 0" : 5}>
      <BackButton
        onClick={() => setOpen(false)}
        sx={{ marginLeft: explore ? 5 : 0 }}
      />
      {children}
    </Box>
  );
}
