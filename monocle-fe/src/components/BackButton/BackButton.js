// Components
import { ArrowBack } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Typography } from "components/Typography";

export function BackButton({ sx: customSx, ...iconButtonProps }) {
  return (
    <IconButton
      sx={{
        borderRadius: "12px",
        color: "custom.black",
        marginRight: "auto",
        marginBottom: 2,
        ...customSx,
      }}
      {...iconButtonProps}
    >
      <ArrowBack />
      <Typography sx={{ fontSize: 24, fontWeight: "bold", marginLeft: 0.5 }}>
        Back
      </Typography>
    </IconButton>
  );
}
