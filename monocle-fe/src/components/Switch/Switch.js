// Components
import { Switch as MUISwitch } from "@mui/material";

export function Switch({ ...switchProps }) {
  return (
    <MUISwitch
      {...switchProps}
      inputProps={{ "aria-label": "controlled" }}
      sx={{
        height: 36,
        padding: 0,
        ".MuiSwitch-thumb": {
          width: "36px",
          height: "36px",
          position: "relative",
          "&::after": {
            content: "''",
            position: "absolute",
            width: "14px",
            height: "14px",
            border: "2px solid",
            borderColor: "custom.black",
            borderRadius: "50%",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          },
        },
        "&&& .Mui-checked": {
          color: "custom.white",
          transform: "translateX(22px)",
          "+ .MuiSwitch-track": {
            opacity: 1,
            backgroundColor: "custom.yellowMain",
          },
        },
        "&&& .MuiSwitch-thumb": {
          boxShadow: "none",
          border: "2px solid",
          borderColor: "custom.black",
        },
        ".MuiSwitch-track": {
          padding: 0,
          borderRadius: "18px",
          width: 60,
          height: 36,
          border: "2px solid",
          borderColor: "custom.black",
          backgroundColor: "custom.white",
          opacity: 1,
        },
        ".MuiSwitch-switchBase": {
          padding: 0,
        },
      }}
    />
  );
}
