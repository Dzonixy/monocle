import React from "react";
import PropTypes from "prop-types";

// Components
import { Box, IconButton, Snackbar as MUISnackbar } from "@mui/material";
import { Close } from "@mui/icons-material";
import { Typography } from "components/Typography";

// Constants
import {
  TOAST_MESSAGE_DEFAULT,
  TOAST_SUBTITLE_DEFAULT,
  TOAST_TYPE_ERROR,
  TOAST_TYPE_SUCCESS,
} from "constants/index";

export function Toast({ open, toast, dismissToast }) {
  return (
    <MUISnackbar
      open={open}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      autoHideDuration={5000}
      message={
        <Box display="flex">
          <Box display="flex" flexDirection="column">
            <Typography
              variant="body1"
              color="black"
              sx={{ fontWeight: 800, marginBottom: 1 }}
            >
              {toast.message}
            </Typography>
            <Typography
              variant="body2"
              color="black"
              sx={{
                wordBreak: "break-word",
                fontSize: 12,
                span: { fontWeight: 800 },
              }}
              dangerouslySetInnerHTML={{ __html: toast.subtitle }}
            />
          </Box>
        </Box>
      }
      onClose={dismissToast}
      action={
        <IconButton onClick={dismissToast} sx={{ color: "custom.redMain" }}>
          <Close />
        </IconButton>
      }
      sx={{
        borderRadius: 2,
        "& .MuiPaper-root": {
          backgroundColor: "custom.white",
          borderRadius: 2,
          boxShadow: ({ palette }) => palette.custom.shadow,
          borderLeftWidth: 8,
          borderLeftStyle: "solid",
          borderLeftColor: "custom.redMain",
        },
        ".MuiSnackbarContent-message": {
          maxWidth: "80%",
        },
      }}
    />
  );
}

Toast.propTypes = {
  open: PropTypes.bool.isRequired,
  toast: PropTypes.shape({
    type: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
  }).isRequired,
  dismissToast: PropTypes.func.isRequired,
};

Toast.defaultProps = {
  open: false,
  toast: {
    type: TOAST_TYPE_SUCCESS,
    message: TOAST_MESSAGE_DEFAULT,
    subtitle: TOAST_SUBTITLE_DEFAULT,
  },
  dismissToast: () => {},
};
