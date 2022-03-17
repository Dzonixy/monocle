// Components
import { Box } from "@mui/material";
import { Header, BottomNavigation } from "./components";

export function MainLayout({ children }) {
  return (
    <Box
      maxWidth={600}
      width="100%"
      display="flex"
      alignSelf="center"
      flexDirection="column"
      pb={10}
    >
      <Header />
      {children}
      <BottomNavigation />
    </Box>
  );
}
