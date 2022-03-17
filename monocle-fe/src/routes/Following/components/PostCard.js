// Components
import { Box } from "@mui/material";
import { Image, Typography } from "components";

export function PostCard({ image, name, onSale }) {
  return (
    <Box>
      <Image imgProps={{ src: image }} />
      <Typography sx={{ fontSize: 15, fontWeight: 800, marginTop: 0.5 }}>
        {name}
      </Typography>
    </Box>
  );
}
