// Components
import { Box, Dialog } from "@mui/material";
import { Button, Typography } from "components";

export function Modal({ open, title, message, submitAction, cancelAction }) {
  return (
    <Dialog
      open={open}
      onClose={cancelAction}
      sx={{
        ".MuiDialog-paper": {
          padding: "24px",
          borderRadius: 4,
          border: "2px solid",
          borderColor: "custom.black",
          backgroundColor: "custom.yellowSecondary",
        },
      }}
    >
      <Typography sx={{ fontSize: 17, fontWeight: 800 }}>{title}</Typography>
      {message && (
        <Typography variant="body1" sx={{ fontSize: 13, fontWeight: 500 }}>
          {message}
        </Typography>
      )}
      <Box
        mt={1.5}
        display="flex"
        gap={1.5}
        sx={{
          ".MuiButton-root": { height: 36, borderRadius: 3, fontSize: 12 },
        }}
      >
        <Button
          text="Cancel"
          buttonProps={{ onClick: cancelAction }}
          sx={{
            border: "2px solid",
            borderColor: "custom.black",
            backgroundColor: "custom.white",
            color: "custom.black",
            "&:hover": {
              backgroundColor: "custom.white",
            },
          }}
        />
        <Button text="Confirm" buttonProps={{ onClick: submitAction }} />
      </Box>
    </Dialog>
  );
}
