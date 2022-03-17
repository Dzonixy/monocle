import PropTypes from "prop-types";

// Components
import { ChevronRight } from "@mui/icons-material";
import { Button as MUIButton } from "@mui/material";

export function Button({ text, withIcon, buttonProps, ...rest }) {
  return (
    <MUIButton
      variant="contained"
      sx={{
        maxHeight: 60,
        width: "100%",
        borderRadius: 2,
        backgroundColor: "custom.black",
        textTransform: "none",
        fontWeight: 800,
        fontSize: "21px",
        "&:hover": { backgroundColor: "custom.black" },
        ...rest.sx,
      }}
      {...(withIcon && { endIcon: <ChevronRight /> })}
      {...buttonProps}
    >
      {text}
    </MUIButton>
  );
}

Button.propTypes = {
  text: PropTypes.string.isRequired,
  withIcon: PropTypes.bool,
};

Button.defaultProps = {
  withIcon: false,
};
